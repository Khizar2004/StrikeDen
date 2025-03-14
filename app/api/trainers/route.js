import { connectDB } from "@/lib/dbConnect";
import Trainer from "@/lib/Trainer";
import { adminAuthMiddleware } from "@/lib/middleware";

// GET ALL TRAINERS (public endpoint)
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

// CREATE NEW TRAINER (protected endpoint)
export async function POST(request) {
  // Check admin authentication
  const authResponse = await adminAuthMiddleware(request);
  if (authResponse) return authResponse;
  
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