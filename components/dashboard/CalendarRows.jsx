"use client";
import React, { useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
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
import FetchContext from "../contextProviders/FetchContext";
import Link from "next/link";

export default function CalendarRows() {
    const [calendars, setCalendars] = useState([]);
    const [activeTooltipId, setActiveTooltipId] = useState(null);
    const [activeEmbedId, setActiveEmbedId] = useState(null);
    const { data: session } = useSession();
    const { fetchFlag, setFetchFlag } = useContext(FetchContext);

    useEffect(() => {
        if (session?.user?.id) {
            fetchCalendars(session.user.id);
        }
    }, [session]);

    useEffect(() => {
        if (session?.user?.id) {
            fetchCalendars(session.user.id);
        }
    }, [fetchFlag, session?.user?.id]);

    async function fetchCalendars(id) {
        try {
            const response = await fetch(`api/calendars/getAll/${id}`);
            if (!response.ok) {
                throw new Error(
                    `API call failed with status: ${response.status}`
                );
            }
            const { data } = await response.json();
            setCalendars(data);
        } catch (error) {
            console.error("Failed to fetch calendars:", error.message);
        }
    }

    async function handleDelete(calendarId) {
        try {
            const response = await fetch(`api/calendars/delete/${calendarId}`, {
                method: "DELETE",
            });
            setFetchFlag(!fetchFlag);
        } catch (error) {
            console.error("Failed to fetch calendars:", error.message);
        }
    }

    async function handlePost(calendarId) {
        try {
            const doorsResponse = await fetch("api/calendars/changeActive", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    calendarId: calendarId,
                    isActive: true,
                }),
            });
            setFetchFlag(!fetchFlag);
        } catch (error) {
            console.log("Failed to post calendar:", error.message);
        }
    }

    async function handleHide(calendarId) {
        try {
            const doorsResponse = await fetch("api/calendars/changeActive", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    calendarId: calendarId,
                    isActive: false,
                }),
            });
            setFetchFlag(!fetchFlag);
            revalidateTag("editPageCalendar");
            revalidateTag("editPageDoors");
        } catch (error) {
            console.log("Failed to post calendar:", error.message);
        }
    }

    async function handleShare(path, id) {
        try {
            await navigator.clipboard.writeText(
                `http://${process.env.NEXT_PUBLIC_VERCEL_URL}/calendar/${path}`
            );
            console.log("copied");
            setActiveTooltipId(id);
            setTimeout(() => setActiveTooltipId(null), 1000);
        } catch (err) {
            console.error("Failed to copy the link:", err);
        }
    }

    async function handleEmbed(path, id) {
        try {
            const embedCode = `<iframe src="http://${process.env.NEXT_PUBLIC_VERCEL_URL}/calendar/${path}" id="alignment-calendar" frameBorder="0" style="width: 100%"></iframe><script src="https://${process.env.NEXT_PUBLIC_VERCEL_URL}/autoResize.js"></script>`;

            await navigator.clipboard.writeText(embedCode);
            console.log("Embed code copied");
            setActiveEmbedId(id);
            setTimeout(() => setActiveEmbedId(null), 1000);
        } catch (err) {
            console.error("Failed to copy the embed code:", err);
        }
    }

    return (
        <tbody>
            {calendars.map((calendar) => (
                <tr key={calendar._id} className="border-b text-sm">
                    <td className="px-2 sm:px-4 py-2 table-cell">
                        {calendar.title}
                        <div className="sm:hidden mt-2">
                            {calendar.isActive ? (
                                <ActiveButton />
                            ) : (
                                <InactiveButton />
                            )}
                        </div>
                    </td>
                    <td className="px-2 sm:px-4 py-2">
                        {calendar.description}
                    </td>
                    <td className="hidden sm:table-cell px-2 sm:px-4 py-2">
                        {calendar.isActive ? (
                            <ActiveButton />
                        ) : (
                            <InactiveButton />
                        )}
                    </td>
                    <td className="px-2 sm:px-4 py-2">
                        <Link href={`/edit/${calendar.path}`}>
                            <button className="text-indigo-700 px-2 py-1 m-1 inline-flex items-center border-gray-100 border shadow rounded-md hover:bg-indigo-600 hover:text-white hover:border-gray-300 transition duration-150 ease-in-out">
                                Edit
                                <PencilIcon className="w-3 h-3 ml-1" />
                            </button>
                        </Link>
                        <Link href={`/view/${calendar.path}`}>
                            <button className="text-indigo-700 px-2 py-1 m-1 inline-flex items-center border-gray-100 border shadow rounded-md hover:bg-indigo-600 hover:text-white hover:border-gray-300 transition duration-150 ease-in-out">
                                View
                                <EyeIcon className="w-4 h-4 ml-1" />
                            </button>
                        </Link>
                        <button
                            onClick={() => handlePost(calendar._id)}
                            className={`text-indigo-700 px-2 py-1 m-1 inline-flex items-center border-gray-100 border shadow rounded-md ${
                                calendar.isActive
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-indigo-600 hover:text-white hover:border-gray-300"
                            } transition duration-150 ease-in-out`}
                            disabled={calendar.isActive}
                        >
                            Post
                            <CloudArrowUpIcon className="w-4 h-4 ml-1" />
                        </button>
                        <button
                            onClick={() => handleHide(calendar._id)}
                            className={`text-indigo-700 px-2 py-1 m-1 inline-flex items-center border-gray-100 border shadow rounded-md ${
                                !calendar.isActive
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-indigo-600 hover:text-white hover:border-gray-300"
                            } transition duration-150 ease-in-out`}
                            disabled={!calendar.isActive}
                        >
                            Hide
                            <CloudArrowDownIcon className="w-4 h-4 ml-1" />
                        </button>
                        <div
                            style={{
                                position: "relative",
                                display: "inline-block",
                            }}
                        >
                            <button
                                onClick={() =>
                                    handleShare(calendar.path, calendar._id)
                                }
                                className={`text-indigo-700 px-2 py-1 m-1 inline-flex items-center border-gray-100 border shadow rounded-md ${
                                    !calendar.isActive
                                        ? "opacity-50 cursor-not-allowed"
                                        : "hover:bg-indigo-600 hover:text-white hover:border-gray-300"
                                } transition duration-150 ease-in-out`}
                                disabled={!calendar.isActive}
                            >
                                Share
                                <ShareIcon className="w-3.5 h-3.5 ml-1" />
                            </button>
                            {activeTooltipId === calendar._id && (
                                <div
                                    style={{
                                        position: "absolute",
                                        bottom: "100%",
                                        left: "50%",
                                        transform:
                                            "translateX(-50%) translateY(-5px)", // Translate Y to give a little gap
                                        padding: "5px",
                                        backgroundColor: "black",
                                        color: "white",
                                        borderRadius: "5px",
                                    }}
                                >
                                    Copied!
                                </div>
                            )}
                        </div>

                        <div
                            style={{
                                position: "relative",
                                display: "inline-block",
                            }}
                        >
                            <button
                                onClick={() =>
                                    handleEmbed(calendar.path, calendar._id)
                                }
                                className="text-indigo-700 px-2 py-1 m-1 inline-flex items-center border-gray-100 border shadow rounded-md hover:bg-indigo-600 hover:text-white hover:border-gray-300 transition duration-150 ease-in-out"
                            >
                                Code
                                <ShareIcon className="w-3.5 h-3.5 ml-1" />
                            </button>
                            {activeEmbedId === calendar._id && (
                                <div
                                    style={{
                                        position: "absolute",
                                        bottom: "100%",
                                        left: "50%",
                                        transform:
                                            "translateX(-50%) translateY(-5px)", // Translate Y to give a little gap
                                        padding: "5px",
                                        backgroundColor: "black",
                                        color: "white",
                                        borderRadius: "5px",
                                    }}
                                >
                                    Copied!
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => handleDelete(calendar._id)}
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
