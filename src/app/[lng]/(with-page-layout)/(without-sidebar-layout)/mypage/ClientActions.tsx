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
    const deleteUser = async () => {
    await ziggleApi.delete('/user');
    };
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "text-gray px-4 py-2 rounded hover:bg-red-400 hover:text-white",
        cancelButton: "text-gray px-4 py-2 rounded hover:bg-red-400 hover:text-white",

        //confirmButton: "btn btn-success",
        //cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: t('mypage.withdrawal.confirm.title'),
      text: t('mypage.withdrawal.confirm.text'),
      //title: "정말 탈퇴하시겠습니까?",
      //text: "탈퇴 버튼 선택 시, 계정은 삭제되며 복구되지 않습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t('mypage.withdrawal.confirm.okBtn'),
      cancelButtonText: t('mypage.withdrawal.confirm.cancelBtn'),
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser();
        //index.ts에 설명 적어둠. fetch대신 ziggleApi.delete쓰기. 
        //원래 경로는 https://api.stg.ziggle.gistory.me/user인데 bff써서 /user만 쓰는거.
        swalWithBootstrapButtons.fire({
          title: t('mypage.withdrawal.success.title'),
          text: t('mypage.withdrawal.success.text'),
          //text: "회원님의 Ziggle 계정이 성공적으로 삭제되었습니다.",
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
