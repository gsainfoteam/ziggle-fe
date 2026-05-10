import type { Transition, Variants } from 'framer-motion';

export const backdropVariants: Variants = {
  closed: { backgroundColor: 'rgba(0, 0, 0, 0)', backdropFilter: 'blur(0px)' },
  open: { backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(4px)' },
};

export const backdropTransition: Transition = {
  duration: 0.3,
  ease: [0.16, 1, 0.3, 1],
};

export const contentVariants: Variants = {
  closed: { opacity: 0, y: 10, scale: 0.98 },
  open: { opacity: 1, y: 0, scale: 1 },
};

export const contentTransition: Transition = {
  duration: 0.4,
  ease: [0.16, 1, 0.3, 1],
};
