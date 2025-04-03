import { connectDB } from "@/lib/dbConnect";
import Trainer from "@/lib/Trainer";
import { adminAuthMiddleware } from "@/lib/middleware";
import { createSuccessResponse, createErrorResponse, handleApiError } from "@/lib/apiResponse";

// GET ALL TRAINERS (public endpoint)
export async function GET() {
  try {
    await connectDB();
    const trainers = await Trainer.find({}).sort({ createdAt: -1 });
    return createSuccessResponse(trainers);
  } catch (error) {
    return handleApiError(error);
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
      return createErrorResponse("Missing required fields", 400);
    }

    // Validate image URL if present
    if (body.image && typeof body.image === 'string') {
      const isValidPath = body.image.startsWith('/uploads/');
      const isValidUrl = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(body.image);
      
      if (body.image && !(isValidPath || isValidUrl)) {
        return createErrorResponse("Invalid image URL format", 400);
      }
    }

    const newTrainer = await Trainer.create(body);
    return createSuccessResponse(newTrainer, 201);
    
  } catch (error) {
    return handleApiError(error);
  }
}