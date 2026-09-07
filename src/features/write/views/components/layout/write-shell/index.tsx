import { type ReactNode } from 'react';

import { useIsDesktop } from '@/common/utils';
import { SidebarRail } from '@/features/notice';

import { NavbarWrite } from '../navbar';

export function WriteShell({ children }: { children: ReactNode }) {
  const isDesktop = useIsDesktop();

  return (
    <div className="relative min-h-screen md:h-screen md:overflow-hidden">
      {!isDesktop ? <NavbarWrite /> : null}

      <div className="flex md:h-full md:overflow-hidden">
        {isDesktop ? <SidebarRail /> : null}

        <div className="min-w-0 flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-150 p-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
