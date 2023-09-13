import Navbar from "/components/Navbar.jsx";
import { fetchCalendar, fetchDoors } from "/utils/fetchCalendarData";
import DoorsSection from "/components/edit/DoorsSection";
import ViewPageButton from "/components/edit/ViewPageButton";
import EditGeneralButton from "/components/edit/EditGeneralButton";
import NewDoorButton from "/components/edit/NewDoorButton";

export default async function EditPage({ params }) {
    const calendar = await fetchCalendar(params.path);
    const doors = await fetchDoors(params.path);

    if (!doors || !calendar) {
        return;
    }

    return (
        <div>
            <Navbar isDashboard={false} />
            <div className="container mx-auto p-6 pt-16">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Edit Calendars</h1>
                    <ViewPageButton calendarPath={calendar.path} />
                </div>
                <div className="flex sm:justify-between mb-4 items-center flex-col sm:flex-row">
                    <h2 className="text-lg font-semibold mb-2 sm:mb-0">
                        {calendar.title}
                    </h2>
                    <div className="flex">
                        <EditGeneralButton calendar={calendar} />
                        <NewDoorButton calendarId={calendar._id} />
                    </div>
                </div>
                <DoorsSection doors={doors} />
            </div>
        </div>
    );
}
