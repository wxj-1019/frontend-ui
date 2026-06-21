"use client";

import { useRef } from 'react';
import { cn } from '@/lib/utils';

export interface GlitchTextProps {
  text: string;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export function GlitchText({
  text,
  className,
  intensity = 'medium',
}: GlitchTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  const intensityMap = {
    low: { offset: 2, iterations: 3 },
    medium: { offset: 4, iterations: 5 },
    high: { offset: 6, iterations: 8 },
  };

  const { offset } = intensityMap[intensity];

  return (
    <span
      ref={containerRef}
      className={cn('relative inline-block', className)}
      aria-label={text}
    >
      <span className="relative z-10">{text}</span>
      <span
        className="absolute left-0 top-0 z-0 text-[var(--color-accent)] opacity-70"
        style={{
          clipPath: `polygon(0 0, 100% 0, 100% 45%, 0 45%)`,
          transform: `translate(${-offset}px, ${offset}px)`,
          animation: 'glitch-1 0.3s infinite linear alternate-reverse',
        }}
        aria-hidden="true"
      >
        {text}
      </span>
      <span
        className="absolute left-0 top-0 z-0 text-[var(--color-accent)] opacity-70"
        style={{
          clipPath: `polygon(0 55%, 100% 55%, 100% 100%, 0 100%)`,
          transform: `translate(${offset}px, ${-offset}px)`,
          animation: 'glitch-2 0.3s infinite linear alternate-reverse',
        }}
        aria-hidden="true"
      >
        {text}
      </span>
    </span>
  );
}
