'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import {
  Rocket,
  LayoutGrid,
  Sparkles,
  PanelRightOpen,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface BlockItem {
  title: string;
  description: string;
  href: string;
  tag: string;
  tagColor: string;
  icon: React.ReactNode;
  gradient: string;
}

const blocks: BlockItem[] = [
  {
    title: '赛博英雄区',
    description: '大标题 + 入场动画，支持渐变与粒子两种变体',
    href: '/blocks/hero-section',
    tag: 'Hero',
    tagColor: '#00F5FF',
    icon: <Rocket className="h-10 w-10" />,
    gradient: 'from-[#00F5FF]/10 via-transparent to-transparent',
  },
  {
    title: 'Bento 网格',
    description: '自适应卡片布局 + 悬浮交互，多尺寸组合',
    href: '/blocks/bento-grid',
    tag: 'Layout',
    tagColor: '#FF00FF',
    icon: <LayoutGrid className="h-10 w-10" />,
    gradient: 'from-[#FF00FF]/10 via-transparent to-transparent',
  },
  {
    title: '功能展示',
    description: '左右交替 + 网格排列 + 滚动揭示动画',
    href: '/blocks/feature-section',
    tag: 'Marketing',
    tagColor: '#00FFAA',
    icon: <Sparkles className="h-10 w-10" />,
    gradient: 'from-[#00FFAA]/10 via-transparent to-transparent',
  },
  {
    title: '定价方案',
    description: '卡片 / 对比表 / 特性网格三种报价展示',
    href: '/blocks/pricing-section',
    tag: 'Commerce',
    tagColor: '#88CE02',
    icon: (
      <span className="text-4xl font-bold text-[var(--color-accent)]">$</span>
    ),
    gradient: 'from-[#88CE02]/10 via-transparent to-transparent',
  },
  {
    title: 'Dashboard',
    description: '数据看板：KPI 卡片、图表容器、响应式网格',
    href: '/blocks/dashboard',
    tag: 'Data',
    tagColor: '#00F5FF',
    icon: <PanelRightOpen className="h-10 w-10" />,
    gradient: 'from-[#00F5FF]/10 via-transparent to-transparent',
  },
  {
    title: 'Call to Action',
    description: '多变体行动号召区块，适配不同营销场景',
    href: '/blocks/cta-section',
    tag: 'Marketing',
    tagColor: '#FF006E',
    icon: <Rocket className="h-10 w-10" />,
    gradient: 'from-[#FF006E]/10 via-transparent to-transparent',
  },
];

export function BlocksShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 340;
    scrollRef.current.scrollBy({
      left: dir === 'left' ? -amount : amount,
      behavior: shouldReduce ? 'instant' : 'smooth',
    });
  };

  return (
    <section className="section-gradient-1 relative border-t border-[var(--color-border-subtle)] py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-[var(--color-accent)]/30" />
              <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                页面区块
              </h2>
              <div className="h-px w-12 bg-[var(--color-accent)]/30" />
            </div>
            <p className="font-display mt-4 text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
              开箱即用的完整区块
            </p>
            <p className="mt-2 text-[var(--color-text-muted)]">
              复制粘贴即可使用的高质量页面组件
            </p>
          </div>

          {/* Scroll Controls (desktop) */}
          <div className="hidden gap-2 sm:flex">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scroll('left')}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]/80 text-[var(--color-text-muted)] transition-all hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)] hover:shadow-[0_0_20px_rgba(0,245,255,0.08)]"
              aria-label="向左滚动"
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scroll('right')}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]/80 text-[var(--color-text-muted)] transition-all hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)] hover:shadow-[0_0_20px_rgba(0,245,255,0.08)]"
              aria-label="向右滚动"
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
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
            className="group relative w-[320px] flex-none snap-start overflow-hidden rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]/60 backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-accent)]/30 hover:shadow-xl hover:shadow-[var(--color-accent)]/5 card-depth-hover"
          >
            {/* Preview Area */}
            <div
              className={`relative h-44 overflow-hidden bg-gradient-to-br ${block.gradient}`}
            >
              {/* Grid pattern overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />

              {/* Light effect */}
              <div
                className="absolute -inset-20 opacity-0 blur-[80px] transition-opacity duration-500 group-hover:opacity-30"
                style={{ backgroundColor: block.tagColor }}
              />

              {/* Big icon */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-[var(--color-accent)] opacity-80"
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {block.icon}
              </motion.div>

              {/* Tag */}
              <span
                className="absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm transition-all group-hover:scale-105"
                style={{
                  backgroundColor: `${block.tagColor}20`,
                  color: block.tagColor,
                  border: `1px solid ${block.tagColor}30`,
                }}
              >
                {block.tag}
              </span>

              {/* Bottom gradient fade */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--color-bg-secondary)]/80 to-transparent" />
            </div>

            {/* Info */}
            <div className="relative p-5">
              <h3 className="font-display text-base font-semibold text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-accent)]">
                {block.title}
              </h3>
              <p className="mt-1.5 text-sm text-[var(--color-text-muted)]">
                {block.description}
              </p>
              <motion.div
                className="mt-3 flex items-center gap-1 text-xs font-medium text-[var(--color-accent)]"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                查看详情
                <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </motion.div>
            </div>

            {/* Bottom decor line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-transparent to-transparent transition-all duration-500 group-hover:via-[var(--color-accent)]/20" />
          </Link>
        ))}

        {/* End spacer */}
        <div className="w-1 flex-none" />
      </div>
    </section>
  );
}
