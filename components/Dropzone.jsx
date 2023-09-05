"use client";
import { useRef, useState } from "react";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export default function MyForm({ uploadFiles }) {
    const fileInputRef = useRef(null);
    const [isDragActive, setIsDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileSizeError, setFileSizeError] = useState(null);

    const handleFileChange = (file) => {
        if (file.size > 0.5 * 1024 * 1024) {
            setFileSizeError("File size exceeds the 8MB limit.");
            setSelectedFile(null);
        } else {
            setFileSizeError(null);
            setSelectedFile(file);
        }
    };

    const removeFile = () => {
        setSelectedFile(null);
        setFileSizeError(null); // optionally reset any errors
        fileInputRef.current.value = ""; // reset the input field
    };

    const handleStyledDivClick = () => {
        fileInputRef.current.click();
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDragEnter = (event) => {
        event.preventDefault();
        setIsDragActive(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        setIsDragActive(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragActive(false);

        if (event.dataTransfer.items) {
            if (event.dataTransfer.items[0].kind === "file") {
                const file = event.dataTransfer.items[0].getAsFile();
                fileInputRef.current.files = event.dataTransfer.files;
                handleFileChange(file);
            }
        }
    };

    return (
        <form action={uploadFiles}>
            <input
                ref={fileInputRef}
                name="files"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e.target.files[0])}
            />
            <div
                role="presentation"
                className={`flex flex-col items-center justify-center gap-4 border border-dashed border-gray-900/25 px-4 py-8 ${
                    isDragActive && "bg-indigo-300/25"
                }`}
                onClick={handleStyledDivClick}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <ArrowUpTrayIcon className="w-5 h-5 fill-current" />
                {isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                    <p className="text-indigo-600 hover:text-indigo-500 ">
                        Choose files or drag and drop
                    </p>
                )}
            </div>

            <button type="submit" className="border border-gray-500">
                Upload
            </button>
            {selectedFile && <span className="ml-4">{selectedFile.name}</span>}
            {selectedFile && (
                <div className="relative mt-4 h-fit w-fit rounded-md shadow-lg">
                    <Image
                        src={URL.createObjectURL(selectedFile)}
                        alt={selectedFile.name}
                        width={100}
                        height={100}
                        className="object-contain rounded-md"
                    />
                    <button
                        type="button"
                        className="w-6 h-6 border border-rose-400 bg-rose-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors"
                        onClick={removeFile}
                    >
                        <XMarkIcon className="w-5 h-5 fill-white hover:fill-rose-400 transition-colors" />
                    </button>
                </div>
            )}
            {fileSizeError && <p className="text-red-500">{fileSizeError}</p>}
        </form>
    );
}
