import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

// Secret for JWT token (should be moved to environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'strike-den-secure-jwt-secret';

/**
 * Middleware to verify admin authentication
 * @param {Request} request - The incoming request
 * @returns {Response|void} - Response if unauthorized, void if authorized
 */
export async function adminAuthMiddleware(request) {
  // Get the token from the cookies
  const cookieStore = cookies();
  const token = await cookieStore.get('admin_token')?.value;
  
  if (!token) {
    return NextResponse.json(
      { success: false, message: 'Authentication required' },
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
    
    // Token is valid and user is admin
    return;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Invalid or expired token' },
      { status: 401 }
    );
  }
} 