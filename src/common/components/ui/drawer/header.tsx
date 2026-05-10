import type { ReactNode } from 'react';

import { cn } from '@/common/utils';

interface DrawerHeaderProps {
  children: ReactNode;
  className?: string;
}

export const DrawerHeader = ({ children, className }: DrawerHeaderProps) => (
  <div className={cn('flex flex-col gap-1 pr-8', className)}>{children}</div>
);
