import { Link } from '@tanstack/react-router';

import TitleLong from '@/assets/logos/title-long.svg?react';
import { LogClick, ZiggleLogo } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';
import { cn } from '@/common/utils';

import { Sidebar } from './sidebar';

/**
 * 구분자는 사이드바가 콘텐츠를 덮을 때만 긋는다. md~xl 은 hover 로 펼칠 때,
 * xl 이상은 정적이라 안 긋고 `scrolled`(가로 스크롤로 콘텐츠가 잘릴 때)만 예외.
 */
export function SidebarRail({ scrolled = false }: { scrolled?: boolean }) {
  return (
    <div className="relative shrink-0 md:w-16 xl:w-48">
      <aside
        className={cn(
          'group/sb bg-background absolute inset-y-0 left-0 z-40 flex h-screen w-16 flex-col gap-y-8 overflow-x-hidden overflow-y-auto px-3 py-6.5 transition-all duration-200',
          'hover:w-48',
          'xl:static xl:h-full xl:w-48',
          'border-r border-r-transparent',
          'max-xl:hover:border-r-border',
          scrolled && 'border-r-border',
        )}
      >
        <LogClick eventName={LogEvents.navBarClickLogo}>
          <Link
            to="/"
            className="text-foreground flex h-8 items-center gap-3 px-2.5"
          >
            {/* size-5 아이콘 열과 중심만 맞추고, 불 마크는 h-8 유지 */}
            <span className="flex size-5 shrink-0 items-center justify-center overflow-visible">
              <ZiggleLogo variant="mark" className="h-8 overflow-visible" />
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
  );
}
