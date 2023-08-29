import { NextResponse } from "next/server";
import dbConnect from "/lib/dbConnect";
import Door from "/models/door";
import Calendar from "/models/calendar";

// Fetch all doors of a path
export async function GET(req, context) {
    try {
        await dbConnect();
        const calendar =  await Calendar.findOne({ path: context.params.path });
        if (!calendar) {
            return NextResponse.json({ message: "Calendar not found in doors" }, { status: 404 });
        }
        const doors = await Door.find({ calendarId: calendar._id });
        return NextResponse.json({ data: doors }, { message: "Successfully fetched all doors!" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error while getting doors" }, {status: 500})
    }
}