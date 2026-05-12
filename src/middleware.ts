import { NextResponse } from "next/server";

export function middleware() {
  return NextResponse.next();
}

// No matcher — middleware does nothing, passes all requests through
export const config = {
  matcher: [],
};
