'use client';

export default function NewCalendarButton(){
    return (
        <button className="px-4 py-2 bg-indigo-600 rounded-md shadow border border-gray-300 justify-center items-center flex focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <span className="text-white text-sm font-medium">New Calendar</span>
        </button>
    );
}