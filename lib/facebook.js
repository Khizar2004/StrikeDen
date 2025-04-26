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
    // Extract or initialize custom data for the event
    const customData = eventData.customData || eventData || {};
    
    // Client-side tracking via Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      // Use customData for pixel events
      window.fbq('track', eventName, customData);
      console.log(`Facebook Pixel event tracked: ${eventName}`);
    }
    
    // Prepare structured data for server-side API
    const serverEventData = {
      sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
      customData,
      userData: eventData.userData || {}
    };
    
    // Server-side tracking via Conversions API (with 3s timeout)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      console.log('Attempting to call server-side Conversions API');
      const response = await fetch('/api/facebook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventName,
          eventData: serverEventData
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        // Log error but don't throw - this prevents breaking the user experience
        try {
          const errorData = await response.json();
          console.error(`Conversions API error (${response.status}):`, errorData);
        } catch (parseError) {
          const errorText = await response.text();
          console.error(`Conversions API error (${response.status}):`, errorText);
        }
      } else {
        const result = await response.json();
        console.log('Conversions API event tracked successfully:', result);
      }
    } catch (serverError) {
      // If server tracking fails, log the error but don't break the client experience
      if (serverError.name === 'AbortError') {
        console.error('Conversions API request timed out');
      } else {
        console.error('Error with Conversions API:', serverError.message);
      }
    }
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