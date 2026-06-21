"use client";

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  axis?: 'y' | 'x';
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
}

export function Parallax({
  children,
  className,
  speed = 0.5,
  axis = 'y',
  start = 'top bottom',
  end = 'bottom top',
  scrub = true,
  markers = false,
}: ParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    // 减弱动效：不产生视差
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(el, { clearProps: 'all' });
      return () => {};
    });

    // 全动画模式
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const distance = speed * 100;

      gsap.to(el, {
        [axis]: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub,
          markers,
        },
      });

      return () => {
        gsap.set(el, { clearProps: 'all' });
      };
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={cn(className)}>
      {children}
    </div>
  );
}
