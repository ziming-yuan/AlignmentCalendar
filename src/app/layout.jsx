import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/components/Providers";
import { Analytics } from "@vercel/analytics/react";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import CookieBanner from "@/components/analytics/cookieBanner";
import Favicon from "/public/favicon.ico";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Alignment Calendar",
    description:
        "Advent-styled calendar manager for Alignment: Interfaith Contemplative Practices",
    icons: [{ rel: "icon", url: Favicon.src }],
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <GoogleAnalytics
                GA_MEASUREMENT_ID={process.env.GA_MEASUREMENT_ID}
            />
            <body className={inter.className}>
                <AuthProvider>{children}</AuthProvider>
                <Analytics />
                <CookieBanner />
            </body>
        </html>
    );
}
