"use client";

import { useState, useCallback } from 'react';

/**
 * Custom hook for making API requests with proper CSRF protection
 */
export default function useApi() {
  const [loading, setLoading] = useState(false);  //initializes state variable with initial value of false
  const [error, setError] = useState(null);  //initializes state variable with initial value of null

  /**
   * Make an API request with CSRF token included
   */
  const request = useCallback(async (url, options = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      // Get CSRF token from session storage
      const csrfToken = sessionStorage.getItem('csrfToken');
      
      // Set up headers with CSRF token
      const headers = {
        'Content-Type': 'application/json',
        ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
        ...options.headers
      };
      
      // Add CSRF token to body for POST/PUT requests if it's JSON
      let body = options.body;
      if (
        csrfToken && 
        body && 
        (options.method === 'POST' || options.method === 'PUT' || options.method === 'DELETE' || options.method === 'PATCH')
      ) {
        if (typeof body === 'string') {
          try {
            // Parse JSON string
            const parsedBody = JSON.parse(body);
            // Add CSRF token
            parsedBody.csrfToken = csrfToken;
            // Stringify back
            body = JSON.stringify(parsedBody);
          } catch (e) {
            // Not JSON, leave as is
          }
        } else if (typeof body === 'object') {
          // If it's already an object, add CSRF token and stringify
          body = JSON.stringify({
            ...body,
            csrfToken
          });
        }
      }
      
      // Make the request
      const response = await fetch(url, {
        ...options,
        headers,
        body,
        credentials: 'include', // Always include cookies
      });
      
      // Parse the response
      const data = await response.json();
      
      // Check for errors
      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }
      
      return data;
    } catch (err) {
      setError(err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Helper methods for common HTTP methods
  const get = useCallback((url, options = {}) => {
    return request(url, { ...options, method: 'GET' });
  }, [request]);
  
  const post = useCallback((url, data, options = {}) => {
    return request(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    });
  }, [request]);
  
  const put = useCallback((url, data, options = {}) => {
    return request(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }, [request]);
  
  const del = useCallback((url, options = {}) => {
    return request(url, { ...options, method: 'DELETE' });
  }, [request]);
  
  return {
    request,
    get,
    post,
    put,
    del,
    loading,
    error
  };
} 