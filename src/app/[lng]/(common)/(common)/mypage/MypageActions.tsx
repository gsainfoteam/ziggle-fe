'use client';

import { signOut } from 'next-auth/react';

import Button from '@/app/components/atoms/Button';
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';

import ChangeLanguageBox from './ChangeLanguageBox';
import MypageBox from './MypageBox';

export default function MypageActions({ lng }: PropsWithLng) {
  const { t } = useTranslation(lng);

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  const handleWithdrawal = () => {
    window.open(process.env.NEXT_PUBLIC_IDP_BASE_URL);
  };

  return (
    <div className="flex flex-col gap-3">
      <ChangeLanguageBox lng={lng} />

      <Button onClick={handleSignOut}>
        <MypageBox>
          <div className="flex self-stretch text-greyDark dark:text-dark_white">
            {t('mypage.logout')}
          </div>
        </MypageBox>
      </Button>

      <Button onClick={handleWithdrawal}>
        <MypageBox>
          <div className="flex self-stretch text-greyDark dark:text-dark_white">
            {t('mypage.quit')}
          </div>
        </MypageBox>
      </Button>
    </div>
  );
}
