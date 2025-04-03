import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

// Secret for JWT token (should be moved to environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'strike-den-secure-jwt-secret';

export async function GET() {
  try {
    // Get the token from the cookies - cookies() no longer needs to be awaited in modern Next.js
    const token = cookies().get('admin_token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    try {
      // Verify the token
      const decoded = jwt.verify(token, JWT_SECRET);
      
      // Check if the user is an admin
      if (!decoded.isAdmin) {
        return NextResponse.json(
          { success: false, message: 'Admin privileges required' },
          { status: 403 }
        );
      }
      
      // Return user info (without sensitive data)
      return NextResponse.json({
        success: true,
        user: {
          id: decoded.id,
          username: decoded.username,
          isAdmin: decoded.isAdmin
        }
      });
    } catch (error) {
      // Token invalid or expired
      return NextResponse.json(
        { success: false, message: 'Invalid or expired token' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
} 