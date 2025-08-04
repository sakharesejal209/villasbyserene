import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("adminAuth")?.value;
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  console.log("TOKEN IN COOKIE:", token);
  console.log("EXPECTED TOKEN:", process.env.ADMIN_TOKEN);
  
  if (isAdminRoute && token !== process.env.ADMIN_TOKEN) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
