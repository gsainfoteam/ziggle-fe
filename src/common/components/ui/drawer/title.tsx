import type { ReactNode } from 'react';

import { cn } from '@/common/utils';

import { useDrawerContext } from './context';

interface DrawerTitleProps {
  children: ReactNode;
  className?: string;
}

export const DrawerTitle = ({ children, className }: DrawerTitleProps) => {
  const { titleId } = useDrawerContext();
  return (
    <h2
      id={titleId}
      className={cn('text-foreground text-xl font-bold', className)}
    >
      {children}
    </h2>
  );
};
