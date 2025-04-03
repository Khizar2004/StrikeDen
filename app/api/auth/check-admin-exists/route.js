import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/dbConnect';
import Admin from '@/lib/Admin';

export async function GET() {
  try {
    await connectDB();
    
    // Check if any admin user exists
    const adminCount = await Admin.countDocuments();
    
    return NextResponse.json({
      success: true,
      adminExists: adminCount > 0
    });
  } catch (error) {
    console.error('Admin check error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
} 