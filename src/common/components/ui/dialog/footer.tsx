import type { ReactNode } from 'react';

import { cn } from '@/common/utils';

interface DialogFooterProps {
  children: ReactNode;
  className?: string;
}

export const DialogFooter = ({ children, className }: DialogFooterProps) => (
  <div className={cn('flex w-full items-center gap-2', className)}>
    {children}
  </div>
);
