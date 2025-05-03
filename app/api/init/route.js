import { NextResponse } from 'next/server';
import { initializeAdmin } from '@/lib/initAdmin';

// Track if initialization has already run
let hasRun = false;
let initResult = null;

export async function GET() {
  try {
    // Only run initialization once
    if (!hasRun) {
      hasRun = true;
      initResult = await initializeAdmin();
      
      // Log the result, but keep sensitive data out of logs
      if (initResult.success) {
        console.log('Admin initialization successful');
        
        // If a recovery key was generated (not provided via env), log it securely
        if (initResult.recoveryKey) {
          
          // Return the key in the response for ONE-TIME setup
          return NextResponse.json({
            success: true,
            message: 'Admin account created successfully',
            recoveryKey: initResult.recoveryKey
          });
        }
      } else {
        console.log('Admin initialization skipped:', initResult.message);
      }
    }
    
    // Default response (no recovery key or initialization already run)
    return NextResponse.json({
      success: initResult?.success || false,
      message: initResult?.message || 'Initialization status unknown'
    });
  } catch (error) {
    console.error('Initialization error:', error);
    return NextResponse.json(
      { success: false, message: 'Initialization error', error: error.message },
      { status: 500 }
    );
  }
} 