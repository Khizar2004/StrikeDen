import { connectDB } from "@/lib/dbConnect";
import { adminAuthMiddleware } from "@/lib/middleware";
import Trainer from "@/lib/Trainer";
import Schedule from "@/lib/Schedule";
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

// GET SINGLE TRAINER
export async function GET(request, context) {
  try {
    await connectDB();
    
    // Get the ID safely - await params in Next.js 15+
    const params = await context.params;
    const { id } = params || {};
    
    if (!ObjectId.isValid(id)) {
      return Response.json(
        { success: false, error: "Invalid trainer ID" },
        { status: 400 }
      );
    }

    const trainer = await Trainer.findById(id);
    if (!trainer) {
      return Response.json(
        { success: false, error: "Trainer not found" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      data: trainer
    });
    
  } catch (error) {
    console.error("Error fetching trainer:", error);
    return Response.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

// UPDATE TRAINER
export async function PUT(request, context) {
  const authResponse = await adminAuthMiddleware(request);
  if (authResponse) return authResponse;

  try {
    await connectDB();
    const body = await request.json();
    
    // Get the ID safely - await params in Next.js 15+
    const params = await context.params;
    const { id } = params || {};

    if (!ObjectId.isValid(id)) {
      return Response.json(
        { success: false, error: "Invalid trainer ID" },
        { status: 400 }
      );
    }
    
    // Validate required fields
    if (!body.name) {
      return Response.json(
        { success: false, error: "Trainer name is required" },
        { status: 400 }
      );
    }
    
    // Validate specialization(s)
    if (!body.specialization || 
        (Array.isArray(body.specialization) && body.specialization.length === 0) ||
        (!Array.isArray(body.specialization) && !body.specialization.trim())) {
      return Response.json(
        { success: false, error: "At least one specialization is required" },
        { status: 400 }
      );
    }
    
    // Convert single specialization to array for consistency
    if (!Array.isArray(body.specialization)) {
      body.specialization = [body.specialization];
    }

    const updatedTrainer = await Trainer.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!updatedTrainer) {
      return Response.json(
        { success: false, error: "Trainer not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: updatedTrainer });
    
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return Response.json(
        { success: false, error: errors.join(", ") },
        { status: 400 }
      );
    }
    console.error("Error updating trainer:", error);
    return Response.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

// DELETE TRAINER
export async function DELETE(request, context) {
  const authResponse = await adminAuthMiddleware(request);
  if (authResponse) return authResponse;

  try {
    await connectDB();
    
    // Get the ID safely - await params in Next.js 15+
    const params = await context.params;
    const { id } = params || {};

    if (!ObjectId.isValid(id)) {
      return Response.json(
        { success: false, error: "Invalid trainer ID" },
        { status: 400 }
      );
    }

    // Find the trainer first to make sure it exists
    const trainer = await Trainer.findById(id);
    
    if (!trainer) {
      return Response.json(
        { success: false, error: "Trainer not found" },
        { status: 404 }
      );
    }

    // Find and delete all schedules that reference this trainer
    const deletedSchedules = await Schedule.deleteMany({ trainer: id });
    console.log(`Deleted ${deletedSchedules.deletedCount} schedule entries for trainer ${id}`);

    // Now delete the trainer
    await Trainer.findByIdAndDelete(id);

    return Response.json({
      success: true,
      message: "Trainer and associated schedules deleted successfully",
      deletedSchedulesCount: deletedSchedules.deletedCount
    });
    
  } catch (error) {
    console.error("Error in trainer deletion:", error);
    return Response.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}