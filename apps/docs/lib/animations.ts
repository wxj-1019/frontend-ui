'use client';

import { useReducedMotion, type Variants } from 'motion/react';

export function useReducedMotionValue() {
  return useReducedMotion();
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const fadeInReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
};

export const slideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export const slideUpReduced = {
  hidden: { opacity: 0, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerContainerReduced = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0,
    },
  },
};

export const springTransition = {
  type: 'spring',
  stiffness: 400,
  damping: 17,
};

export const springTransitionReduced = {
  duration: 0,
};

export function getAnimationVariants(
  normal: Variants,
  reduced: Variants
): Variants {
  const shouldReduce = useReducedMotion();
  return shouldReduce ? reduced : normal;
}
