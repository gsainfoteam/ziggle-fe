'use client';

import '@/app/initDayjs';

import { OverlayProvider } from '@toss/use-overlay';
import dynamic from 'next/dynamic';
import { SessionProvider } from 'next-auth/react';
import { Suspense } from 'react';
import { SWRConfig } from 'swr';

import api from '@/api';

import { PropsWithLng } from '../../i18next';

const InstallApp = dynamic(() => import('./InstallApp'), {
  ssr: false,
});

interface InitClientProps {
  emptyLayout?: boolean;
}

const InitClient = ({
  lng,
  children,
  emptyLayout = false,
}: React.PropsWithChildren<PropsWithLng & InitClientProps>) => (
  <SWRConfig
    value={{ fetcher: (path) => api.get(path).then(({ data }) => data) }}
  >
    <SessionProvider>
      <OverlayProvider>
        {!emptyLayout && (
          <Suspense>
            <InstallApp lng={lng} />
          </Suspense>
        )}
        {children}
      </OverlayProvider>
    </SessionProvider>
  </SWRConfig>
);

export default InitClient;
