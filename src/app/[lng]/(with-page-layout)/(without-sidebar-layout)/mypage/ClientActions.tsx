'use client';

import { signOut } from 'next-auth/react';
import { overlay } from 'overlay-kit';

import LogEvents from '@/api/log/log-events';
import Analytics from '@/app/components/shared/Analytics';
import Button from '@/app/components/shared/Button';
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';

import MypageBox from './MypageBox';
import WithdrawalModal from '@/app/components/layout/Modal/WithdrawalModal';
import WithdrawalSuccessModal from '@/app/components/layout/Modal/WithdrawalSuccessModal';
import WithdrawalErrorModal from '@/app/components/layout/Modal/WithdrawalErrorModal';

export default function ClientActions({ lng }: PropsWithLng) {
  const { t } = useTranslation(lng);

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  const handleWithdrawal = () => {
    overlay.open(({ isOpen, close }) => (
      <WithdrawalModal
        isOpen={isOpen}
        close={close}
        lng={lng}
        onSuccess={() => {
          overlay.open(({ isOpen, close }) => (
            <WithdrawalSuccessModal
              isOpen={isOpen}
              close={close}
              lng={lng}
              onCloseComplete={() => signOut({ callbackUrl: '/' })}
            />
          ));
        }}
        onFailure={() => {
          overlay.open(({ isOpen, close }) => (
            <WithdrawalErrorModal
              isOpen={isOpen}
              close={close}
              lng={lng}
            />
          ));
        }}
      />
    ));
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
