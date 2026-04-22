import { cookies } from 'next/headers';

const COOKIE_NAME = 'trip-auth';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value === 'true';
}

export function getAuthCookieOptions() {
  return {
    name: COOKIE_NAME,
    value: 'true',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  };
}
