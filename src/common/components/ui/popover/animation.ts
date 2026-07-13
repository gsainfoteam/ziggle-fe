import type { Transition, Variants } from 'framer-motion';

export const popoverVariants: Variants = {
  closed: { opacity: 0, scale: 0.96 },
  open: { opacity: 1, scale: 1 },
};

export const popoverTransition: Transition = {
  duration: 0.18,
  ease: [0.16, 1, 0.3, 1],
};
