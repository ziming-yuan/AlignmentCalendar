import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "../components/Providers";
import Favicon from "/public/favicon.ico";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Advent Calendar",
    description: "Advent-styled calendar for Interfaith Alignment",
    icons: [{ rel: "icon", url: Favicon.src }],
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider>{children}</AuthProvider>
            </body>
        </html>
    );
}
