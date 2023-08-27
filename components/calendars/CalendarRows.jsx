'use client';
import React, { useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import ActiveButton from "./ActiveButton";
import InactiveButton from "./InactiveButton";
import { PencilIcon, EyeIcon, CloudArrowUpIcon, CloudArrowDownIcon, ShareIcon, CodeBracketIcon, TrashIcon } from "@heroicons/react/24/outline";
import FetchContext from "../contextProviders/FetchContext";
import Link from "next/link";

export default function CalendarRows() {
  const [calendars, setCalendars] = useState([]);
  const { data: session } = useSession();
  const {fetchFlag, setFetchFlag} = useContext(FetchContext);

  useEffect(() => {
    if (session?.user?.email) {
      fetchCalendars(session.user.id);
    }
  }, [session]);

  useEffect(() => {
    if (session?.user?.email) {
      fetchCalendars(session.user.id);
    }
  }, [fetchFlag]);

  async function fetchCalendars(id) {
    try {
      const response = await fetch(`api/calendars/get/${id}`);
      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }
      const { data } = await response.json();
      console.log("fetched data");
      setCalendars(data);
    } catch (error) {
      console.error("Failed to fetch calendars:", error.message);
    }
  }
  
  async function handleDelete(calendarId) {
    try {
      const response = await fetch(`api/calendars/delete/${calendarId}`, {method: 'DELETE'});
      setFetchFlag(!fetchFlag);
    } catch (error) {
      console.error("Failed to fetch calendars:", error.message);
    }
  }

  async function handlePost(calendarId) {
    try {
      const doorsResponse = await fetch("api/calendars/changeActive", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            calendarId: calendarId,
            isActive: true
        })
      });
      setFetchFlag(!fetchFlag);
    } catch (error) {
      console.log("Failed to post calendar:", error.message);
    }
  }

  async function handleHide(calendarId) {
    try {
      const doorsResponse = await fetch("api/calendars/changeActive", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            calendarId: calendarId,
            isActive: false
        })
      });
      setFetchFlag(!fetchFlag);
    } catch (error) {
      console.log("Failed to post calendar:", error.message);
    }
  }

  return (
    <tbody>
    {calendars.map(calendar => (
      <tr key={calendar._id} className="border-b text-sm">
        <td className="px-4 py-2">{calendar.title}</td>
        <td className="px-4 py-2">{calendar.description}</td>
        <td className="px-4 py-2">{calendar.isActive ? <ActiveButton/> : <InactiveButton/>}</td>
        <td className="px-4 py-2">
          <Link href={`/edit/${calendar.path}`}>
            <button
              className="text-indigo-700 px-2 py-1 m-1 inline-flex items-center border-gray-100 border shadow rounded-md hover:bg-indigo-600 hover:text-white hover:border-gray-300 transition duration-150 ease-in-out"
            >
              Edit
              <PencilIcon className="w-3 h-3 ml-1"/>
            </button>
          </Link>
          <Link href={`/calendar/${calendar.path}`}>
            <button 
              className="text-indigo-700 px-2 py-1 m-1 inline-flex items-center border-gray-100 border shadow rounded-md hover:bg-indigo-600 hover:text-white hover:border-gray-300 transition duration-150 ease-in-out"
            >
                View 
                <EyeIcon  className="w-4 h-4 ml-1"/>
            </button>
          </Link>
          <button
            onClick={() => handlePost(calendar._id)}
            className="text-indigo-700 px-2 py-1 m-1 inline-flex items-center border-gray-100 border shadow rounded-md hover:bg-indigo-600 hover:text-white hover:border-gray-300 transition duration-150 ease-in-out"
          >
            Post
            <CloudArrowUpIcon  className="w-4 h-4 ml-1"/>
          </button>
          <button
            onClick={() => handleHide(calendar._id)}
            className="text-indigo-700 px-2 py-1 m-1 inline-flex items-center border-gray-100 border shadow rounded-md hover:bg-indigo-600 hover:text-white hover:border-gray-300 transition duration-150 ease-in-out"
          >
            Hide
            <CloudArrowDownIcon  className="w-4 h-4 ml-1"/>
          </button>
          <button
            className="text-indigo-700 px-2 py-1 m-1 inline-flex items-center border-gray-100 border shadow rounded-md hover:bg-indigo-600 hover:text-white hover:border-gray-300 transition duration-150 ease-in-out"
          >
            Share
            <ShareIcon  className="w-3.5 h-3.5 ml-1"/>
          </button>
          <button
            className="text-indigo-700 px-2 py-1 m-1 inline-flex items-center border-gray-100 border shadow rounded-md hover:bg-indigo-600 hover:text-white hover:border-gray-300 transition duration-150 ease-in-out"
          >
            Code
            <CodeBracketIcon  className="w-4 h-4 ml-1"/>
          </button>
          <button 
            onClick={() => handleDelete(calendar._id)} 
            className="text-indigo-700 px-2 py-1 m-1 inline-flex items-center border-gray-100 border shadow rounded-md hover:bg-indigo-600 hover:text-white hover:border-gray-300 transition duration-150 ease-in-out"
          >
            Delete
            <TrashIcon  className="w-3.5 h-3.5 ml-1"/>
          </button>
        </td>
      </tr>
    ))}
    </tbody>
  );
};
