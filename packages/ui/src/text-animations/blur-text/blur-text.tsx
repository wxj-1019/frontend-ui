"use client";

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { useMemo } from 'react';

export interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  staggerDelay?: number;
  /** 是否按字符拆分动画，false 时整体模糊渐入 */
  animateBy?: 'characters' | 'words' | 'lines' | 'none';
}

export function BlurText({
  text,
  className,
  delay = 0,
  duration = 0.5,
  staggerDelay = 0.04,
  animateBy = 'characters',
}: BlurTextProps) {
  const segments = useMemo(() => {
    if (animateBy === 'none') return [text];
    if (animateBy === 'words') return text.split(' ');
    if (animateBy === 'lines') return text.split('\n');
    return text.split('');
  }, [text, animateBy]);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: staggerDelay, delayChildren: delay },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      filter: 'blur(10px)',
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  return (
    <motion.span
      className={cn('inline-block', className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      aria-label={text}
    >
      {segments.map((segment, index) => (
        <motion.span
          key={`${segment}-${index}`}
          variants={child}
          className="inline-block"
          style={{ willChange: 'filter, opacity' }}
        >
          {segment}
          {animateBy === 'words' && index < segments.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </motion.span>
  );
}
