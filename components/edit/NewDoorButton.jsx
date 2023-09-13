"use client";
import React, { useState, useRef } from "react";
import Modal from "../Modal";
import NewDoorForm from "../forms/NewDoorForm";
import FormContext from "../contextProviders/FormContext";

const NewDoorButton = ({ calendarId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formRef = useRef(null);

    return (
        <>
            <FormContext.Provider value={{ formRef, setIsModalOpen }}>
                <Button onButtonClick={() => setIsModalOpen(true)} />
                <Modal
                    isOpen={isModalOpen}
                    title="Create New Door"
                    ModalContent={<NewDoorForm calendarId={calendarId} />}
                    confirmLabel="Save"
                />
            </FormContext.Provider>
        </>
    );
};

function Button({ onButtonClick }) {
    return (
        <button
            onClick={onButtonClick}
            className="text-sm text-indigo-700 px-2 py-1 m-1 inline-flex items-center border-gray-100 border shadow rounded-md hover:bg-indigo-600 hover:text-white hover:border-gray-300 transition duration-150 ease-in-out"
        >
            Create New Door
        </button>
    );
}

export default NewDoorButton;
