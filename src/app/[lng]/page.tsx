'use client';

import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { overlay } from 'overlay-kit';
import { useEffect, useRef, useState } from 'react';

import { ziggleApi } from '@/api';
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';
import ZiggleLogo from '@/assets/logos/ziggle.svg';
import ZiggleLogoDark from '@/assets/logos/ziggle-dark.svg';

import InitClient from '../components/layout/InitClient';
import PolicyModal from '../components/layout/Modal/PolicyModal';
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
  const [mounted, setMounted] = useState(false);

  const handleOpenOverlay = () => {
    overlay.open(({ unmount }) => {
      return <PolicyModal unmount={unmount} />;
    });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    (async () => {
      if (session && status === 'authenticated') {
        const { data } = await ziggleApi.get<UserInfo>('/user/info');
        if (data.consent === true) {
          router.push(`${lng}/home`);
        } else {
          handleOpenOverlay();
        }
      }
    })();
  }, [session, status, lng, router]);

  if (!mounted) {
    return (
      <InitClient lng={lng}>
        <div className="flex h-dvh w-full flex-col items-center justify-center gap-8" />
      </InitClient>
    );
  }
  return (
    <InitClient lng={lng}>
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
        <Button variant="outlined" onClick={handleOpenOverlay}>
          testing modal
        </Button>
      </div>
    </InitClient>
  );
}
