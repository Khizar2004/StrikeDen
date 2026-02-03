import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';
import { adminAuthMiddleware } from "@/lib/middleware";
import Program from '@/lib/Program';

export const dynamic = "force-dynamic";

// GET - Fetch a single program by ID
export async function GET(request, context) {
  try {
    await connectDB();

    // Get ID from context params - await params in Next.js 15+
    const params = await context.params;
    const id = params.id;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid program ID format" },
        { status: 400 }
      );
    }

    const programData = await Program.findById(id);

    if (!programData) {
      return NextResponse.json(
        { success: false, error: "Program not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: programData
    });
  } catch (error) {
    console.error("Error fetching program:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

// PUT - Update a program by ID
export async function PUT(request, context) {
  // Check admin authorization
  const authResponse = await adminAuthMiddleware(request);
  if (authResponse) return authResponse;

  try {
    await connectDB();

    // Get ID from context params - await params in Next.js 15+
    const params = await context.params;
    const id = params.id;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid program ID format" },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Make sure the program exists
    const existingProgram = await Program.findById(id);
    if (!existingProgram) {
      return NextResponse.json(
        { success: false, error: "Program not found" },
        { status: 404 }
      );
    }

    // Update the program
    const updatedProgram = await Program.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
      data: updatedProgram,
      message: "Program updated successfully"
    });
  } catch (error) {
    console.error("Error updating program:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a program by ID
export async function DELETE(request, context) {
  // Check admin authorization
  const authResponse = await adminAuthMiddleware(request);
  if (authResponse) return authResponse;

  try {
    await connectDB();

    // Get ID from context params - await params in Next.js 15+
    const params = await context.params;
    const id = params.id;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid program ID format" },
        { status: 400 }
      );
    }

    // Find and delete the program
    const result = await Program.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json(
        { success: false, error: "Program not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Program deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting program:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
