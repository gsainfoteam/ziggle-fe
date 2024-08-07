import { Variants } from 'framer-motion';

export const GROUP_CREATION_NAME_ANIMATION_CONTAINER_VARIANT: Variants = {
  visible: {
    opacity: 1,
  },
  out: {
    opacity: 0,
    transition: {
      delayChildren: 0,
      staggerChildren: 0.1,
      duration: 0.4,
    },
  },
};

export const GROUP_CREATION_NAME_ANIMATION_ITEM_VARIANT: Variants = {
  visible: {
    y: 0,
    opacity: 1,
  },
  out: {
    y: 10,
    opacity: 0,
    transition: {
      ease: 'easeOut',
      duration: 0.3,
    },
  },
};

export const GROUP_CREATION_MEMBERS_ANIMATION_CONTAINER_VARIANT: Variants = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0,
      staggerChildren: 0.1,
      duration: 0.4,
    },
  },
  out: {
    opacity: 0,
    transition: {
      delayChildren: 0,
      staggerChildren: 0.1,
      duration: 0.4,
    },
  },
};

export const GROUP_CREATION_MEMBERS_ANIMATION_ITEM_VARIANT: Variants = {
  initial: {
    y: 10,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: 'easeOut',
      duration: 0.3,
    },
  },
  out: {
    y: 10,
    opacity: 0,
    transition: {
      ease: 'easeOut',
      duration: 0.3,
    },
  },
};
