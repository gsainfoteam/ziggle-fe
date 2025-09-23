'use client';

import { useRouter } from 'next/navigation';
import { ThemeProvider } from 'next-themes';
import { useEffect } from 'react';

import { auth } from '@/api/auth/auth';
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';
import ZiggleLogo from '@/assets/logos/ziggle.svg';
import ZiggleLogoDark from '@/assets/logos/ziggle-dark.svg';

import Button from '../components/shared/Button';
export default function Home({ params: { lng } }: { params: PropsWithLng }) {
  const { t } = useTranslation(lng);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const session = await auth();
      if (session) {
        //TODO: Check consent and add consent filed in auth.ts
      }
    })();
  }, []);
  return (
    <ThemeProvider>
      <div className="flex h-dvh w-full flex-col items-center justify-center gap-8">
        <div className="block dark:hidden">
          <ZiggleLogo className="h-20" />
        </div>
        <div className="hidden dark:block">
          <ZiggleLogoDark className="h-20" />
        </div>
        <p className="text-xl font-semibold md:text-2xl">
          {t('home.subtitle')}
        </p>
        <Button variant="outlined" onClick={() => router.push(`/${lng}/login`)}>
          {t('home.login')}
        </Button>
      </div>
    </ThemeProvider>
  );
}
