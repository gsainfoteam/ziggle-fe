import { useEffect, useId, type ReactNode } from 'react';

import {
  FloatingFocusManager,
  FloatingPortal,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '@/common/utils';

import {
  backdropTransition,
  backdropVariants,
  contentTransition,
  contentVariants,
} from './animation';
import { DialogContext } from './context';

export type DialogSize = 'sm' | 'md' | 'lg' | 'full';

const sizeClassName: Record<DialogSize, string> = {
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

  useEffect(() => {
    if (!lockScroll || !isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen, lockScroll]);

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
                  aria-modal="true"
                  aria-labelledby={titleId}
                  aria-describedby={descriptionId}
                  className={cn(
                    'relative mx-5 flex max-h-[80vh] w-full flex-col gap-4 overflow-hidden p-5',
                    'border-greyBorder dark:border-dark_greyBorder dark:bg-dark_dark rounded-2xl border bg-white shadow-xl',
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
