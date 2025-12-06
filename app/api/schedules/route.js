import { connectDB } from "@/lib/dbConnect";
import Schedule from "@/lib/Schedule";
import Trainer from "@/lib/Trainer";
import Class from "@/lib/Class";
import { NextResponse } from 'next/server';
import { adminAuthMiddleware } from "@/lib/middleware";
import { unstable_cache as cache, revalidateTag } from 'next/cache';

const getSchedulesCached = cache(
  async () => {
    await connectDB();
    return Schedule.find({})
      .populate('trainer')
      .sort({ dayOfWeek: 1, startTimeString: 1 })
      .lean();
  },
  ['schedules:list'],
  { tags: ['schedules', 'trainers'] }
);

// GET schedules (public endpoint)
export async function GET() {
  try {
    const schedules = await getSchedulesCached();
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

    // Validate required fields
    const requiredFields = ['className', 'classType', 'dayOfWeek', 'startTimeString', 'endTimeString'];
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
      trainer: data.trainer || null,
      capacity: data.capacity // Schema default will be used if not provided
    });

    const schedule = await newSchedule.save();

    // Bust cached schedules (and trainer schedule cache)
    revalidateTag('schedules');
    revalidateTag('trainers');

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
