"use client";
import React, { useEffect } from "react";

const Page = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "http://localhost:3000/autoResize.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            // Remove script when component is unmounted
            document.body.removeChild(script);
        };
    });

    return (
        <div className="w-full">
            <iframe
                src="http://localhost:3000/calendar/b64b37b5-9f47-4520-9bc8-2efc8de0562a"
                id="alignment-calendar"
                style={{
                    width: "100%",
                    minHeight: "600px",
                    scrolling: "no",
                    // frameBorder: "0",
                }}
            ></iframe>
        </div>
    );
};

export default Page;
