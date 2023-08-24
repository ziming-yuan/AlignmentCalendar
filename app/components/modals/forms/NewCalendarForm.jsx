'use client'
import { useState, useEffect, useContext } from 'react';
import FormContext from '../../contextProviders/FormContext';
import RouterContext from '../../contextProviders/RouterContext';
import { useSession } from "next-auth/react";

function NewCalendarForm() {
  const [calendarTitle, setCalendarTitle] = useState('');
  const [calendarDescription, setCalendarDescription] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [daysDiff, setDaysDiff] = useState('0');
  const [error, setError] = useState(null);
  const {formRef, setIsModalOpen} = useContext(FormContext);
  const {router} = useContext(RouterContext);
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
          setDaysDiff(diff+1);
        }
      }
    }, [startDate, endDate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!calendarTitle || !calendarDescription || !startDate || !endDate) {
            setError("All fields required");
            return;
        }
        else if (daysDiff < 0){
            setError("Invalid date duration");
            return;
        }
        const calendarResponse = await fetch("api/calendars", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: session.user.email,
                title: calendarTitle,
                description: calendarDescription,
            })
        });

        if (calendarResponse.ok) {
            console.log('Calendar created successfully.');
        } else {
            setError("Failed to create a new calendar. Please try again.");
        }
        const { data } = await calendarResponse.json();
        const calendarId = data._id;

        const doorsResponse = await fetch("api/doors/post-multiple", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                calendarId: calendarId,
                startDate: startDate,
                endDate: endDate
            })
        });

        if (doorsResponse.ok){
            setIsModalOpen(false);  // Call the onConfirm prop, which will close the modal
            console.log('Doors created successfully.');
            // Refresh the page - currently not working
            router.replace("/dashboard", { scroll: true });
            console.log("refreshed?");
        } else {
            setError("Failed to create doors. Please try again.");
        }
    };

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
        {/* Calendar Title */}
        <div className="relative flex flex-col mb-4 space-y-2">
            <label className="text-sm font-medium" htmlFor="calendarTitle">
                Calendar Title
            </label>
            <input
                id="calendarTitle"
                type="text"
                className="flex-grow mt-1 px-2 py-2 bg-white text-sm rounded border border-gray-300 shadow"
                value={calendarTitle}
                onChange={(e) => setCalendarTitle(e.target.value)}
            />
            <p className="mt-1 text-xs text-gray-500">
                What your calendar will be called when viewed by others.
            </p>
        </div>

        {/* Calendar Description */}
        <div className="relative flex flex-col mb-4 space-y-2">
            <label className="text-sm font-medium" htmlFor="calendarTitle">
                Calendar Description
            </label>
            <input
                id="calendarTitle"
                type="text"
                className="flex-grow mt-1 px-2 py-2 bg-white text-sm rounded border border-gray-300 shadow"
                value={calendarDescription}
                onChange={(e) => setCalendarDescription(e.target.value)}
            />
            <p className="mt-1 text-xs text-gray-500">
            A description of your calendar’s contents for your reference.
            </p>
        </div>

        {/* Date range */}
        <div className="relative flex flex-col mb-4 space-y-2">
            <div className="text-sm font-medium">
                Calendar Duration
            </div>
            <p className="mt-1 text-xs text-gray-500">
                What your calendar will be called when viewed by others.
            </p>

            <div className="flex items-center space-x-4 mb-2">
                <div className="  text-sm font-normal">From</div>
                <input
                    type="date"
                    className="text-sm w-36 h-9 px-2 py-3 bg-white rounded border border-gray-300 shadow"
                    onChange={e => setStartDate(e.target.value)}
                />
                <div className="text-sm font-normal">Until</div>
                <input
                    type="date"
                    className="text-sm w-36 h-9 px-2 py-3 bg-white rounded border border-gray-300 shadow"
                    onChange={e => setEndDate(e.target.value)}
                />
                <div className="text-sm font-normal">{daysDiff} days in total</div>
            </div>
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
