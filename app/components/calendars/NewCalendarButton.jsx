'use client';
import React, { useState } from 'react';
import Modal from "../modals/Modal"
import NewCalendarForm from "../modals/forms/NewCalendarForm"

export default function NewCalendarButton(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    return (
        <>
            <Button onButtonClick={() => setIsModalOpen(true)} />
            <Modal 
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                title="New Calendar"
                ModalContent = {NewCalendarForm}
                confirmLabel="Next"
            />
        </>
    );
}

function Button({ onButtonClick }) {
    return (
        <button 
            onClick={onButtonClick}
            className="px-4 py-2 bg-indigo-600 rounded-md shadow border border-gray-300 justify-center items-center flex focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
            <span className="text-white text-sm font-medium">New Calendar</span>
        </button>
    );
}

// async function onConfirm() {
//     try {
//         // Close the modal
//         setIsModalOpen(false);
        
//         // Execute async operation
//         await api.deleteAccount();
        
//         // Provide success feedback
//         alert("Your account has been successfully deactivated");
//     } catch (error) {
//         // Handle error
//         console.error("There was an issue deactivating the account:", error);
//         alert("There was an error deactivating your account. Please try again later.");
//     }
// }

