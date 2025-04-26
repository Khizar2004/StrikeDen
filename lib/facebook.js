/**
 * Facebook tracking utilities for both Meta Pixel and Conversions API
 */

/**
 * Track an event via both Facebook Pixel and Conversions API
 * @param {string} eventName - Standard Facebook event name (e.g. 'PageView', 'Contact', etc.)
 * @param {Object} eventData - Additional event data (optional)
 */
export async function trackFacebookEvent(eventName, eventData = {}) {
  try {
    // Client-side tracking via Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', eventName, eventData);
    }
    
    // Server-side tracking via Conversions API
    await fetch('/api/facebook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventName,
        eventData
      }),
    });
  } catch (error) {
    console.error('Error tracking Facebook event:', error);
  }
}

/**
 * Standard Facebook events for reference
 */
export const FB_EVENTS = {
  PAGE_VIEW: 'PageView',
  VIEW_CONTENT: 'ViewContent', 
  CONTACT: 'Contact',
  COMPLETE_REGISTRATION: 'CompleteRegistration',
  SEARCH: 'Search',
  ADD_TO_WISHLIST: 'AddToWishlist',
  FIND_LOCATION: 'FindLocation',
}; 