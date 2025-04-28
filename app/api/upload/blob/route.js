import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

// Maximum file size (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Get JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// Validate file
function validateFile(file) {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return { 
      valid: false, 
      error: `File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB` 
    };
  }
  
  // Check file type
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
  
  // Validate extension matches the MIME type
  const fileExtension = path.extname(file.name).toLowerCase().replace('.', '');
  const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
  
  if (!validExtensions.includes(fileExtension)) {
    return { 
      valid: false, 
      error: 'Invalid file extension. Only JPG, PNG, GIF, and WEBP are allowed.' 
    };
  }
  
  return { valid: true };
}

export async function POST(request) {
  try {
    // Get the request formData
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Only check for authentication, no CSRF validation
    const cookieStore = await cookies();
    const jwtToken = cookieStore.get('admin_token')?.value;
    
    if (!jwtToken) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Verify JWT token is valid (but don't require CSRF)
    try {
      jwt.verify(jwtToken, JWT_SECRET);
    } catch (err) {
      console.error('JWT verification error:', err);
      return NextResponse.json(
        { success: false, error: 'Invalid authentication token' },
        { status: 403 }
      );
    }

    // Validate file
    const validation = validateFile(file);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    // Generate a unique filename with uuid, but keep original extension
    const uniqueId = uuidv4();
    const fileExtension = path.extname(file.name).toLowerCase();
    const fileName = `${uniqueId}${fileExtension}`;
    
    // Upload to Vercel Blob
    const blob = await put(fileName, file, {
      access: 'public',
      contentType: file.type // Ensure proper content type is set
    });

    return NextResponse.json({ 
      success: true, 
      url: blob.url,
      message: 'File uploaded successfully'
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload file' },
      { status: 500 }
    );
  }
} 