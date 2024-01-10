'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import {
  appStoreLink,
  playStoreLink,
} from '@/app/components/templates/Footer/Footer';

const AppOpenPage = () => {
  const h = headers();
  const userAgent = h.get('user-agent');
  const isAndroid = Boolean(userAgent?.match(/Android/i));
  const isIos = Boolean(userAgent?.match(/iPhone|iPad|iPod/i));
  const host = h.get('host');
  const protocol = h.get('x-forwarded-proto') || 'https';
  const origin = `${protocol}://${host}`;

  if (!isAndroid && !isIos) redirect(origin);
  if (isAndroid) redirect(playStoreLink);
  if (isIos) redirect(appStoreLink);
  redirect(origin);
};

export default AppOpenPage;
