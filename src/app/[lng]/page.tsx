'use client';

import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import { ziggleApi } from '@/api';
import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';
import ZiggleLogo from '@/assets/logos/ziggle.svg';
import ZiggleLogoDark from '@/assets/logos/ziggle-dark.svg';

import InitClient from '../components/layout/InitClient';
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
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const postConsent = async () => {
    await ziggleApi.post('user/consent');
  };
  const deleteUser = async () => {
    await ziggleApi.delete('/user');
  };
  useEffect(() => {
    (async () => {
      if (session && status === 'authenticated') {
        const { data } = await ziggleApi.get<UserInfo>('/user/info');
        if (data.consent === true) {
          // setOpenModal(true);
          router.push(`/home`);
        } else {
          setOpenModal(true);
        }
      }
    })();
  }, [session, status, lng, router]);
  async function showZigglePolicyModal() {
    await Swal.fire({
      title: '지글 이용약관 및 개인정보 약관 동의',
      html: '<a href="https://infoteam-rulrudino.notion.site/ceb9340c0b514497b6d916c4a67590a1" target="_blank">지글 개인정보처리방침</a> <br> <a href="https://infoteam-rulrudino.notion.site/6177be6369e44280a23a65866c51b257">지글 이용약관</a> <br> 지글을 이용하기 위해서는 다음의 이용약관 및 <br> 개인정보 약관에 대한 동의가 필요합니다. ',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: '동의',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '동의 완료',
          text: '약관에 동의하셨습니다.',
          icon: 'success',
        });
        setOpenModal(false);
        postConsent();
        router.push(`${lng}/home`);
      } else {
        Swal.fire({
          title: '정말로 거절하시겠습니까?',
          html: '약관에 동의하지 않는 경우 지글을 이용할 수 없으며, <br> 지글로부터 자동 탈퇴 처리됩니다.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: '네, 동의하지 않겠습니다.',
          cancelButtonText: '약관으로 돌아가기',
        }).then((result) => {
          if (result.isConfirmed) {
            deleteUser();
            signOut();
            setOpenModal(false);
          } else {
            showZigglePolicyModal();
          }
        });
      }
    });
  }
  useEffect(() => {
    if (openModal) {
      showZigglePolicyModal();
    }
  }, [openModal]);

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
