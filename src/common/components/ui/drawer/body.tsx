import type { ReactNode } from 'react';

import { cn } from '@/common/utils';

interface DrawerBodyProps {
  children: ReactNode;
  className?: string;
}

export const DrawerBody = ({ children, className }: DrawerBodyProps) => (
  <div
    className={cn(
      'text-text dark:text-dark_white flex-1 overflow-y-auto text-base',
      className,
    )}
  >
    {children}
  </div>
);
