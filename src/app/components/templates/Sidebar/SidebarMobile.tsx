'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { PropsWithLng } from '@/app/i18next';
import { useTranslation } from '@/app/i18next/client';
import DefaultProfile from '@/assets/default-profile.svg';

import { User } from '../Navbar/Navbar';
import Sidebar from '.';

interface SidebarProps {
  onClose: () => void;
  user: User | null;
}

const SidebarMobile = ({ onClose, lng, user }: SidebarProps & PropsWithLng) => {
  const [isOpen, setIsOpen] = useState(false);

  const { t } = useTranslation(lng);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) return;
    const timer = setTimeout(onClose, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [isOpen]);

  return ReactDOM.createPortal(
    <div className="fixed w-screen">
      <div
        className={`absolute inset-0 h-screen bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-50' : 'pointer-events-none opacity-0'
        }`}
        onClick={handleClose}
      />
      <div
        className={`absolute z-10 h-screen w-fit overflow-y-scroll bg-white px-[10px] transition-transform duration-300 scrollbar-none dark:bg-dark_dark ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Link
          href={user ? `${lng}/mypage` : `${lng}/login`}
          className="my-[10px] flex items-center gap-3 px-3 py-[10px]"
        >
          <DefaultProfile width={36} />

          <p>{user?.name ?? t('navbar.login')}</p>
        </Link>
        <Sidebar lng={lng} />
        <div className="h-[100px]" />
      </div>
    </div>,
    document.body as HTMLElement,
  );
};

export default SidebarMobile;
