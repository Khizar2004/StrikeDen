import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';
import { adminAuthMiddleware } from "@/lib/middleware";
import Class from '@/lib/Class';
import { unstable_cache as cache, revalidateTag } from 'next/cache';

export const dynamic = "force-dynamic";

const getClassByIdCached = cache(
  async (id) => {
    await connectDB();
    return Class.findById(id).lean();
  },
  ['class-by-id'],
  { tags: ['classes'] }
);

// GET - Fetch a single class by ID
export async function GET(request, context) {
  try {
    const id = context.params.id;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid class ID format" },
        { status: 400 }
      );
    }

    const classData = await getClassByIdCached(id);
    
    if (!classData) {
      return NextResponse.json(
        { success: false, error: "Class not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: classData
    });
  } catch (error) {
    console.error("Error fetching class:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

// PUT - Update a class by ID
export async function PUT(request, context) {
  // Check admin authorization
  const authResponse = await adminAuthMiddleware(request);
  if (authResponse) return authResponse;
  
  try {
    await connectDB();
    
    // Get ID from context params
    const id = context.params.id;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid class ID format" },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    
    // Make sure the class exists
    const existingClass = await Class.findById(id);
    if (!existingClass) {
      return NextResponse.json(
        { success: false, error: "Class not found" },
        { status: 404 }
      );
    }
    
    // Update the class
    const updatedClass = await Class.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    // Bust cached class lists
    revalidateTag('classes');
    
    return NextResponse.json({
      success: true,
      data: updatedClass,
      message: "Class updated successfully"
    });
  } catch (error) {
    console.error("Error updating class:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a class by ID
export async function DELETE(request, context) {
  // Check admin authorization
  const authResponse = await adminAuthMiddleware(request);
  if (authResponse) return authResponse;
  
  try {
    await connectDB();
    
    // Get ID from context params
    const id = context.params.id;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid class ID format" },
        { status: 400 }
      );
    }
    
    // Find and delete the class
    const result = await Class.findByIdAndDelete(id);
    
    if (!result) {
      return NextResponse.json(
        { success: false, error: "Class not found" },
        { status: 404 }
      );
    }
    
    // Bust cached class lists
    revalidateTag('classes');

    return NextResponse.json({
      success: true,
      message: "Class deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting class:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
} 
