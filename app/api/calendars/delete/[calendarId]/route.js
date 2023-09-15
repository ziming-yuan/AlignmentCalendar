import { NextResponse } from "next/server";
import dbConnect from "/lib/dbConnect";
import Calendar from "/models/calendar";
import Door from "/models/door";
import { utapi } from "uploadthing/server";
import { revalidateTag } from "next/cache";

export async function DELETE(req, { params }) {
    try {
        await dbConnect();
        const { calendarId } = params;

        // Fetch all the doors associated with the calendar
        const doors = await Door.find({ calendarId: calendarId });

        // For each door, delete the associated images
        for (let door of doors) {
            if (door.contentImage.fileKey) {
                await utapi.deleteFiles(door.contentImage.fileKey);
            }
            if (door.closedDoorImage.fileKey) {
                await utapi.deleteFiles(door.closedDoorImage.fileKey);
            }
        }

        // Delete the doors
        await Door.deleteMany({ calendarId: calendarId });

        // Fetch the calendar to get its associated images
        const calendar = await Calendar.findById(calendarId);

        // Delete the calendar's associated images
        if (calendar.backgroundImage.fileKey) {
            await utapi.deleteFiles(calendar.backgroundImage.fileKey);
        }
        if (calendar.logoImage.fileKey) {
            await utapi.deleteFiles(calendar.logoImage.fileKey);
        }

        // Delete the calendar
        await Calendar.findByIdAndDelete(calendarId);

        revalidateTag("editPageCalendar");
        revalidateTag("editPageDoors");

        return NextResponse.json(
            {
                message:
                    "Deleted the calendar and associated images successfully!",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(
            "Error deleting the calendar and its associated images:",
            error
        );
        return NextResponse.json(
            {
                message:
                    "Error deleting the calendar and its associated images",
            },
            { status: 500 }
        );
    }
}
