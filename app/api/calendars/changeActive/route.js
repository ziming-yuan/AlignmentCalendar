import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect'
import Calendar from '../../../../models/calendar';

export async function PUT(request) {
  try {
    await dbConnect();

    const { calendarId, isActive } = await request.json();

    const updatedCalendar = await Calendar.findByIdAndUpdate(
      calendarId,
      { isActive },
      { new: true }
    );

    if (!updatedCalendar) {
      return NextResponse.json(
        { message: 'Calendar not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Calendar updated successfully', calendar: updatedCalendar },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating calendar:', error);
    return NextResponse.json({ message: 'Error updating calendar' }, { status: 500 });
  }
}