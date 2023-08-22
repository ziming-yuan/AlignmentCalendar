import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/dbConnect";
import Calendar from "../../../../../models/calendar";

// Delete certain calendarId
export async function DELETE(req, context) {
    await dbConnect();
    console.log("inside delete")
    const calendarId = context.params.calendarId;
    console.log("id", calendarId)
    await Calendar.findByIdAndDelete(calendarId);
    return NextResponse.json({ message: "Deleted successfully!" });
}