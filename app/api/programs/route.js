import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/dbConnect';
import { adminAuthMiddleware } from "@/lib/middleware";
import Program from '@/lib/Program';

// fetch all programs
export async function GET() {
  try {
    await connectDB();

    // Get all programs from the database
    const programs = await Program.find({}).lean();

    return NextResponse.json({
      success: true,
      programs
    });
  } catch (error) {
    console.error('Error fetching programs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch programs' },
      { status: 500 }
    );
  }
}

// create a new program
export async function POST(request) {
  // Check admin authorization first
  const authResponse = await adminAuthMiddleware(request);
  if (authResponse) return authResponse;

  try {
    await connectDB();

    const { title, description, shortDescription, image, pricing } = await request.json();

    if (!title) {
      return NextResponse.json({
        success: false,
        message: "Program title is required"
      }, { status: 400 });
    }

    const newProgram = await Program.create({
      title,
      description: description || '',
      shortDescription: shortDescription || '',
      image: image || '',
      pricing: pricing || {
        walkIn: 0,
        weekly: 0,
        monthly: 0,
        annual: 0
      }
    });

    return NextResponse.json({
      success: true,
      message: "Program created successfully",
      program: newProgram
    });
  } catch (error) {
    console.error("Error creating program:", error);
    return NextResponse.json({
      success: false,
      message: error.message || "Error creating program"
    }, { status: 500 });
  }
}
