import { type ReactNode, useState } from 'react';

import { Link } from '@tanstack/react-router';

import ZiggleLogoDark from '@/assets/logos/ziggle-dark.svg?react';
import ZiggleLogoOnly from '@/assets/logos/ziggle-logo-only.svg?react';
import ZiggleLogo from '@/assets/logos/ziggle.svg?react';
import { AppBanner, LogClick } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';
import { cn } from '@/common/utils';

import { Navbar } from '../navbar';
import { MobileShell, Sidebar } from '../sidebar';
import { WriteFab } from '../write-fab';

export function NoticeShell({ children }: { children: ReactNode }) {
  const [deckScrolled, setDeckScrolled] = useState(false);

  return (
    <>
      <MobileShell>
        <div className="sticky top-0 z-50 md:hidden">
          <AppBanner />
          <Navbar />
        </div>

        <div className="flex md:h-screen md:overflow-hidden">
          <div className="relative hidden shrink-0 md:block md:w-16 xl:w-48">
            <aside
              className={cn(
                'group/sb dark:bg-dark_dark absolute inset-y-0 left-0 z-40 flex h-screen w-16 flex-col gap-y-8 overflow-x-hidden overflow-y-auto bg-white px-3 py-6.5 transition-all duration-200',
                'hover:w-48',
                'xl:static xl:w-48',
                'border-r border-r-transparent',
                'max-xl:hover:border-r-greyBorder dark:max-xl:hover:border-r-dark_greyBorder',
                deckScrolled &&
                  'border-r-greyBorder dark:border-r-dark_greyBorder',
              )}
            >
              <LogClick eventName={LogEvents.navBarClickLogo}>
                <Link to="/" className="flex h-8 items-center pl-1.5">
                  <ZiggleLogoOnly className="h-8 shrink-0 group-hover/sb:hidden xl:hidden" />
                  <span className="hidden group-hover/sb:block xl:block">
                    <ZiggleLogo className="h-8 overflow-visible dark:hidden" />
                    <ZiggleLogoDark className="hidden h-8 overflow-visible dark:block" />
                  </span>
                </Link>
              </LogClick>
              <Sidebar collapsible />
            </aside>
          </div>

          <div
            className="flex-1 md:overflow-x-auto"
            onScroll={(e) => setDeckScrolled(e.currentTarget.scrollLeft > 0)}
          >
            <div className="flex md:w-max md:min-w-full md:justify-center md:gap-4 md:px-4 md:py-6.5">
              {children}
            </div>
          </div>
        </div>
      </MobileShell>

      <WriteFab />
    </>
  );
}
