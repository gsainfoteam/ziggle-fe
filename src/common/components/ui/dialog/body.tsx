import type { ReactNode } from 'react';

import { cn } from '@/common/utils';

interface DialogBodyProps {
  children: ReactNode;
  className?: string;
}

export const DialogBody = ({ children, className }: DialogBodyProps) => (
  <div
    className={cn(
      'text-text dark:text-dark_white overflow-y-auto text-base',
      '-mr-5 pr-5 scrollbar-float',
      className,
    )}
  >
    {children}
  </div>
);
