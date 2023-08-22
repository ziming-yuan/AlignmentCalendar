'use client';
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ActiveButton from "./ActiveButton";
import InactiveButton from "./InactiveButton";
import {PencilIcon, EyeIcon, CloudArrowUpIcon, CloudArrowDownIcon, ShareIcon, CodeBracketIcon, TrashIcon} from "@heroicons/react/24/outline";

export default function MyCalendars() {
  const [calendars, setCalendars] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.email) {
      fetchCalendars(session.user.email);
    }
  }, [session]);

  async function fetchCalendars(email) {
    try {
      const response = await fetch(`api/calendars/GET/${email}`);
      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }
      const data = await response.json();
      setCalendars(data.calendars);
    } catch (error) {
      console.error("Failed to fetch calendars:", error.message);
    }
  }
  
  async function handleDelete(calendarId) {
    try {
      const response = await fetch(`api/calendars/DELETE/${calendarId}`, {method: 'DELETE'});
      if (session?.user?.email) {
        fetchCalendars(session.user.email);
      }
    } catch (error) {
      console.error("Failed to fetch calendars:", error.message);
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
            <button className="text-indigo-700 px-2 py-1 mr-2 inline-flex items-center">
              Edit
              <PencilIcon className="w-3 h-3 ml-1"/>
            </button>
            <button className="text-indigo-700 px-2 py-1 mr-2 inline-flex items-center">
              View 
              <EyeIcon  className="w-4 h-4 ml-1"/>
            </button>
            <button className="text-indigo-700 px-2 py-1 mr-2 inline-flex items-center">
              Post
              <CloudArrowUpIcon  className="w-4 h-4 ml-1"/>
            </button>
            <button className="text-indigo-700 px-2 py-1 mr-2 inline-flex items-center">
              Hide
              <CloudArrowDownIcon  className="w-4 h-4 ml-1"/>
            </button>
            <button className="text-indigo-700 px-2 py-1 mr-2 inline-flex items-center">
              Share
              <ShareIcon  className="w-3.5 h-3.5 ml-1"/>
            </button>
            <button className="text-indigo-700 px-2 py-1 mr-2 inline-flex items-center">
              Code
              <CodeBracketIcon  className="w-4 h-4 ml-1"/>
            </button>
            <button onClick={() => handleDelete(calendar._id)} className="text-indigo-700 px-2 py-1 inline-flex items-center">
              Delete
              <TrashIcon  className="w-3.5 h-3.5 ml-1"/>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
