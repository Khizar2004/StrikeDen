import { connectDB } from "@/lib/dbConnect";
import Schedule from "@/lib/Schedule";
import Member from "@/lib/Member";
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    
    // Build query based on filters
    const query = { active: true };
    
    if (searchParams.has('classType')) {
      query.classType = searchParams.get('classType');
    }
    if (searchParams.has('level')) {
      query.level = searchParams.get('level');
    }
    if (searchParams.has('trainer')) {
      query.trainer = searchParams.get('trainer');
    }
    if (searchParams.has('date')) {
      const date = new Date(searchParams.get('date'));
      const nextDay = new Date(date);
      nextDay.setDate(date.getDate() + 1);
      query.startTime = {
        $gte: date,
        $lt: nextDay
      };
    }

    const schedules = await Schedule.find(query)
      .populate('trainer', 'name specialization image')
      .populate('enrolledStudents', 'name')
      .sort({ dateTime: 1 });

    return NextResponse.json({ success: true, schedules });
  } catch (error) {
    console.error("Error fetching schedules:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch schedules" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();

    // Handle recurring schedule creation
    if (data.isRecurring && data.recurringPattern) {
      const schedules = [];
      const startDate = new Date(data.dateTime);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 3); // Create 3 months of recurring classes

      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        const scheduleData = {
          ...data,
          dateTime: new Date(currentDate)
        };
        const schedule = new Schedule(scheduleData);
        await schedule.save();
        schedules.push(schedule);

        // Calculate next occurrence based on pattern
        switch (data.recurringPattern) {
          case 'daily':
            currentDate.setDate(currentDate.getDate() + 1);
            break;
          case 'weekly':
            currentDate.setDate(currentDate.getDate() + 7);
            break;
          case 'biweekly':
            currentDate.setDate(currentDate.getDate() + 14);
            break;
          case 'monthly':
            currentDate.setMonth(currentDate.getMonth() + 1);
            break;
        }
      }

      return NextResponse.json({ 
        success: true, 
        message: 'Recurring schedules created successfully',
        schedules 
      });
    } else {
      // Create single schedule
      const schedule = new Schedule(data);
      await schedule.save();
      return NextResponse.json({ success: true, schedule });
    }
  } catch (error) {
    console.error("Error adding schedule:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to add schedule" },
      { status: 400 }
    );
  }
}

export async function PUT(req) {
  try {
    await connectDB();
    const data = await req.json();
    const { id, ...updateData } = data;

    const schedule = await Schedule.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('trainer');

    if (!schedule) {
      return NextResponse.json(
        { success: false, message: 'Schedule not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, schedule });
  } catch (error) {
    console.error("Error updating schedule:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update schedule" },
      { status: 400 }
    );
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Schedule ID is required' },
        { status: 400 }
      );
    }

    // Soft delete by setting active to false
    const schedule = await Schedule.findByIdAndUpdate(
      id,
      { active: false },
      { new: true }
    );

    if (!schedule) {
      return NextResponse.json(
        { success: false, message: 'Schedule not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Schedule deleted successfully' });
  } catch (error) {
    console.error("Error deleting schedule:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete schedule" },
      { status: 400 }
    );
  }
}
