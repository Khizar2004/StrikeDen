import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { adminAuthMiddleware } from "@/lib/middleware";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    
    // Get all classes from the database
    const classes = await db.collection('classes').find({}).toArray();
    
    // Transform _id from ObjectId to string for JSON serialization
    const formattedClasses = classes.map(cls => ({
      ...cls,
      _id: cls._id.toString()
    }));
    
    return NextResponse.json({
      success: true,
      classes: formattedClasses
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
  // Check admin authentication
  const authResponse = await adminAuthMiddleware(request);
  if (authResponse) return authResponse;
  
  try {
    const { db } = await connectToDatabase();
    const { title, description, shortDescription, image } = await request.json();
    
    // Validate required fields
    if (!title) {
      return NextResponse.json(
        { success: false, error: 'Title is required' },
        { status: 400 }
      );
    }
    
    // Create new class document
    const newClass = {
      title,
      description: description || '',
      shortDescription: shortDescription || '',
      image: image || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('classes').insertOne(newClass);
    
    return NextResponse.json({
      success: true,
      class: {
        ...newClass,
        _id: result.insertedId.toString()
      }
    });
  } catch (error) {
    console.error('Error creating class:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create class' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  // Check admin authentication
  const authResponse = await adminAuthMiddleware(request);
  if (authResponse) return authResponse;
  
  try {
    const { db } = await connectToDatabase();
    const { _id, title, description, shortDescription, image } = await request.json();
    
    if (!_id) {
      return NextResponse.json(
        { success: false, error: 'Class ID is required' },
        { status: 400 }
      );
    }
    
    // Update class document
    const updateData = {
      $set: {
        updatedAt: new Date()
      }
    };
    
    // Only include fields that are provided
    if (title) updateData.$set.title = title;
    if (description !== undefined) updateData.$set.description = description;
    if (shortDescription !== undefined) updateData.$set.shortDescription = shortDescription;
    if (image !== undefined) updateData.$set.image = image;
    
    const result = await db.collection('classes').updateOne(
      { _id: new ObjectId(_id) },
      updateData
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Class not found' },
        { status: 404 }
      );
    }
    
    const updatedClass = await db.collection('classes').findOne({ _id: new ObjectId(_id) });
    
    return NextResponse.json({
      success: true,
      class: {
        ...updatedClass,
        _id: updatedClass._id.toString()
      }
    });
  } catch (error) {
    console.error('Error updating class:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update class' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  // Check admin authentication
  const authResponse = await adminAuthMiddleware(request);
  if (authResponse) return authResponse;
  
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Class ID is required' },
        { status: 400 }
      );
    }
    
    const result = await db.collection('classes').deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
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