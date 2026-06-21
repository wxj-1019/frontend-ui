"use client";

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollProgressProps {
  className?: string;
  color?: string;
  height?: number;
  position?: 'top' | 'bottom';
  smooth?: boolean;
}

export function ScrollProgress({
  className,
  color = 'var(--color-accent)',
  height = 3,
  position = 'top',
  smooth = true,
}: ScrollProgressProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const bar = barRef.current;
      if (!bar) return;

      const mm = gsap.matchMedia();

      // 减弱动效：隐藏进度条
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(bar, { autoAlpha: 0, clearProps: 'all' });
        return () => {};
      });

      // 全动画模式：根据滚动进度缩放进度条
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(bar, { scaleX: 0, transformOrigin: '0% 50%' });

        const trigger = ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate: (self) => {
            const p = self.progress;
            if (smooth) {
              gsap.to(bar, {
                scaleX: p,
                duration: 0.2,
                ease: 'power2.out',
                overwrite: true,
              });
            } else {
              gsap.set(bar, { scaleX: p });
            }
          },
        });

        return () => {
          trigger.kill();
          gsap.set(bar, { clearProps: 'all' });
        };
      });

      return () => mm.revert();
    },
    { scope: wrapperRef }
  );

  return (
    <div
      ref={wrapperRef}
      className={cn(
        'pointer-events-none fixed left-0 right-0 z-50',
        position === 'top' ? 'top-0' : 'bottom-0',
        className
      )}
      style={{ height }}
      role="progressbar"
      aria-label="页面滚动进度"
    >
      <div
        ref={barRef}
        className="h-full w-full"
        style={{
          background: color,
          transform: 'scaleX(0)',
          transformOrigin: '0% 50%',
        }}
      />
    </div>
  );
}
