// src/middleware.ts
// Admin route protection is handled by the admin layout component
// which checks is_admin from the JWT via useAuth hook.
// No middleware needed — removing old cookie-based guard.

import { NextResponse } from "next/server";

export function middleware() {
  return NextResponse.next();
}

// No matcher — middleware does nothing, passes all requests through
export const config = {
  matcher: [],
};
