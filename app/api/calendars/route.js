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
    console.log("email:", email)
    console.log("title:", title)
    console.log("des:", description)
    // Find the user by email
    const user = await User.findOne({ email }).select("_id");
    // If user is not found, return an error response
    if (!user) {
      return NextResponse.json({message: "error: user not found"}, {status: 400});
    }
    const newCalendar = new Calendar({
      owner: user._id,
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
    // Return a success response
    return NextResponse.json({message: "Calendar created successfully!"}, {status: 201});
  } catch (error) {
    console.error("Error creating calendar:", error);
    return NextResponse.json({message: "error while creating a calendar"}, {status: 500})
  }
}
