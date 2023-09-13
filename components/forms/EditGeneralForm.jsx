import React from "react";
import { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import FormContext from "../contextProviders/FormContext";
import Dropzone from "/components/Dropzone";
import { updateCalendarContent } from "/app/_actions";

export default function EditGeneralForm({ calendar }) {
    const { formRef, setIsModalOpen } = useContext(FormContext);
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: {
            title: calendar.title,
            titleTextColor: calendar.titleTextColor,
            backgroundColor: calendar.backgroundColor,
            calendarId: calendar._id,
            logoImgKey: calendar.logoImage.fileKey,
            backgroundImgKey:
                calendar.backgroundImage && calendar.backgroundImage.fileKey,
        },
    });

    const updateCalendarData = async (data) => {
        const imageData = new FormData();
        imageData.append("backgroundImage", data.backgroundImage);
        imageData.append("logoImage", data.logoImage);
        data["logoImage"] = "";
        data["backgroundImage"] = "";
        console.log(data);
        await updateCalendarContent(data, imageData);
        setIsModalOpen(false);
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit(updateCalendarData)}>
            {/* Calendar Title */}
            <div className="relative flex flex-col mb-4 gap-y-2">
                <label className="text-base font-medium">Calendar Title</label>
                <input
                    type="text"
                    className="flex-grow px-2 py-2 bg-white text-sm rounded border border-gray-300 shadow"
                    {...register("title", { required: true })}
                />
                <p className="text-sm text-gray-500">Title of the calendar.</p>
            </div>

            {/* Title Text Color */}
            <div className="relative flex flex-col mb-4 gap-y-2">
                <label className="text-base font-medium">
                    Title Text Color
                </label>
                <div className="flex items-center">
                    <input
                        id="titleTextColor"
                        type="color"
                        className="rounded"
                        {...register("titleTextColor")}
                    />
                    <label className="ml-3 text-sm" htmlFor="titleTextColor">
                        {watch("titleTextColor")}
                    </label>
                </div>
                <p className="text-sm text-gray-500">
                    Color of the calendar title text.
                </p>
            </div>

            {/* Logo Image */}
            <div className="relative flex flex-col mb-4 gap-y-2">
                <label className="text-base font-medium">Logo Image</label>
                <Controller
                    name="logoImage"
                    control={control}
                    render={({ field }) => (
                        <Dropzone
                            defaultImageUrl={
                                calendar.logoImage && calendar.logoImage.fileUrl
                            }
                            onFileChange={field.onChange}
                            setValue={setValue}
                            name={"logoImage"}
                        />
                    )}
                />
                <p className="text-sm text-gray-500">
                    Logo image of the calendar.
                </p>
            </div>

            {/* Background Image */}
            <div className="relative flex flex-col mb-4 gap-y-2">
                <label className="text-base font-medium">
                    Background Image
                </label>
                <Controller
                    name="backgroundImage"
                    control={control}
                    render={({ field }) => (
                        <Dropzone
                            defaultImageUrl={
                                calendar.backgroundImage &&
                                calendar.backgroundImage.fileUrl
                            }
                            onFileChange={field.onChange}
                            setValue={setValue}
                            name={"backgroundImage"}
                        />
                    )}
                />
                <p className="text-sm text-gray-500">
                    Background image of the calendar. Will override background
                    color.
                </p>
            </div>

            {/* Background Color */}
            <div className="relative flex flex-col mb-4 gap-y-2">
                <label className="text-base font-medium">
                    Background Color
                </label>
                <div className="flex items-center">
                    <input
                        id="backgroundColor"
                        type="color"
                        className="rounded"
                        {...register("backgroundColor")}
                    />
                    <label className="ml-3 text-sm" htmlFor="backgroundColor">
                        {watch("backgroundColor")}
                    </label>
                </div>
                <p className="text-sm text-gray-500">
                    Background color of the calendar.
                </p>
            </div>

            {/* Error message */}
            {errors.title && (
                <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                    Please give calendar a title.
                </div>
            )}
        </form>
    );
}
