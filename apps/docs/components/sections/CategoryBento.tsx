'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ScrollReveal } from '@frontend-ui/ui';
import {
  Type,
  Zap,
  Layers,
  Sparkles,
  ArrowUpRight,
  ChevronRight,
} from 'lucide-react';

const categories = [
  {
    id: 'text-animations',
    title: '文字动画',
    description: 'BlurText, GradientText, SplitText 等',
    shortDesc: '炫酷文字动效',
    icon: Type,
    color: '#00F5FF',
    count: 13,
    darkColor: 'rgba(0, 245, 255, 0.12)',
    bgGlow: 'rgba(0, 245, 255, 0.15)',
    gradient: 'from-[#00F5FF]/20 via-transparent to-transparent',
    pattern: 'M0 0 L10 10 M20 0 L30 10 M10 20 L20 30',
  },
  {
    id: 'animations',
    title: '交互动画',
    description: 'Magnet, ScrollReveal, Draggable 等',
    shortDesc: '流畅交互反馈',
    icon: Zap,
    color: '#FF00FF',
    count: 21,
    darkColor: 'rgba(255, 0, 255, 0.12)',
    bgGlow: 'rgba(255, 0, 255, 0.15)',
    gradient: 'from-[#FF00FF]/20 via-transparent to-transparent',
    pattern: 'M5 0 L5 20 M0 5 L20 5',
  },
  {
    id: 'components',
    title: '复合组件',
    description: 'Dock, SpotlightCard, TiltCard 等',
    shortDesc: '开箱即用组件',
    icon: Layers,
    color: '#00FFAA',
    count: 13,
    darkColor: 'rgba(0, 255, 170, 0.12)',
    bgGlow: 'rgba(0, 255, 170, 0.15)',
    gradient: 'from-[#00FFAA]/20 via-transparent to-transparent',
    pattern: 'M0 10 Q5 0 10 10 Q15 20 20 10',
  },
  {
    id: 'backgrounds',
    title: '背景特效',
    description: 'Aurora, ThreeScene, Starfield 等',
    shortDesc: '沉浸式场景渲染',
    icon: Sparkles,
    color: '#FFD700',
    count: 11,
    darkColor: 'rgba(255, 215, 0, 0.12)',
    bgGlow: 'rgba(255, 215, 0, 0.15)',
    gradient: 'from-[#FFD700]/20 via-transparent to-transparent',
    pattern: 'M0 0 L5 5 L0 10 L5 15 L0 20',
  },
];

export function CategoryBento() {
  return (
    <section className="section-gradient-1 relative py-20">
      {/* Section Header */}
      <div className="mx-auto max-w-7xl px-6 mb-12">
        <ScrollReveal>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-[var(--color-accent)]/30" />
              <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                分类浏览
              </h2>
              <div className="h-px w-12 bg-[var(--color-accent)]/30" />
            </div>
            <Link
              href="/components"
              className="hidden sm:flex items-center gap-1.5 text-sm text-[var(--color-text-subtle)] transition-colors hover:text-[var(--color-accent)]"
            >
              查看全部
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <p className="font-display mt-4 text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
            按分类探索组件
          </p>
        </ScrollReveal>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <ScrollReveal key={cat.id} delay={i * 0.08}>
                <Link href={`/${cat.id}`} className="group block h-full">
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="relative h-full overflow-hidden rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]/60 backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-[0_0_50px_rgba(0,0,0,0.3)]"
                    style={{
                      borderColor: `${cat.color}20`,
                      boxShadow: `0 0 0px ${cat.color}00`,
                    }}
                  >
                    {/* 渐变色块 */}
                    <div
                      className={`absolute -top-20 -right-20 h-40 w-40 rounded-full opacity-40 blur-[80px] transition-all duration-500 group-hover:opacity-70 group-hover:scale-150`}
                      style={{ backgroundColor: cat.darkColor }}
                    />
                    <div
                      className="absolute -bottom-10 -left-10 h-24 w-24 rounded-full opacity-0 blur-[60px] transition-all duration-500 group-hover:opacity-30"
                      style={{ backgroundColor: cat.color }}
                    />

                    {/* 装饰网格纹理 */}
                    <svg
                      className="absolute top-0 right-0 h-24 w-24 text-[var(--color-border-subtle)] opacity-30"
                      aria-hidden="true"
                    >
                      <pattern
                        id={`cat-grid-${cat.id}`}
                        width="12"
                        height="12"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d={cat.pattern}
                          stroke="currentColor"
                          strokeWidth="0.5"
                          fill="none"
                        />
                      </pattern>
                      <rect
                        width="100%"
                        height="100%"
                        fill={`url(#cat-grid-${cat.id})`}
                      />
                    </svg>

                    <div className="relative">
                      {/* 图标 + 数量 */}
                      <div className="flex items-center justify-between">
                        <div
                          className="flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                          style={{
                            backgroundColor: cat.darkColor,
                            color: cat.color,
                          }}
                        >
                          <Icon className="h-7 w-7" />
                        </div>
                        <motion.span
                          className="relative rounded-full px-3 py-1 text-xs font-bold tracking-wide transition-all"
                          style={{
                            backgroundColor: cat.darkColor,
                            color: cat.color,
                          }}
                          whileHover={{ scale: 1.1 }}
                        >
                          {cat.count}
                        </motion.span>
                      </div>

                      <h3 className="mt-5 font-display text-lg font-semibold text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-accent)]">
                        {cat.title}
                      </h3>

                      <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
                        {cat.shortDesc}
                      </p>

                      {/* 标签 */}
                      <p className="mt-3 inline-block rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)]/50 px-2.5 py-1 text-xs text-[var(--color-text-subtle)]">
                        {cat.description}
                      </p>

                      {/* 探索链接 */}
                      <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-subtle)] transition-all group-hover:text-[var(--color-accent)]">
                        <span>探索全部</span>
                        <motion.span className="inline-flex" initial={false}>
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </motion.span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
