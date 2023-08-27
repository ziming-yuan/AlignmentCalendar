import { NextResponse } from "next/server";
import dbConnect from '/lib/dbConnect';
import Calendar from '/models/calendar';
import Door from '/models/door';

// Create multiple new doors
export async function POST(req) {
    try {
        await dbConnect();
        const { 
            calendarId,
            startDate,
            endDate
        } = await req.json();
        // Check if calendarId is valid
        const calendar = await Calendar.findById(calendarId);
        // If calendar is not found, return an error response
        if (!calendar) {
            return NextResponse.json({message: "error: calendar not found"}, {status: 400});
        }

        const start = new Date(startDate);
        const end = new Date(endDate);
        let currentDate = start;
        const newDoors = [];
        while (currentDate <= end) {
            newDoors.push(new Door ({
                calendar: calendarId,
                date: new Date(currentDate), // currentDate is a reference only
                text: formatDate(currentDate),
                message: "",
                youtubeVideoId: "",
                photoUrl: "",
                textColor: "#000000",
                backgroundColor: "#FFFFFF",
                closedDoorPhotoUrl: "",
                autoOpenTime: new Date(currentDate)
            }));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        await Door.insertMany(newDoors);

        return NextResponse.json({message: "Multiple doors created successfully!"}, {status: 201})
    } catch (error) {
        return NextResponse.json({message: "error while creating multiple doors"}, {status: 500})
    }
}
  

function formatDate(date) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const monthName = months[date.getMonth()];
    const day = date.getDate();

    return `${monthName} ${day}`;
}  