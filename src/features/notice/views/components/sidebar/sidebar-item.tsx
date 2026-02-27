import { Link, type LinkProps } from '@tanstack/react-router';

import { cn } from '@/common/utils';

interface SidebarItemProps {
  title: string;
  icon: React.ReactNode;
  boldIcon: React.ReactNode;
  isSelected: boolean;
  to: LinkProps['to'];
}

export const SidebarItem = ({
  title,
  icon,
  boldIcon,
  isSelected,
  to,
}: SidebarItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        'dark:hover:bg-dark_grey flex w-48 items-center rounded-md px-4 py-2 transition duration-300 hover:bg-gray-300 focus:outline-none',
        isSelected && 'bg-greyLight dark:bg-dark_greyDark',
      )}
    >
      <span className="w-6">{isSelected ? boldIcon : icon}</span>
      <span
        className={cn('ml-4', isSelected ? 'font-semibold' : 'font-normal')}
      >
        {title}
      </span>
    </Link>
  );
};
