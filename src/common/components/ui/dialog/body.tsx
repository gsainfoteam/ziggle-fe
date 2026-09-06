import type { ReactNode } from 'react';

import { cn } from '@/common/utils';

interface DialogBodyProps {
  children: ReactNode;
  className?: string;
}

export const DialogBody = ({ children, className }: DialogBodyProps) => (
  <div
    className={cn(
      'text-foreground overflow-y-auto text-base',
      'scrollbar-float -mr-5 pr-5',
      className,
    )}
  >
    {children}
  </div>
);
