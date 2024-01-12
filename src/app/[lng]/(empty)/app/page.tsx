'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import {
  appStoreLink,
  playStoreLink,
} from '@/app/components/templates/Footer/Footer';

const AppOpenPage = ({
  searchParams,
}: {
  searchParams: { redirect: string; install: string };
}) => {
  console.log(searchParams);
  const h = headers();
  const userAgent = h.get('user-agent');
  const isAndroid = Boolean(userAgent?.match(/Android/i));
  const isIos = Boolean(userAgent?.match(/iPhone|iPad|iPod/i));

  if (searchParams.install === 'true') {
    if (isAndroid) redirect(playStoreLink);
    if (isIos) redirect(appStoreLink);
  }
  if (!isAndroid && !isIos) redirect(origin);

  const host = h.get('host');
  const protocol = h.get('x-forwarded-proto') || 'https';
  const url = new URL(`${protocol}://${host}`);
  url.pathname = '/app';
  url.searchParams.set('redirect', searchParams.redirect);
  url.searchParams.set('install', 'true');
  redirect(url.toString());
};

export default AppOpenPage;
