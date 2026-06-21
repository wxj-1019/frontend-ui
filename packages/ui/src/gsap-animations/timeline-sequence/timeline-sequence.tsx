"use client";

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export interface TimelineStep {
  selector: string;
  to: gsap.TweenVars;
  position?: string | number;
}

export interface TimelineSequenceProps {
  children: React.ReactNode;
  className?: string;
  steps: TimelineStep[];
  defaults?: gsap.TweenVars;
  scrollTrigger?: boolean;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
  pause?: boolean;
}

export function TimelineSequence({
  children,
  className,
  steps,
  defaults = { duration: 0.5, ease: 'power2.inOut' },
  scrollTrigger = false,
  start = 'top 80%',
  end = 'bottom 20%',
  scrub = false,
  pin = false,
  markers = false,
  pause = false,
}: TimelineSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    const el = containerRef.current;
    if (!el || steps.length === 0) return;

    const mm = gsap.matchMedia();

    // 减弱动效：直接显示所有子元素
    mm.add("(prefers-reduced-motion: reduce)", () => {
      const targets = steps.map(step => el.querySelector(step.selector)).filter(Boolean);
      gsap.set(targets, { autoAlpha: 1, clearProps: 'all' });
      return () => {};
    });

    // 全动画模式
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        defaults,
        ...(scrollTrigger && {
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub,
            pin,
            markers,
          },
        }),
      });

      steps.forEach((step) => {
        tl.to(el.querySelector(step.selector), step.to, step.position);
      });

      if (pause) {
        tl.pause();
      }

      timelineRef.current = tl;

      return () => {
        tl.kill();
        timelineRef.current = null;
      };
    });

    return () => mm.revert();
  }, { scope: containerRef, dependencies: [steps, scrollTrigger, start, end, scrub] });

  return (
    <div ref={containerRef} className={cn(className)}>
      {children}
    </div>
  );
}

export function useTimeline(steps: TimelineStep[], options?: { defaults?: gsap.TweenVars }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    const el = containerRef.current;
    if (!el || steps.length === 0) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      const targets = steps.map(step => el.querySelector(step.selector)).filter(Boolean);
      gsap.set(targets, { autoAlpha: 1, clearProps: 'all' });
      return () => {};
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: options?.defaults });

      steps.forEach((step) => {
        tl.to(el.querySelector(step.selector), step.to, step.position);
      });

      timelineRef.current = tl;

      return () => {
        tl.kill();
        timelineRef.current = null;
      };
    });

    return () => mm.revert();
  }, { scope: containerRef, dependencies: [steps] });

  return {
    ref: containerRef,
    timeline: timelineRef,
    play: () => timelineRef.current?.play(),
    pause: () => timelineRef.current?.pause(),
    reverse: () => timelineRef.current?.reverse(),
    seek: (time: number) => timelineRef.current?.seek(time),
    progress: (value: number) => timelineRef.current?.progress(value),
    timeScale: (value: number) => timelineRef.current?.timeScale(value),
  };
}
