import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect"
import Calendar from "../../../models/calendar";
import User from "../../../models/user";

// Create a new calendar
// email and title required
export async function POST(req) {
  try {
    await dbConnect();
    const { 
      email,
      title,
      description,
      isActive,
      titleTextColor,
      titleBackgroundColor,
      backgroundPhoto,
      logoImage,
      doors 
    } = await req.json();
    // Find the user by email
    const user = await User.findOne({ email }).select("_id");
    // If user is not found, return an error response
    if (!user) {
      return NextResponse.json({message: "Error: user not found"}, {status: 400});
    };
    const newCalendar = new Calendar({
      owner: user._id,
      path: crypto.randomUUID(),
      title,
      description,
      isActive,
      titleTextColor,
      titleBackgroundColor,
      backgroundPhoto,
      logoImage,
      doors
    });
    await Calendar.create(newCalendar);
    // return newCalendar w/ a success response
    return NextResponse.json({data: newCalendar}, {message: "Calendar created successfully!"}, {status: 201});
  } catch (error) {
    console.error("Error creating calendar:", error);
    return NextResponse.json({message: "Error while creating a calendar"}, {status: 500})
  }
}
