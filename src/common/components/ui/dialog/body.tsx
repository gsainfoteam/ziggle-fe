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
      'scrollbar-float -mr-5 pr-5',
      // Reserve column for the absolute-positioned <Dialog.Close /> so body
      // content never visually collides when used without <Dialog.Header />.
      'pr-8',
      className,
    )}
  >
    {children}
  </div>
);
