import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const password = body.password;

  if (password === process.env.ADMIN_PASSWORD) {
    const response = NextResponse.json({ success: true });
    response.cookies.set('adminAuth', process.env.ADMIN_TOKEN!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24,
    });
    return response;
  }

  return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 401 });
}
