"use client";

import { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';

export interface ScrambleTextProps {
  text: string;
  className?: string;
  chars?: string;
  delay?: number;
  trigger?: 'auto' | 'scroll' | 'hover';
  onComplete?: () => void;
}

export function ScrambleText({
  text,
  className,
  chars = '!@#$%^&*()_+-=[]{}|;:,.<>?',
  delay = 0,
  trigger = 'auto',
  onComplete,
}: ScrambleTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [displayText, setDisplayText] = useState('');
  const scrambleIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scramble = () => {
    if (scrambleIntervalRef.current) {
      clearInterval(scrambleIntervalRef.current);
    }

    let iteration = 0;
    const maxIterations = text.length * 3;

    scrambleIntervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration / 3) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= maxIterations) {
        if (scrambleIntervalRef.current) {
          clearInterval(scrambleIntervalRef.current);
        }
        setDisplayText(text);
        onComplete?.();
      }

      iteration += 1;
    }, 30);
  };

  useGSAP(() => {
    if (trigger !== 'auto') return;

    const timeout = setTimeout(() => {
      scramble();
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, { scope: containerRef, dependencies: [text, delay, trigger] });

  useEffect(() => {
    return () => {
      if (scrambleIntervalRef.current) {
        clearInterval(scrambleIntervalRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      scramble();
    }
  };

  return (
    <span
      ref={containerRef}
      className={cn('inline', className)}
      onMouseEnter={handleMouseEnter}
    >
      {displayText || text}
    </span>
  );
}
