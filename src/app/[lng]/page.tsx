'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
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
  const { status } = useSession();
  const [mounted, setMounted] = useState(false);
  const hasOpenedRef = useRef(false);

  const handleOpenOverlay = () => {
    if (hasOpenedRef.current) return;
    overlay.open(({ isOpen, close, overlayId }) => {
      hasOpenedRef.current = true;
      return (
        <PolicyModal
          isOpen={isOpen}
          close={close}
          lng={lng}
          overlayId={overlayId}
        />
      );
    });
  };

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    const checkLoginAndConsent = async () => {
      if (status === 'authenticated' && !hasOpenedRef.current) {
        const { data } = await ziggleApi.get<UserInfo>('/user/info');
        if (data.consent === true) {
          router.push(`${lng}/home`);
        } else {
          handleOpenOverlay();
        }
      }
    };
    checkLoginAndConsent();
  }, [lng, router, status]);

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
      </div>
    </InitClient>
  );
}
