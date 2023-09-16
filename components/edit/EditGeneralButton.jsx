"use client";
import React, { useState, useRef } from "react";
import Modal from "../Modal";
import EditGeneralForm from "../forms/EditGeneralForm";
import FormContext from "../contextProviders/FormContext";

const EditGeneralButton = ({ calendar }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const formRef = useRef(null);

    return (
        <>
            <FormContext.Provider
                value={{ formRef, setIsModalOpen, setIsLoading }}
            >
                <Button onButtonClick={() => setIsModalOpen(true)} />
                <Modal
                    isOpen={isModalOpen}
                    title="Edit General Styling"
                    ModalContent={<EditGeneralForm calendar={calendar} />}
                    confirmLabel="Save"
                    isConfirmButtonDisabled={isLoading}
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
            Edit General Styling
        </button>
    );
}

export default EditGeneralButton;
