import type { ReactNode } from 'react';

import { cn } from '@/common/utils';

import { useDialogContext } from './context';

interface DialogDescriptionProps {
  children: ReactNode;
  className?: string;
}

export const DialogDescription = ({
  children,
  className,
}: DialogDescriptionProps) => {
  const { descriptionId } = useDialogContext();
  return (
    <p
      id={descriptionId}
      className={cn(
        'text-muted-foreground text-sm leading-relaxed text-pretty',
        className,
      )}
    >
      {children}
    </p>
  );
};
