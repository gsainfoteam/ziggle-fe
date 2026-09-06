import type { ReactNode } from 'react';

import { cn } from '@/common/utils';

interface PopoverBodyProps {
  children: ReactNode;
  className?: string;
}

export const PopoverBody = ({ children, className }: PopoverBodyProps) => (
  <div
    className={cn(
      'border-border bg-background rounded-2xl border p-4 shadow-xl',
      className,
    )}
  >
    {children}
  </div>
);
