'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

export interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  /** Transition type */
  type?: 'fade' | 'slide' | 'scale' | 'blur';
  /** Animation duration (s) */
  duration?: number;
  /** Whether to disable animation */
  disabled?: boolean;
}

export function PageTransition({
  children,
  className,
  type = 'fade',
  duration = 0.4,
  disabled = false,
}: PageTransitionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (disabled) {
      setIsVisible(true);
      return;
    }

    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, [disabled]);

  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slide: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
    },
    blur: {
      initial: { opacity: 0, filter: 'blur(10px)' },
      animate: { opacity: 1, filter: 'blur(0px)' },
      exit: { opacity: 0, filter: 'blur(10px)' },
    },
  };

  const v = variants[type];

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={disabled ? {} : v.initial}
          animate={v.animate}
          exit={v.exit}
          transition={{ duration, ease: [0.4, 0, 0.2, 1] }}
          className={cn(className)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
