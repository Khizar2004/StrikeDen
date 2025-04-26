import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the response
  const response = NextResponse.next();
  
  // Add security headers
  const headers = response.headers;
  
  // Security headers
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('X-XSS-Protection', '1; mode=block');
  
  // Content Security Policy - Customize based on your needs
  headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://connect.facebook.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://graph.facebook.com;"
  );
  
  // Set strict transport security header in production
  if (process.env.NODE_ENV === 'production') {
    headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
  }
  
  // Only add CORS headers for API routes when needed for cross-origin requests
  if (request.nextUrl.pathname.startsWith('/api')) {
    const origin = request.headers.get('origin');
    
    // Skip CORS headers for same-origin requests
    const host = request.headers.get('host');
    const isExternalOrigin = origin && !origin.includes(host || '');
    
    // Only set CORS headers for external origins
    if (isExternalOrigin) {
      if (process.env.NODE_ENV === 'production') {
        // In production, only allow your specific domains
        const allowedOrigins = [
          process.env.NEXT_PUBLIC_SITE_URL || '',  // Your main site URL
          'https://strikeden.vercel.app'           // Your Vercel deployment URL
        ];
        
        if (allowedOrigins.includes(origin || '')) {
          headers.set('Access-Control-Allow-Origin', origin || '');
        }
      } else {
        // In development, be more permissive
        headers.set('Access-Control-Allow-Origin', '*');
      }
      
      // Standard CORS headers
      headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      headers.set('Access-Control-Max-Age', '86400');
      
      // Handle OPTIONS requests for CORS preflight
      if (request.method === 'OPTIONS') {
        return new NextResponse(null, { status: 204, headers });
      }
    }
  }
  
  return response;
}

// Only run middleware on the following paths (customize as needed)
export const config = {
  matcher: [
    // Apply to all API routes
    '/api/:path*',
    // Apply to admin routes (for auth protection)
    '/admin/:path*'
  ],
}; 