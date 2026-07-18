import { type ReactNode } from 'react';

import { Link } from '@tanstack/react-router';

import TitleLong from '@/assets/logos/title-long.svg?react';
import { LogClick, ZiggleLogo } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';
import { cn, useIsDesktop } from '@/common/utils';
import { Sidebar } from '@/features/notice';

import { NavbarWrite } from '../navbar';

export function WriteShell({ children }: { children: ReactNode }) {
  const isDesktop = useIsDesktop();

  return (
    <div className="relative min-h-screen md:h-screen md:overflow-hidden">
      {!isDesktop ? <NavbarWrite /> : null}

      <div className="flex md:h-full md:overflow-hidden">
        {isDesktop ? (
          <div className="relative shrink-0 md:w-16 xl:w-48">
            <aside
              className={cn(
                'group/sb bg-background absolute inset-y-0 left-0 z-40 flex h-screen w-16 flex-col gap-y-8 overflow-x-hidden overflow-y-auto px-3 py-6.5 transition-all duration-200',
                'hover:w-48',
                'xl:static xl:h-full xl:w-48',
                'border-r-border border-r',
              )}
            >
              <LogClick eventName={LogEvents.navBarClickLogo}>
                <Link
                  to="/"
                  className="text-foreground flex h-8 items-center gap-3 px-2.5"
                >
                  <span className="flex size-5 shrink-0 items-center justify-center overflow-visible">
                    <ZiggleLogo
                      variant="mark"
                      className="h-8 overflow-visible"
                    />
                  </span>
                  <TitleLong
                    aria-hidden
                    className="hidden h-8 w-auto overflow-visible group-hover/sb:inline xl:inline"
                  />
                </Link>
              </LogClick>
              <Sidebar collapsible />
            </aside>
          </div>
        ) : null}

        <div className="min-w-0 flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-150 p-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
