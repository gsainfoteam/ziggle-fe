import { useId, type ReactNode } from 'react';

import {
  FloatingFocusManager,
  FloatingPortal,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import { AnimatePresence, motion } from 'framer-motion';

import { cn, useScrollLock } from '@/common/utils';

import {
  backdropTransition,
  backdropVariants,
  contentTransition,
  contentVariants,
} from './animation';
import { DialogContext } from './context';

export type DialogSize = 'xs' | 'sm' | 'md' | 'lg' | 'full';

const sizeClassName: Record<DialogSize, string> = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  full: 'h-full max-h-none w-full max-w-none rounded-none border-none',
};

export interface DialogRootProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: DialogSize;
  lockScroll?: boolean;
  closeOnEscape?: boolean;
  closeOnBackdrop?: boolean;
  trapFocus?: boolean;
  className?: string;
  onExitComplete?: () => void;
}

export const DialogRoot = ({
  isOpen,
  onClose,
  children,
  size = 'md',
  lockScroll = true,
  closeOnEscape = true,
  closeOnBackdrop = true,
  trapFocus = true,
  className,
  onExitComplete,
}: DialogRootProps) => {
  const titleId = useId();
  const descriptionId = useId();

  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: (open) => {
      if (!open) onClose();
    },
  });
  const { setFloating } = refs;

  const dismiss = useDismiss(context, {
    outsidePress: false,
    escapeKey: closeOnEscape,
  });
  const { getFloatingProps } = useInteractions([dismiss]);

  useScrollLock(isOpen && lockScroll);

  return (
    <DialogContext.Provider value={{ titleId, descriptionId, onClose }}>
      <FloatingPortal>
        <AnimatePresence onExitComplete={onExitComplete}>
          {isOpen && (
            <div className="fixed inset-0 z-1000 flex items-center justify-center">
              <motion.div
                className="absolute inset-0"
                variants={backdropVariants}
                transition={backdropTransition}
                initial="closed"
                animate="open"
                exit="closed"
                onClick={closeOnBackdrop ? onClose : undefined}
              />
              <FloatingFocusManager
                context={context}
                modal
                disabled={!trapFocus}
                returnFocus
              >
                <motion.div
                  ref={setFloating}
                  variants={contentVariants}
                  transition={contentTransition}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  role="dialog"
                  data-ziggle-overlay=""
                  className={cn(
                    'relative mx-5 flex max-h-[80vh] w-full flex-col gap-4 overflow-hidden p-5',
                    'border-border bg-background rounded-2xl border shadow-xl',
                    sizeClassName[size],
                    className,
                  )}
                  {...getFloatingProps()}
                >
                  {children}
                </motion.div>
              </FloatingFocusManager>
            </div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </DialogContext.Provider>
  );
};
