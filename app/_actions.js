"use server";
import { utapi } from "uploadthing/server";
import { revalidateTag } from "next/cache";
import dbConnect from "/lib/dbConnect";
import Door from "/models/door";

export async function updateDoorContent(fileData, formData, door) {
    "use server";
    const file = fileData.get("file");
    const doorId = door._id;
    const closedDoorText = formData.closedDoorText;
    const date = formData.date;
    const message = formData.message;
    const youtubeVideoUrl = formData.youtubeVideoUrl;
    const isFileUpdate = formData.isFileUpdate;
    const deleteOgFile = formData.deleteOgFile;
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
        console.log(ogImageFileKey);

        try {
            // delete the previous file from uploadthing
            await utapi.deleteFiles(ogImageFileKey);
        } catch (e) {
            console.log("delete uploadthing error", e);
        }

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
        try {
            // upload the new file to uploadthing
            const { data } = await utapi.uploadFiles(file);
            // update contentImage in the database
            await Door.findByIdAndUpdate(doorId, {
                $set: {
                    "contentImage.fileUrl": data.url,
                    "contentImage.fileKey": data.key,
                },
            });
        } catch (e) {
            console.log("update error", e);
        }
    }
    revalidateTag("editPageDoors");
}
