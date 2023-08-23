import CalendarHeader from "./CalendarHeader";
import CalendarRows from "./CalendarBody";
import NewCalendarButton from "./NewCalendarButton";
export default function CalendarTable(){
    return (
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
      );
}