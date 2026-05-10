import type { ReactNode } from 'react';

import { cn } from '@/common/utils';

interface PopoverBodyProps {
  children: ReactNode;
  className?: string;
}

export const PopoverBody = ({ children, className }: PopoverBodyProps) => (
  <div
    className={cn(
      'border-greyBorder dark:border-dark_greyBorder dark:bg-dark_dark rounded-2xl border bg-white p-4 shadow-xl',
      className,
    )}
  >
    {children}
  </div>
);
