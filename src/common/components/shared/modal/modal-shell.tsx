import type { ReactNode } from 'react';

import { cn } from '@/common/utils';

export type ModalRootProps = {
  isOpen: boolean;
  children: ReactNode;
};

export type ModalOverlayProps = {
  onClick: () => void;
  className?: string;
};

type ModalSlotProps = {
  children: ReactNode;
  className?: string;
};

function ModalRoot({ isOpen, children }: ModalRootProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center"
      role="dialog"
    >
      {children}
    </div>
  );
}

function ModalOverlay({ onClick, className }: ModalOverlayProps) {
  return (
    <div
      className={cn(
        'absolute inset-0 bg-text/50 dark:bg-dark_white/50',
        className,
      )}
      onClick={onClick}
      aria-hidden
    />
  );
}

function ModalPanel({ children, className }: ModalSlotProps) {
  return (
    <div
      className={cn(
        'relative z-10 mx-10 flex h-auto min-w-[400px] max-w-[500px] flex-col justify-between gap-6 rounded-[20px] bg-white p-6 shadow-md',
        className,
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
}

function ModalHeader({ children, className }: ModalSlotProps) {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      {children}
    </div>
  );
}

function ModalBody({ children, className }: ModalSlotProps) {
  return <div className={cn('flex flex-col', className)}>{children}</div>;
}

function ModalTitle({ children, className }: ModalSlotProps) {
  return (
    <p className={cn('text-center text-xl font-semibold md:text-2xl', className)}>
      {children}
    </p>
  );
}

function ModalDescription({ children, className }: ModalSlotProps) {
  return (
    <p className={cn('text-center text-sm text-greyDark', className)}>{children}</p>
  );
}

function ModalActions({ children, className }: ModalSlotProps) {
  return <div className={className}>{children}</div>;
}

export const Modal = {
  Root: ModalRoot,
  Overlay: ModalOverlay,
  Panel: ModalPanel,
  Header: ModalHeader,
  Body: ModalBody,
  Title: ModalTitle,
  Description: ModalDescription,
  Actions: ModalActions,
};
