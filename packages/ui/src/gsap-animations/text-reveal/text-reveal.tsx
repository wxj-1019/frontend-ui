"use client";

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export interface TextRevealProps {
  text: string;
  className?: string;
  mode?: 'chars' | 'words' | 'lines';
  duration?: number;
  stagger?: number;
  delay?: number;
  ease?: string;
  start?: string;
  from?: {
    y?: number;
    rotationX?: number;
    scale?: number;
    opacity?: number;
  };
}

export function TextReveal({
  text,
  className,
  mode = 'chars',
  duration = 0.8,
  stagger = 0.03,
  delay = 0,
  ease = 'power3.out',
  start = 'top 85%',
  from = { y: 20, rotationX: -90, scale: 0.9 },
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const splitText = (input: string, splitMode: 'chars' | 'words' | 'lines') => {
    const delimiter = splitMode === 'words' ? ' ' : '\n';
    return input.split(delimiter).filter(Boolean);
  };

  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      el.textContent = text;
      return () => {};
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const items = splitText(text, mode);
      el.innerHTML = '';

      const wrapper = document.createElement('span');
      gsap.set(wrapper, { display: 'inline', perspective: 600 });

      items.forEach((item) => {
        const span = document.createElement('span');
        span.textContent = item;
        wrapper.appendChild(span);
        if (mode === 'words') {
          wrapper.appendChild(document.createTextNode(' '));
        }
      });

      el.appendChild(wrapper);

      const targets = gsap.utils.toArray<HTMLSpanElement>(wrapper.querySelectorAll('span'));

      gsap.set(targets, { display: 'inline-block', willChange: 'transform' });

      gsap.from(targets, {
        autoAlpha: 0,
        ...from,
        duration,
        delay,
        stagger,
        ease,
        onComplete: () => {
          gsap.set(targets, { clearProps: 'willChange' });
        },
        scrollTrigger: { trigger: el, start },
      });

      return () => {
        gsap.set(targets, { clearProps: 'all' });
      };
    });

    return () => mm.revert();
  }, { scope: containerRef, dependencies: [text, mode] });

  return (
    <div ref={containerRef} className={cn('inline', className)} style={{ perspective: '600px' }} />
  );
}
