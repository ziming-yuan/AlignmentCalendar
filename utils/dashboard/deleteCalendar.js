export default async function deleteCalendar(calendarId) {
    try {
        const response = await fetch(
            `https://${process.env.VERCEL_URL}/api/calendars/delete/${calendarId}`,
            { method: "DELETE" }
        );
        // revalidate
        await fetch(
            `https://${process.env.VERCEL_URL}/api/revalidate?tag=getAllCalendars&secret=9asdfkjhq`
        );
    } catch (error) {
        console.error("Failed to fetch calendars:", error.message);
    }
}
