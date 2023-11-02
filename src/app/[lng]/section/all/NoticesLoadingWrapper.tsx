'use client';

import { Suspense, useEffect, useState } from 'react';

import LoadingCatAnimation from '@/app/components/templates/LoadingCatAnimation';

import Notices from './Notices';

const NoticesLoadingWrapper = () => {
  // This is a workaround for Suspense not working with SSR.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <Suspense fallback={mounted ? <LoadingCatAnimation /> : <div />}>
      <Notices />
    </Suspense>
  );
};

export default NoticesLoadingWrapper;
