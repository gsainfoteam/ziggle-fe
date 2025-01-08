'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import {
  appStoreLink,
  playStoreLink,
} from '@/app/components/layout/Footer/Footer';

const AppOpenPage = ({
  searchParams,
}: {
  searchParams: { redirect: string; install: string };
}) => {
  const h = headers();
  const userAgent = h.get('user-agent');
  const isAndroid = Boolean(userAgent?.match(/Android/i));
  const isIos = Boolean(userAgent?.match(/iPhone|iPad|iPod/i));

  if (searchParams.install === 'true') {
    if (isAndroid) redirect(playStoreLink);
    if (isIos) redirect(appStoreLink);
  }
  if (!isAndroid && !isIos) redirect(origin);

  const url = new URL('https://ziggle.gistory.me/app');
  url.searchParams.set('redirect', searchParams.redirect);
  url.searchParams.set('install', 'true');
  redirect(url.toString());
};

export default AppOpenPage;
