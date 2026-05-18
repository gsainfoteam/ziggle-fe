import { useEffect } from 'react';

import { useSearch } from '@tanstack/react-router';

import { appStoreLink, playStoreLink } from '@/common/components';
import { isAndroid, isIos } from '@/common/utils';

export function AppRedirectPage() {
  const { redirect: redirectPath } = useSearch({ from: '/app' });

  useEffect(() => {
    const storeLink = isAndroid()
      ? playStoreLink
      : isIos()
        ? appStoreLink
        : null;
    window.location.href = storeLink ?? redirectPath ?? '/';
  }, [redirectPath]);

  return null;
}
