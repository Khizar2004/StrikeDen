import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { connectDB } from '@/lib/dbConnect';
import Admin from '@/lib/Admin';

// Get JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// Track login attempts for rate limiting
const loginAttempts = new Map();

export async function POST(request) {
  try {
    // Check if JWT_SECRET is properly configured
    if (!JWT_SECRET) {
      console.error('JWT_SECRET is not configured in environment variables');
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    await connectDB();
    
    // Get client IP for rate limiting
    // Note: In production, you should use a proper request IP detection
    // that accounts for proxies and load balancers
    const ip = request.headers.get('x-forwarded-for') || 'unknown-ip';
    
    // Implement basic rate limiting
    const now = Date.now();
    const recentAttempts = loginAttempts.get(ip) || [];
    
    // Remove attempts older than 15 minutes
    const fifteenMinutes = 15 * 60 * 1000;
    const recentAttemptsCleaned = recentAttempts.filter(
      timestamp => now - timestamp < fifteenMinutes
    );
    
    // Check if too many attempts
    if (recentAttemptsCleaned.length >= 5) {
      return NextResponse.json(
        { success: false, message: 'Too many login attempts. Please try again later.' },
        { status: 429 }
      );
    }
    
    // Add current attempt
    recentAttemptsCleaned.push(now);
    loginAttempts.set(ip, recentAttemptsCleaned);
    
    const { username, password } = await request.json();

    // Log attempt but avoid logging passwords or other sensitive info
    console.log('Login attempt:', { username: username?.slice(0, 3) + '***' });

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Get admin user from database
    const admin = await Admin.findOne({ username });
    
    if (!admin) {
      console.log('Invalid login attempt - username not found');
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Compare passwords
    let isMatch = false;
    try {
      isMatch = await bcrypt.compare(password, admin.password);
    } catch (err) {
      console.error('Password comparison error');
      return NextResponse.json(
        { success: false, message: 'Authentication error' },
        { status: 500 }
      );
    }
    
    if (!isMatch) {
      console.log('Invalid login attempt - password mismatch');
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Update last login timestamp
    admin.lastLogin = new Date();
    await admin.save();

    // Create JWT token with short expiration
    const token = jwt.sign(
      { 
        id: admin._id, 
        username: admin.username, 
        isAdmin: admin.isAdmin,
        // Add a unique token ID that can be revoked if needed
        jti: require('crypto').randomBytes(16).toString('hex') 
      },
      JWT_SECRET,
      { expiresIn: '4h' } // Shorter expiration time for better security
    );

    // Set HTTP-only cookie with better security options
    cookies().set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 4 * 60 * 60, // 4 hours in seconds
      path: '/',
      // Add domain restriction in production
      ...(process.env.NODE_ENV === 'production' && {
        domain: process.env.COOKIE_DOMAIN || undefined
      })
    });

    console.log('User successfully logged in');
    
    // Clear login attempts after successful login
    loginAttempts.delete(ip);
    
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: admin._id,
        username: admin.username,
        isAdmin: admin.isAdmin
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Please use POST method for login" }, { status: 405 });
} 