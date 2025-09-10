'use client';

import '@/app/components/layout/initDayjs';

import dynamic from 'next/dynamic';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { OverlayProvider } from 'overlay-kit';
import { Suspense } from 'react';
import { SWRConfig } from 'swr';

import { ziggleApi } from '@/api';
import { PropsWithLng } from '@/app/i18next';

import ThemeToaster from './ThemeToaster';

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
}: React.PropsWithChildren<PropsWithLng & InitClientProps>) => {
  return (
    <SWRConfig
      value={{
        fetcher: (path) => ziggleApi.get(path).then(({ data }) => data),
      }}
    >
      <SessionProvider>
        <OverlayProvider>
          {!emptyLayout && (
            <Suspense>
              <InstallApp lng={lng} />
            </Suspense>
          )}
          <ThemeProvider enableSystem defaultTheme="system">
            <ThemeToaster />
            {children}
          </ThemeProvider>
        </OverlayProvider>
      </SessionProvider>
    </SWRConfig>
  );
};

export default InitClient;
