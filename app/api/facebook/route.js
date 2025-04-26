import { NextResponse } from 'next/server';

/**
 * Handle Facebook Conversions API server-side events
 * @param {Request} request
 */
export async function POST(request) {
  try {
    const data = await request.json();
    const { eventName, eventData } = data;
    
    if (!eventName) {
      return NextResponse.json({ success: false, error: 'Event name is required' }, { status: 400 });
    }

    // Prepare the payload for Facebook Conversions API
    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
          ...eventData
        }
      ],
      access_token: process.env.FB_ACCESS_TOKEN
    };

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
      console.error('Facebook API error:', result);
      return NextResponse.json({ success: false, error: result }, { status: 500 });
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Error sending event to Facebook:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
} 