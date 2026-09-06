import type { ReactNode } from 'react';

import { cn } from '@/common/utils';

import { useDialogContext } from './context';

interface DialogTitleProps {
  children: ReactNode;
  className?: string;
}

export const DialogTitle = ({ children, className }: DialogTitleProps) => {
  const { titleId } = useDialogContext();
  return (
    <h2
      id={titleId}
      className={cn('text-foreground text-xl font-bold text-pretty', className)}
    >
      {children}
    </h2>
  );
};
