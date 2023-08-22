import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/dbConnect";
import User from "../../../../../models/user";
import Calendar from "../../../../../models/calendar";

// Fetch all calendars of a userId
export async function GET(req, context) {
    await dbConnect();
    const email = context.params.email;
    const user = await User.findOne({ email: email });
    if (!user) {
        return NextResponse.json({ message: "User not found" });
    }
    const calendars = await Calendar.find({ owner: user._id });
    return NextResponse.json({ calendars: calendars });
}