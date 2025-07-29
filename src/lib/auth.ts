import { cookies } from 'next/headers';

export function isAdminLoggedIn() {
  return cookies().get('adminAuth')?.value === process.env.ADMIN_TOKEN;
}