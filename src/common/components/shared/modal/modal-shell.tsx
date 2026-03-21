import {
  createContext,
  useContext,
  useId,
  type ReactNode,
} from 'react';

import { cn } from '@/common/utils';

type ModalShellContextValue = {
  titleId: string;
  descriptionId: string;
};

const ModalShellContext = createContext<ModalShellContextValue | null>(null);

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
  const titleId = useId();
  const descriptionId = useId();

  if (!isOpen) return null;

  return (
    <ModalShellContext.Provider value={{ titleId, descriptionId }}>
      <div
        className="fixed inset-0 z-50 flex h-full w-full items-center justify-center"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        {children}
      </div>
    </ModalShellContext.Provider>
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
        'relative z-10 mx-5 flex h-auto w-full min-w-0 max-w-[500px] flex-col justify-between gap-6 rounded-[20px] bg-white p-6 shadow-md',
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
  const ctx = useContext(ModalShellContext);

  return (
    <p
      id={ctx?.titleId}
      className={cn('text-center text-xl font-semibold md:text-2xl', className)}
    >
      {children}
    </p>
  );
}

function ModalDescription({ children, className }: ModalSlotProps) {
  const ctx = useContext(ModalShellContext);

  return (
    <p
      id={ctx?.descriptionId}
      className={cn('text-center text-sm text-greyDark', className)}
    >
      {children}
    </p>
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
