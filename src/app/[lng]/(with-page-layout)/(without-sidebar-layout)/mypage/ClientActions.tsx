'use client';

import { signOut } from 'next-auth/react';

import LogEvents from '@/api/log/log-events';
import Analytics from '@/app/components/shared/Analytics';
import Button from '@/app/components/shared/Button';
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';

import MypageBox from './MypageBox';

export default function ClientActions({ lng }: PropsWithLng) {
  const { t } = useTranslation(lng);

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  const handleWithdrawal = () => {
    window.open(process.env.NEXT_PUBLIC_IDP_BASE_URL);
  };

  return (
    <>
      <Button onClick={handleSignOut}>
        <Analytics event={LogEvents.myClickLogout}>
          <MypageBox>
            <div className="flex self-stretch text-greyDark dark:text-dark_white">
              {t('mypage.logout')}
            </div>
          </MypageBox>
        </Analytics>
      </Button>

      <Button onClick={handleWithdrawal}>
        <Analytics event={LogEvents.myClickUnregister}>
          <MypageBox>
            <div className="flex self-stretch text-greyDark dark:text-dark_white">
              {t('mypage.quit')}
            </div>
          </MypageBox>
        </Analytics>
      </Button>
    </>
  );
}
