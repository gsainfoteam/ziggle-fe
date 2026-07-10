import { Link } from '@tanstack/react-router';

import { ListIcon } from '@phosphor-icons/react';
import ZiggleCompactLogoDark from '@/assets/logos/ziggle-compact-dark.svg?react';
import ZiggleCompactLogo from '@/assets/logos/ziggle-compact.svg?react';
import { Button, LogClick } from '@/common/components';
import { LogEvents } from '@/common/const/log-events';
import { useMobileSidebar } from '@/features/notice/viewmodels';

import { SearchBar } from '../../notice-list/search-bar';

// 데스크탑은 좌측 사이드바가 로고/검색/프로필을 모두 담으므로, Navbar는 모바일 전용 상단바다.
export const Navbar = () => {
  const toggleSidebar = useMobileSidebar((state) => state.toggle);

  return (
    <header className="text-text dark:bg-dark_dark flex w-full items-center bg-white py-3 md:hidden">
      <div className="flex shrink-0 items-center pl-2">
        <LogClick eventName={LogEvents.navBarClickLogo}>
          <Link to="/">
            <ZiggleCompactLogo className="h-8 overflow-visible dark:hidden" />
            <ZiggleCompactLogoDark className="hidden h-8 overflow-visible dark:block" />
          </Link>
        </LogClick>
      </div>

      <div className="flex h-full flex-1 items-center justify-end">
        <SearchBar />
        <LogClick eventName={LogEvents.navBarClickMenu}>
          <Button
            onClick={toggleSidebar}
            className="flex h-full w-12 items-center justify-center overflow-clip rounded-md"
          >
            <ListIcon className="text-text dark:text-dark_white size-6" />
          </Button>
        </LogClick>
      </div>
    </header>
  );
};
