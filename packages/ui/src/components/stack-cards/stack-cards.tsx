"use client";

import { Children, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export interface StackCardsProps {
  children: React.ReactNode[];
  className?: string;
  cardHeight?: number;
  gap?: number;
}

export function StackCards({
  children,
  className,
  cardHeight = 300,
  gap = 20,
}: StackCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cards = Children.toArray(children);
  const total = cards.length;

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el || total === 0) return;

      const mm = gsap.matchMedia();

      // 减弱动效：直接展示所有卡片
      mm.add('(prefers-reduced-motion: reduce)', () => {
        const cardEls = el.querySelectorAll<HTMLElement>('[data-stack-card]');
        gsap.set(cardEls, { clearProps: 'all' });
        return () => {};
      });

      // 全动画模式：卡片在滚动时堆叠
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const cardEls = el.querySelectorAll<HTMLElement>('[data-stack-card]');

        // 初始状态：首张可见，其余在下方
        cardEls.forEach((card, i) => {
          gsap.set(card, {
            y: i === 0 ? 0 : window.innerHeight,
            opacity: i === 0 ? 1 : 0,
            scale: 1,
            zIndex: i,
          });
        });

        // 整体 pin 持续 total * 100% 视口高度
        ScrollTrigger.create({
          trigger: el,
          start: 'top top',
          end: () => `+=${total * 100}%`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
        });

        // 每张后续卡片：从下方滑入并覆盖前一张
        cardEls.forEach((card, i) => {
          if (i === 0) return;
          const segStart = `${(i - 1) * 100}%`;
          const segEnd = `${i * 100}%`;

          gsap.to(card, {
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: `top+=${segStart} top`,
              end: `top+=${segEnd} top`,
              scrub: 1,
            },
          });

          // 前一张卡片轻微缩小
          gsap.to(cardEls[i - 1], {
            scale: 0.92,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: `top+=${segStart} top`,
              end: `top+=${segEnd} top`,
              scrub: 1,
            },
          });
        });

        return () => {
          gsap.set(cardEls, { clearProps: 'all' });
        };
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={cn('relative', className)}
      style={{ height: cardHeight }}
    >
      {cards.map((card, i) => (
        <div
          key={i}
          data-stack-card
          className="absolute inset-0 flex items-center justify-center"
          style={{ paddingBottom: gap }}
        >
          <div className="w-full" style={{ height: cardHeight - gap }}>
            {card}
          </div>
        </div>
      ))}
    </div>
  );
}
