"use client";

import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useState } from 'react';

export default function DoorCard({ door }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="border border-gray-100 rounded-lg shadow-lg relative"> {/* Add relative positioning here */}
            <div className="flex justify-between items-center border-b px-4 py-2">
                <h2 className="text-base text-indigo-600">{door.closedDoorText}</h2>
                <button onClick={() => setMenuOpen(!menuOpen)}>
                    <EllipsisHorizontalIcon className="h-5 w-5" />
                </button>
                {menuOpen && (
                <div className="absolute right-4 top-8 py-1 w-30 bg-white rounded-md shadow-xl z-10 border border-gray-100 divide divide-y divide-gray-200"> {/* Adjust positioning and width here */}
                    <button className="block w-full text-left px-4 py-2 text-sm hover:bg-indigo-500/25">Edit Style</button>
                    <button className="block w-full text-left px-4 py-2 text-sm hover:bg-indigo-500/25">Edit Content</button>
                </div>
            )}
            </div>
            <div className="p-4">
                <p>{door.message}</p>
            </div>
        </div>
    );
}