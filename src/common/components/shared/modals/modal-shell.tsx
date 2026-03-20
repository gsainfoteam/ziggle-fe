import type { ReactNode } from 'react';

import { cn } from '@/common/utils';

export type ModalShellProps = {
  isOpen: boolean;
  close: () => void;

  panelClassName?: string;

  header?: ReactNode;

  title?: ReactNode;
  description?: ReactNode;
  bodyClassName?: string;

  actions?: ReactNode;
};

export function ModalShell({
  isOpen,
  panelClassName,
  header,
  title,
  description,
  bodyClassName,
  actions,
}: ModalShellProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-text/50 dark:bg-dark_white/50"
      role="dialog"
    >
      <div
        className={cn(
          'mx-10 flex h-auto min-w-[400px] max-w-[500px] flex-col justify-between gap-6 rounded-[20px] bg-white p-6 shadow-md',
          panelClassName,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {header}
        {(title !== undefined || description !== undefined) && (
          <div className={cn('flex flex-col', bodyClassName)}>
            {title}
            {description}
          </div>
        )}
        {actions}
      </div>
    </div>
  );
}

