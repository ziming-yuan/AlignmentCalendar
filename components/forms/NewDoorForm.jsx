import React from "react";
import { useContext } from "react";
import FormContext from "../contextProviders/FormContext";
import TipTap from "/components/rte/TipTap";
import { useForm, Controller } from "react-hook-form";
import { createNewDoor } from "/app/_actions";
import Dropzone from "/components/Dropzone";

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

export default function EditContentForm({ calendarId }) {
    const { formRef, setIsModalOpen, setIsLoading } = useContext(FormContext);

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: {
            calendarId: calendarId,
            name: "",
            date: "",
            closedDoorText: "",
            youtubeVideoUrl: "",
            message: "",
            closedDoorColor: "#FFFFFF",
            closedDoorTextColor: "#000000",
            contentImgKey: "",
            contentImageFileUpdated: false,
            contentImageOgFileDeleted: false,
            closedImgKey: "",
            closedDoorImageFileUpdated: false,
            closedDoorImageOgFileDeleted: false,
            autoOpenTime: "",
        },
    });

    const processData = async (data) => {
        setIsLoading(true);
        const imageData = new FormData();
        imageData.append("contentImage", data.contentImage); // file is not serializable unless wrapped inside FormData
        imageData.append("closedDoorImage", data.closedDoorImage);
        data["contentImage"] = "";
        data["closedDoorImage"] = "";
        await createNewDoor(data, imageData);
        setIsModalOpen(false);
        setIsLoading(false);
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit(processData)}>
            {/* Door Name */}
            <div className="relative flex flex-col mb-4 gap-y-2">
                <label className="text-base font-medium">Door Name</label>
                <input
                    type="text"
                    className="flex-grow px-2 py-2 bg-white text-sm rounded border border-gray-300 shadow"
                    {...register("name", { required: true })}
                />
                <p className="text-sm text-gray-500">
                    Name of the door for your reference.
                </p>
                {errors.name && (
                    <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md">
                        Please enter a name for the door.
                    </div>
                )}
            </div>

            {/* Door Date & Time */}
            <div className="relative flex flex-col mb-4 gap-y-2">
                <label className="text-base font-medium">
                    Door Date & Time
                </label>
                <input
                    type="datetime-local"
                    className="flex-grow px-2 py-2 bg-white text-sm rounded border border-gray-300 shadow"
                    {...register("date", { required: true })}
                />
                <p className="text-sm text-gray-500">
                    The date and time of the door.
                </p>
                {errors.date && (
                    <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md">
                        Please enter a door date.
                    </div>
                )}
            </div>

            {/* Auto Open Time */}
            <div className="relative flex flex-col mb-4 gap-y-2">
                <label className="text-base font-medium">Auto Open Time</label>
                <input
                    type="datetime-local"
                    className="flex-grow px-2 py-2 bg-white text-sm rounded border border-gray-300 shadow"
                    {...register("autoOpenTime", { required: true })}
                />
                <p className="text-sm text-gray-500">
                    When the door automatically opens.
                </p>
                {errors.autoOpenTime && (
                    <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md">
                        Please set auto open time.
                    </div>
                )}
            </div>

            {/* Youtube Video */}
            <div className="relative flex flex-col mb-4 gap-y-2">
                <label className="text-base font-medium">
                    Youtube Video URL
                </label>
                <input
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
                {errors.youtubeVideoUrl && (
                    <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                        Please enter a valid YouTube URL.
                    </div>
                )}
            </div>

            {/* Message */}
            <div className="relative flex flex-col mb-4 gap-y-2">
                <label className="text-base font-medium">Message</label>
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

            {/* Content Image */}
            <div className="relative flex flex-col mb-4 gap-y-2">
                <label className="text-base font-medium" htmlFor="doorImage">
                    Content Image
                </label>
                <Controller
                    name="contentImage"
                    control={control}
                    render={({ field }) => (
                        <Dropzone
                            defaultImageUrl={""}
                            onFileChange={field.onChange}
                            setValue={setValue}
                            name={"contentImage"}
                        />
                    )}
                />

                <p className="text-sm text-gray-500">
                    The image displayed when the door is open.
                </p>
            </div>

            {/* Closed Door Text */}
            <div className="relative flex flex-col mb-4 gap-y-2">
                <label className="text-base font-medium">
                    Closed Door Text
                </label>
                <input
                    type="text"
                    className="flex-grow px-2 py-2 bg-white text-sm rounded border border-gray-300 shadow"
                    {...register("closedDoorText")}
                />
                <p className="text-sm text-gray-500">
                    The text displayed on the door when it&apos;s closed.
                    Default is the date.
                </p>
            </div>

            {/* Closed Door Text Color */}
            <div className="relative flex flex-col mb-4 gap-y-2">
                <label className="text-base font-medium">
                    Closed Door Text Color
                </label>
                <div className="flex items-center ">
                    <input
                        id="closedDoorTextColor"
                        type="color"
                        className="rounded border border-gray-300"
                        {...register("closedDoorTextColor")}
                    />
                    <label
                        htmlFor="closedDoorTextColor"
                        className="ml-3 text-sm"
                    >
                        {watch("closedDoorTextColor")}
                    </label>
                </div>
                <p className="text-sm text-gray-500">
                    The color of the closed-door text.
                </p>
            </div>

            {/* Closed Door Image */}
            <div className="relative flex flex-col mb-4 gap-y-2">
                <label className="text-base font-medium" htmlFor="doorImage">
                    Closed Door Image
                </label>
                <Controller
                    name="closedDoorImage"
                    control={control}
                    render={({ field }) => (
                        <Dropzone
                            defaultImageUrl={""}
                            onFileChange={field.onChange}
                            setValue={setValue}
                            name={"closedDoorImage"}
                        />
                    )}
                />
                <p className="text-sm text-gray-500">
                    The background image displayed once door is closed. Will
                    override closed-door color.
                </p>
            </div>

            {/* Closed Door Color */}
            <div className="relative flex flex-col mb-4 gap-y-2">
                <label className="text-base font-medium">
                    Closed Door Color
                </label>
                <div className="flex items-center">
                    <input
                        id="closedDoorColor"
                        type="color"
                        className="rounded border border-gray-300"
                        {...register("closedDoorColor")}
                    />
                    <label className="ml-3 text-sm" htmlFor="closedDoorColor">
                        {watch("closedDoorColor")}
                    </label>
                </div>
                <p className="text-sm text-gray-500">
                    Background color of the door when it is closed.
                </p>
            </div>
        </form>
    );
}
