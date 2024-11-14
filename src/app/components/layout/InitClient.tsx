'use client';

import '@/app/components/layout/initDayjs';

import { OverlayProvider } from '@toss/use-overlay';
import dynamic from 'next/dynamic';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { Suspense } from 'react';
import { SWRConfig } from 'swr';

import { ziggleApi } from '@/api';
import { PropsWithLng } from '@/app/i18next';

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
    value={{ fetcher: (path) => ziggleApi.get(path).then(({ data }) => data) }}
  >
    <SessionProvider>
      <OverlayProvider>
        {!emptyLayout && (
          <Suspense>
            <InstallApp lng={lng} />
          </Suspense>
        )}
        <ThemeProvider
          disableTransitionOnChange
          enableSystem
          defaultTheme="system"
        >
          {children}
        </ThemeProvider>
      </OverlayProvider>
    </SessionProvider>
  </SWRConfig>
);

export default InitClient;
