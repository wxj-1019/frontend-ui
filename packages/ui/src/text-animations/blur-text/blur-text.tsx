"use client";

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

export interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export function BlurText({
  text,
  className,
  delay = 0,
  duration = 0.5,
}: BlurTextProps) {
  return (
    <motion.span
      className={cn('inline-block', className)}
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ delay, duration }}
    >
      {text}
    </motion.span>
  );
}
