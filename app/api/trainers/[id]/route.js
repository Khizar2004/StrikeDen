import { connectDB } from "@/lib/dbConnect";
import Trainer from "@/lib/Trainer";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";

// GET SINGLE TRAINER
export async function GET(req, context) {
  const { params } = context;
  try {
    await connectDB();
    
    if (!ObjectId.isValid(params.id)) {
      return Response.json(
        { success: false, error: "Invalid trainer ID" },
        { status: 400 }
      );
    }

    const trainer = await Trainer.findById(params.id);
    if (!trainer) {
      return Response.json(
        { success: false, error: "Trainer not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: trainer });
    
  } catch (error) {
    return Response.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

// UPDATE TRAINER
export async function PUT(req, context) {
  const { params } = context;
  try {
    await connectDB();
    const body = await req.json();

    if (!ObjectId.isValid(params.id)) {
      return Response.json(
        { success: false, error: "Invalid trainer ID" },
        { status: 400 }
      );
    }

    const updatedTrainer = await Trainer.findByIdAndUpdate(
      params.id,
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
    return Response.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

// DELETE TRAINER
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    if (!ObjectId.isValid(params.id)) {
      return Response.json(
        { success: false, error: "Invalid trainer ID" },
        { status: 400 }
      );
    }

    const deletedTrainer = await Trainer.findByIdAndDelete(params.id);
    
    if (!deletedTrainer) {
      return Response.json(
        { success: false, error: "Trainer not found" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: "Trainer deleted successfully"
    });
    
  } catch (error) {
    return Response.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}