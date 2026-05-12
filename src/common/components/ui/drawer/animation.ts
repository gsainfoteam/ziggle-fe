import {
  animate,
  type BoundingBox,
  type PanInfo,
  type Transition,
  type Variants,
} from 'framer-motion';

import type { DrawerSide } from './context';

export const backdropVariants: Variants = {
  closed: { backgroundColor: 'rgba(0, 0, 0, 0)', backdropFilter: 'blur(0px)' },
  open: { backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(4px)' },
};

export const backdropTransition: Transition = {
  duration: 0.4,
  ease: [0.16, 1, 0.3, 1],
};

export const contentVariantsBySide: Record<DrawerSide, Variants> = {
  bottom: {
    closed: { opacity: 0, y: '100%' },
    open: { opacity: 1, y: '0%' },
  },
  top: {
    closed: { opacity: 0, y: '-100%' },
    open: { opacity: 1, y: '0%' },
  },
  left: {
    closed: { opacity: 0, x: '-100%' },
    open: { opacity: 1, x: '0%' },
  },
  right: {
    closed: { opacity: 0, x: '100%' },
    open: { opacity: 1, x: '0%' },
  },
};

export const contentTransition: Transition = {
  duration: 0.5,
  ease: [0.16, 1, 0.3, 1],
};

export const dragDirectionBySide: Record<DrawerSide, 'x' | 'y'> = {
  bottom: 'y',
  top: 'y',
  left: 'x',
  right: 'x',
};

export const dragConstraintsBySide: Record<DrawerSide, Partial<BoundingBox>> = {
  bottom: { top: 0, bottom: Infinity },
  top: { top: -Infinity, bottom: 0 },
  left: { left: -Infinity, right: 0 },
  right: { left: 0, right: Infinity },
};

export const createDragEndHandler = (
  side: DrawerSide,
  onClose: () => void,
  dragRef: React.RefObject<HTMLDivElement | null>,
  threshold = 100,
) => {
  return (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ): void => {
    let shouldClose = false;
    switch (side) {
      case 'bottom':
        shouldClose = info.offset.y > threshold;
        break;
      case 'top':
        shouldClose = info.offset.y < -threshold;
        break;
      case 'left':
        shouldClose = info.offset.x < -threshold;
        break;
      case 'right':
        shouldClose = info.offset.x > threshold;
        break;
    }

    if (shouldClose) {
      onClose();
    } else if (dragRef.current) {
      animate(
        dragRef.current,
        { [dragDirectionBySide[side]]: 0 },
        { duration: 0.3, ease: 'easeOut' },
      );
    }
  };
};
