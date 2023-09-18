import { NextResponse } from "next/server";
import dbConnect from "/lib/dbConnect";
import Calendar from "/models/calendar";
import Door from "/models/door";
import { revalidateTag } from "next/cache";
import { addDays, format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

// Create multiple new doors
export async function POST(req) {
    try {
        await dbConnect();
        const { calendarId, startDate, endDate } = await req.json();
        // Check if calendarId is valid
        const calendar = await Calendar.findById(calendarId);
        // If calendar is not found, return an error response
        if (!calendar) {
            return NextResponse.json(
                { message: "error: calendar not found" },
                { status: 400 }
            );
        }
        const start = utcToZonedTime(
            new Date(startDate + "T00:00:00.000Z"),
            "America/New_York"
        );
        const end = utcToZonedTime(
            new Date(endDate + "T00:00:00.000Z"),
            "America/New_York"
        );
        let currentDate = start;
        const newDoors = [];
        while (currentDate <= end) {
            newDoors.push(
                new Door({
                    calendarId: calendarId,
                    name: formatDate(currentDate),
                    date: new Date(currentDate), // currentDate is a reference only
                    message: "",
                    youtubeVideoUrl: "",
                    contentImage: {
                        fileUrl: "",
                        fileKey: "",
                    },
                    closedDoorText: formatDate(currentDate),
                    closedDoorTextColor: "#000000",
                    closedDoorImage: {
                        fileUrl: "",
                        fileKey: "",
                    },
                    closedDoorColor: "#FFFFFF",
                    autoOpenTime: addDays(new Date(currentDate), 7), // add a week to currentDate
                })
            );
            currentDate = addDays(currentDate, 1); // Increment by 1 day
        }
        await Door.insertMany(newDoors);

        revalidateTag("editPageDoors");

        return NextResponse.json(
            { message: "Multiple doors created successfully!" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "error while creating multiple doors" },
            { status: 500 }
        );
    }
}

function formatDate(date) {
    // Use format function from date-fns for formatting
    return format(date, "MMMM d"); // "MMMM" gives full month name, "d" gives day of the month
}
