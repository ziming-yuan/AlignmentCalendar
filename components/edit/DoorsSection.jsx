"use client";
import DoorCard from "./DoorCard";
import { useState } from 'react';

export default function DoorsSection({ doors }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {doors.map((door) => (
                <DoorCard door={door} key={door._id} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
            ))}
        </div>
    );
}
