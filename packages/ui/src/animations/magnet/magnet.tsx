"use client";

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { useMousePosition } from '@/hooks/use-mouse-position';

export interface MagnetProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function Magnet({ children, className, strength = 0.3 }: MagnetProps) {
  const { x, y } = useMousePosition();

  const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
  const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;

  return (
    <motion.div
      className={cn('inline-block', className)}
      animate={{
        x: (x - centerX) * strength,
        y: (y - centerY) * strength,
      }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.div>
  );
}
