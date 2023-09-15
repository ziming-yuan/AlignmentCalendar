"use client";
import Link from "next/link";

const ViewPageButton = ({ calendarPath }) => {
    return (
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-md shadow border border-gray-300 justify-center items-center flex focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <Link
                href={`/view/${calendarPath}`}
                className="text-white text-sm font-medium"
            >
                View Page
            </Link>
        </button>
    );
};

export default ViewPageButton;
