"use client";

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

export interface FadeContentProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function FadeContent({
  children,
  className,
  delay = 0,
  duration = 0.5,
  direction = 'up',
}: FadeContentProps) {
  const directionOffset = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  };

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration }}
    >
      {children}
    </motion.div>
  );
}
