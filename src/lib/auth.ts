import { cookies } from 'next/headers';

export async function isAdminLoggedIn() {
  const cookieStore = await cookies();
  const token = cookieStore.get('adminAuth')?.value;
  return token === process.env.ADMIN_TOKEN;
}