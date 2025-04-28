import crypto from 'crypto';
import redis from './redis';

// Token expiry time in seconds (1 hour)
const CSRF_TOKEN_EXPIRY = 3600;

// Generate a secure random token
export function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Store a CSRF token in Redis with user session ID as part of the key
export async function storeToken(sessionId, token) {
  const key = `csrf:${sessionId}`;
  await redis.set(key, token, 'EX', CSRF_TOKEN_EXPIRY);
  return token;
}

// Validate a CSRF token
export async function validateToken(sessionId, token) {
  if (!sessionId || !token) {
    return false;
  }
  
  try {
    const key = `csrf:${sessionId}`;
    const storedToken = await redis.get(key);
    
    // Use constant-time comparison to prevent timing attacks
    return storedToken && crypto.timingSafeEqual(
      Buffer.from(token),
      Buffer.from(storedToken)
    );
  } catch (error) {
    console.error('CSRF validation error:', error);
    return false;
  }
}

// Create a new CSRF token for a user session
export async function createCsrfToken(sessionId) {
  const token = generateToken();
  await storeToken(sessionId, token);
  return token;
}

// Get a token from various request formats
export function extractCsrfToken(req) {
  // From headers
  if (req.headers && req.headers['x-csrf-token']) {
    return req.headers['x-csrf-token'];
  }
  
  // From request headers object (Next.js API routes)
  if (req.headers && req.headers.get && req.headers.get('x-csrf-token')) {
    return req.headers.get('x-csrf-token');
  }
  
  // From request body if JSON
  if (req.body && req.body.csrfToken) {
    return req.body.csrfToken;
  }
  
  return null;
}

// Middleware to verify CSRF tokens for API routes
export async function verifyCsrfToken(req) {
  // Get the session identifier from the admin token
  const sessionId = req.cookies?.admin_token?.slice(-10) || '';
  
  // Get the token from request headers or body
  let requestToken = req.headers['x-csrf-token'] || '';
  
  // If no token in headers, try to get from body
  if (!requestToken && req.body) {
    // For JSON bodies
    if (typeof req.body === 'object' && req.body.csrfToken) {
      requestToken = req.body.csrfToken;
    }
    // For FormData requests
    else if (req.body.csrfToken) {
      requestToken = req.body.csrfToken;
    }
  }
  
  // Validate the token
  const isValid = await validateToken(sessionId, requestToken);
  
  return isValid;
} 