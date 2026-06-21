"use client";

import { useRef } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export interface WaveTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  amplitude?: number;
}

export function WaveText({
  text,
  className,
  delay = 0,
  stagger = 0.05,
  duration = 0.5,
  amplitude = 20,
}: WaveTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  return (
    <span ref={containerRef} className={cn('inline', className)}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ y: 0 }}
          animate={{
            y: [0, -amplitude, 0],
          }}
          transition={{
            duration,
            delay: delay + index * stagger,
            repeat: Infinity,
            repeatDelay: 2,
            ease: 'easeInOut',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}
