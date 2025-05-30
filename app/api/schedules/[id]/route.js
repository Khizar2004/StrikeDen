import { connectDB } from "@/lib/dbConnect";
import Schedule from "@/lib/Schedule";
import Class from "@/lib/Class";
import { NextResponse } from 'next/server';
import { adminAuthMiddleware } from "@/lib/middleware";
import { createSuccessResponse, createErrorResponse, handleApiError } from "@/lib/apiResponse";

// GET single schedule by ID
export async function GET(request, { params }) {
  try {
    await connectDB();
    // Extract id after awaiting params
    const id = params.id;
    
    const schedule = await Schedule.findById(id).populate('trainer');
    
    if (!schedule) {
      return NextResponse.json(
        { success: false, message: "Schedule not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: schedule });
  } catch (error) {
    console.error("Error fetching schedule:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch schedule" },
      { status: 500 }
    );
  }
}

// DELETE schedule by ID
export async function DELETE(request, { params }) {
  // Check admin authentication
  const authResponse = await adminAuthMiddleware(request);
  if (authResponse) return authResponse;
  
  try {
    await connectDB();
    // Extract id after awaiting params
    const id = params.id;
    
    const schedule = await Schedule.findByIdAndDelete(id);
    
    if (!schedule) {
      return NextResponse.json(
        { success: false, message: "Schedule not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Schedule deleted successfully" 
    });
    
  } catch (error) {
    console.error("Error deleting schedule:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete schedule" },
      { status: 500 }
    );
  }
}

// UPDATE schedule by ID
export async function PUT(request, { params }) {
  // Check admin authentication
  const authResponse = await adminAuthMiddleware(request);
  if (authResponse) return authResponse;
  
  try {
    await connectDB();
    // Extract id after awaiting params
    const id = params.id;
    
    const body = await request.json();
    
    // If dayOfWeek is provided, ensure it's lowercase
    if (body.dayOfWeek) {
      body.dayOfWeek = body.dayOfWeek.toLowerCase();
    }
    
    // If trainer is an empty string, set it to null
    if (body.trainer === '') {
      body.trainer = null;
    }
    
    // If classType is provided, validate it against offered classes
    if (body.classType) {
      const offeredClasses = await Class.find({ active: true });
      const validClassTypes = offeredClasses.map(c => c.title);
      
      if (!validClassTypes.includes(body.classType)) {
        return NextResponse.json({
          success: false,
          message: `Invalid class type: "${body.classType}". Must be one of the offered classes.`
        }, { status: 400 });
      }
    }
    
    const schedule = await Schedule.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    ).populate('trainer');
    
    if (!schedule) {
      return NextResponse.json(
        { success: false, message: "Schedule not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: schedule });
    
  } catch (error) {
    console.error("Error updating schedule:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update schedule" },
      { status: 400 }
    );
  }
}
