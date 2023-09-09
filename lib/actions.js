"use server";
import { utapi } from "uploadthing/server";
import { revalidateTag } from "next/cache";
import dbConnect from "/lib/dbConnect";
import Door from "/models/door";

export async function updateDoorContent(fileData, data, door) {
    try {
        const doorId = door._id;
        const closedDoorText = data.closedDoorText;
        const date = data.date;
        const message = data.message;
        const youtubeVideoUrl = data.youtubeVideoUrl;
        const file = fileData.get("file");
        const isFileUpdate = data.isFileUpdate;
        const deleteOgFile = data.deleteOgFile;
        const ogImageFileKey = door.contentImage.fileKey;
        await dbConnect();

        await Door.findByIdAndUpdate(doorId, {
            date: new Date(date),
            closedDoorText,
            message,
            youtubeVideoUrl,
        });

        if (deleteOgFile) {
            console.log("inside delete");

            // delete the previous file from uploadthing
            await utapi.deleteFiles(ogImageFileKey);

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
            const { data } = await utapi.uploadFiles(file);

            // update contentImage in the database
            await Door.findByIdAndUpdate(doorId, {
                $set: {
                    "contentImage.fileUrl": data.url,
                    "contentImage.fileKey": data.key,
                },
            });
        }
        revalidateTag("editPageDoors");
    } catch (error) {
        console.error("Error updating door content:", error);
        throw error; // Re-throw the error if you want the caller to be aware of it
    }
}
