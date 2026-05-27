import { useEffect } from 'react';

import { createFileRoute, redirect, useSearch } from '@tanstack/react-router';

import { z } from 'zod';

import { appStoreLink, playStoreLink } from '@/common/components';
import { isMobile, isAndroid, isIos } from '@/common/utils';

function safeRedirect(url: string | undefined): string {
  try {
    if (url && new URL(url, location.origin).origin === location.origin)
      return url;
  } catch {
    /* invalid URL */
  }
  return '/';
}

function AppRedirectPage() {
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

export const Route = createFileRoute('/app')({
  validateSearch: z.object({ redirect: z.string().optional() }),
  beforeLoad: () => {
    if (!isMobile()) {
      throw redirect({ to: '/$category', params: { category: 'home' } });
    }
  },
  component: AppRedirectPage,
});
