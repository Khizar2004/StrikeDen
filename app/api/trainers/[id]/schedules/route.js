import { connectDB } from "@/lib/dbConnect";
import Schedule from "@/lib/Schedule";
import Trainer from "@/lib/Trainer";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// GET schedules for a specific trainer by ID
export async function GET(request, context) {
  try {
    await connectDB();
    // Get the ID directly from context - await params in Next.js 15+
    const params = await context.params;
    const id = params.id;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid trainer ID format" },
        { status: 400 }
      );
    }
    
    // Check if trainer exists
    const trainer = await Trainer.findById(id);
    if (!trainer) {
      return NextResponse.json(
        { success: false, message: "Trainer not found" },
        { status: 404 }
      );
    }
    
    // Get all schedules for this trainer sorted by day of week and start time
    const schedules = await Schedule.find({ trainer: id })
      .sort({ dayOfWeek: 1, startTimeString: 1 });
      
    return NextResponse.json({ 
      success: true, 
      data: schedules 
    });
    
  } catch (error) {
    console.error("Error fetching trainer schedules:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch trainer schedules" },
      { status: 500 }
    );
  }
} 