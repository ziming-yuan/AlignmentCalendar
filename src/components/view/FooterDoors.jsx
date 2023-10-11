"use client";
import Link from "next/link";
import { useState } from "react";
import DoorsComponent from "@/components/view/DisplayDoors";

function Footer({ doors, calendarPath }) {
    const [timeInput, setTimeInput] = useState("");
    const handleTimeChange = (event) => {
        setTimeInput(event.target.value);
    };

    return (
        <>
            <section className="mt-12 mb-32 flex flex-wrap flex-none gap-4 justify-center relative z-10 mx-4 sm:mx-12 lg:mx-24">
                <DoorsComponent doors={doors} currentTime={timeInput} />
            </section>

            <footer className="fixed bottom-0 left-0 w-full p-4 flex justify-center bg-white shadow-lg z-20 gap-x-4 border-t">
                <input
                    type="datetime-local"
                    value={timeInput}
                    onChange={handleTimeChange}
                    className="border p-2 rounded-md text-sm text-indigo-600 shadow border border-indigo-300"
                />
                <Link
                    href={`/dashboard`}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-md shadow border border-gray-300 justify-center items-center flex focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white text-sm font-medium"
                >
                    Dashboard
                </Link>
                <Link
                    href={`/edit/${calendarPath}`}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-md shadow border border-gray-300 justify-center items-center flex focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white text-sm font-medium"
                >
                    Edit Page
                </Link>
            </footer>
        </>
    );
}

export default Footer;
