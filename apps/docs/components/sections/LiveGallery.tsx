'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollReveal } from '@frontend-ui/ui';
import {
  BlurText,
  GradientText,
  Magnet,
  TiltCard,
  GlowCard,
  GlassCard,
} from '@frontend-ui/ui';
import { Sparkles, Type, Zap, Layers, ArrowRight } from 'lucide-react';

const categories = [
  { id: 'text-animations', label: '文字动画', icon: Type, color: '#00F5FF' },
  { id: 'animations', label: '交互动画', icon: Zap, color: '#FF00FF' },
  { id: 'components', label: '复合组件', icon: Layers, color: '#00FFAA' },
  { id: 'backgrounds', label: '背景特效', icon: Sparkles, color: '#FFD700' },
];

/** 单个 Live 预览卡片 — 增强版 */
function LiveCard({
  title,
  category,
  href,
  children,
  color,
}: {
  title: string;
  category: string;
  href: string;
  children: React.ReactNode;
  color: string;
}) {
  return (
    <Link href={href} className="group block h-full">
      <motion.div
        whileHover={{ y: -10, scale: 1.01 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-full overflow-hidden rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]/60 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_50px_rgba(0,0,0,0.3)]"
        style={{
          borderColor: `${color}18`,
        }}
      >
        {/* 光晕层 */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${color}08 0%, transparent 70%)`,
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* 预览区域 */}
        <div className="relative flex h-52 items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]" />

          {/* 右下角装饰色块 */}
          <div
            className="absolute -bottom-6 -right-6 h-20 w-20 rounded-full opacity-0 blur-[40px] transition-all duration-500 group-hover:opacity-40 group-hover:scale-150"
            style={{ backgroundColor: color }}
          />

          <div className="relative z-10 scale-90 group-hover:scale-100 transition-transform duration-300">
            {children}
          </div>
        </div>

        {/* 信息栏 */}
        <div className="relative flex items-center justify-between border-t border-[var(--color-border-subtle)] px-5 py-4">
          <div>
            <span className="font-display text-sm font-semibold text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-accent)]">
              {title}
            </span>
            <span
              className="ml-2 text-xs font-medium transition-all"
              style={{ color: `${color}99` }}
            >
              {category}
            </span>
          </div>
          <motion.svg
            className="h-4 w-4 text-[var(--color-text-subtle)] transition-all group-hover:translate-x-1 group-hover:text-[var(--color-accent)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            initial={false}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </motion.svg>
        </div>
      </motion.div>
    </Link>
  );
}

/**
 * Live Gallery v2
 * 更大的卡片、更丰富的实时预览、独特分类筛选
 */
export function LiveGallery() {
  const [activeCategory, setActiveCategory] = useState('all');

  const allCards = [
    {
      title: 'BlurText',
      category: '文字动画',
      href: '/text-animations/blur-text',
      color: '#00F5FF',
      component: (
        <BlurText text="Hello World" delay={0.08} className="text-lg" />
      ),
    },
    {
      title: 'GradientText',
      category: '文字动画',
      href: '/text-animations/gradient-text',
      color: '#00F5FF',
      component: (
        <GradientText
          text="Gradient"
          className="text-2xl font-bold"
          from="from-[#00F5FF]"
          to="to-[#FF00FF]"
        />
      ),
    },
    {
      title: 'Magnet',
      category: '交互动画',
      href: '/animations/magnet',
      color: '#FF00FF',
      component: (
        <Magnet strength={0.3}>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-motion)] text-lg text-white shadow-[0_0_30px_rgba(0,245,255,0.3)]">
            <Sparkles className="h-8 w-8" />
          </div>
        </Magnet>
      ),
    },
    {
      title: 'TiltCard',
      category: '复合组件',
      href: '/components/tilt-card',
      color: '#00FFAA',
      component: (
        <TiltCard className="h-24 w-36 rounded-xl bg-gradient-to-br from-[var(--color-bg-surface)] to-[var(--color-bg-elevated)] border border-[var(--color-border-default)] flex items-center justify-center">
          <span className="text-xs font-medium text-[var(--color-text-muted)]">
            3D Tilt
          </span>
        </TiltCard>
      ),
    },
    {
      title: 'GlowCard',
      category: '复合组件',
      href: '/components/glow-card',
      color: '#00FFAA',
      component: (
        <GlowCard className="h-24 w-36 rounded-xl">
          <div className="flex items-center justify-center h-full text-xs font-medium text-[var(--color-text-muted)]">
            Glow Effect
          </div>
        </GlowCard>
      ),
    },
    {
      title: 'GlassCard',
      category: '复合组件',
      href: '/components/glass-card',
      color: '#00FFAA',
      component: (
        <GlassCard className="h-24 w-36 rounded-xl flex items-center justify-center">
          <span className="text-xs font-medium text-[var(--color-text-muted)]">
            Glass
          </span>
        </GlassCard>
      ),
    },
    {
      title: 'HighPerfParticles',
      category: '背景特效',
      href: '/backgrounds/high-perf-particles',
      color: '#FFD700',
      component: (
        <div className="relative h-24 w-36 overflow-hidden rounded-xl bg-black">
          {[...Array(25)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full"
              style={{
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 80 + 10}%`,
                backgroundColor: ['#00F5FF', '#FF00FF', '#00FFAA', '#FFD700'][
                  i % 4
                ],
              }}
              animate={{
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 1.5 + Math.random(),
                repeat: Infinity,
                delay: i * 0.08,
              }}
            />
          ))}
        </div>
      ),
    },
    {
      title: '3D Scene',
      category: '背景特效',
      href: '/backgrounds/three-scene',
      color: '#FFD700',
      component: (
        <div className="relative h-24 w-36 perspective-[600px]">
          <motion.div
            className="absolute inset-0 rounded-xl bg-[var(--color-accent)]/15 border border-[var(--color-accent)]/20"
            animate={{
              transform: [
                'translateZ(10px) translateY(0)',
                'translateZ(30px) translateY(-8px)',
                'translateZ(10px) translateY(0)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute inset-2 rounded-lg border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5"
            animate={{
              transform: [
                'translateZ(20px) translateY(0)',
                'translateZ(45px) translateY(-5px)',
                'translateZ(20px) translateY(0)',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.3,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              className="text-[8px] font-bold text-[var(--color-accent)]/60"
              animate={{
                transform: [
                  'translateZ(30px)',
                  'translateZ(55px)',
                  'translateZ(30px)',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.6,
              }}
            >
              3D
            </motion.span>
          </div>
        </div>
      ),
    },
  ];

  const filteredCards =
    activeCategory === 'all'
      ? allCards
      : allCards.filter((card) => {
          const catMap: Record<string, string> = {
            'text-animations': '文字动画',
            animations: '交互动画',
            components: '复合组件',
            backgrounds: '背景特效',
          };
          return card.category === catMap[activeCategory];
        });

  return (
    <section className="section-gradient-3 relative border-t border-[var(--color-border-subtle)] py-28">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="mb-14">
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-[var(--color-spring)]/30" />
              <h2
                className="font-display text-sm font-semibold uppercase tracking-[0.2em]"
                style={{ color: 'var(--color-spring)' }}
              >
                实时预览
              </h2>
              <div className="h-px w-12 bg-[var(--color-spring)]/30" />
            </div>
            <p className="font-display mt-4 text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              亲手感受每个组件
            </p>
            <p className="mt-3 text-[var(--color-text-muted)] max-w-xl">
              所有组件均支持实时交互预览，所见即所得
            </p>
          </div>
        </ScrollReveal>

        {/* 分类筛选 — 增强设计 */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            <button
              onClick={() => setActiveCategory('all')}
              className={`relative overflow-hidden rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                activeCategory === 'all'
                  ? 'text-[var(--color-bg-primary)] shadow-lg'
                  : 'border border-[var(--color-border-default)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)]/50 hover:text-[var(--color-text-primary)]'
              }`}
              style={
                activeCategory === 'all'
                  ? { backgroundColor: 'var(--color-accent)' }
                  : {}
              }
            >
              全部
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative overflow-hidden rounded-full px-5 py-2.5 text-sm font-medium transition-all flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? 'shadow-lg'
                    : 'border border-[var(--color-border-default)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)]/50 hover:text-[var(--color-text-primary)]'
                }`}
                style={
                  activeCategory === cat.id
                    ? { backgroundColor: cat.color, color: '#0A0A0F' }
                    : {}
                }
              >
                <cat.icon className="h-4 w-4" />
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* 卡片网格 - AnimatePresence for smooth filter transitions */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filteredCards.map((card, i) => (
              <motion.div
                key={card.title}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
              >
                <ScrollReveal delay={i * 0.04}>
                  <LiveCard
                    title={card.title}
                    category={card.category}
                    href={card.href}
                    color={card.color}
                  >
                    {card.component}
                  </LiveCard>
                </ScrollReveal>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 查看全部 */}
        <ScrollReveal delay={0.2}>
          <div className="mt-14 text-center">
            <Link
              href="/components"
              className="group inline-flex items-center gap-2 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]/60 backdrop-blur-sm px-8 py-4 text-sm font-medium text-[var(--color-text-primary)] transition-all hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)] hover:shadow-[0_0_30px_rgba(0,245,255,0.08)]"
            >
              浏览全部组件
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
