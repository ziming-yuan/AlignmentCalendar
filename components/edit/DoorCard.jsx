"use client";

import { useState, useRef } from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import FormContext from "../contextProviders/FormContext";
import EditContentForm from "../forms/EditContentForm";
import EditStyleForm from "../forms/EditStyleForm";
import Modal from "../Modal";

export default function DoorCard({ door, isOpen, onMenuToggle }) {
    const formRef = useRef(null);
    const [isEdit, setIsEdit] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleMenuToggle = () => {
        onMenuToggle(door._id);
    };

    return (
        <div className="border border-gray-100 rounded-lg shadow-lg relative">
            <div className="flex justify-between items-center border-b px-4 py-2">
                <h2 className="text-base text-indigo-600">
                    {door.closedDoorText}
                </h2>
                <button onClick={handleMenuToggle}>
                    <EllipsisHorizontalIcon className="h-5 w-5" />
                </button>
                {isOpen && (
                    <FormContext.Provider value={{ formRef, setIsModalOpen }}>
                        <div className="absolute right-4 top-8 py-1 w-30 bg-white rounded-md shadow-xl z-10 border border-gray-100 divide divide-y divide-gray-200">
                            <EditStyleButton
                                onButtonClick={() => {
                                    setIsModalOpen(true);
                                    setIsEdit(true);
                                }}
                            />
                            <EditContentButton
                                onButtonClick={() => {
                                    setIsModalOpen(true);
                                    setIsEdit(false);
                                }}
                            />
                            {isEdit ? (
                                <Modal
                                    isOpen={isModalOpen}
                                    title={`${door.closedDoorText} - Edit Style`}
                                    ModalContent={<EditStyleForm door={door} />}
                                    confirmLabel="Save"
                                />
                            ) : (
                                <Modal
                                    isOpen={isModalOpen}
                                    title={`${door.closedDoorText} - Edit Content`}
                                    ModalContent={
                                        <EditContentForm door={door} />
                                    }
                                    confirmLabel="Save"
                                />
                            )}
                        </div>
                    </FormContext.Provider>
                )}
            </div>
            <div className="p-4">
                <p>{door.message}</p>
            </div>
        </div>
    );
}

function EditStyleButton({ onButtonClick }) {
    return (
        <button
            onClick={onButtonClick}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-indigo-500/25"
        >
            Edit Style
        </button>
    );
}

function EditContentButton({ onButtonClick }) {
    return (
        <button
            onClick={onButtonClick}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-indigo-500/25"
        >
            Edit Content
        </button>
    );
}
