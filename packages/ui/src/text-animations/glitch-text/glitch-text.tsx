"use client";

import { useRef } from 'react';
import { cn } from '@/lib/utils';

export interface GlitchTextProps {
  text: string;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

const KEYFRAMES_STYLE_ID = 'glitch-text-keyframes';

function ensureKeyframes() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(KEYFRAMES_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = KEYFRAMES_STYLE_ID;
  style.textContent = `
@keyframes glitch-1 {
  0% { clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%); transform: translate(-2px, 2px); }
  10% { clip-path: polygon(0 15%, 100% 15%, 100% 20%, 0 20%); transform: translate(2px, -1px); }
  20% { clip-path: polygon(0 10%, 100% 10%, 100% 30%, 0 30%); transform: translate(-1px, 3px); }
  30% { clip-path: polygon(0 40%, 100% 40%, 100% 45%, 0 45%); transform: translate(3px, -2px); }
  40% { clip-path: polygon(0 5%, 100% 5%, 100% 15%, 0 15%); transform: translate(-3px, 1px); }
  50% { clip-path: polygon(0 25%, 100% 25%, 100% 35%, 0 35%); transform: translate(1px, -3px); }
  60% { clip-path: polygon(0 30%, 100% 30%, 100% 45%, 0 45%); transform: translate(-2px, 2px); }
  70% { clip-path: polygon(0 8%, 100% 8%, 100% 18%, 0 18%); transform: translate(2px, -1px); }
  80% { clip-path: polygon(0 42%, 100% 42%, 100% 48%, 0 48%); transform: translate(-1px, 3px); }
  90% { clip-path: polygon(0 12%, 100% 12%, 100% 25%, 0 25%); transform: translate(3px, -2px); }
  100% { clip-path: polygon(0 20%, 100% 20%, 100% 28%, 0 28%); transform: translate(-2px, 1px); }
}
@keyframes glitch-2 {
  0% { clip-path: polygon(0 60%, 100% 60%, 100% 70%, 0 70%); transform: translate(2px, -2px); }
  10% { clip-path: polygon(0 75%, 100% 75%, 100% 85%, 0 85%); transform: translate(-1px, 3px); }
  20% { clip-path: polygon(0 55%, 100% 55%, 100% 65%, 0 65%); transform: translate(3px, -1px); }
  30% { clip-path: polygon(0 80%, 100% 80%, 100% 90%, 0 90%); transform: translate(-3px, 2px); }
  40% { clip-path: polygon(0 65%, 100% 65%, 100% 75%, 0 75%); transform: translate(1px, -3px); }
  50% { clip-path: polygon(0 50%, 100% 50%, 100% 60%, 0 60%); transform: translate(-2px, 1px); }
  60% { clip-path: polygon(0 85%, 100% 85%, 100% 95%, 0 95%); transform: translate(2px, -2px); }
  70% { clip-path: polygon(0 58%, 100% 58%, 100% 68%, 0 68%); transform: translate(-1px, 3px); }
  80% { clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%); transform: translate(3px, -1px); }
  90% { clip-path: polygon(0 52%, 100% 52%, 100% 62%, 0 62%); transform: translate(-3px, 2px); }
  100% { clip-path: polygon(0 78%, 100% 78%, 100% 88%, 0 88%); transform: translate(1px, -2px); }
}`;
  document.head.appendChild(style);
}

export function GlitchText({
  text,
  className,
  intensity = 'medium',
}: GlitchTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  const intensityMap = {
    low: { offset: 2 },
    medium: { offset: 4 },
    high: { offset: 6 },
  };

  const { offset } = intensityMap[intensity];

  ensureKeyframes();

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
