"use server";
import { utapi } from "uploadthing/server";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import dbConnect from "/lib/dbConnect";
import Door from "/models/door";
import Calendar from "/models/calendar";
import User from "/models/user";
import bcrypt from "bcryptjs";

export async function handleRegister(formData) {
    const email = formData.email;
    const password = formData.password;
    try {
        await dbConnect();
        const user = await User.findOne({ email }).select("_id");
        if (user) {
            return { success: false, error: "User exists" };
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            email,
            password: hashedPassword,
        });
        return { success: true, error: null };
    } catch (error) {
        return { success: false, error: `${error}` };
    }
}

export async function deleteDoor(doorId) {
    try {
        await dbConnect();

        const door = await Door.findById(doorId);
        if (!door) {
            return NextResponse.json(
                { message: "Door not found!" },
                { status: 404 }
            );
        }
        if (door.contentImage && door.contentImage.fileKey) {
            await utapi.deleteFiles(door.contentImage.fileKey);
        }
        if (door.closedDoorImage && door.closedDoorImage.fileKey) {
            await utapi.deleteFiles(door.closedDoorImage.fileKey);
        }
        await Door.findByIdAndDelete(doorId);
        revalidateTag("editPageDoors");
        return NextResponse.json(
            { message: "Deleted the door successfully!" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting the door:", error);
        return NextResponse.json(
            { message: "Error deleting the door" },
            { status: 500 }
        );
    }
}

export async function updateDoorContent(formData, imageData) {
    const doorId = formData.doorId;
    const name = formData.name;
    const closedDoorText = formData.closedDoorText;
    const date = formData.date;
    const message = formData.message;
    const youtubeVideoUrl = formData.youtubeVideoUrl;
    const closedDoorColor = formData.closedDoorColor;
    const closedDoorTextColor = formData.closedDoorTextColor;
    const autoOpenTime = formData.autoOpenTime;

    const contentImage = imageData.get("contentImage");
    const contentImgU = formData.contentImageFileUpdated;
    const contentImgOgD = formData.contentImageOgFileDeleted;
    const contentImgKey = formData.contentImgKey;

    const closedDoorImage = imageData.get("closedDoorImage");
    const doorImgU = formData.closedDoorImageFileUpdated;
    const doorImgOgD = formData.closedDoorImageOgFileDeleted;
    const closedImgKey = formData.closedImgKey;

    await dbConnect();

    await Door.findByIdAndUpdate(doorId, {
        name,
        date: new Date(date),
        closedDoorText,
        message,
        youtubeVideoUrl,
        closedDoorColor,
        closedDoorTextColor,
        autoOpenTime: new Date(date),
    });

    if (contentImgOgD) {
        // delete the previous file from uploadthing
        await utapi.deleteFiles(contentImgKey);
        // delete the url in the database
        await Door.findByIdAndUpdate(doorId, {
            $set: {
                "contentImage.fileUrl": "",
                "contentImage.fileKey": "",
            },
        });
    }
    if (doorImgOgD) {
        // delete the previous file from uploadthing
        await utapi.deleteFiles(closedImgKey);
        // delete the url in the database
        await Door.findByIdAndUpdate(doorId, {
            $set: {
                "closedDoorImage.fileUrl": "",
                "closedDoorImage.fileKey": "",
            },
        });
    }
    if (contentImgU) {
        // upload the new file to uploadthing
        const { data } = await utapi.uploadFiles(contentImage);
        // update contentImage in the database
        await Door.findByIdAndUpdate(doorId, {
            $set: {
                "contentImage.fileUrl": data.url,
                "contentImage.fileKey": data.key,
            },
        });
    }
    if (doorImgU) {
        // upload the new file to uploadthing
        const { data } = await utapi.uploadFiles(closedDoorImage);
        // update contentImage in the database
        await Door.findByIdAndUpdate(doorId, {
            $set: {
                "closedDoorImage.fileUrl": data.url,
                "closedDoorImage.fileKey": data.key,
            },
        });
    }
    revalidateTag("editPageDoors");
}

export async function updateCalendarContent(formData, imageData) {
    const calendarId = formData.calendarId;
    const title = formData.title;
    const titleTextColor = formData.titleTextColor;
    const backgroundColor = formData.backgroundColor;

    const backgroundImage = imageData.get("backgroundImage");
    const bgImgU = formData.backgroundImageFileUpdated;
    const bgImgOgD = formData.backgroundImageOgFileDeleted;
    const bgImgKey = formData.backgroundImgKey;

    const logoImage = imageData.get("logoImage");
    const logoImgU = formData.logoImageFileUpdated;
    const logoImgOgD = formData.logoImageOgFileDeleted;
    const logoImgKey = formData.logoImgKey;

    await dbConnect();

    await Calendar.findByIdAndUpdate(calendarId, {
        title,
        titleTextColor,
        backgroundColor,
    });

    if (bgImgOgD) {
        // delete the previous file from uploadthing
        await utapi.deleteFiles(bgImgKey);
        // delete the url in the database
        await Calendar.findByIdAndUpdate(calendarId, {
            $set: {
                "backgroundImage.fileUrl": "",
                "backgroundImage.fileKey": "",
            },
        });
    }

    if (logoImgOgD) {
        // delete the previous file from uploadthing
        await utapi.deleteFiles(logoImgKey);
        // delete the url in the database
        await Calendar.findByIdAndUpdate(calendarId, {
            $set: {
                "logoImage.fileUrl": "",
                "logoImage.fileKey": "",
            },
        });
    }

    if (bgImgU) {
        // upload the new file to uploadthing
        const { data } = await utapi.uploadFiles(backgroundImage);
        // update backgroundImage in the database
        await Calendar.findByIdAndUpdate(calendarId, {
            $set: {
                "backgroundImage.fileUrl": data.url,
                "backgroundImage.fileKey": data.key,
            },
        });
    }

    if (logoImgU) {
        // upload the new file to uploadthing
        const { data } = await utapi.uploadFiles(logoImage);
        // update logoImage in the database
        await Calendar.findByIdAndUpdate(calendarId, {
            $set: {
                "logoImage.fileUrl": data.url,
                "logoImage.fileKey": data.key,
            },
        });
    }

    revalidateTag("editPageCalendar");
}

export async function createNewDoor(formData, imageData) {
    const calendarId = formData.calendarId;
    const name = formData.name;
    const closedDoorText = formData.closedDoorText;
    const date = formData.date;
    const message = formData.message;
    const youtubeVideoUrl = formData.youtubeVideoUrl;
    const closedDoorColor = formData.closedDoorColor;
    const closedDoorTextColor = formData.closedDoorTextColor;
    const autoOpenTime = formData.autoOpenTime;

    const contentImage = imageData.get("contentImage");
    const contentImgU = formData.contentImageFileUpdated;

    const closedDoorImage = imageData.get("closedDoorImage");
    const doorImgU = formData.closedDoorImageFileUpdated;

    await dbConnect();

    let newDoorData = {
        calendarId,
        name,
        date: new Date(date),
        closedDoorText,
        message,
        youtubeVideoUrl,
        closedDoorColor,
        closedDoorTextColor,
        autoOpenTime: new Date(date),
    };

    if (contentImgU) {
        // upload the new file to uploadthing
        const { data: contentData } = await utapi.uploadFiles(contentImage);
        // append contentImage data to newDoorData
        newDoorData.contentImage = {
            fileUrl: contentData.url,
            fileKey: contentData.key,
        };
    }

    if (doorImgU) {
        // upload the new file to uploadthing
        const { data: doorData } = await utapi.uploadFiles(closedDoorImage);
        // append closedDoorImage data to newDoorData
        newDoorData.closedDoorImage = {
            fileUrl: doorData.url,
            fileKey: doorData.key,
        };
    }

    // Create a new door using the Door model
    const newDoor = new Door(newDoorData);
    await newDoor.save();

    revalidateTag("editPageDoors");
}
