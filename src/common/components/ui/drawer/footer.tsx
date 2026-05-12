import type { ReactNode } from 'react';

import { cn } from '@/common/utils';

interface DrawerFooterProps {
  children: ReactNode;
  className?: string;
}

export const DrawerFooter = ({ children, className }: DrawerFooterProps) => (
  <div className={cn('flex w-full items-center gap-2', className)}>
    {children}
  </div>
);
