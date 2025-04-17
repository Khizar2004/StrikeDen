import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/dbConnect';
import Admin from '@/lib/Admin';

// Track recovery attempts for rate limiting
const recoveryAttempts = new Map();

export async function POST(request) {
  try {
    await connectDB();
    
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown-ip';
    
    // Implement strict rate limiting for recovery
    const now = Date.now();
    const recentAttempts = recoveryAttempts.get(ip) || [];
    
    // Remove attempts older than 30 minutes
    const thirtyMinutes = 30 * 60 * 1000;
    const recentAttemptsCleaned = recentAttempts.filter(
      timestamp => now - timestamp < thirtyMinutes
    );
    
    // Very strict limit: only 3 attempts per 30 minutes
    if (recentAttemptsCleaned.length >= 3) {
      return NextResponse.json(
        { success: false, message: 'Too many recovery attempts. Please try again later.' },
        { status: 429 }
      );
    }
    
    // Add current attempt
    recentAttemptsCleaned.push(now);
    recoveryAttempts.set(ip, recentAttemptsCleaned);
    
    const { username, recoveryKey, newPassword } = await request.json();

    if (!username || !recoveryKey || !newPassword) {
      return NextResponse.json(
        { success: false, message: 'Username, recovery key and new password are required' },
        { status: 400 }
      );
    }
    
    // Validate new password
    if (newPassword.length < 12 || 
        !/[A-Z]/.test(newPassword) || 
        !/[a-z]/.test(newPassword) || 
        !/[0-9]/.test(newPassword) || 
        !/[^A-Za-z0-9]/.test(newPassword)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'New password must be at least 12 characters long and include uppercase, lowercase, numbers, and special characters' 
        },
        { status: 400 }
      );
    }

    // Get admin user
    const admin = await Admin.findOne({ username });
    
    if (!admin) {
      // Don't reveal whether the username exists
      console.log('Recovery attempt - username not found');
      
      // Add artificial delay to prevent timing attacks
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return NextResponse.json(
        { success: false, message: 'Invalid recovery information' },
        { status: 401 }
      );
    }

    // Check if recovery key hash exists
    if (!admin.recoveryKeyHash) {
      console.log('Recovery attempt failed - no recovery key set for this account');
      return NextResponse.json(
        { success: false, message: 'Account recovery is not available' },
        { status: 401 }
      );
    }

    // Verify recovery key
    const isValidKey = await admin.compareRecoveryKey(recoveryKey);
    
    if (!isValidKey) {
      console.log('Recovery attempt failed - invalid recovery key');
      return NextResponse.json(
        { success: false, message: 'Invalid recovery information' },
        { status: 401 }
      );
    }

    // Update the password
    admin.password = newPassword; // Will be hashed by pre-save hook
    await admin.save();
    
    // Clear recovery attempts after successful recovery
    recoveryAttempts.delete(ip);
    
    console.log('Password successfully reset using recovery key');
    
    return NextResponse.json({
      success: true,
      message: 'Password reset successful. Please log in with your new password.'
    });
  } catch (error) {
    console.error('Recovery error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
} 