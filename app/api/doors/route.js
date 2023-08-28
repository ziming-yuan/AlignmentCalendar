import { NextResponse } from 'next/server';
import dbConnect from '/lib/dbConnect';
import Calendar from '/models/calendar';
import Door from '/models/door';

// Create a new door
// calendarId required
export async function POST(req) {
  try {
    await dbConnect();
    const {
      calendarId,
      date,
      message = "",
      youtubeVideoUrl = "",
      contentImage = {
        fileUrl: "",
        fileKey: "",
      },
      closedDoorText = "",
      closedDoorTextColor = "#000000",
      closedDoorImage = {
        fileUrl: "",
        fileKey: "",
      },
      closedDoorColor = "#FFFFFF",
      autoOpenTime
    } = await req.json();

    // Check if calendarId is valid
    const calendar = await Calendar.findById(calendarId);

    // If calendar is not found, return an error response
    if (!calendar) {
      return NextResponse.json({ message: 'Error: calendar not found' }, { status: 400 });
    }
    
    const newDoor = new Door({
      calendarId,
      date,
      message,
      youtubeVideoUrl,
      contentImage,
      closedDoorText,
      closedDoorTextColor,
      closedDoorImage,
      closedDoorColor,
      autoOpenTime
    });
    await Door.create(newDoor);
    return NextResponse.json({ message: 'New door created successfully!' }, { status: 201 });
  } catch (error) {
    console.error('Error creating a new door:', error);
    return NextResponse.json({ message: 'Error while creating a new door' }, { status: 500 });
  }
}