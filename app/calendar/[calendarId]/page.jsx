export default function Page({params}) {
    console.log(crypto.randomUUID());
    return (<p>Post: {params.calendarId} {crypto.randomUUID()}</p>);
}