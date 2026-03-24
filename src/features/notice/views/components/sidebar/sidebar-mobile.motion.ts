import type { Transition, Variants } from 'framer-motion';

export const overlayTransition: Transition = {
  duration: 0.35,
  ease: 'linear',
};

export const panelVariants: Variants = {
  visible: {
    x: 0,
    transition: { ease: [0.33, 1, 0.68, 1], duration: 0.35 },
  },
  exit: {
    x: '-100%',
    transition: { ease: [0.32, 0, 0.67, 0], duration: 0.28 },
  },
};
