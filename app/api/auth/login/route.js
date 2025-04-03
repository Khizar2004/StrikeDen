import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { connectDB } from '@/lib/dbConnect';
import Admin from '@/lib/Admin';

// Secret for JWT token (should be moved to environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'strike-den-secure-jwt-secret';

export async function POST(request) {
  try {
    await connectDB();
    const { username, password, isReset } = await request.json();

    console.log('Login attempt:', { username, isReset });

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Get admin user from database
    // For first-time setup, create a default admin user if none exists
    let admin = await Admin.findOne({ username });
    
    if (!admin) {
      // Check if this is the first admin being created
      const adminCount = await Admin.countDocuments();
      
      if (adminCount === 0 && username === 'admin') {
        // Create default admin user for first-time setup
        const hashedPassword = await bcrypt.hash(password, 10);
        admin = await Admin.create({
          username: 'admin',
          password: hashedPassword,
          isAdmin: true
        });
        
        console.log('Created default admin user:', { username: admin.username, isAdmin: admin.isAdmin });
      } else {
        console.log('Invalid login attempt - username not found:', username);
        return NextResponse.json(
          { success: false, message: 'Invalid credentials' },
          { status: 401 }
        );
      }
    } else if (isReset && username === 'admin') {
      // Special case for resetting admin password during setup
      console.log('Resetting admin password');
      
      // Generate hashed password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Update the password directly in the database for reliability
      const result = await Admin.updateOne(
        { username: 'admin' },
        { $set: { password: hashedPassword } }
      );
      
      console.log('Password reset result:', result);
      
      // Reload the admin with the new password
      admin = await Admin.findOne({ username });
      
      // Skip password comparison since we just set it
      // Create JWT token
      const token = jwt.sign(
        { id: admin._id, username: admin.username, isAdmin: admin.isAdmin },
        JWT_SECRET,
        { expiresIn: '1d' }
      );

      // Set HTTP-only cookie
      cookies().set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 86400, // 1 day in seconds
        path: '/'
      });

      console.log('User successfully reset password and logged in:', username);
      
      return NextResponse.json({
        success: true,
        message: 'Password reset and login successful',
        user: {
          id: admin._id,
          username: admin.username,
          isAdmin: admin.isAdmin
        }
      });
    }

    // Only compare passwords if not in reset mode
    if (!isReset) {
      // Compare passwords
      let isMatch = false;
      try {
        isMatch = await bcrypt.compare(password, admin.password);
      } catch (err) {
        console.error('Password comparison error:', err);
        return NextResponse.json(
          { success: false, message: 'Authentication error' },
          { status: 500 }
        );
      }
      
      if (!isMatch) {
        console.log('Invalid login attempt - password mismatch for user:', username);
        return NextResponse.json(
          { success: false, message: 'Invalid credentials. If this is your first time logging in, set "Reset Password" to true.' },
          { status: 401 }
        );
      }
    }

    // Create JWT token
    const token = jwt.sign(
      { id: admin._id, username: admin.username, isAdmin: admin.isAdmin },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Set HTTP-only cookie
    cookies().set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400, // 1 day in seconds
      path: '/'
    });

    console.log('User successfully logged in:', username);
    
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