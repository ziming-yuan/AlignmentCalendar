'use client';

import CalendarHeader from "./CalendarHeader";
import CalendarRows from "./CalendarRows";
import NewCalendarButton from "./NewCalendarButton";
import FetchContext from "../contextProviders/FetchContext";
import { useState } from "react";

export default function CalendarTable(){
    const [fetchFlag, setFetchFlag] = useState(false);
    return (
        <FetchContext.Provider value={{fetchFlag, setFetchFlag}}>
            <div className="container mx-auto p-6 pt-16">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">Your Calendars</h1>
                    <NewCalendarButton />
                </div>
                <table className="min-w-full table-auto my-4">
                    <CalendarHeader />
                    <CalendarRows />
                </table>
            </div>
        </FetchContext.Provider>
      );
}