'use client';
import React, { useState, useRef } from 'react';
import Modal from '../Modal';
import NewCalendarForm from "../forms/NewCalendarForm"
import FormContext from '../contextProviders/FormContext';

export default function NewCalendarButton(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formRef = useRef(null);
    
    return (
        <>
        <FormContext.Provider value={{formRef, setIsModalOpen}}>
            <Button onButtonClick={() => setIsModalOpen(true)} />
            <Modal 
                isOpen={isModalOpen}
                title="New Calendar"
                ModalContent={<NewCalendarForm/>}
                confirmLabel="Create"
            />
        </FormContext.Provider>
        </>
    );
}

function Button({ onButtonClick }) {
    return (
        <button 
            onClick={onButtonClick}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-md shadow border border-gray-300 justify-center items-center flex focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
            <span className="text-white text-sm font-medium">New Calendar</span>
        </button>
    );
}

/*
Component structure:
    NewCalendarForm >> Modal >> NewCalendarButton
FormProvider:
    formRef: used in Modal and NewCalendarForm
    setIsModalOpen: used in Modal and NewCalendarForm
*/

