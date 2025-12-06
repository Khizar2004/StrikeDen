import { connectDB } from "@/lib/dbConnect";
import Schedule from "@/lib/Schedule";
import Trainer from "@/lib/Trainer";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { unstable_cache as cache } from "next/cache";

export const dynamic = "force-dynamic";

const getTrainerSchedulesCached = cache(
  async (id) => {
    await connectDB();
    const trainer = await Trainer.findById(id).lean();
    if (!trainer) {
      return { trainer: null, schedules: null };
    }

    const schedules = await Schedule.find({ trainer: id })
      .sort({ dayOfWeek: 1, startTimeString: 1 })
      .lean();

    return { trainer, schedules };
  },
  ["trainer-schedules:by-id"],
  { tags: ["schedules", "trainers"] }
);

// GET schedules for a specific trainer by ID
export async function GET(request, context) {
  try {
    const id = context.params.id;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid trainer ID format" },
        { status: 400 }
      );
    }
    
    const { trainer, schedules } = await getTrainerSchedulesCached(id);

    if (!trainer) {
      return NextResponse.json(
        { success: false, message: "Trainer not found" },
        { status: 404 }
      );
    }
      
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
