'use client';

import '@/app/initDayjs';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { SWRConfig } from 'swr';

import api from '@/api';

import { PropsWithLng } from '../../i18next';

const InstallApp = dynamic(() => import('./InstallApp'), {
  ssr: false,
});

const InitClient = ({
  lng,
  children,
}: React.PropsWithChildren<PropsWithLng>) => (
  <SWRConfig
    value={{ fetcher: (path) => api.get(path).then(({ data }) => data) }}
  >
    <Suspense>
      <InstallApp lng={lng} />
    </Suspense>
    {children}
  </SWRConfig>
);

export default InitClient;
