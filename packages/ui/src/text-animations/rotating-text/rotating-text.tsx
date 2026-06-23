"use client";

import { cn } from '@/lib/utils';
import { useReducedMotion } from 'motion/react';

export interface RotatingTextProps {
  text: string;
  className?: string;
  /** 旋转速度（秒），默认 4 */
  speed?: number;
  /** 旋转方向，默认 'clockwise' */
  direction?: 'clockwise' | 'counter-clockwise';
  /** 字符间距，默认 0.5em */
  charSpacing?: string;
  as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'p';
}

export function RotatingText({
  text,
  className,
  speed = 4,
  direction = 'clockwise',
  charSpacing = '0.5em',
  as: Tag = 'span',
}: RotatingTextProps) {
  const shouldReduce = useReducedMotion();
  const chars = text.split('');
  const rotateDirection = direction === 'clockwise' ? 1 : -1;

  if (shouldReduce) {
    return <Tag className={cn('inline-block', className)}>{text}</Tag>;
  }

  return (
    <Tag
      className={cn('inline-flex', className)}
      aria-label={text}
      style={{ gap: charSpacing }}
    >
      {chars.map((char, i) => (
        <span
          key={`${char}-${i}`}
          className="inline-block origin-bottom"
          style={{
            animation: `rotate-char ${speed}s ease-in-out infinite`,
            animationDelay: `${(i / chars.length) * speed * rotateDirection}s`,
            willChange: 'transform',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </Tag>
  );
}
