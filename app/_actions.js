"use server";
import { utapi } from "uploadthing/server";
import { revalidateTag } from "next/cache";
import dbConnect from "/lib/dbConnect";
import Door from "/models/door";
import { NextResponse } from "next/server";

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
        date: new Date(date),
        closedDoorText,
        message,
        youtubeVideoUrl,
        closedDoorColor,
        closedDoorTextColor,
        autoOpenTime: new Date(autoOpenTime),
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
