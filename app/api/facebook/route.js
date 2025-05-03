import { NextResponse } from 'next/server';

/**
 * Handle Facebook Conversions API server-side events
 * @param {Request} request
 */
export async function POST(request) {
  try {
    const data = await request.json();
    const { eventName, eventData = {} } = data;
    
    if (!eventName) {
      return NextResponse.json({ success: false, error: 'Event name is required' }, { status: 400 });
    }

    // Check if the required environment variables are set
    if (!process.env.FB_ACCESS_TOKEN || !process.env.NEXT_PUBLIC_FB_PIXEL_ID) {
      console.error('Missing Facebook environment variables');
      return NextResponse.json(
        { success: false, error: 'Facebook configuration is incomplete' }, 
        { status: 500 }
      );
    }

    // Prepare event data with required fields
    const eventTime = Math.floor(Date.now() / 1000);
    
    // Create basic event payload
    const eventPayload = {
      event_name: eventName,
      event_time: eventTime,
      action_source: "website",
    };
    
    // Add event_source_url if available
    if (eventData.sourceUrl) {
      eventPayload.event_source_url = eventData.sourceUrl;
    }
    
    // Add user_data if available (required for some events)
    if (eventData.userData && Object.keys(eventData.userData).length > 0) {
      eventPayload.user_data = eventData.userData;
    } else {
      // Provide minimal user data if none is provided
      eventPayload.user_data = {
        client_user_agent: request.headers.get('user-agent') || '',
        client_ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1'
      };
    }
    
    // Add custom_data if available
    if (eventData.customData && Object.keys(eventData.customData).length > 0) {
      eventPayload.custom_data = eventData.customData;
    }
    
    // Prepare the payload for Facebook Conversions API
    const payload = {
      data: [eventPayload],
      access_token: process.env.FB_ACCESS_TOKEN
    };

    console.log(`Sending Facebook event: ${eventName}`);

    // Send to Facebook Conversions API
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${process.env.NEXT_PUBLIC_FB_PIXEL_ID}/events`, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();
    
    if (!response.ok) {
      console.error('Facebook API error:', result.error?.message || 'Unknown error');
      return NextResponse.json({ success: false, error: result }, { status: 500 });
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Error sending event to Facebook:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
} 