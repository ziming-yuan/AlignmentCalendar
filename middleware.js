import nextAuthMiddleware from "next-auth/middleware";
import { NextResponse } from "next/server";

export async function middleware(request) {
    const authResponse =
        (await nextAuthMiddleware(request)) || NextResponse.next();

    if (request.nextUrl.pathname.startsWith("/calendar/")) {
        authResponse.headers.delete("X-Frame-Options");
    }

    return authResponse;
}

export const config = {
    matcher: ["/dashboard", "/edit/:path*", "/view/:path*"],
};
