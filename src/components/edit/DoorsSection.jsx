"use client";
import { useState } from 'react';
import DoorCard from './DoorCard';

export default function DoorsSection({doors}) {
    const [openMenuDoorId, setOpenMenuDoorId] = useState(null);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doors.map((door) => (
          <DoorCard 
            door={door} 
            key={door._id}
            isOpen={door._id === openMenuDoorId}
            onMenuToggle={(id) => {
              if (id === openMenuDoorId) {
                setOpenMenuDoorId(null);
              } else {
                setOpenMenuDoorId(id);
              }
            }} 
          />
        ))}
      </div>
    )
    
}
