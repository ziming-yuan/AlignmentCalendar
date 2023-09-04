export default async function getAllCalendars(id) {
    try {
        const response = await fetch(`https://${process.env.VERCEL_URL}/api/calendars/getAll/${id}`, {
            next: { tags: ["getAllCalendars"] },
        });
        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }
        const { data } = await response.json();
        console.log("fetched data");
        return data;
    } catch (error) {
        throw new Error(`Failed to fetch calendars:, ${error.message}`);
    }
}
