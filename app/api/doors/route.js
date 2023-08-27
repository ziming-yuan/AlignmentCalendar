import { NextResponse } from 'next/server';
import dbConnect from '/lib/dbConnect';
import Calendar from '/models/calendar';
import Door from '/models/door';

// Create a new door
// email and title required
export async function POST(req) {
  try {
    await dbConnect();
    const {
      calendarId,
      startDate,
      endDate,
      title,
      description,
    } = await req.json();

    // Check if calendarId is valid
    const calendar = await Calendar.findById(calendarId);

    // If calendar is not found, return an error response
    if (!calendar) {
      return NextResponse.json({ message: 'error: calendar not found' }, { status: 400 });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    let currentDate = start;
    const newDoors = [];

    while (currentDate <= end) {
      newDoors.push(
        new Door({
          calendar: calendar._id,
          date: currentDate,
          text: formatDate(currentDate),
          message: '',
          youtubeVideoId: '',
          photoUrl: '',
          textColor: '#000',
          backgroundColor: '#FFF',
          closedDoorPhotoUrl: '',
          autoOpenTime: currentDate,
        })
      );
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const createdDoors = await Door.insertMany(newDoors);
    
    // Update the calendar's list of doors
    await Calendar.findByIdAndUpdate(calendarId, { $push: { doors: { $each: createdDoors.map(door => door._id) } } });

    return NextResponse.json({ message: 'Multiple doors created successfully!' }, { status: 201 });
  } catch (error) {
    console.error('Error creating multiple doors:', error);
    return NextResponse.json({ message: 'Error while creating multiple doors' }, { status: 500 });
  }
}

function formatDate(date) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const monthName = months[date.getMonth()];
  const day = date.getDate();

  return `${monthName} ${day}`;
}