'use client';

import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { overlay } from 'overlay-kit';
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';

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
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const isOverlayOpen = useRef(false);

  const handleOpenOverlay = () => {
    if (isOverlayOpen.current) return;
    isOverlayOpen.current = true;
    overlay.open(({ isOpen, unmount }) => {
      return (
        <PolicyModal
          isOpen={isOpen}
          unmount={() => {
            isOverlayOpen.current = false;
            unmount();
          }}
        />
      );
    });
  };
  useEffect(() => {
    setMounted(true);
  }, []);
  const postConcent = async () => {
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
          router.push(`${lng}/home`);
        } else {
          setOpenModal(true);
        }
      }
    })();
  }, [session, status, lng, router]);
  async function showZigglePolicyModal() {
    const initialHtml = `
    <a href="https://infoteam-rulrudino.notion.site/ceb9340c0b514497b6d916c4a67590a1" target="_blank">${t('zigglePolicyModal.initial.privacyPolicyLink')}</a> <br> 
    <a href="https://infoteam-rulrudino.notion.site/6177be6369e44280a23a65866c51b257" target="_blank">${t('zigglePolicyModal.initial.termsOfServiceLink')}</a> <br> 
    ${t('zigglePolicyModal.initial.description')}
  `;
    await Swal.fire({
      title: t('zigglePolicyModal.initial.title'),
      html: initialHtml,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: t('zigglePolicyModal.initial.confirmButton'),
      cancelButtonText: t('zigglePolicyModal.initial.cancelButton'),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: t('zigglePolicyModal.success.title'),
          text: t('zigglePolicyModal.success.text'),
          icon: 'success',
        });
        setOpenModal(false);
        postConcent();
        router.push(`${lng}/home`);
      } else {
        Swal.fire({
          title: t('zigglePolicyModal.rejectConfirm.title'),
          html: t('zigglePolicyModal.rejectConfirm.description'),
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: t('zigglePolicyModal.rejectConfirm.confirmButton'),
          cancelButtonText: t('zigglePolicyModal.rejectConfirm.cancelButton'),
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
        <Button variant="outlined" onClick={handleOpenOverlay}>
          testing modal
        </Button>
      </div>
    </InitClient>
  );
}
