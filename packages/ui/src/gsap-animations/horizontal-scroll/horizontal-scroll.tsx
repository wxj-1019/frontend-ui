"use client";

import { Children, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export interface HorizontalScrollProps {
  children: React.ReactNode[];
  className?: string;
  sectionWidth?: number;
  speed?: number;
}

export function HorizontalScroll({
  children,
  className,
  sectionWidth,
  speed = 1,
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sections = Children.toArray(children);

  const fallbackWidth =
    typeof window !== 'undefined' ? window.innerWidth : 1024;
  const sectionW = sectionWidth ?? fallbackWidth;
  const totalWidth = sections.length * sectionW;

  useGSAP(
    () => {
      const el = containerRef.current;
      const track = trackRef.current;
      if (!el || !track || sections.length === 0) return;

      const mm = gsap.matchMedia();

      // 减弱动效：取消横向滚动，按普通文档流展示
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(track, { clearProps: 'all' });
        return () => {};
      });

      // 全动画模式：垂直滚动驱动横向位移
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const viewportWidth =
          typeof window !== 'undefined' ? window.innerWidth : 1024;
        const travel = Math.max(totalWidth - viewportWidth, 0);
        // speed > 1 = 更快完成横向滚动 = 更小的滚动距离
        const scrollDistance = travel / Math.max(speed, 0.01);

        const tween = gsap.to(track, {
          x: -travel,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: () => `+=${scrollDistance}`,
            scrub: 1,
            pin: true,
            pinSpacing: true,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          tween.kill();
          gsap.set(track, { clearProps: 'all' });
        };
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden', className)}
    >
      <div ref={trackRef} className="flex h-full" style={{ width: totalWidth }}>
        {sections.map((s, i) => (
          <div
            key={i}
            className="flex h-full items-center justify-center"
            style={{ width: sectionW, flex: '0 0 auto' }}
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}
