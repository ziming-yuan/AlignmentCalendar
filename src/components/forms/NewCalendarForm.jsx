"use client";
import { useState, useEffect, useContext } from "react";
import FormContext from "../contextProviders/FormContext";
import FetchContext from "../contextProviders/FetchContext";
import { useSession } from "next-auth/react";

function NewCalendarForm() {
    const [calendarTitle, setCalendarTitle] = useState("");
    const [calendarDescription, setCalendarDescription] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [daysDiff, setDaysDiff] = useState("0");
    const [error, setError] = useState(null);
    const { formRef, setIsModalOpen, setIsLoading } = useContext(FormContext);
    const { fetchFlag, setFetchFlag } = useContext(FetchContext);
    const { data: session } = useSession();

    useEffect(() => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diff = Math.round((end - start) / (1000 * 60 * 60 * 24));

            if (diff < 0) {
                setError("Invalid duration");
            } else {
                setError(null);
                setDaysDiff(diff + 1);
            }
        }
    }, [startDate, endDate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (!calendarTitle || !calendarDescription || !startDate || !endDate) {
            setError("All fields required");
            setIsLoading(false);
            return;
        } else if (daysDiff < 0) {
            setError("Invalid date duration");
            setIsLoading(false);
            return;
        }
        const calendarResponse = await fetch("api/calendars", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: session.user.id,
                title: calendarTitle,
                description: calendarDescription,
            }),
        });

        if (calendarResponse.ok) {
            console.log("Calendar created successfully.");
        } else {
            setError("Failed to create a new calendar. Please try again.");
            setIsLoading(false);
            return;
        }
        const { data } = await calendarResponse.json();
        const calendarId = data._id;

        const doorsResponse = await fetch("api/doors/initializeDoors", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                calendarId: calendarId,
                startDate: startDate,
                endDate: endDate,
            }),
        });

        if (doorsResponse.ok) {
            setIsLoading(false);
            setIsModalOpen(false); // Call the onConfirm prop, which will close the modal
            console.log("Doors created successfully.");
            setFetchFlag(!fetchFlag); // Set fetchFlag, which prompt CalendarRows to refetch calendars
        } else {
            setError("Failed to create doors. Please try again.");
            setIsLoading(false);
            return;
        }
    };

    return (
        <form onSubmit={handleSubmit} ref={formRef}>
            {/* Calendar Title */}
            <div className="relative flex flex-col mb-4 gap-y-2">
                <label
                    className="text-base font-medium"
                    htmlFor="calendarTitle"
                >
                    Calendar Title
                </label>
                <input
                    id="calendarTitle"
                    type="text"
                    className="flex-grow px-2 py-2 bg-white text-sm rounded border border-gray-300 shadow"
                    value={calendarTitle}
                    onChange={(e) => setCalendarTitle(e.target.value)}
                />
                <p className="text-sm text-gray-500">
                    What your calendar will be called when viewed by others.
                </p>
            </div>

            {/* Calendar Description */}
            <div className="relative flex flex-col mb-4 gap-y-2">
                <label
                    className="text-base font-medium"
                    htmlFor="calendarTitle"
                >
                    Calendar Description
                </label>
                <input
                    id="calendarTitle"
                    type="text"
                    className="flex-grow px-2 py-2 bg-white text-sm rounded border border-gray-300 shadow"
                    value={calendarDescription}
                    onChange={(e) => setCalendarDescription(e.target.value)}
                />
                <p className="text-sm text-gray-500">
                    A description of your calendar’s contents for your
                    reference.
                </p>
            </div>

            {/* Date range */}
            <div className="relative flex flex-col mb-4 gap-y-3">
                <div className="text-base font-medium">Calendar Duration</div>

                <div className="flex items-center flex-wrap gap-y-2 gap-x-4">
                    <div className="text-sm font-normal">From</div>
                    <input
                        type="date"
                        className="text-sm w-36 h-9 px-2 py-3 bg-white rounded border border-gray-300 shadow"
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <div className="text-sma font-normal">Until</div>
                    <input
                        type="date"
                        className="text-sm w-36 h-9 px-2 py-3 bg-white rounded border border-gray-300 shadow"
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    <div className="text-sm font-normal">
                        {daysDiff} days in total
                    </div>
                </div>

                <p className="text-sm text-gray-500">
                    Duration of the calendar.
                </p>
            </div>

            {/* Error message */}
            {error && (
                <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                    {error}
                </div>
            )}
        </form>
    );
}

export default NewCalendarForm;
