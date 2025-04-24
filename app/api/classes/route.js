import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';
import { adminAuthMiddleware } from "@/lib/middleware";
import Class from '@/lib/Class';

export async function GET() {
  try {
    await connectDB();
    
    // Get all classes from the database
    const classes = await Class.find({}).lean();
    
    return NextResponse.json({
      success: true,
      classes
    });
  } catch (error) {
    console.error('Error fetching classes:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch classes' },
      { status: 500 }
    );
  }
}

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
        message: "Class title is required" 
      }, { status: 400 });
    }
    
    const newClass = await Class.create({
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
      message: "Class created successfully",
      class: newClass
    });
  } catch (error) {
    console.error("Error creating class:", error);
    return NextResponse.json({ 
      success: false, 
      message: error.message || "Error creating class" 
    }, { status: 500 });
  }
}

export async function PUT(request) {
  // Check admin authorization first
  const authResponse = await adminAuthMiddleware(request);
  if (authResponse) return authResponse;
  
  try {
    await connectDB();
    
    const { _id, title, description, shortDescription, image, pricing } = await request.json();
    
    if (!_id) {
      return NextResponse.json({ 
        success: false, 
        message: "Class ID is required" 
      }, { status: 400 });
    }
    
    const updateData = {
      $set: {}
    };
    
    if (title !== undefined) updateData.$set.title = title;
    if (description !== undefined) updateData.$set.description = description;
    if (shortDescription !== undefined) updateData.$set.shortDescription = shortDescription;
    if (image !== undefined) updateData.$set.image = image;
    if (pricing !== undefined) updateData.$set.pricing = pricing;
    
    const updatedClass = await Class.findByIdAndUpdate(_id, updateData, { new: true });
    
    if (!updatedClass) {
      return NextResponse.json({ 
        success: false, 
        message: "Class not found" 
      }, { status: 404 });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Class updated successfully",
      class: updatedClass
    });
  } catch (error) {
    console.error("Error updating class:", error);
    return NextResponse.json({ 
      success: false, 
      message: error.message || "Error updating class" 
    }, { status: 500 });
  }
}

export async function DELETE(request) {
  // Check admin authentication
  const authResponse = await adminAuthMiddleware(request);
  if (authResponse) return authResponse;
  
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Class ID is required' },
        { status: 400 }
      );
    }
    
    const result = await Class.findByIdAndDelete(id);
    
    if (!result) {
      return NextResponse.json(
        { success: false, error: 'Class not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Class deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting class:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete class' },
      { status: 500 }
    );
  }
} 