import type { Transition, Variants } from 'framer-motion';

export const popoverVariants: Variants = {
  closed: { opacity: 0, scale: 0.96 },
  open: { opacity: 1, scale: 1 },
};

export const popoverTransition: Transition = {
  duration: 0.18,
  ease: [0.16, 1, 0.3, 1],
};

export const fullscreenBackdropVariants: Variants = {
  closed: { backgroundColor: 'rgba(0, 0, 0, 0)' },
  open: { backgroundColor: 'rgba(0, 0, 0, 0.4)' },
};

export const fullscreenContentVariants: Variants = {
  closed: { opacity: 0, y: 10 },
  open: { opacity: 1, y: 0 },
};

export const fullscreenTransition: Transition = {
  duration: 0.25,
  ease: [0.16, 1, 0.3, 1],
};
