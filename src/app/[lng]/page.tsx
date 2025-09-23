'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';

import { ziggleApi } from '@/api';
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';
import ZiggleLogo from '@/assets/logos/ziggle.svg';
import ZiggleLogoDark from '@/assets/logos/ziggle-dark.svg';

import Button from '../components/shared/Button';

interface UserInfo {
  uuid: string;
  email: string;
  name: string;
  studentNumber: string;
  consent: boolean;
}

export default function Home({ params: { lng } }: { params: PropsWithLng }) {
  const { t } = useTranslation(lng);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (session && status === 'authenticated') {
        const { data } = await ziggleApi.get<UserInfo>('/user/info');
        if (data.consent === true) {
          router.push(`${lng}/home`);
        } else {
          setOpenModal(true);
        }
      }
    })();
  }, [session, status]);

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
