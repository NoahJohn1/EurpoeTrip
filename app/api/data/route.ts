import { NextRequest, NextResponse } from 'next/server';
import { getTripData, saveTripData } from '@/lib/storage';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  const data = await getTripData();
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const url = await saveTripData(body);

  const response = NextResponse.json({ ok: true, url });
  // Store blob URL in env-less way via cookie for serverless cold starts
  response.cookies.set({
    name: 'trip-data-url',
    value: url,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
  });
  return response;
}
