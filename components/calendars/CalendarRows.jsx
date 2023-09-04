"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import ActiveButton from "./ActiveButton";
import InactiveButton from "./InactiveButton";
import {
    PencilIcon,
    EyeIcon,
    CloudArrowUpIcon,
    CloudArrowDownIcon,
    ShareIcon,
    CodeBracketIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import getAllCalendars from "/utils/dashboard/getAllCalendars";
import deleteCalendar from "/utils/dashboard/deleteCalendar";
import hideCalendar from "/utils/dashboard/hideCalendar";
import postCalendar from "/utils/dashboard/postCalenar";

export default function CalendarRows() {
    const { data: session } = useSession();
    const [calendars, setCalendars] = useState([]);

    useEffect(() => {
        if (session?.user?.id) {
            fetchCalendars(session.user.id);
        }
    }, [session]);

    async function fetchCalendars(id) {
        try {
            const response = await fetch(
                `https://${process.env.VERCEL_URL}/api/calendars/getAll/${id}`,
                {
                    next: { tags: ["getAllCalendars"] },
                }
            );
            const { data } = await response.json();
            console.log("fetched data");
            setCalendars(data);
        } catch (error) {
            console.error("Failed to fetch calendars:", error.message);
        }
    }

    return (
        <tbody>
            {calendars.map((calendar) => (
                <tr key={calendar._id} className="border-b text-sm">
                    <td className="px-4 py-2">{calendar.title}</td>
                    <td className="px-4 py-2">{calendar.description}</td>
                    <td className="px-4 py-2">
                        {calendar.isActive ? (
                            <ActiveButton />
                        ) : (
                            <InactiveButton />
                        )}
                    </td>
                    <td className="px-4 py-2">
                        <Link href={`/edit/${calendar.path}`}>
                            <button className="text-indigo-700 px-2 py-1 m-1 inline-flex items-center border-gray-100 border shadow rounded-md hover:bg-indigo-600 hover:text-white hover:border-gray-300 transition duration-150 ease-in-out">
                                Edit
                                <PencilIcon className="w-3 h-3 ml-1" />
                            </button>
                        </Link>
                        <Link href={`/calendar/${calendar.path}`}>
                            <button className="text-indigo-700 px-2 py-1 m-1 inline-flex items-center border-gray-100 border shadow rounded-md hover:bg-indigo-600 hover:text-white hover:border-gray-300 transition duration-150 ease-in-out">
                                View
                                <EyeIcon className="w-4 h-4 ml-1" />
                            </button>
                        </Link>
                        <button
                            onClick={() => postCalendar(calendar._id)}
                            className="text-indigo-700 px-2 py-1 m-1 inline-flex items-center border-gray-100 border shadow rounded-md hover:bg-indigo-600 hover:text-white hover:border-gray-300 transition duration-150 ease-in-out"
                        >
                            Post
                            <CloudArrowUpIcon className="w-4 h-4 ml-1" />
                        </button>
                        <button
                            onClick={() => hideCalendar(calendar._id)}
                            className="text-indigo-700 px-2 py-1 m-1 inline-flex items-center border-gray-100 border shadow rounded-md hover:bg-indigo-600 hover:text-white hover:border-gray-300 transition duration-150 ease-in-out"
                        >
                            Hide
                            <CloudArrowDownIcon className="w-4 h-4 ml-1" />
                        </button>
                        <button className="text-indigo-700 px-2 py-1 m-1 inline-flex items-center border-gray-100 border shadow rounded-md hover:bg-indigo-600 hover:text-white hover:border-gray-300 transition duration-150 ease-in-out">
                            Share
                            <ShareIcon className="w-3.5 h-3.5 ml-1" />
                        </button>
                        <button className="text-indigo-700 px-2 py-1 m-1 inline-flex items-center border-gray-100 border shadow rounded-md hover:bg-indigo-600 hover:text-white hover:border-gray-300 transition duration-150 ease-in-out">
                            Code
                            <CodeBracketIcon className="w-4 h-4 ml-1" />
                        </button>
                        <button
                            onClick={() => deleteCalendar(calendar._id)}
                            className="text-indigo-700 px-2 py-1 m-1 inline-flex items-center border-gray-100 border shadow rounded-md hover:bg-indigo-600 hover:text-white hover:border-gray-300 transition duration-150 ease-in-out"
                        >
                            Delete
                            <TrashIcon className="w-3.5 h-3.5 ml-1" />
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    );
}
