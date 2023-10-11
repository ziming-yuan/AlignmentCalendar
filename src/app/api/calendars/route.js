import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Calendar from "@/models/calendar";
import User from "@/models/user";
import { revalidateTag } from "next/cache";

// Create a new calendar
// id and title required
export async function POST(req) {
    try {
        await dbConnect();
        const {
            userId,
            title,
            description,
            isActive = false,
            titleTextColor = "#000000",
            backgroundImage = {
                fileUrl: "",
                fileKey: "",
            },
            backgroundColor = "#FFFFFF",
            logoImage = {
                fileUrl: "",
                fileKey: "",
            },
        } = await req.json();
        // Find the user by email
        const user = await User.findById(userId);
        // If user is not found, return an error response
        if (!user) {
            return NextResponse.json(
                { message: "Error: user not found" },
                { status: 400 }
            );
        }
        const newCalendar = new Calendar({
            owner: userId,
            path: crypto.randomUUID(),
            title,
            description,
            isActive,
            titleTextColor,
            backgroundImage,
            backgroundColor,
            logoImage,
        });
        await Calendar.create(newCalendar);
        // return newCalendar w/ a success response

        revalidateTag("editPageCalendar");
        revalidateTag("editPageDoors");

        return NextResponse.json(
            { data: newCalendar },
            { message: "Calendar created successfully!" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating calendar:", error);
        return NextResponse.json(
            { message: "Error while creating a calendar" },
            { status: 500 }
        );
    }
}
