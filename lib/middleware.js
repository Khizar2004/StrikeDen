import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

// Get JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// Centralized response creator for consistent error handling
const createErrorResponse = (status, message) => {
  return NextResponse.json(
    { success: false, message },
    { status }
  );
};

/**
 * Middleware to verify admin authentication
 * @param {Request} request - The incoming request
 * @returns {Response|void} - Response if unauthorized, void if authorized
 */
export async function adminAuthMiddleware(request) {
  // Check if JWT_SECRET is configured
  if (!JWT_SECRET) {
    console.error('JWT_SECRET is not configured in environment variables');
    return createErrorResponse(500, 'Server configuration error');
  }

  try {
    // Get the token from the cookies
    const cookieStore = cookies();
    const token = cookieStore.get('admin_token')?.value;
    
    if (!token) {
      return createErrorResponse(401, 'Authentication required');
    }
    
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Check if the user is an admin
    if (!decoded.isAdmin) {
      return createErrorResponse(403, 'Admin privileges required');
    }
    
    // Token is valid and user is admin - proceed
    return; // Return void/undefined to allow request to proceed
    
  } catch (error) {
    // Handle different JWT errors specifically
    if (error.name === 'JsonWebTokenError') {
      return createErrorResponse(401, 'Invalid token');
    } else if (error.name === 'TokenExpiredError') {
      return createErrorResponse(401, 'Token expired');
    }
    
    // Generic error
    console.error('Auth middleware error:', error.message);
    return createErrorResponse(401, 'Authentication failed');
  }
} 