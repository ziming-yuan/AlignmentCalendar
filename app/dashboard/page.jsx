import Navbar from "/components/Navbar.jsx";
import CalendarTable from "/components/dashboard/CalendarTable.jsx";

function HomePage() {
    return (
        <div>
            <Navbar isDashboard={true} />
            <CalendarTable />
        </div>
    );
}

export default HomePage;
