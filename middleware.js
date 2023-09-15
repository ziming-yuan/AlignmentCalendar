export { default } from "next-auth/middleware";

// export function middleware(request) {
//     // const origin = request.headers.get('origin');
//     // console.log(origin);
//     // console.log('Middleware!');
//     // console.log(request.method);
//     // console.log(request.url);

//     const response = NextResponse.next();

//     response.headers.set("Access-Control-Allow-Origin", "*");
//     response.headers.set(
//         "Access-Control-Allow-Methods",
//         "GET, POST, PUT, DELETE, OPTIONS"
//     );
//     response.headers.set(
//         "Access-Control-Allow-Headers",
//         "Content-Type, Authorization"
//     );
//     response.headers.set("Access-Control-Max-Age", "86400");

//     return response;
// }

export const config = {
    matcher: ["/api/:path*", "/dashboard", "/edit/:path*", "/view/:path*"],
};
