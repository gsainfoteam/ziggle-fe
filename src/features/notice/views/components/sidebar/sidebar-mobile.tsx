import { useEffect, useState } from 'react';

import { Link } from '@tanstack/react-router';

import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';

import DefaultProfile from '@/assets/icons/default-profile.svg?react';
import { LogClick } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';
import { cn } from '@/common/utils';
import { useUser } from '@/features/auth';

import { Sidebar } from './sidebar';

interface SidebarProps {
  onClose: () => void;
}

export const SidebarMobile = ({ onClose }: SidebarProps) => {
  const { data: user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const { t } = useTranslation('layout');

  useEffect(() => {
    setTimeout(() => setIsOpen(true), 0);
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
  }, [isOpen, onClose]);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 w-screen">
      <div
        className={cn(
          'bg-opacity-50 absolute inset-0 h-screen bg-black transition-opacity duration-300',
          isOpen ? 'opacity-50' : 'pointer-events-none opacity-0',
        )}
        onClick={handleClose}
      />
      <div
        className={cn(
          'scrollbar-none dark:bg-dark_dark absolute z-10 h-screen w-fit overflow-y-scroll bg-white px-[10px] transition-transform duration-300',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <LogClick eventName={LogEvents.sidebarClickProfile}>
          <Link
            to={user ? '/mypage' : '/'}
            className="my-[10px] flex items-center gap-3 px-3 py-[10px]"
          >
            <DefaultProfile width={36} />

            <p>{user?.name ?? t('navbar.login')}</p>
          </Link>
        </LogClick>
        <Sidebar />
        <div className="h-[100px]" />
      </div>
    </div>,
    document.body as HTMLElement,
  );
};
