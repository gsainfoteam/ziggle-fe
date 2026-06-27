import { Children, type ReactElement, cloneElement } from 'react';

import { cn } from '@/common/utils';

interface SidebarItemProps {
  icon: React.ReactNode;
  /** isActive일 때 보여줄 아이콘. 없으면 icon을 그대로 사용. */
  activeIcon?: React.ReactNode;
  isActive?: boolean;
  /** 활성 강조 스타일. 'nav'=네비 선택(primary), 'toggle'=테마/언어 토글(중립 회색). */
  variant?: 'nav' | 'toggle';
  /**
   * 실제 인터랙티브 요소(Link/button/CSLink 등) 하나.
   * 이 자식의 children이 라벨이 되고, className·onClick·내용은 SidebarItem이 주입한다.
   * (asChild/slot 패턴 — 다형성을 자식 엘리먼트로 위임)
   */
  children: ReactElement;
  /** LogClick 등 상위에서 주입하는 onClick을 자식으로 forward */
  onClick?: React.MouseEventHandler;
}

const baseRow =
  'text-text dark:text-dark_white focus-visible:ring-primary flex w-full items-center gap-3 rounded-md px-2.5 py-1.5 transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
const inactiveRow = 'dark:hover:bg-dark_greyDark hover:bg-gray-100';

// SidebarItem을 쓰지 않는 행(프로필 트리거 등)에서 동일한 모양을 쓰기 위한 클래스
export const sidebarRowClass = cn(baseRow, inactiveRow);

export const SidebarItem = ({
  icon,
  activeIcon,
  isActive = false,
  variant = 'nav',
  children,
  onClick,
}: SidebarItemProps) => {
  const child = Children.only(children) as ReactElement<{
    className?: string;
    children?: React.ReactNode;
    onClick?: React.MouseEventHandler;
  }>;

  return cloneElement(child, {
    // 활성 강조: nav=primary, toggle(테마·언어)=중립 회색 / 비활성=hover
    className: cn(
      baseRow,
      isActive
        ? variant === 'toggle'
          ? 'bg-greyLight dark:bg-dark_greyDark'
          : 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary'
        : inactiveRow,
      child.props.className,
    ),
    onClick: (event: React.MouseEvent<HTMLElement>) => {
      onClick?.(event);
      child.props.onClick?.(event);
    },
    children: (
      <>
        <span className="flex size-5 shrink-0 items-center justify-center [&>svg]:size-5">
          {isActive && activeIcon ? activeIcon : icon}
        </span>
        <span className={isActive ? 'font-semibold' : 'font-normal'}>
          {child.props.children}
        </span>
      </>
    ),
  });
};
