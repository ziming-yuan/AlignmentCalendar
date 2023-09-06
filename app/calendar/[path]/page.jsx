import Image from "next/image";
import DoorsComponent from "/components/view/DisplayDoors";
import { fetchCalendar, fetchDoors } from "/utils/fetchCalendarData";

export default async function ViewPage({ params }) {
    const calendar = await fetchCalendar(params.path);
    const doors = await fetchDoors(params.path);

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
                backgroundColor: backgroundImage.fileUrl
                    ? "transparent"
                    : backgroundColor,
            }}
        >
            {backgroundImage.fileUrl && (
                <Image
                    src={backgroundImage.fileUrl}
                    alt="Background Image"
                    fill
                    className="object-cover inset-0 z-0"
                />
            )}

            <header className="mt-4 relative z-10">
                {logoImage.fileUrl && (
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
                    className="text-center mt-4 text-3xl font-medium"
                    style={{ color: titleTextColor }}
                >
                    {title}
                </h1>
            </header>

            <section className="my-8 flex flex-wrap flex-none gap-4 justify-center relative z-10">
                <DoorsComponent doors={doors} />
            </section>
        </main>
    );
}
