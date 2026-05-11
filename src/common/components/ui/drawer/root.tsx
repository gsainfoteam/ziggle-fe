import { useCallback, useEffect, useId, useRef, type ReactNode } from 'react';

import {
  FloatingFocusManager,
  FloatingPortal,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';

import { cn } from '@/common/utils';

import {
  backdropTransition,
  backdropVariants,
  contentTransition,
  contentVariantsBySide,
  createDragEndHandler,
  dragConstraintsBySide,
  dragDirectionBySide,
} from './animation';
import { DrawerContext, type DrawerSide } from './context';

export interface DrawerRootProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  side?: DrawerSide;
  lockScroll?: boolean;
  closeOnEscape?: boolean;
  closeOnBackdrop?: boolean;
  trapFocus?: boolean;
  dragToDismiss?: boolean;
  className?: string;
  onExitComplete?: () => void;
}

const sideLayoutClassName: Record<
  DrawerSide,
  { container: string; panel: string; handle: string }
> = {
  bottom: {
    container: 'items-end justify-center',
    panel: 'left-0 right-0 bottom-0 max-h-[85vh] rounded-t-2xl pt-8',
    handle: 'top-3 left-1/2 -translate-x-1/2 h-1 w-12',
  },
  top: {
    container: 'items-start justify-center',
    panel: 'left-0 right-0 top-0 max-h-[85vh] rounded-b-2xl pb-8',
    handle: 'bottom-3 left-1/2 -translate-x-1/2 h-1 w-12',
  },
  left: {
    container: 'items-stretch justify-start',
    panel: 'left-0 top-0 bottom-0 w-[80vw] max-w-sm rounded-r-2xl pr-8',
    handle: 'right-3 top-1/2 -translate-y-1/2 h-12 w-1',
  },
  right: {
    container: 'items-stretch justify-end',
    panel: 'right-0 top-0 bottom-0 w-[80vw] max-w-sm rounded-l-2xl pl-8',
    handle: 'left-3 top-1/2 -translate-y-1/2 h-12 w-1',
  },
};

export const DrawerRoot = ({
  isOpen,
  onClose,
  children,
  side = 'bottom',
  lockScroll = true,
  closeOnEscape = true,
  closeOnBackdrop = true,
  trapFocus = true,
  dragToDismiss = true,
  className,
  onExitComplete,
}: DrawerRootProps) => {
  const titleId = useId();
  const descriptionId = useId();
  const dragRef = useRef<HTMLDivElement | null>(null);

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

  const handleDragEnd = useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) =>
      createDragEndHandler(side, onClose, dragRef)(event, info),
    [side, onClose],
  );

  const layout = sideLayoutClassName[side];

  return (
    <DrawerContext.Provider value={{ side, titleId, descriptionId, onClose }}>
      <FloatingPortal>
        <AnimatePresence onExitComplete={onExitComplete}>
          {isOpen && (
            <div
              className={cn(
                'fixed inset-0 z-1000 flex',
                layout.container,
              )}
            >
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
                  ref={(node) => {
                    setFloating(node);
                    dragRef.current = node;
                  }}
                  drag={dragToDismiss ? dragDirectionBySide[side] : false}
                  dragConstraints={
                    dragToDismiss ? dragConstraintsBySide[side] : undefined
                  }
                  dragElastic={0.2}
                  onDragEnd={dragToDismiss ? handleDragEnd : undefined}
                  variants={contentVariantsBySide[side]}
                  transition={contentTransition}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  role="dialog"
                  className={cn(
                    'absolute z-10 flex w-full flex-col gap-4 p-5',
                    'border-greyBorder dark:border-dark_greyBorder dark:bg-dark_dark border bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)]',
                    dragToDismiss && 'cursor-grab active:cursor-grabbing',
                    layout.panel,
                    className,
                  )}
                  {...getFloatingProps()}
                >
                  {dragToDismiss && (
                    <div
                      className={cn(
                        'bg-greyBorder dark:bg-dark_greyBorder absolute z-10 rounded-full',
                        layout.handle,
                      )}
                    />
                  )}
                  {children}
                </motion.div>
              </FloatingFocusManager>
            </div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </DrawerContext.Provider>
  );
};
