import type { ReactNode } from 'react';

import { cn } from '@/common/utils';

interface DialogHeaderProps {
  children: ReactNode;
  className?: string;
}

export const DialogHeader = ({ children, className }: DialogHeaderProps) => (
  <div className={cn('flex flex-col gap-1 pr-8', className)}>{children}</div>
);
