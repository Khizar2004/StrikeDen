import crypto from 'crypto';
import redis from './redis';

/*
csrf.js – CSRF protection for admin routes:
- Generates 64-char hex tokens, stores in Redis (1h TTL) with memory fallback
- Extracts tokens from headers/body/form and ties them to admin JWT
- Validates tokens in constant time on POST/PUT/DELETE requests
*/

// Token expiry time in seconds (1 hour)
const CSRF_TOKEN_EXPIRY = 3600;

// Memory fallback for tokens if Redis fails
const tokenStore = new Map();

// Generate a secure random token
export function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Store a CSRF token in Redis with user session ID as part of the key
export async function storeToken(sessionId, token) {
  try {
    const key = `csrf:${sessionId}`;
    await redis.set(key, token, 'EX', CSRF_TOKEN_EXPIRY);
    
    // Also store in memory as fallback
    tokenStore.set(key, {
      token,
      expires: Date.now() + (CSRF_TOKEN_EXPIRY * 1000)
    });
    
    return token;
  } catch (error) {
    console.warn('Redis storeToken error, using memory fallback:', error);
    
    // Store in memory fallback
    const key = `csrf:${sessionId}`;
    tokenStore.set(key, {
      token,
      expires: Date.now() + (CSRF_TOKEN_EXPIRY * 1000)
    });
    
    return token;
  }
}

// Validate a CSRF token
export async function validateToken(sessionId, token) {
  if (!sessionId || !token) {
    return false;
  }
  
  try {
    const key = `csrf:${sessionId}`;
    
    // Try Redis first
    try {
      const storedToken = await redis.get(key);
      
      if (storedToken) {
        // Use constant-time comparison to prevent timing attacks
        return crypto.timingSafeEqual(
          Buffer.from(token),
          Buffer.from(storedToken)
        );
      }
    } catch (redisError) {
      console.warn('Redis validateToken error, trying memory fallback:', redisError);
    }
    
    // Try memory fallback if Redis failed or returned no token
    const memoryData = tokenStore.get(key);
    if (memoryData && memoryData.expires > Date.now()) {
      // Clean up expired tokens periodically
      for (const [key, data] of tokenStore.entries()) {
        if (data.expires <= Date.now()) {
          tokenStore.delete(key);
        }
      }
      
      // Use constant-time comparison
      return crypto.timingSafeEqual(
        Buffer.from(token),
        Buffer.from(memoryData.token)
      );
    }
    
    return false;
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