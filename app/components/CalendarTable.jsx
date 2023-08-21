'use client'
import CalendarHeader from "./CalendarHeader";
import CalendarRows from "./CalendarBody";
export default function CalendarTable(){
    return (
        <div className="container mx-auto p-6 pt-16">
          <h1 className="text-2xl font-bold mb-8">Your Calendars</h1>
          <table className="min-w-full table-auto m-4">
            <CalendarHeader />
            <CalendarRows />
          </table>
        </div>
      );
}