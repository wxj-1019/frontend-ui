"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface HeroTimelineProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Hero 入场时间线 — 替代 6 个独立 ScrollReveal。
 * 使用单一 GSAP Timeline + ScrollTrigger 统一编排 Hero 区所有子元素的入场动画。
 *
 * 序列: Badge → Title → Subtitle → CTA → Stats
 * 每个阶段使用 labels，动画之间自然叠加（overlap）。
 */
export function HeroTimeline({ children, className }: HeroTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;

    const items = el.querySelectorAll<HTMLElement>(".hero-item");
    const mm = gsap.matchMedia();

    // 减弱动效：所有 hero-item 直接显示
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(items, { autoAlpha: 1, y: 0, clearProps: 'all' });
      const statItems = items[4]?.querySelectorAll<HTMLElement>("div");
      if (statItems) gsap.set(statItems, { autoAlpha: 1, y: 0, clearProps: 'all' });
      return () => {};
    });

    // 全动画模式
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        defaults: { duration: 0.8, ease: "power4.out" },
        scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
      });

      tl.from(items[0], { y: 30, scale: 0.9, autoAlpha: 0 });

      tl.from(items[1], { y: 60, scale: 0.95, autoAlpha: 0, duration: 1.0 }, "-=0.3");

      tl.from(items[2], { y: 40, autoAlpha: 0 }, "-=0.5");

      tl.from(items[3], { y: 30, autoAlpha: 0, duration: 0.6 }, "-=0.4");

      const statItems = items[4]?.querySelectorAll<HTMLElement>("div");
      if (statItems && statItems.length > 0) {
        tl.from(statItems, { y: 30, autoAlpha: 0, duration: 0.5, stagger: 0.1, ease: "back.out(1.4)" }, "-=0.2");
      }

      return () => { tl.kill(); };
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
