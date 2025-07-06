/**
 * Utility functions for creating consistent API responses
 */
/**
 * Create a success response
 * @param {object} data - The data to return
 * @param {number} status - HTTP status code (default: 200)
 * @returns {Response} - JSON Response object
 */

/*
Instead of writing this in every API route:
return Response.json({ success: true, data: classes }, { status: 200 });

You can just write:
return createSuccessResponse(classes, 200);
*/

export function createSuccessResponse(data, status = 200) {
  return Response.json({
    success: true,
    data
  }, { status });
}

/**
 * Create an error response
 * @param {string} message - Error message
 * @param {number} status - HTTP status code (default: 400)
 * @returns {Response} - JSON Response object
 */
export function createErrorResponse(message, status = 400) {
  return Response.json({
    success: false,
    error: message
  }, { status });
}

/**
 * Handle common API errors and return appropriate responses
 * @param {Error} error - The error object
 * @returns {Response} - JSON Response object
 */
export function handleApiError(error) {
  console.error('API Error:', error);

  // Handle Mongoose validation errors
  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map(e => e.message);
    return createErrorResponse(errors.join(', '), 400);
  }
  
  // Handle MongoDB duplicate key errors
  if (error.code === 11000) {
    return createErrorResponse('Duplicate entry', 409);
  }
  
  // Handle JWT errors
  if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
    return createErrorResponse('Authentication failed', 401);
  }

  // Default server error
  return createErrorResponse(
    process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : error.message,
    500
  );
} 