import { useEffect, type ReactNode } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { SidebarMobile } from './sidebar-mobile';
import { useMobileSidebar } from '../../../viewmodels';

interface MobileShellProps {
  children: ReactNode;
}

export const MobileShell = ({ children }: MobileShellProps) => {
  const isOpen = useMobileSidebar((state) => state.isOpen);
  const close = useMobileSidebar((state) => state.close);

  // 데스크톱 레이아웃으로 넘어가면 사이드바를 닫아 transform 리셋
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)');
    const handle = () => {
      if (mql.matches) close();
    };

    handle();
    mql.addEventListener('change', handle);
    return () => mql.removeEventListener('change', handle);
  }, [close]);

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <SidebarMobile />
      <motion.div
        className="dark:bg-dark_dark relative z-10 min-h-screen bg-white md:transform-none"
        animate={{ x: isOpen ? 'var(--spacing-sidebarMobile)' : '0px' }}
        transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.35 }}
      >
        {children}
        <AnimatePresence>
          {isOpen && (
            <motion.button
              type="button"
              aria-label="Close sidebar"
              onClick={close}
              className="absolute inset-0 z-50 cursor-pointer bg-black/30 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
