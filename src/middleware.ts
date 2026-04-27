// import { NextRequest, NextResponse } from "next/server";

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get("adminAuth")?.value;
//   const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
//   console.log("TOKEN IN COOKIE:", token);
//   console.log("EXPECTED TOKEN:", process.env.ADMIN_TOKEN);

//   if (isAdminRoute && token !== process.env.ADMIN_TOKEN) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin/:path*"],
// };

import { NextRequest, NextResponse } from "next/server";

const MAINTENANCE = true; // flip to false when done

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow the maintenance page and static assets through
  if (
    pathname.startsWith("/maintenance") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/logo")
  ) {
    return NextResponse.next();
  }

  if (MAINTENANCE) {
    return NextResponse.rewrite(new URL("/maintenance", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
