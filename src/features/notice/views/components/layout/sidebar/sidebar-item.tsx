import { Link, type LinkProps } from '@tanstack/react-router';

import { cn } from '@/common/utils';

interface SidebarItemProps {
  title: string;
  icon: React.ReactNode;
  boldIcon: React.ReactNode;
  isSelected: boolean;
  onClick?: () => void;
}

export const SidebarItem = ({
  title,
  icon,
  boldIcon,
  isSelected,
  ...props
}: SidebarItemProps & LinkProps) => {
  return (
    <Link
      {...props}
      className={cn(
        'focus-visible:ring-primary flex w-40 items-center gap-4 rounded-md px-3 py-2 transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        isSelected
          ? 'bg-primary/10 text-primary dark:bg-primary/20'
          : 'text-text dark:text-dark_white hover:bg-gray-100 dark:hover:bg-dark_grey',
      )}
    >
      <span className="w-5 shrink-0">{isSelected ? boldIcon : icon}</span>
      <span className={cn('text-sm', isSelected ? 'font-semibold' : 'font-normal')}>
        {title}
      </span>
    </Link>
  );
};
