export { default } from "next-auth/middleware";
import { NextResponse } from "next/server";

export function middleware(request) {
    const response = NextResponse.next();

    if (request.nextUrl.pathname.startsWith("/calendar/")) {
        response.headers.delete("X-Frame-Options");
    }

    return response;
}

export const config = {
    matcher: ["/dashboard", "/edit/:path*", "/view/:path*"],
};
// "/api/:path*",
