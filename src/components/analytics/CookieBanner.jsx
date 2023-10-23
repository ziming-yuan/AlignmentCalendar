"use client";

import Link from "next/link";
import { getLocalStorage, setLocalStorage } from "@/lib/storageHelper";
import { useState, useEffect } from "react";

export default function CookieBanner() {
    const [cookieConsent, setCookieConsent] = useState(false);

    useEffect(() => {
        const storedCookieConsent = getLocalStorage("cookie_consent", null);
        setCookieConsent(storedCookieConsent);
    }, [setCookieConsent]);

    useEffect(() => {
        const newValue = cookieConsent ? "granted" : "denied";
        window.gtag("consent", "update", {
            analytics_storage: newValue,
        });
        setLocalStorage("cookie_consent", cookieConsent);
    }, [cookieConsent]);

    return (
        <div
            className={`my-10 mx-auto max-w-max md:max-w-screen-xs fixed bottom-0 left-0 right-0 ${
                cookieConsent === null ? "flex" : "hidden"
            } px-3 md:px-4 py-3 justify-between items-center flex-col sm:flex-row gap-y-2 gap-x-4 rounded-lg shadow-lg`}
        >
            <div className="text-center text-sm">
                <Link href="#">
                    <p className="inline-flex items-center">
                        We use
                        <span className="font-bold text-indigo-400 ml-1 mr-1">
                            cookies
                        </span>
                        on our site.
                    </p>
                </Link>
            </div>

            <div className="flex gap-2">
                <button
                    className="text-sm text-indigo-700 px-2 py-1 inline-flex items-center border-gray-100 border shadow rounded-md hover:bg-indigo-600 hover:text-white hover:border-gray-300 transition duration-150 ease-in-out"
                    onClick={() => setCookieConsent(false)}
                >
                    Decline
                </button>
                <button
                    className="text-sm text-indigo-700 px-2 py-1 inline-flex items-center border-gray-100 border shadow rounded-md hover:bg-indigo-600 hover:text-white hover:border-gray-300 transition duration-150 ease-in-out"
                    onClick={() => setCookieConsent(true)}
                >
                    Allow Cookies
                </button>
            </div>
        </div>
    );
}
