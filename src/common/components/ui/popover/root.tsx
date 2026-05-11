import { useEffect, useState, type ReactNode } from 'react';

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

import {
  fullscreenBackdropVariants,
  fullscreenContentVariants,
  fullscreenTransition,
  popoverTransition,
} from './animation';

const MOBILE_QUERY = '(max-width: 767px)';

const useIsMobile = (enabled: boolean): boolean => {
  const [isMobile, setIsMobile] = useState(() => {
    if (!enabled || typeof window === 'undefined') return false;
    return window.matchMedia(MOBILE_QUERY).matches;
  });

  useEffect(() => {
    if (!enabled) return;
    const mq = window.matchMedia(MOBILE_QUERY);
    const handler = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [enabled]);

  return isMobile;
};

export interface PopoverRootProps {
  isOpen: boolean;
  onClose: () => void;
  anchor: HTMLElement | null;
  children: ReactNode;
  placement?: Placement;
  offset?: number;
  responsive?: boolean;
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
  responsive = false,
  closeOnOutsidePress = true,
  closeOnEscape = true,
  trapFocus = true,
  className,
  onExitComplete,
}: PopoverRootProps) => {
  const isMobile = useIsMobile(responsive);
  const useFullscreen = responsive && isMobile;

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: (open) => {
      if (!open) onClose();
    },
    elements: { reference: useFullscreen ? null : anchor },
    placement,
    middleware: [
      offsetMiddleware(offset),
      flip(),
      shift({ padding: 8 }),
    ],
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
        {isOpen &&
          (useFullscreen ? (
            <div className="fixed inset-0 z-1000 flex items-center justify-center">
              <motion.div
                className="absolute inset-0"
                variants={fullscreenBackdropVariants}
                transition={fullscreenTransition}
                initial="closed"
                animate="open"
                exit="closed"
                onClick={closeOnOutsidePress ? onClose : undefined}
              />
              <FloatingFocusManager
                context={context}
                modal
                disabled={!trapFocus}
                returnFocus
              >
                <motion.div
                  ref={setFloating}
                  variants={fullscreenContentVariants}
                  transition={fullscreenTransition}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  role="dialog"
                  className={cn(
                    'relative z-10 max-h-[90vh] max-w-[90vw] overflow-y-auto',
                    className,
                  )}
                  {...getFloatingProps()}
                >
                  {children}
                </motion.div>
              </FloatingFocusManager>
            </div>
          ) : (
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
          ))}
      </AnimatePresence>
    </FloatingPortal>
  );
};
