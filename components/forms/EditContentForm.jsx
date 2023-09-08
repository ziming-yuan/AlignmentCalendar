import React from "react";
import { useState, useContext } from "react";
import FormContext from "../contextProviders/FormContext";
import TipTap from "/components/rte/TipTap";
import Dropzone from "/components/Dropzone";

const formatDate = (inputDate) => {
    const d = new Date(inputDate);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
};
const validateYouTubeUrl = (url) => {
    const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return pattern.test(url);
};

export default function EditContentForm({ door }) {
    const { formRef, setIsModalOpen } = useContext(FormContext);
    const [date, setDate] = useState(door.date ? formatDate(door.date) : "");
    const [closedDoorText, setClosedDoorText] = useState(
        door.closedDoorText || ""
    );
    const [youtubeVideoUrl, setYoutubeVideoUrl] = useState(
        door.youtubeVideoUrl || ""
    );
    const initialMessage = door.message || "";
    const [message, setMessage] = useState(door.message || "");
    const [contentImage, setContentImage] = useState(
        door.contentImage || { fileUrl: "", fileKey: "" }
    );
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submitted");

        if (youtubeVideoUrl && !validateYouTubeUrl(youtubeVideoUrl)) {
            setError("Please enter a valid YouTube URL");
            return;
        }

        setIsModalOpen(false);
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit}>
            {/* Door Date */}
            <div className="relative flex flex-col mb-4 gap-y-2">
                <label className="text-base font-medium" htmlFor="doorDate">
                    Door Date
                </label>
                <input
                    id="doorDate"
                    type="date"
                    className="flex-grow px-2 py-2 bg-white text-sm rounded border border-gray-300 shadow"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <p className="text-sm text-gray-500">The date of the door.</p>
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
                    value={closedDoorText}
                    onChange={(e) => setClosedDoorText(e.target.value)}
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
                    value={youtubeVideoUrl}
                    onChange={(e) => setYoutubeVideoUrl(e.target.value)}
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
                <TipTap desc={initialMessage} setDesc={setMessage} />
                <p className="text-sm text-gray-500">
                    The message shown once door is open.
                </p>
            </div>

            {/* Image */}
            <div className="relative flex flex-col mb-4 gap-y-2">
                <label className="text-base font-medium" htmlFor="doorImage">
                    Image
                </label>
                <Dropzone
                    uploadFiles={null}
                    defaultImageUrl={contentImage.fileUrl}
                />
                <p className="text-sm text-gray-500">
                    The image displayed when user opens the door.
                </p>
            </div>
            {/* Error message */}
            {error && (
                <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                    {error}
                </div>
            )}
        </form>
    );
}
