import Image from "next/image";
import DoorsComponent from "/components/view/DisplayDoors";
import { fetchCalendar, fetchDoors } from "/utils/fetchCalendarData";
import Link from "next/link";

export default async function ViewPage({ params }) {
    const calendar = await fetchCalendar(params.path);
    const doors = await fetchDoors(params.path);

    if (!doors || !calendar) {
        notFound();
    }

    const {
        logoImage,
        title,
        titleTextColor,
        backgroundImage,
        backgroundColor,
    } = calendar;

    return (
        <main
            className="p-4 h-full min-h-screen relative overflow-hidden"
            style={{
                backgroundColor: backgroundImage?.fileUrl
                    ? "transparent"
                    : backgroundColor,
            }}
        >
            {backgroundImage?.fileUrl && (
                <Image
                    src={backgroundImage.fileUrl}
                    alt="Background Image"
                    fill
                    className="object-cover inset-0 z-0"
                />
            )}

            <header className="mt-6 relative z-10">
                {logoImage?.fileUrl && (
                    <div className="flex justify-center items-center">
                        <Image
                            src={logoImage.fileUrl}
                            alt="Logo Image"
                            width={400}
                            height={400}
                            priority={true}
                        />
                    </div>
                )}
                <h1
                    className="text-center mt-6 text-3xl font-medium"
                    style={{ color: titleTextColor }}
                >
                    {title}
                </h1>
            </header>

            <section className="mt-12 mb-32 flex flex-wrap flex-none gap-4 justify-center relative z-10 mx-4 sm:mx-12 lg:mx-24">
                <DoorsComponent doors={doors} />
            </section>

            {/* Fixed Footer */}
            <footer className="fixed bottom-0 left-0 w-full p-4 flex justify-center bg-white shadow-lg z-20 gap-x-4">
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-md shadow border border-gray-300 justify-center items-center flex focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <Link
                        href={`/dashboard`}
                        className="text-white text-sm font-medium"
                    >
                        Dashboard
                    </Link>
                </button>
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-md shadow border border-gray-300 justify-center items-center flex focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <Link
                        href={`/edit/${calendar.path}`}
                        className="text-white text-sm font-medium"
                    >
                        Edit Page
                    </Link>
                </button>
            </footer>
        </main>
    );
}
