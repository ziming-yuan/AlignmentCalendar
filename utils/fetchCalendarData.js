export const fetchCalendar = async (path) => {
    try {
        const response = await fetch(
            `http://${process.env.VERCEL_URL}/api/calendars/getOne/${path}`,
            { next: { revalidate: 10 } }
        );
        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }
        const { data } = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch calendar:", error.message);
    }
};

export const fetchDoors = async (path) => {
    try {
        const response = await fetch(
            `http://${process.env.VERCEL_URL}/api/doors/getAll/${path}`,
            { next: { tags: ["editPageDoors"] } }
        );
        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }
        const { data } = await response.json();
        // Sort the doors by the date property
        const sortedDoors = data.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
        );
        return sortedDoors;
    } catch (error) {
        console.error("Failed to fetch doors:", error.message);
    }
};
