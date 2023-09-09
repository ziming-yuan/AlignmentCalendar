"use server";
import { utapi } from "uploadthing/server";
import { revalidateTag } from "next/cache";
import dbConnect from "/lib/dbConnect";
import Door from "/models/door";

export async function updateDoorContent(formData) {
    const file = formData.get("file");
    const fileSizeError = formData.get("fileSizeError");
    const isFileUpdate = formData.get("isFileUpdate") === "true";
    const deleteOgFile = formData.get("deleteOgFile") === "true";
    const contentImageFileKey = formData.get("contentImageFileKey");
    const doorId = formData.get("doorId");
    if (deleteOgFile) {
        console.log("inside delete");
        // delete the previous file from uploadthing
        await utapi.deleteFiles(contentImageFileKey);
        // delete the url in the database
        await dbConnect();
        await Door.findByIdAndUpdate(doorId, {
            $set: {
                "contentImage.fileUrl": "",
                "contentImage.fileKey": "",
            },
        });
        revalidateTag("editPageDoors");
    }
    if (isFileUpdate && !fileSizeError) {
        console.log("inside upload");
        // upload the new file to uploadthing
        const { data } = await utapi.uploadFiles(file);
        // update contentImage in the database
        await Door.findByIdAndUpdate(doorId, {
            $set: {
                "contentImage.fileUrl": data.url,
                "contentImage.fileKey": data.key,
            },
        });
        revalidateTag("editPageDoors");
    }
}
