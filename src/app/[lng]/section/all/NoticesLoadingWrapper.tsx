'use client';

import { Suspense, useEffect, useState } from 'react';

import LoadingCatAnimation from '@/app/components/templates/LoadingCatAnimation';
import { PropsWithLng } from '@/app/i18next';

import Notices from './Notices';

const NoticesLoadingWrapper = ({ lng }: PropsWithLng) => {
  // This is a workaround for Suspense not working with SSR.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <Suspense fallback={mounted ? <LoadingCatAnimation lng={lng} /> : <div />}>
      <Notices />
    </Suspense>
  );
};

export default NoticesLoadingWrapper;
