"use client";

import { useRef } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  splitBy?: 'chars' | 'words';
}

export function SplitText({
  text,
  className,
  delay = 0,
  duration = 0.5,
  stagger = 0.03,
  splitBy = 'chars',
}: SplitTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  const items = splitBy === 'words' ? text.split(' ') : text.split('');

  return (
    <span ref={containerRef} className={cn('inline', className)}>
      {items.map((item, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + index * stagger,
            duration,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {item}
          {splitBy === 'words' && index < items.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </span>
  );
}
