import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Check file type
    const fileType = file.type;
    if (!fileType.startsWith('image/')) {
      return NextResponse.json(
        { success: false, error: 'Only image files are allowed' },
        { status: 400 }
      );
    }

    // Generate a unique filename with uuid
    const uniqueId = uuidv4();
    const fileName = `${uniqueId}-${file.name.replace(/\s+/g, '_')}`;
    
    // Upload to Vercel Blob
    const blob = await put(fileName, file, {
      access: 'public',
    });

    return NextResponse.json({ 
      success: true, 
      url: blob.url,
      message: 'File uploaded successfully'
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to upload file' },
      { status: 500 }
    );
  }
} 