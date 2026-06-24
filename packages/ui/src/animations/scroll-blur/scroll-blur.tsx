'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

export interface ScrollBlurProps {
  children: React.ReactNode;
  className?: string;
  /** Maximum blur amount (px) */
  maxBlur?: number;
  /** Velocity threshold to start blur */
  threshold?: number;
  /** Whether to also adjust saturation */
  adjustSaturation?: boolean;
  /** Whether to also adjust brightness */
  adjustBrightness?: boolean;
}

export function ScrollBlur({
  children,
  className,
  maxBlur = 8,
  threshold = 0.5,
  adjustSaturation = true,
  adjustBrightness = true,
}: ScrollBlurProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());
  const rafRef = useRef<number>(0);

  const updateBlur = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const now = Date.now();
    const dt = Math.max(now - lastTime.current, 1);
    const dy = Math.abs(window.scrollY - lastScrollY.current);
    const velocity = dy / dt;

    lastScrollY.current = window.scrollY;
    lastTime.current = now;

    const normalizedVelocity = Math.min(velocity / threshold, 1);
    const blur = normalizedVelocity * maxBlur;
    const saturation = adjustSaturation ? 100 + normalizedVelocity * 30 : 100;
    const brightness = adjustBrightness ? 1 - normalizedVelocity * 0.1 : 1;

    el.style.filter = `blur(${blur}px) saturate(${saturation}%) brightness(${brightness})`;
  }, [maxBlur, threshold, adjustSaturation, adjustBrightness]);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateBlur);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateBlur]);

  return (
    <div ref={containerRef} className={cn('will-change-[filter]', className)}>
      {children}
    </div>
  );
}
