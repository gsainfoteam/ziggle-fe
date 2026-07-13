import { type ReactNode } from 'react';

import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset as offsetMiddleware,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
  type Placement,
} from '@floating-ui/react';
import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '@/common/utils';

import { popoverTransition } from './animation';

export interface PopoverRootProps {
  isOpen: boolean;
  onClose: () => void;
  anchor: HTMLElement | null;
  children: ReactNode;
  placement?: Placement;
  offset?: number;
  closeOnOutsidePress?: boolean;
  closeOnEscape?: boolean;
  trapFocus?: boolean;
  className?: string;
  onExitComplete?: () => void;
}

export const PopoverRoot = ({
  isOpen,
  onClose,
  anchor,
  children,
  placement = 'bottom-start',
  offset = 8,
  closeOnOutsidePress = true,
  closeOnEscape = true,
  trapFocus = true,
  className,
  onExitComplete,
}: PopoverRootProps) => {
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: (open) => {
      if (!open) onClose();
    },
    elements: { reference: anchor },
    placement,
    middleware: [offsetMiddleware(offset), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });
  const { setFloating } = refs;

  const dismiss = useDismiss(context, {
    outsidePress: closeOnOutsidePress,
    escapeKey: closeOnEscape,
  });
  const { getFloatingProps } = useInteractions([dismiss]);

  return (
    <FloatingPortal>
      <AnimatePresence onExitComplete={onExitComplete}>
        {isOpen && (
          <FloatingFocusManager
            context={context}
            modal={false}
            disabled={!trapFocus}
            returnFocus
          >
            <motion.div
              ref={setFloating}
              style={floatingStyles}
              className="z-1000 outline-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={popoverTransition}
              {...getFloatingProps()}
            >
              <motion.div
                initial={{ scale: 0.96 }}
                animate={{ scale: 1 }}
                transition={popoverTransition}
                className={cn(className)}
              >
                {children}
              </motion.div>
            </motion.div>
          </FloatingFocusManager>
        )}
      </AnimatePresence>
    </FloatingPortal>
  );
};
