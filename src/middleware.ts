import acceptLanguage from 'accept-language';
import { NextRequest, NextResponse } from 'next/server';

import { cookieName, fallbackLng, languages } from './app/i18next/settings';

acceptLanguage.languages([...languages]);

const getLang = (req: NextRequest) => {
  if (req.cookies.has(cookieName)) {
    const lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
    if (lng) return lng;
  }
  const lng = acceptLanguage.get(req.headers.get('Accept-Language'));
  if (lng) return lng;
  return fallbackLng;
};

export async function middleware(req: NextRequest) {
  const lng = getLang(req);
  // Redirect if lng in path is not supported
  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url),
    );
  }

  const referer = req.headers.get('referer');
  const response = NextResponse.next();
  if (referer) {
    const refererUrl = new URL(referer);
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`),
    );
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
  }

  const accessToken = req.cookies.get('access_token');
  const refreshToken = req.cookies.get('refresh_token');
  if (
    refreshToken?.value &&
    (!accessToken?.value ||
      (await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/info`, {
        headers: { Authorization: `Bearer ${accessToken?.value}` },
      }).then((res) => res.status !== 200)))
  ) {
    const response = NextResponse.redirect(req.url);
    const newAccessToken = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/refresh`,
      {
        method: 'POST',
        headers: { Cookie: `refresh_token=${refreshToken.value}` },
      },
    )
      .then((res) => res.json())
      .then((data) => data.access_token);
    if (!newAccessToken) {
      response.cookies.delete('refresh_token');
      response.cookies.delete('access_token');
      return null;
    }
    response.cookies.set('access_token', newAccessToken);
    return response;
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|tinymce).*)',
  ],
};
