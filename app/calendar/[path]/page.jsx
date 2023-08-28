'use client';
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ViewPage({ params }) {
  const [calendar, setCalendar] = useState(null);

  const fetchCalendar = async () => {
    try {
      const response = await fetch(`/api/calendars/getOne/${params.path}`);
      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }
      const { data } = await response.json();
      setCalendar(data);
    } catch (error) {
      console.error("Failed to fetch calendar:", error.message);
    }
  };

  useEffect(() => {
    fetchCalendar();
  }, []);

  if (!calendar) {
    return <p>Loading...</p>;
  }

  const { logoImage, title, titleTextColor, backgroundImage, backgroundColor } =
    calendar;

  return (
    <main 
      className="p-8" 
      style= {{backgroundColor: backgroundImage.fileUrl ? "transparent" : backgroundColor}}
    >

      {backgroundImage.fileUrl && (
          <Image
            src={backgroundImage.fileUrl}
            alt="Background Image"
            quality="100"
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
              display: "none",
            }}
          />
        )}

      <header>
        {logoImage.fileUrl && (
          <div className="flex justify-center items-center">
            <Image
              src={logoImage.fileUrl}
              alt="Logo Image"
              width={400}
              height={400}
              priority={true}
              style={{
                height: "auto",
              }}
            />
          </div>
        )}
        <h1 className="text-center mt-4 text-3xl font-medium" style={{ color: titleTextColor }}>{title}</h1>
      </header>

      <section>
        {/* Render the doors */}

      </section>
    </main>
  );
}