import { Link } from '@tanstack/react-router';

import { LogClick, ZiggleLogo } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';

export const Navbar = () => (
  <header className="text-text dark:bg-dark_dark flex w-full items-center bg-white p-5 md:hidden">
    <LogClick eventName={LogEvents.navBarClickLogo}>
      <Link to="/home" className="flex shrink-0 items-center">
        <ZiggleLogo variant="compact" className="h-8 overflow-visible" />
      </Link>
    </LogClick>
  </header>
);
