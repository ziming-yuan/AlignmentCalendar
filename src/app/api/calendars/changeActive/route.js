import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Calendar from "@/models/calendar";
import { revalidateTag } from "next/cache";

export async function PUT(request) {
    try {
        await dbConnect();

        const { calendarId, isActive } = await request.json();

        const updatedCalendar = await Calendar.findByIdAndUpdate(
            calendarId,
            { isActive },
            { new: true }
        );

        if (!updatedCalendar) {
            return NextResponse.json(
                { message: "Calendar not found" },
                { status: 404 }
            );
        }
        revalidateTag("editPageCalendar");
        revalidateTag("editPageDoors");
        return NextResponse.json(
            {
                message: "Calendar updated successfully",
                calendar: updatedCalendar,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating calendar:", error);
        return NextResponse.json(
            { message: "Error updating calendar" },
            { status: 500 }
        );
    }
}
