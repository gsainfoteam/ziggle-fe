import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

import { getToken } from '@/api/auth/auth';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const cookieStore = cookies();

  if (!searchParams.has('code')) {
    const uri = new URL(process.env.NEXT_PUBLIC_IDP_BASE_URL!);
    uri.pathname = '/authorize';
    uri.searchParams.set('client_id', process.env.NEXT_PUBLIC_IDP_CLIENT_ID!);
    uri.searchParams.set(
      'redirect_uri',
      process.env.NEXT_PUBLIC_IDP_REDIRECT_URI!,
    );
    uri.searchParams.set(
      'scope',
      'openid profile email student_id offline_access',
    );
    uri.searchParams.set('response_type', 'code');
    uri.searchParams.set('prompt', 'consent');
    const state = Math.random().toString(36).substring(2, 15);
    cookieStore.set('login_state', state, {
      httpOnly: true,
      path: '/api/login',
    });
    uri.searchParams.set('state', state);
    redirect(uri.toString());
  }

  const savedState = cookieStore.get('login_state');
  if (!savedState || savedState?.value !== searchParams.get('state')) {
    return NextResponse.json({ error: 'Invalid state' }, { status: 400 });
  }

  const code = searchParams.get('code');
  if (!code) {
    return NextResponse.json({ error: 'Invalid code' }, { status: 400 });
  }

  try {
    const token = await getToken(code);
    cookieStore.set('access_token', token.accessToken, { httpOnly: true });
    cookieStore.set('refresh_token', token.refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 6),
    });
    const url = request.nextUrl.clone();
    url.pathname = '/';
    url.search = '';
    return NextResponse.redirect(url);
  } catch (e) {
    return NextResponse.json({ error: 'Invalid code' }, { status: 400 });
  }
};
