import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/dbConnect";
import Calendar from "../../../../../models/calendar";
import User from "../../../../../models/user";
import Door from "../../../../../models/door";

// Delete certain calendarId
export async function DELETE(req, context) {
    try {
        await dbConnect();
        const calendarId = context.params.calendarId;

        // Delete the doors associated with the calendar
        await Door.deleteMany({ calendar: calendarId });
    
        // Delete the calendar
        await Calendar.findByIdAndDelete(calendarId);
    
        // Get the owner of the calendar
        const owner = await User.findOne({ calendars: { $in: [calendarId] } }).select('_id');
    
        // If the owner is found, remove the calendar from their list
        if (owner) {
            await User.findByIdAndUpdate(owner._id, { $pull: { calendars: { $in: [calendarId] } } });
        }
        return NextResponse.json({ message: 'Deleted the calendar successfully!' }, { status: 200 });
      } catch (error) {
        console.error('Error deleting the calendar:', error);
        return NextResponse.json({ message: 'Error deleting the calendar' }, { status: 500 });
      }
    }