"use server";
import { utapi } from "uploadthing/server";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import dbConnect from "/lib/dbConnect";
import Door from "/models/door";

// export async function updateDoorContent(fileData, formData, door) {
//     try {
//         const file = fileData.get("file");
//         const doorId = door._id;
//         const closedDoorText = formData.closedDoorText;
//         const date = formData.date;
//         const message = formData.message;
//         const youtubeVideoUrl = formData.youtubeVideoUrl;
//         const isFileUpdate = formData.isFileUpdate;
//         const deleteOgFile = formData.deleteOgFile;
//         const ogImageFileKey = door.contentImage.fileKey;
//         await dbConnect();

//         await Door.findByIdAndUpdate(doorId, {
//             date: new Date(date),
//             closedDoorText,
//             message,
//             youtubeVideoUrl,
//         });

//         if (deleteOgFile) {
//             console.log("inside delete");
//             console.log(ogImageFileKey);

//             // delete the previous file from uploadthing
//             await utapi.deleteFiles(ogImageFileKey);

//             // delete the url in the database
//             await Door.findByIdAndUpdate(doorId, {
//                 $set: {
//                     "contentImage.fileUrl": "",
//                     "contentImage.fileKey": "",
//                 },
//             });
//         }

//         if (isFileUpdate) {
//             console.log("inside update");
//             // upload the new file to uploadthing
//             const { data } = await utapi.uploadFiles(file);

//             // update contentImage in the database
//             await Door.findByIdAndUpdate(doorId, {
//                 $set: {
//                     "contentImage.fileUrl": data.url,
//                     "contentImage.fileKey": data.key,
//                 },
//             });
//         }
//         revalidateTag("editPageDoors");
//     } catch (error) {
//         console.error("Error updating door content:", error);
//         throw error;
//     }
// }

export async function uploadImages(formData) {
    const doorId = formData.get("doorId");
    const contentImage = formData.get("contentImage");
    const contentImgU = formData.get("contentImage-fileUpdated") == "true";
    const contentImgOgD = formData.get("contentImage-ogFileDelted") == "true";
    const contentImgKey = formData.get("contentImgKey");

    const closedDoorImage = formData.get("closedDoorImage");
    const doorImgU = formData.get("closedDoorImage-fileUpdated") == "true";
    const doorImgOgD = formData.get("closedDoorImage-ogFileDelted") == "true";
    const closedImgKey = formData.get("closedImgKey");
    try {
        await dbConnect();
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
    } catch (e) {
        console.log(e);
    }
    revalidateTag("editPageDoors");
}

export async function updateDoorContent(formData) {
    try {
        const doorId = formData.doorId;
        const closedDoorText = formData.closedDoorText;
        const date = formData.date;
        const message = formData.message;
        const youtubeVideoUrl = formData.youtubeVideoUrl;
        const closedDoorColor = formData.closedDoorColor;
        const closedDoorTextColor = formData.closedDoorTextColor;
        const autoOpenTime = formData.autoOpenTime;
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
        revalidateTag("editPageDoors");
    } catch (error) {
        console.error("Error updating door content:", error);
        throw error;
    }
}
