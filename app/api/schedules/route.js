import { connectDB } from "@/lib/dbConnect";
import Schedule from "@/lib/Schedule";
import Member from "@/lib/Member";
import Trainer from "@/lib/Trainer";
import { NextResponse } from 'next/server';
import { adminAuthMiddleware } from "@/lib/middleware";

// GET schedules (public endpoint)
export async function GET() {
  try {
    await connectDB();
    // Get all schedules sorted by day of week and start time, and populate the trainer field
    const schedules = await Schedule.find({})
      .populate('trainer')
      .sort({ dayOfWeek: 1, startTimeString: 1 });
    return NextResponse.json({ success: true, data: schedules });
  } catch (error) {
    console.error("Error fetching schedules:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// POST new schedule (protected endpoint)
export async function POST(request) {
  // Check admin authentication
  const authResponse = await adminAuthMiddleware(request);
  if (authResponse) return authResponse;
  
  try {
    await connectDB();
    
    const data = await request.json();
    console.log("API received data:", data);

    // Validate required fields
    const requiredFields = ['className', 'classType', 'dayOfWeek', 'startTimeString', 'endTimeString', 'trainer'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      }, { status: 400 });
    }

    // Validate time format
    const timeFormatRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeFormatRegex.test(data.startTimeString) || !timeFormatRegex.test(data.endTimeString)) {
      return NextResponse.json({
        success: false,
        message: "Start and end times must be in format HH:MM (24-hour)"
      }, { status: 400 });
    }

    // Validate day of week
    const validDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    if (!validDays.includes(data.dayOfWeek.toLowerCase())) {
      return NextResponse.json({
        success: false,
        message: "Invalid day of week. Must be one of: " + validDays.join(', ')
      }, { status: 400 });
    }

    // Validate class type
    const validClassTypes = ['Boxing', 'Brazilian Jiu-Jitsu', 'Muay Thai', 'Wrestling', 'MMA', 'Conditioning', 'Kickboxing', 'Taekwondo', 'Judo'];
    if (!validClassTypes.includes(data.classType)) {
      return NextResponse.json({
        success: false,
        message: "Invalid class type. Must be one of: " + validClassTypes.join(', ')
      }, { status: 400 });
    }

    // Create the schedule
    const schedule = await Schedule.create({
      className: data.className,
      classType: data.classType,
      dayOfWeek: data.dayOfWeek.toLowerCase(),
      startTimeString: data.startTimeString,
      endTimeString: data.endTimeString,
      trainer: data.trainer,
      description: data.description || '',
      capacity: data.capacity || 20
    });

    return NextResponse.json({ success: true, data: schedule });
  } catch (error) {
    console.error("Error creating schedule:", error);
    return NextResponse.json({ 
      success: false, 
      message: error.message || "Failed to create schedule",
      error: process.env.NODE_ENV === 'development' ? error.toString() : undefined
    }, { status: 500 });
  }
}

// PUT/update schedule (protected endpoint)
export async function PUT(req) {
  // Check admin authentication
  const authResponse = await adminAuthMiddleware(req);
  if (authResponse) return authResponse;
  
  try {
    await connectDB();
    const data = await req.json();
    const { id, ...updateData } = data;

    // If dayOfWeek is provided, ensure it's lowercase
    if (updateData.dayOfWeek) {
      updateData.dayOfWeek = updateData.dayOfWeek.toLowerCase();
    }

    const schedule = await Schedule.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('trainer');

    if (!schedule) {
      return NextResponse.json(
        { success: false, message: 'Schedule not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, schedule });
  } catch (error) {
    console.error("Error updating schedule:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update schedule" },
      { status: 400 }
    );
  }
}

// DELETE schedule (protected endpoint)
export async function DELETE(request) {
  // Check admin authentication
  const authResponse = await adminAuthMiddleware(request);
  if (authResponse) return authResponse;
  
  try {
    await connectDB();
    
    // Extract id from URL query parameters instead of trying to parse JSON body
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ success: false, message: "Schedule ID is required" }, { status: 400 });
    }
    
    const result = await Schedule.findByIdAndDelete(id);
    
    if (!result) {
      return NextResponse.json({ success: false, message: "Schedule not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: "Schedule deleted successfully" });
    
  } catch (error) {
    console.error("Error deleting schedule:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
