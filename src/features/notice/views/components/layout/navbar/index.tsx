import { Link } from '@tanstack/react-router';

import { LogClick, ZiggleLogo } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';

export const Navbar = () => (
  <header className="text-foreground bg-background flex w-full items-center p-5 md:hidden">
    <LogClick eventName={LogEvents.navBarClickLogo}>
      <Link to="/home" className="flex shrink-0 items-center">
        <ZiggleLogo variant="compact" className="h-8 overflow-visible" />
      </Link>
    </LogClick>
  </header>
);
