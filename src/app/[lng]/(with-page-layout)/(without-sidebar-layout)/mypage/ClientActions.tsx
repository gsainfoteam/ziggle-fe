'use client';

import { signOut } from 'next-auth/react';

import LogEvents from '@/api/log/log-events';
import Analytics from '@/app/components/shared/Analytics';
import Button from '@/app/components/shared/Button';
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';

import MypageBox from './MypageBox';

import Swal from 'sweetalert2';
import { ziggleApi } from '@/api/index'; //api/index에서 정의한 ziggleApi불러오기

export default function ClientActions({ lng }: PropsWithLng) {
  const { t } = useTranslation(lng);

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  const handleWithdrawal = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        ziggleApi.delete(`/user`); 
        //index.ts에 설명 적어둠. fetch대신 ziggleApi.delete쓰기. 
        //원래 경로는 https://api.stg.ziggle.gistory.me/user인데 bff써서 /user만 쓰는거.
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
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
