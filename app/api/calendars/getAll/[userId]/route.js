import { NextResponse } from "next/server";
import dbConnect from "/lib/dbConnect";
import User from "/models/user";
import Calendar from "/models/calendar";

// Fetch all calendars of a userId
export async function GET(req, context) {
    try {
        await dbConnect();
        const userId = context.params.userId;
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ message: "User not found" });
        }
        const calendars = await Calendar.find({ owner: user._id });
        return NextResponse.json({ data: calendars }, { message: "Successfully fetched all calendars!" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error while getting calendars" }, {status: 500})
    }
}