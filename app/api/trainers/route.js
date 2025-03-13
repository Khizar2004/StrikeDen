import { connectDB } from "@/lib/dbConnect";
import Trainer from "@/lib/Trainer";

// GET ALL TRAINERS
export async function GET() {
  try {
    await connectDB();
    const trainers = await Trainer.find({}).sort({ createdAt: -1 });
    return Response.json({ success: true, data: trainers });
  } catch (error) {
    return Response.json(
      { success: false, error: "Failed to fetch trainers" },
      { status: 500 }
    );
  }
}

// CREATE NEW TRAINER
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.specialization) {
      return Response.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newTrainer = await Trainer.create(body);
    return Response.json(
      { success: true, data: newTrainer },
      { status: 201 }
    );
    
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return Response.json(
        { success: false, error: errors.join(", ") },
        { status: 400 }
      );
    }
    return Response.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}