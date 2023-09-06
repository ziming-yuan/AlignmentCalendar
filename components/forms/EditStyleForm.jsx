import React from "react";
import { useContext } from "react";
import FormContext from "../contextProviders/FormContext";

export default function EditStyleForm({door}) {
    const {formRef, setIsModalOpen} = useContext(FormContext);
    const handleSubmit = ()  => {
        setIsModalOpen(false);
    }
    return (
        <form ref={formRef} onSubmit={handleSubmit}>
            <p>{door.closedDoorText}</p>
            <p>Edit Style Form</p>
        </form>
    );
}
