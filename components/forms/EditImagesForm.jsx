import React from "react";
import { useContext } from "react";
import FormContext from "../contextProviders/FormContext";
import Dropzone from "/components/Dropzone1";
import { uploadImages } from "/app/_actions";

export default function EditImagesForm({ door }) {
    const { formRef, setIsModalOpen } = useContext(FormContext);
    // const handleSubmit = () => {
    //     setIsModalOpen(false);
    // };
    return (
        <form ref={formRef} action={uploadImages}>
            {/* <input type="hidden" name="path" value={path} /> */}
            <input type="hidden" name="doorId" value={door._id} />
            <input
                type="hidden"
                name="contentImgKey"
                value={door.contentImage.fileKey}
            />
            <input
                type="hidden"
                name="closedImgKey"
                value={door.closedDoorImage.fileKey}
            />
            {/* Content Image */}
            <div className="relative flex flex-col mb-4 gap-y-2">
                <label className="text-base font-medium" htmlFor="doorImage">
                    Content Image
                </label>
                <Dropzone
                    defaultImageUrl={door.contentImage.fileUrl}
                    name={"contentImage"}
                />
                <p className="text-sm text-gray-500">
                    The image displayed when the door is open.
                </p>
            </div>
            {/* Closed Door Image */}
            <div className="relative flex flex-col mb-4 gap-y-2">
                <label className="text-base font-medium" htmlFor="doorImage">
                    Closed Door Image
                </label>
                <Dropzone
                    defaultImageUrl={door.closedDoorImage.fileUrl}
                    name={"closedDoorImage"}
                />
                <p className="text-sm text-gray-500">
                    The background image displayed once door is closed. Will
                    override closed-door color.
                </p>
            </div>
        </form>
    );
}
