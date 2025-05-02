"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

/**
 * A reusable image upload component that handles file uploads and image previews
 */
export default function ImageUpload({ onImageUploaded, initialImage = null }) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [uploadedPath, setUploadedPath] = useState(null);
  
  // Set initial preview and path
  useEffect(() => {
    if (initialImage) {
      setPreview(initialImage);
      setUploadedPath(initialImage);
    }
  }, [initialImage]);

  // Helper to validate an image URL format
  const isValidImageUrl = (url) => {
    if (!url) return false;
    
    // Check if it's a relative path starting with /uploads/
    if (url.startsWith('/uploads/')) return true;
    
    // Check if it's a complete URL
    try {
      new URL(url);
      // Check if it ends with a valid image extension
      const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
      return validExtensions.some(ext => url.toLowerCase().endsWith(ext));
    } catch (e) {
      return false;
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setError(null);

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError(`Invalid file type. Allowed types: JPG, PNG, GIF, WebP`);
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError(`File size exceeds 5MB limit (${(file.size / (1024 * 1024)).toFixed(2)}MB)`);
      return;
    }

    // Create a preview immediately for better UX
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target.result);
    };
    reader.readAsDataURL(file);

    // Upload the file
    try {
      setIsUploading(true);
      setError(null);

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload/blob', {
        method: 'POST',
        body: formData,
        credentials: 'include' // Keep cookies for authentication
      });

      // Handle non-JSON responses gracefully
      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(`Server returned non-JSON response: ${text}`);
      }
      
      if (!response.ok) {
        throw new Error(data.error || `Upload failed with status: ${response.status}`);
      }
      
      if (data.success && data.url) {
        setUploadedPath(data.url);
        onImageUploaded(data.url);
      } else {
        throw new Error(data.error || 'No file URL returned from server');
      }
    } catch (err) {
      console.error('Error uploading image:', err);
      setError(err.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  // Render different preview based on image source type
  const renderPreview = () => {
    if (!preview) return null;
    
    if (typeof preview === 'string' && preview.startsWith('data:')) {
      // For data URLs (local file preview)
      return (
        <div className="relative w-full h-full">
          <Image
            src={preview}
            alt="Image preview"
            fill
            sizes="128px"
            className="object-cover"
            unoptimized={true}
          />
        </div>
      );
    } else {
      // For server paths or URLs
      return (
        <div className="w-full h-full">
          <img
            src={preview}
            alt="Image preview"
            className="w-full h-full object-cover"
            onError={() => setError("Failed to load image")}
          />
        </div>
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center">
        <div className="relative w-32 h-32 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
          {preview ? (
            renderPreview()
          ) : (
            <div className="flex items-center justify-center h-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}

          {isUploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {preview ? 'Change Image' : 'Upload Image'}
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex justify-center text-sm text-gray-600 dark:text-gray-400">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-red-600 dark:text-red-400 hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500"
              >
                <span className="px-2">Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PNG, JPG, GIF up to 5MB
            </p>
          </div>
        </div>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>
      )}
      
      {uploadedPath && (
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
          <strong>Path:</strong> {uploadedPath}
        </div>
      )}
    </div>
  );
} 