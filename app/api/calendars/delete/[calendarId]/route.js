import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/dbConnect";
import Calendar from "../../../../../models/calendar";
import Door from "../../../../../models/door";

// Delete certain calendar
export async function DELETE(req, { params }) {
  try {
      await dbConnect();
      const { calendarId } = params;

      // Delete the doors associated with the calendar
      await Door.deleteMany({ calendar: calendarId });
  
      // Delete the calendar
      await Calendar.findByIdAndDelete(calendarId);

      return NextResponse.json({ message: 'Deleted the calendar successfully!' }, { status: 200 });
    } catch (error) {
    console.error('Error deleting the calendar:', error);
    return NextResponse.json({ message: 'Error deleting the calendar' }, { status: 500 });
  }
}