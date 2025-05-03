import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { validateToken, extractCsrfToken } from '@/lib/csrf';

// Get JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// Methods that require CSRF protection
const CSRF_PROTECTED_METHODS = ['POST', 'PUT', 'DELETE', 'PATCH'];

// Routes that are exempt from CSRF protection
const UNPROTECTED_ROUTES = [
  '/api/auth/login',
  '/api/auth/check-auth',
  '/api/upload/blob'
];

// Check if a route should be protected
export async function isProtectedRoute(route) {
  // Extract path from full URL if needed
  const url = new URL(route, 'http://localhost');
  const path = url.pathname;
  
  return !UNPROTECTED_ROUTES.includes(path);
}

// Middleware for CSRF protection
export async function csrfProtection(request) {
  // Only protect state-changing methods
  if (!CSRF_PROTECTED_METHODS.includes(request.method)) {
    return null; // No protection needed for GET, OPTIONS, etc.
  }
  
  try {
    // Skip CSRF check for login and public endpoints
    const path = new URL(request.url).pathname;
    if (UNPROTECTED_ROUTES.includes(path)) {
      return null;
    }
    
    // Get user from cookie
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Verify the JWT token
    let sessionId;
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      sessionId = decoded.jti; // Use the full JTI as session ID
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'Invalid auth token' },
        { status: 403 }
      );
    }

    // Clone request to get the JSON body for extraction
    const requestClone = request.clone();
    let jsonBody;
    try {
      jsonBody = await requestClone.json().catch(() => ({}));
    } catch (e) {
      jsonBody = {};
    }

    // Create a compatible request object for extractCsrfToken
    const compatRequest = {
      headers: request.headers,
      body: jsonBody
    };
    
    // Extract CSRF token using the shared utility function
    const requestToken = extractCsrfToken(compatRequest);
    
    // Verify CSRF token with full sessionId
    const isValidToken = await validateToken(sessionId, requestToken);
    
    if (!isValidToken) {
      console.warn('Invalid CSRF token detected');
      return NextResponse.json(
        { success: false, message: 'Invalid or missing CSRF token' },
        { status: 403 }
      );
    }
    
    return null; // CSRF check passed
  } catch (error) {
    console.error('CSRF check error:', error);
    return NextResponse.json(
      { success: false, message: 'Security check failed' },
      { status: 403 }
    );
  }
}

// Helper that can be used in API route handlers
export async function validateCsrfRequest(request, options = {}) {
  // Option to provide sessionId directly (from route handler)
  const { sessionId: providedSessionId } = options;
  
  if (providedSessionId) {
    // Clone request to get the JSON body for extraction
    const requestClone = request.clone();
    let jsonBody;
    try {
      jsonBody = await requestClone.json().catch(() => ({}));
    } catch (e) {
      jsonBody = {};
    }

    // Create a compatible request object for extractCsrfToken
    const compatRequest = {
      headers: request.headers,
      body: jsonBody
    };
    
    // Use the shared token extraction utility
    const requestToken = extractCsrfToken(compatRequest);
    return await validateToken(providedSessionId, requestToken);
  }
  
  // Standard CSRF check
  const csrfError = await csrfProtection(request);
  return csrfError === null;
} 