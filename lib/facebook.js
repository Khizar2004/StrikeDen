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
    // Validate event name and standardize
    const standardEvent = validateAndFormatEvent(eventName);
    
    // Prepare the appropriate event parameters
    const eventParams = prepareEventParameters(standardEvent, eventData);
    
    // Client-side tracking via Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', standardEvent, eventParams.customData);
      console.log(`Facebook Pixel event tracked: ${standardEvent}`);
    }
    
    // Prepare structured data for server-side API
    const serverEventData = {
      sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
      customData: eventParams.customData,
      userData: eventParams.userData
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
          eventName: standardEvent,
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
 * Validate and format the event name to ensure it matches Facebook standards
 * @param {string} eventName - The event name to validate
 * @returns {string} - The standardized event name
 */
function validateAndFormatEvent(eventName) {
  if (!eventName) {
    throw new Error('Event name is required');
  }

  // Check if it's one of our predefined events
  const stdEventName = FB_EVENTS[eventName] || eventName;
  
  // List of all valid Facebook standard events
  const validEvents = Object.values(FB_EVENTS);
  
  // If it's not a standard event and not a custom event (has "Custom" prefix)
  if (!validEvents.includes(stdEventName) && !stdEventName.startsWith('Custom')) {
    console.warn(`Warning: "${stdEventName}" may not be a standard Facebook event name`);
  }
  
  return stdEventName;
}

/**
 * Prepare event parameters based on the event type
 * @param {string} eventName - Standard Facebook event name
 * @param {Object} eventData - Raw event data
 * @returns {Object} - Properly formatted event parameters
 */
function prepareEventParameters(eventName, eventData = {}) {
  // Initialize with empty objects
  const params = {
    customData: {},
    userData: {}
  };
  
  // Extract userData if provided
  if (eventData.userData) {
    params.userData = eventData.userData;
  }
  
  // Extract or initialize custom data
  const customData = eventData.customData || eventData || {};
  
  // Common parameters that apply to multiple events
  if (customData.value) {
    params.customData.value = Number(customData.value);
  }
  
  if (customData.currency) {
    params.customData.currency = customData.currency;
  }
  
  // Add specific parameters based on event type
  switch (eventName) {
    case FB_EVENTS.PAGE_VIEW:
      // PageView typically doesn't need additional data
      break;
      
    case FB_EVENTS.VIEW_CONTENT:
      // Required for e-commerce - content_ids, content_type
      if (customData.content_ids) {
        params.customData.content_ids = Array.isArray(customData.content_ids) 
          ? customData.content_ids 
          : [customData.content_ids];
      }
      
      if (customData.content_type) {
        params.customData.content_type = customData.content_type;
      } else {
        params.customData.content_type = 'product';
      }
      
      if (customData.content_name) {
        params.customData.content_name = customData.content_name;
      }
      
      if (customData.content_category) {
        params.customData.content_category = customData.content_category;
      }
      
      // Add fbc parameter for improved match quality
      if (typeof window !== 'undefined') {
        // Try to get fbc from cookie
        const fbcCookie = document.cookie.split(';').find(c => c.trim().startsWith('_fbc='));
        if (fbcCookie) {
          params.userData.fbc = fbcCookie.split('=')[1];
        } else {
          // Try to extract from URL parameters (for direct clicks from FB ads)
          const urlParams = new URLSearchParams(window.location.search);
          const fbclid = urlParams.get('fbclid');
          if (fbclid) {
            // Format: fb.1.{timestamp}.{fbclid}
            const timestamp = Math.floor(Date.now() / 1000);
            params.userData.fbc = `fb.1.${timestamp}.${fbclid}`;
          }
        }
      }
      break;
      
    case FB_EVENTS.SEARCH:
      if (customData.search_string) {
        params.customData.search_string = customData.search_string;
      }
      break;
      
    case FB_EVENTS.ADD_TO_WISHLIST:
      // Similar to ViewContent, but for wishlist actions
      if (customData.content_ids) {
        params.customData.content_ids = Array.isArray(customData.content_ids) 
          ? customData.content_ids 
          : [customData.content_ids];
      }
      
      if (customData.content_type) {
        params.customData.content_type = customData.content_type;
      } else {
        params.customData.content_type = 'product';
      }
      break;
      
    case FB_EVENTS.CONTACT:
      // Contact form submissions - can include form details
      if (customData.content_name) {
        params.customData.content_name = customData.content_name;
      }
      
      if (customData.content_category) {
        params.customData.content_category = customData.content_category;
      }
      break;
      
    case FB_EVENTS.COMPLETE_REGISTRATION:
      // Registration completion - status and method are useful
      if (customData.status) {
        params.customData.status = customData.status;
      }
      
      if (customData.method) {
        params.customData.method = customData.method;
      }
      break;
      
    case FB_EVENTS.FIND_LOCATION:
      // Store locator or similar functionality
      if (customData.content_category) {
        params.customData.content_category = customData.content_category;
      }
      break;
      
    default:
      // For custom events or other standard events, pass through all data
      Object.assign(params.customData, customData);
  }
  
  return params;
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