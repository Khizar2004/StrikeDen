import { connectDB } from "@/lib/dbConnect";
import Schedule from "@/lib/Schedule";
import Member from "@/lib/Member";
import Trainer from "@/lib/Trainer";
import Class from "@/lib/Class";
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

    // Dynamically validate class type against available classes
    const offeredClasses = await Class.find({ active: true });
    const validClassTypes = offeredClasses.map(c => c.title);
    
    if (!validClassTypes.includes(data.classType)) {
      console.log(`Invalid class type: "${data.classType}". Valid types are: ${validClassTypes.join(', ')}`);
      return NextResponse.json({
        success: false,
        message: `Invalid class type: "${data.classType}". Must be one of the offered classes.`
      }, { status: 400 });
    }

    // Create the schedule
    const newSchedule = new Schedule({
      className: data.className,
      classType: data.classType,
      dayOfWeek: data.dayOfWeek.toLowerCase(),
      startTimeString: data.startTimeString,
      endTimeString: data.endTimeString,
      trainer: data.trainer,
      capacity: data.capacity || 20, // Set default capacity if not provided
    });

    const schedule = await newSchedule.save();

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

    // If classType is provided, validate it against offered classes
    if (updateData.classType) {
      const offeredClasses = await Class.find({ active: true });
      const validClassTypes = offeredClasses.map(c => c.title);
      
      if (!validClassTypes.includes(updateData.classType)) {
        return NextResponse.json({
          success: false,
          message: `Invalid class type: "${updateData.classType}". Must be one of the offered classes.`
        }, { status: 400 });
      }
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

// The DELETE endpoint has been moved to the [id]/route.js file
// Keeping this here for backward compatibility, but it should use the more RESTful approach
export async function DELETE(request) {
  // Check admin authentication
  const authResponse = await adminAuthMiddleware(request);
  if (authResponse) return authResponse;
  
  try {
    await connectDB();
    
    // Extract id from URL query parameters
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ 
        success: false, 
        message: "Schedule ID is required" 
      }, { status: 400 });
    }
    
    const result = await Schedule.findByIdAndDelete(id);
    
    if (!result) {
      return NextResponse.json({ 
        success: false, 
        message: "Schedule not found" 
      }, { status: 404 });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Schedule deleted successfully" 
    });
    
  } catch (error) {
    console.error("Error deleting schedule:", error);
    return NextResponse.json({ 
      success: false, 
      message: error.message || "Failed to delete schedule"
    }, { status: 500 });
  }
}
