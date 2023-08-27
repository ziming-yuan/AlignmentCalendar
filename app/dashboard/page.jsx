'use client';
import Navbar from '/components/Navbar.jsx';
import CalendarTable from '/components/calendars/CalendarTable.jsx';
import RouterContext from '/components/contextProviders/RouterContext.js'
import { useRouter } from 'next/navigation';

function HomePage() {
  const router = useRouter();
  return (
    <RouterContext.Provider value={{router: router}}>
      <div>
        <Navbar />
        <CalendarTable />
      </div>
    </RouterContext.Provider>
  );
}

export default HomePage;
