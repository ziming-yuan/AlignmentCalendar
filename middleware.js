import { default as nextAuthMiddleware } from "next-auth/middleware";

export async function middleware(request) {
    const authResponse = await nextAuthMiddleware(request);

    if (request.nextUrl.pathname.startsWith("/calendar/")) {
        authResponse.headers.delete("X-Frame-Options");
    }

    return authResponse;
}
export const config = {
    matcher: ["/dashboard", "/edit/:path*", "/view/:path*"],
};
