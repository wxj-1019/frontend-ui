"use client";

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export interface PinSectionProps {
  children: React.ReactNode;
  className?: string;
  duration?: string;
  start?: string;
  end?: string;
  pinSpacing?: boolean;
  scrub?: boolean | number;
}

export function PinSection({
  children,
  className,
  duration = '100%',
  start = 'top top',
  end = 'bottom top',
  pinSpacing = true,
  scrub = true,
}: PinSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      // 减弱动效：不进行 pin
      mm.add('(prefers-reduced-motion: reduce)', () => {
        return () => {};
      });

      // 全动画模式：在滚动时将内容固定
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // duration 优先：非默认值时按 +=duration 处理
        const computedEnd =
          duration !== '100%' ? `+=${duration}` : end;

        const trigger = ScrollTrigger.create({
          trigger: el,
          start,
          end: computedEnd,
          pin: true,
          pinSpacing,
          scrub,
        });

        return () => {
          trigger.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
