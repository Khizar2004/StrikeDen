import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';
import { adminAuthMiddleware } from "@/lib/middleware";
import Class from '@/lib/Class';
import { unstable_cache as cache, revalidateTag } from 'next/cache';

const getClassesCached = cache(
  async () => {
    await connectDB();
    return Class.find({}).lean();
  },
  ['classes:list'],
  { tags: ['classes'] }
);

// fetch all classes
export async function GET() {
  try {
    const classes = await getClassesCached();
    
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

// create a new class
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
    
    // Bust cached class lists
    revalidateTag('classes');

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

 
