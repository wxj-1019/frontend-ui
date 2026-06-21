"use client";

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  delay?: number;
  distance?: number;
  ease?: string;
  start?: string;
  markers?: boolean;
  pin?: boolean;
  scrub?: boolean | number;
}

export function ScrollReveal({
  children,
  className,
  direction = 'up',
  duration = 1,
  delay = 0,
  distance = 60,
  ease = 'power3.out',
  start = 'top 85%',
  markers = false,
  pin = false,
  scrub = false,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(el, { autoAlpha: 1, clearProps: 'all' });
      return () => {};
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(el, {
        autoAlpha: 0,
        ...directionMap[direction],
        duration: scrub ? 1 : duration,
        delay: scrub ? 0 : delay,
        ease,
        scrollTrigger: {
          trigger: el,
          start,
          markers,
          pin,
          scrub,
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
