import { useEffect } from 'react';

import { Link } from '@tanstack/react-router';

import { motion } from 'framer-motion';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';

import { LogClick } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';
import { useUser } from '@/features/auth';

import { ProfileModalButton } from '../profile-modal';
import { Sidebar } from './sidebar';
import { overlayTransition, panelVariants } from './sidebar-mobile.motion';

interface SidebarProps {
  onClose: () => void;
}

export const SidebarMobile = ({ onClose }: SidebarProps) => {
  const { data: user } = useUser();

  const { t } = useTranslation('layout');

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    if (mq.matches) {
      onClose();
      return;
    }

    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) onClose();
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 w-screen">
      <motion.div
        className="absolute inset-0 h-screen bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        transition={overlayTransition}
        onClick={onClose}
      />
      <motion.div
        className="scrollbar-none dark:bg-dark_dark absolute z-10 h-screen w-fit overflow-y-scroll bg-white px-2.5"
        variants={panelVariants}
        initial={{ x: '-100%' }}
        animate="visible"
        exit="exit"
      >
        {user ? (
          <ProfileModalButton triggerClassName="my-2.5 flex w-full cursor-pointer items-center gap-3 p-3" />
        ) : (
          <LogClick eventName={LogEvents.sidebarClickProfile}>
            <Link to="/" className="my-2.5 flex items-center gap-3 px-3 py-2.5">
              <p>{t('navbar.login')}</p>
            </Link>
          </LogClick>
        )}
        <Sidebar />
        <div className="h-25" />
      </motion.div>
    </div>,
    document.body as HTMLElement,
  );
};
