import { NextResponse } from "next/server";
import dbConnect from "/lib/dbConnect";
import Calendar from "/models/calendar";

// Fetch calendar with params.path
export async function GET(req, context) {
    try {
        await dbConnect();
        const calendar =  await Calendar.findOne({ path: context.params.path });
        if (!calendar) {
            return NextResponse.json({ message: "Calendar not found" }, { status: 404 });
        }
        return NextResponse.json({ data: calendar }, { message: "Successfully fetched the calendar!" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error while getting the calendar" }, {status: 500})
    }
}