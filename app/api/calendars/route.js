import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect"
import Calendar from "../../../models/calendar";
import User from "../../../models/user";

// Delete certain calendarId
export async function DELETE(req) {
    await dbConnect();
    const calendarId = req.body.calendarId;
    await Calendar.findByIdAndDelete(calendarId);
    return NextResponse.json({ message: "Deleted successfully!" });
}