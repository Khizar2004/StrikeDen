import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Get file data and generate unique filename
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    
    // Validate file type
    if (!validExtensions.includes(fileExtension)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type. Only images are allowed.' },
        { status: 400 }
      );
    }
    
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = `/uploads/${fileName}`;
    
    // Ensure the uploads directory exists
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (err) {
      // Directory already exists or can't be created
      console.log('Directory creation:', err.message);
    }
    
    // Write the file to the public/uploads directory
    const fullPath = path.join(process.cwd(), 'public', filePath);
    await writeFile(fullPath, buffer);
    
    console.log(`File uploaded successfully: ${fullPath}`);

    // Return the path to the uploaded file
    return NextResponse.json({ 
      success: true, 
      filePath: filePath 
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload file: ' + error.message },
      { status: 500 }
    );
  }
} 