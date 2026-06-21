"use client";

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface CountUpProps {
  end: number;
  className?: string;
  start?: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  separator?: boolean;
  onComplete?: () => void;
}

export function CountUp({
  end,
  className,
  start = 0,
  duration = 2,
  delay = 0,
  prefix = '',
  suffix = '',
  decimals = 0,
  separator = true,
  onComplete,
}: CountUpProps) {
  const [value, setValue] = useState(start);
  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const formatNumber = (num: number) => {
    const fixed = num.toFixed(decimals);
    if (!separator) return fixed;
    return fixed.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const timeout = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (!startTimeRef.current) {
          startTimeRef.current = timestamp;
        }

        const progress = Math.min((timestamp - startTimeRef.current) / (duration * 1000), 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * eased;

        setValue(current);

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate);
        } else {
          onComplete?.();
        }
      };

      frameRef.current = requestAnimationFrame(animate);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [end, start, duration, delay, onComplete]);

  return (
    <span className={cn('inline', className)}>
      {prefix}{formatNumber(value)}{suffix}
    </span>
  );
}
