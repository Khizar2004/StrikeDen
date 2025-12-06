import { connectDB } from "@/lib/dbConnect";
import Trainer from "@/lib/Trainer";
import { adminAuthMiddleware } from "@/lib/middleware";
import { createSuccessResponse, createErrorResponse, handleApiError } from "@/lib/apiResponse";
import { unstable_cache as cache, revalidateTag } from "next/cache";

const getTrainersCached = cache(
  async () => {
    await connectDB();
    return Trainer.find({}).sort({ createdAt: -1 }).lean();
  },
  ["trainers:list"],
  { tags: ["trainers"] }
);

// GET ALL TRAINERS (public endpoint)
export async function GET() {
  try {
    const trainers = await getTrainersCached();
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
    if (!body.name) {
      return createErrorResponse("Trainer name is required", 400);
    }
    
    // Validate specialization(s)
    if (!body.specialization || 
        (Array.isArray(body.specialization) && body.specialization.length === 0) ||
        (!Array.isArray(body.specialization) && !body.specialization.trim())) {
      return createErrorResponse("At least one specialization is required", 400);
    }
    
    // Convert single specialization to array for consistency
    if (!Array.isArray(body.specialization)) {
      body.specialization = [body.specialization];
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
    revalidateTag("trainers");
    return createSuccessResponse(newTrainer, 201);
    
  } catch (error) {
    return handleApiError(error);
  }
}
