import { useEffect } from 'react';

import { useSearch } from '@tanstack/react-router';

import { appStoreLink, playStoreLink } from '@/common/components';
import { isAndroid, isIos } from '@/common/utils';

function safeRedirect(url: string | undefined): string {
  try {
    if (url && new URL(url, location.origin).origin === location.origin)
      return url;
  } catch {
    /* invalid URL */
  }
  return '/';
}

export function AppRedirectPage() {
  const { redirect: redirectPath } = useSearch({ from: '/app' });

  useEffect(() => {
    const storeLink = isAndroid()
      ? playStoreLink
      : isIos()
        ? appStoreLink
        : null;
    window.location.href = storeLink ?? safeRedirect(redirectPath);
  }, [redirectPath]);

  return null;
}
