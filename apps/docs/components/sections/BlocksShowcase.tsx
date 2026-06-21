'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useReducedMotion } from 'motion/react';
import { Rocket, LayoutGrid, Sparkles } from 'lucide-react';

interface BlockItem {
  title: string;
  description: string;
  href: string;
  tag: string;
  gradient: string;
  icon: React.ReactNode;
}

const blocks: BlockItem[] = [
  {
    title: '赛博英雄区',
    description: '大标题 + 入场动画，支持渐变与粒子两种变体',
    href: '/blocks/hero-section',
    tag: 'Hero',
    gradient: 'from-[var(--color-accent)]/20 to-[var(--color-accent)]/5',
    icon: <Rocket className="h-10 w-10" />,
  },
  {
    title: 'Bento 网格',
    description: '自适应卡片布局 + 悬浮交互',
    href: '/blocks/bento-grid',
    tag: 'Layout',
    gradient: 'from-[var(--color-accent)]/20 to-[var(--color-accent)]/5',
    icon: <LayoutGrid className="h-10 w-10" />,
  },
  {
    title: '功能展示',
    description: '左右交替 + 网格排列 + 滚动揭示动画',
    href: '/blocks/feature-section',
    tag: 'Marketing',
    gradient: 'from-[var(--color-accent)]/20 to-[var(--color-accent)]/5',
    icon: <Sparkles className="h-10 w-10" />,
  },
];

export function BlocksShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: dir === 'left' ? -amount : amount,
      behavior: shouldReduce ? 'instant' : 'smooth',
    });
  };

  return (
    <section className="relative border-t border-[var(--color-border-subtle)] py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
              页面区块
            </h2>
            <p className="font-display mt-3 text-2xl font-bold text-[var(--color-text-primary)]">
              开箱即用的完整区块
            </p>
            <p className="mt-2 text-[var(--color-text-muted)]">
              复制粘贴即可使用的高质量页面组件
            </p>
          </div>

          {/* Scroll Controls (desktop) */}
          <div className="hidden gap-2 sm:flex">
            <button
              onClick={() => scroll('left')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)] transition-all hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)]"
              aria-label="向左滚动"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)] transition-all hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)]"
              aria-label="向右滚动"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollRef}
        className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 [scrollbar-width:thin] lg:px-[max(1.5rem,calc((100vw-80rem)/2))]"
        style={{ scrollbarWidth: 'thin' }}
      >
        {blocks.map((block) => (
          <Link
            key={block.href}
            href={block.href}
            className="group relative w-[300px] flex-none snap-start overflow-hidden rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] transition-all hover:border-[var(--color-accent)]/40 hover:shadow-xl hover:shadow-[var(--color-accent)]/5"
          >
            {/* Preview Area */}
            <div
              className={`relative h-40 overflow-hidden bg-gradient-to-br ${block.gradient}`}
            >
              {/* Grid pattern overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
              {/* Big icon */}
              <div className="absolute inset-0 flex items-center justify-center text-[var(--color-accent)] opacity-80 transition-transform duration-500 group-hover:scale-110">
                {block.icon}
              </div>
              {/* Tag */}
              <span className="absolute left-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur-sm">
                {block.tag}
              </span>
            </div>

            {/* Info */}
            <div className="p-5">
              <h3 className="font-display text-base font-semibold text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-accent)]">
                {block.title}
              </h3>
              <p className="mt-1.5 text-sm text-[var(--color-text-muted)]">
                {block.description}
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-medium text-[var(--color-accent)] opacity-0 transition-opacity group-hover:opacity-100">
                查看详情
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>
          </Link>
        ))}

        {/* End spacer */}
        <div className="w-1 flex-none" />
      </div>
    </section>
  );
}
