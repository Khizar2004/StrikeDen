import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { validateCsrfRequest } from '../auth/middleware';

// Maximum file size (3MB)
const MAX_FILE_SIZE = 3 * 1024 * 1024;

// Validate file size and type
function validateFile(file) {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return { 
      valid: false, 
      error: `File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB` 
    };
  }
  
  // Check file extension
  const fileExtension = path.extname(file.name).toLowerCase().replace('.', '');
  const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
  
  if (!validExtensions.includes(fileExtension)) {
    return { 
      valid: false, 
      error: 'Invalid file type. Only JPG, PNG, GIF, and WEBP images are allowed.' 
    };
  }
  
  // Check MIME type
  const validMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp'
  ];
  
  if (!validMimeTypes.includes(file.type)) {
    return { 
      valid: false,
      error: 'Invalid file content type. Only images are allowed.' 
    };
  }
  
  return { valid: true };
}

export async function POST(request) {
  try {
    // Verify CSRF token
    const isValidCsrf = await validateCsrfRequest(request.clone());
    if (!isValidCsrf) {
      return NextResponse.json(
        { success: false, error: 'Invalid security token' },
        { status: 403 }
      );
    }
    
    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file uploaded' },
        { status: 400 }
      );
    }
    
    // Validate the file
    const validation = validateFile(file);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    // Get file data and generate unique filename
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Use a secure random filename with original extension
    const fileExtension = path.extname(file.name).toLowerCase();
    const fileName = `${uuidv4()}${fileExtension}`;
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
      { success: false, error: 'Failed to upload file' },
      { status: 500 }
    );
  }
} 