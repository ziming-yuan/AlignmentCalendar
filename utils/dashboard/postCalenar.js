export default async function postCalendar(calendarId) {
    try {
        const doorsResponse = await fetch(
            `https://${process.env.VERCEL_URL}/api/calendars/changeActive`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    calendarId: calendarId,
                    isActive: true,
                }),
            }
        );
        // revalidate
        await fetch(
            `https://${process.env.VERCEL_URL}/api/revalidate?tag=getAllCalendars&secret=9asdfkjhq`
        );
    } catch (error) {
        console.log("Failed to post calendar:", error.message);
    }
}