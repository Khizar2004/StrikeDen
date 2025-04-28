import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { connectDB } from '@/lib/dbConnect';
import Admin from '@/lib/Admin';
import { rateLimit } from '@/lib/redis';
import { createCsrfToken } from '@/lib/csrf';

// Get JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// Helper to sanitize inputs
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  // Basic sanitation to prevent NoSQL injection
  return input.trim().replace(/[{}<>[\]\\\/]/g, '');
}

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
    
    // Implement Redis-based rate limiting
    const rateLimitResult = await rateLimit({
      key: `login:${ip}`,
      limit: 5,
      duration: 900 // 15 minutes in seconds
    });
    
    // Check if rate limit was exceeded
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Too many login attempts. Please try again later.',
          retryAfter: rateLimitResult.remaining
        },
        { 
          status: 429,
          headers: {
            'Retry-After': '900'
          }
        }
      );
    }
    
    const requestData = await request.json();
    // Sanitize inputs to prevent injection attacks
    const username = sanitizeInput(requestData.username);
    const password = requestData.password; // Don't sanitize password, but don't log it either
    
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

    // Generate a unique session ID
    const sessionId = require('crypto').randomBytes(16).toString('hex');
    
    // Create JWT token with short expiration
    const token = jwt.sign(
      { 
        id: admin._id, 
        username: admin.username, 
        isAdmin: admin.isAdmin,
        // Add a unique token ID that can be revoked if needed
        jti: sessionId
      },
      JWT_SECRET,
      { expiresIn: '4h' } // Shorter expiration time for better security
    );

    // Set HTTP-only cookie with better security options
    const cookieStore = await cookies();
    cookieStore.set('admin_token', token, {
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

    // Generate CSRF token for this session
    const csrfToken = await createCsrfToken(sessionId);
    
    console.log('User successfully logged in');
    
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: admin._id,
        username: admin.username,
        isAdmin: admin.isAdmin
      },
      csrfToken
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