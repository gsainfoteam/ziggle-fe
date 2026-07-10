import { Children, type ReactElement, cloneElement } from 'react';

import { cn } from '@/common/utils';

interface SidebarItemProps {
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  isActive?: boolean;
  variant?: 'nav' | 'toggle';
  children: ReactElement;
  onClick?: React.MouseEventHandler;
  labelClassName?: string;
}

const baseRow =
  'text-text dark:text-dark_white focus-visible:ring-primary flex w-full items-center gap-3 rounded-md px-2.5 py-1.5 transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
const inactiveRow = 'dark:hover:bg-dark_greyDark hover:bg-gray-100';

export const sidebarRowClass = cn(baseRow, inactiveRow);

export const SidebarItem = ({
  icon,
  activeIcon,
  isActive = false,
  variant = 'nav',
  children,
  onClick,
  labelClassName,
}: SidebarItemProps) => {
  const child = Children.only(children) as ReactElement<{
    className?: string;
    children?: React.ReactNode;
    onClick?: React.MouseEventHandler;
  }>;

  return cloneElement(child, {
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
        <span
          className={cn(
            'min-w-0 truncate',
            isActive ? 'font-semibold' : 'font-normal',
            labelClassName,
          )}
        >
          {child.props.children}
        </span>
      </>
    ),
  });
};
