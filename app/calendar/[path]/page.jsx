import Image from "next/image";

const fetchCalendar = async (path) => {
  try {
    const response = await fetch(`http://localhost:3000/api/calendars/getOne/${path}`);
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch calendar:", error.message);
  }
};

const fetchDoors = async (path) => {
  try {
    const response = await fetch(`http://localhost:3000/api/doors/getAll/${path}`);
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch doors:", error.message);
  }
}

export default async function ViewPage({ params }) {
  const calendar = await fetchCalendar(params.path);
  const doors = await fetchDoors(params.path);

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