'use client';
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function MyCalendars() {
  const [calendars, setCalendars] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchCalendars(email) {
      try {
        const response = await fetch(`api/calendars/${email}`);
        if (!response.ok) {
          throw new Error(`API call failed with status: ${response.status}`);
        }
        const data = await response.json();
        setCalendars(data.calendars);
      } catch (error) {
        console.error("Failed to fetch calendars:", error.message);
      }
    }

    if (session?.user?.email) {
      fetchCalendars(session.user.email);
    }
  }, [session]);

  return (
    <tbody>
      {calendars.map(calendar => (
        <tr key={calendar._id} className="border-b text-sm">
          <td className="px-4 py-2">{calendar.title}</td>
          <td className="px-4 py-2">{calendar.description}</td>
          <td className="px-4 py-2">{calendar.isActive ? "Active" : "Inactive"}</td>
          <td className="px-4 py-2">
            <button className="bg-blue-500 text-white px-2 py-1 mr-2">Edit</button>
            <button className="bg-green-500 text-white px-2 py-1 mr-2">View</button>
            <button className="bg-yellow-500 text-white px-2 py-1 mr-2">Post</button>
            <button className="bg-orange-500 text-white px-2 py-1 mr-2">Hide</button>
            <button className="bg-teal-500 text-white px-2 py-1 mr-2">Share</button>
            <button className="bg-indigo-500 text-white px-2 py-1 mr-2">Code</button>
            <button onClick={() => handleDelete(calendar._id)} className="bg-red-500 text-white px-2 py-1">Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
