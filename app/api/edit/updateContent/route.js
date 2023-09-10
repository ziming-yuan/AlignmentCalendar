import { NextResponse } from "next/server";
import dbConnect from "/lib/dbConnect";
import Door from "/models/door";
import { revalidateTag } from "next/cache";
import { utapi } from "uploadthing/server";

export async function POST(req) {
    try {
        await dbConnect();
        const formData = await req.formData();
        const file = formData.get("file");
        const doorId = formData.get("doorId");
        const closedDoorText = formData.get("closedDoorText");
        const date = formData.get("date");
        const message = formData.get("message");
        const youtubeVideoUrl = formData.get("youtubeVideoUrl");
        const isFileUpdate = formData.get("isFileUpdate") == "true";
        const deleteOgFile = formData.get("deleteOgFile") == "true";
        const ogImageFileKey = formData.get("ogImageFileKey");

        await dbConnect();
        await Door.findByIdAndUpdate(doorId, {
            date: new Date(date),
            closedDoorText,
            message,
            youtubeVideoUrl,
        });
        console.log(file);

        console.log(deleteOgFile);
        if (deleteOgFile) {
            console.log("inside delete");
            console.log(ogImageFileKey);

            // delete the previous file from uploadthing
            const deleteFileResponse = await utapi.deleteFiles(ogImageFileKey);
            console.log(deleteFileResponse);
            // delete the url in the database
            await Door.findByIdAndUpdate(doorId, {
                $set: {
                    "contentImage.fileUrl": "",
                    "contentImage.fileKey": "",
                },
            });
        }

        if (isFileUpdate) {
            console.log("inside update");
            // upload the new file to uploadthing
            const response = await utapi.uploadFiles(file);
            console.log(response);
            const { data } = response;
            // update contentImage in the database
            await Door.findByIdAndUpdate(doorId, {
                $set: {
                    "contentImage.fileUrl": data.url,
                    "contentImage.fileKey": data.key,
                },
            });
        }
        revalidateTag("editPageDoors");
        return NextResponse.json(
            { message: "Successfully updated door content" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error updating door content:", error);
        return NextResponse.json(
            { message: "Error updating door content" },
            { status: 500 }
        );
    }
}
