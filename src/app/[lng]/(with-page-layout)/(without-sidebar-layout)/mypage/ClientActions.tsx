'use client';

import { signOut } from 'next-auth/react';

import LogEvents from '@/api/log/log-events';
import Analytics from '@/app/components/shared/Analytics';
import Button from '@/app/components/shared/Button';
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';

import MypageBox from './MypageBox';

import Swal from 'sweetalert2';
import { ziggleApi } from '@/api/index';

export default function ClientActions({ lng }: PropsWithLng) {
  const { t } = useTranslation(lng);

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  const handleWithdrawal = async () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "text-gray px-4 py-2 rounded hover:bg-red-400 hover:text-white",
        cancelButton: "text-gray px-4 py-2 rounded hover:bg-red-400 hover:text-white",
      },
      buttonsStyling: false
    });

    try {
      const result = await swalWithBootstrapButtons.fire({
        title: t('mypage.withdrawal.confirm.title'),
        text: t('mypage.withdrawal.confirm.text'),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: t('mypage.withdrawal.confirm.okBtn'),
        cancelButtonText: t('mypage.withdrawal.confirm.cancelBtn'),
        reverseButtons: true
      });

      if (result.isConfirmed) {
        try {
          await ziggleApi.delete('/user');
          await swalWithBootstrapButtons.fire({
            title: t('mypage.withdrawal.success.title'),
            text: t('mypage.withdrawal.success.text'),
            icon: "success"
          });
          signOut({ callbackUrl: '/' });
        } catch (error) {
          await swalWithBootstrapButtons.fire({
            title: t('mypage.withdrawal.error.title'),
            text: t('mypage.withdrawal.error.text'),
            icon: "error"
          });
        }
      }
    } catch (err) {
      console.error('withdrawal flow error:', err);
    }
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
