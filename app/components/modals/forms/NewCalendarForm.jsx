'use client'
import { useState, useEffect } from 'react';

function CalendarForm() {
  const [calendarTitle, setCalendarTitle] = useState('');
  const [calendarDescription, setCalendarDescription] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [daysDiff, setDaysDiff] = useState('0');

  useEffect(() => {
    if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diff = Math.round((end - start) / (1000 * 60 * 60 * 24));
        setDaysDiff(diff);
    }
}, [startDate, endDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Calendar Title:', calendarTitle);
    // Add additional form submission logic here
  };

  return (
    <form onSubmit={handleSubmit}>
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
                <div className="  text-sm font-normal">Until</div>
                <input
                    type="date"
                    className="text-sm w-36 h-9 px-2 py-3 bg-white rounded border border-gray-300 shadow"
                    onChange={e => setEndDate(e.target.value)}
                />
                <div className="text-sm font-normal">{daysDiff} days in total</div>
            </div>
        </div>

    </form>
  );
}

export default CalendarForm;
