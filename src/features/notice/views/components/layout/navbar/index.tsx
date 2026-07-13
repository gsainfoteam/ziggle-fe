import { Link } from '@tanstack/react-router';

import ZiggleCompactLogoDark from '@/assets/logos/ziggle-compact-dark.svg?react';
import ZiggleCompactLogo from '@/assets/logos/ziggle-compact.svg?react';
import { LogClick } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';

export const Navbar = () => (
  <header className="text-text dark:bg-dark_dark flex w-full items-center bg-white p-5 md:hidden">
    <LogClick eventName={LogEvents.navBarClickLogo}>
      <Link to="/home" className="flex shrink-0 items-center">
        <ZiggleCompactLogo className="h-8 overflow-visible dark:hidden" />
        <ZiggleCompactLogoDark className="hidden h-8 overflow-visible dark:block" />
      </Link>
    </LogClick>
  </header>
);
