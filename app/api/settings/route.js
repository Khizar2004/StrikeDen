import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/dbConnect';
import { adminAuthMiddleware } from "@/lib/middleware";
import Settings from '@/lib/Settings';

// GET global promotion
export async function GET() {
  try {
    await connectDB();
    
    const globalPromotion = await Settings.findOne({ key: 'global_promotion' });
    
    return NextResponse.json({
      success: true,
      globalPromotion: globalPromotion?.value || ''
    });
  } catch (error) {
    console.error('Error fetching global promotion:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch global promotion' },
      { status: 500 }
    );
  }
}

// POST/PUT global promotion (admin only)
export async function POST(request) {
  // Check admin authorization first
  const authResponse = await adminAuthMiddleware(request);
  if (authResponse) return authResponse;
  
  try {
    await connectDB();
    
    const { globalPromotion } = await request.json();
    
    // Upsert the global promotion setting
    await Settings.findOneAndUpdate(
      { key: 'global_promotion' },
      { 
        value: globalPromotion || '',
        description: 'Global promotional banner for pricing page',
        updatedBy: 'admin'
      },
      { upsert: true, new: true }
    );
    
    return NextResponse.json({ 
      success: true, 
      message: "Global promotion updated successfully"
    });
  } catch (error) {
    console.error("Error updating global promotion:", error);
    return NextResponse.json({ 
      success: false, 
      message: error.message || "Error updating global promotion" 
    }, { status: 500 });
  }
}
