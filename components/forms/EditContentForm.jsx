import React from "react";
import { useContext } from "react";
import FormContext from "../contextProviders/FormContext";
import TipTap from "/components/rte/TipTap";
import Dropzone from "/components/Dropzone";
import { useForm, Controller } from "react-hook-form";

import { updateDoorContent } from "/app/api/_actions";

const formatDate = (inputDate) => {
    const d = new Date(inputDate);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    let hour = "" + d.getHours();
    let minute = "" + d.getMinutes();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    if (hour.length < 2) hour = "0" + hour;
    if (minute.length < 2) minute = "0" + minute;

    return `${year}-${month}-${day}T${hour}:${minute}`;
};

export default function EditContentForm({ door }) {
    const { formRef, setIsModalOpen } = useContext(FormContext);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        control,
        setValue,
    } = useForm({
        defaultValues: {
            date: door.date ? formatDate(door.date) : "",
            closedDoorText: door.closedDoorText,
            youtubeVideoUrl: door.youtubeVideoUrl,
            message: door.message,
            file: "",
            deleteOgFile: false,
            isFileUpdate: false,
        },
    });

    const processData = async (data) => {
        const fileData = new FormData();
        fileData.append("file", data.file); // file is not serializable unless wrapped inside FormData
        data["file"] = "";
        const imageResponse = await updateDoorContent(fileData, data, door);
        setIsModalOpen(false);
    };

    // const processData = async (data) => {
    //     try {
    //         const formData = new FormData();
    //         // Append the file
    //         formData.append("file", data.file);
    //         // Remove the file from the data object
    //         delete data.file;
    //         for (const key in data) {
    //             formData.append(key, data[key]);
    //         }
    //         formData.append("doorId", door._id);
    //         formData.append("ogImageFileKey", door.contentImage.fileKey);
    //         const response = await fetch("/api/edit/updateContent", {
    //             method: "POST",
    //             body: formData,
    //         });
    //         if (!response.ok) {
    //             const errorData = await response.json();
    //             console.error(
    //                 "Error while updating content:",
    //                 errorData.message
    //             );
    //             return;
    //         }
    //         setIsModalOpen(false);
    //     } catch (error) {
    //         console.error("Error making the request:", error);
    //     }
    // };

    return (
        <form ref={formRef} onSubmit={handleSubmit(processData)}>
            {/* Door Date & Time */}
            <div className="relative flex flex-col mb-4 gap-y-2">
                <label className="text-base font-medium" htmlFor="doorDateTime">
                    Door Date & Time
                </label>
                <input
                    id="doorDateTime"
                    type="datetime-local"
                    className="flex-grow px-2 py-2 bg-white text-sm rounded border border-gray-300 shadow"
                    {...register("date")}
                />
                <p className="text-sm text-gray-500">
                    The date and time of the door.
                </p>
            </div>

            {/* Door Text */}
            <div className="relative flex flex-col mb-4 gap-y-2">
                <label className="text-base font-medium" htmlFor="doorText">
                    Closed Door Text
                </label>
                <input
                    id="doorText"
                    type="text"
                    className="flex-grow px-2 py-2 bg-white text-sm rounded border border-gray-300 shadow"
                    {...register("closedDoorText")}
                />
                <p className="text-sm text-gray-500">
                    The text displayed on the door when it&apos;s closed.
                    Default is the date.
                </p>
            </div>

            {/* Youtube Video */}
            <div className="relative flex flex-col mb-4 gap-y-2">
                <label className="text-base font-medium" htmlFor="youtubeVideo">
                    Youtube Video URL
                </label>
                <input
                    id="youtubeVideo"
                    type="url"
                    className="flex-grow px-2 py-2 bg-white text-sm rounded border border-gray-300 shadow"
                    {...register("youtubeVideoUrl", {
                        pattern:
                            /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/,
                    })}
                />
                <p className="text-sm text-gray-500">
                    Link to Youtube video when door is open.
                </p>
            </div>

            {/* Message */}
            <div className="relative flex flex-col mb-4 gap-y-2">
                <label className="text-base font-medium" htmlFor="doorMessage">
                    Message
                </label>
                <Controller
                    name="message"
                    control={control}
                    render={({ field }) => (
                        <TipTap
                            onFileChange={field.onChange}
                            initialMessage={field.value}
                        />
                    )}
                />
                <p className="text-sm text-gray-500">
                    The message shown once door is open.
                </p>
            </div>

            {/* Image */}
            <div className="relative flex flex-col mb-4 gap-y-2">
                <label className="text-base font-medium" htmlFor="doorImage">
                    Image
                </label>
                <Controller
                    name="file"
                    control={control}
                    render={({ field }) => (
                        <Dropzone
                            defaultImageUrl={door.contentImage.fileUrl}
                            onFileChange={field.onChange}
                            setValue={setValue}
                        />
                    )}
                />

                <p className="text-sm text-gray-500">
                    The image displayed when user opens the door.
                </p>
            </div>

            {/* Error message */}
            {errors.youtubeVideoUrl && (
                <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                    Please enter a valid YouTube URL.
                </div>
            )}
        </form>
    );
}
