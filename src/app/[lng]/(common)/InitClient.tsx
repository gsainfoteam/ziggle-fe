'use client';

import '@/app/initDayjs';

import { OverlayProvider } from '@toss/use-overlay';
import dynamic from 'next/dynamic';
import { SessionProvider } from 'next-auth/react';
import { Suspense, useEffect } from 'react';
import { SWRConfig } from 'swr';

import { ziggleApi } from '@/api';

import { PropsWithLng } from '../../i18next';
import { useColorTheme } from './(common)/mypage/ChangeDarkModeBox';

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
  const { themeOption, handleSystemThemeChange } = useColorTheme();

  useEffect(() => {
    if (themeOption === 'system' && window?.matchMedia) {
      const mql = window.matchMedia('(prefers-color-scheme: dark)');

      mql.addEventListener('change', handleSystemThemeChange);

      return () => {
        mql.removeEventListener('change', handleSystemThemeChange);
      };
    }
  }, [themeOption, handleSystemThemeChange]);

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
          {children}
        </OverlayProvider>
      </SessionProvider>
    </SWRConfig>
  );
};

export default InitClient;
