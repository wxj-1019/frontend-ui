'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { ScrollReveal } from '@frontend-ui/ui';

const engines = [
  {
    name: 'GSAP',
    tagline: '工业级时间轴动画',
    description: '时间轴动画 · ScrollTrigger · 高性能',
    color: '#88CE02',
    borderClass: 'border-glow-gsap',
    pulseKeyframes: 'border-pulse-gsap',
    icon: (
      <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    features: ['Timeline', 'ScrollTrigger', 'MorphSVG', 'TextPlugin'],
  },
  {
    name: 'Motion',
    tagline: '声明式 React 动画',
    description: '声明式动画 · 手势交互 · 布局动画',
    color: '#FF00FF',
    borderClass: 'border-glow-motion',
    pulseKeyframes: 'border-pulse-motion',
    icon: (
      <svg
        className="h-12 w-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    features: ['AnimatePresence', 'Layout', 'Gestures', 'Scroll'],
  },
  {
    name: 'react-spring',
    tagline: '弹簧物理引擎',
    description: '弹簧物理 · 自然流畅 · 数值插值',
    color: '#00FFAA',
    borderClass: 'border-glow-spring',
    pulseKeyframes: 'border-pulse-spring',
    icon: (
      <svg
        className="h-12 w-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    features: ['Spring Physics', 'Interpolation', 'Parallax', 'Trail'],
  },
  {
    name: 'Anime.js',
    tagline: '轻量 SVG 动画',
    description: 'SVG 路径 · 描边动画 · 变形插值',
    color: '#FF006E',
    borderClass: 'border-glow-anime',
    pulseKeyframes: 'border-pulse-anime',
    icon: (
      <svg
        className="h-12 w-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        />
      </svg>
    ),
    features: ['Path Draw', 'Morphing', 'Stagger', 'Keyframes'],
  },
];

function EngineCard({
  engine,
  index,
}: {
  engine: (typeof engines)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 30, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 30, damping: 15 });

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={(e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x * 10);
        mouseY.set(y * 8);
      }}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      whileHover={{ scale: 1.02, y: -6 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative overflow-hidden rounded-2xl border bg-[var(--color-bg-secondary)]/60 backdrop-blur-sm p-8 transition-all duration-500`}
      style={{
        borderColor: `${engine.color}25`,
        boxShadow: `0 0 0px ${engine.color}00`,
      }}
    >
      {/* 浮动光晕背景 */}
      <motion.div
        className="absolute -inset-20 opacity-0 blur-[100px] transition-opacity duration-500 group-hover:opacity-40"
        style={{
          backgroundColor: engine.color,
          x: springX,
          y: springY,
        }}
      />
      <div
        className={`absolute -top-24 -right-24 h-48 w-48 rounded-full opacity-20 blur-[80px]`}
        style={{ backgroundColor: engine.color }}
      />

      {/* 装饰网格 - 引擎色 */}
      <svg
        className="absolute bottom-0 right-0 h-32 w-32 opacity-[0.04]"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <pattern
          id={`engine-grid-${index}`}
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="10" cy="10" r="1.5" fill={engine.color} />
        </pattern>
        <rect width="100" height="100" fill={`url(#engine-grid-${index})`} />
      </svg>

      <motion.div className="relative" style={{ x: springX, y: springY }}>
        {/* 图标 + 名称 */}
        <div className="flex items-center gap-5">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl"
            style={{
              backgroundColor: `${engine.color}15`,
              color: engine.color,
            }}
          >
            {engine.icon}
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-[var(--color-text-primary)]">
              {engine.name}
            </h3>
            <p className="text-sm font-medium" style={{ color: engine.color }}>
              {engine.tagline}
            </p>
          </div>
        </div>

        {/* 描述 */}
        <p className="mt-5 text-sm text-[var(--color-text-muted)] leading-relaxed">
          {engine.description}
        </p>

        {/* Feature 标签 */}
        <div className="mt-6 flex flex-wrap gap-2">
          {engine.features.map((feature) => (
            <span
              key={feature}
              className="rounded-full px-3 py-1 text-xs font-medium transition-all duration-300 group-hover:scale-105"
              style={{
                backgroundColor: `${engine.color}10`,
                color: engine.color,
                border: `1px solid ${engine.color}20`,
              }}
            >
              {feature}
            </span>
          ))}
        </div>

        {/* 交互提示 */}
        <div className="mt-6 flex items-center gap-2 text-sm text-[var(--color-text-subtle)] transition-colors group-hover:text-[var(--color-text-primary)]">
          <span>查看相关组件</span>
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
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
      </motion.div>

      {/* 底部装饰渐变 */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-transparent to-transparent transition-all duration-500 group-hover:via-[var(--color-accent)]/20" />
    </motion.div>
  );
}

/**
 * Engine Bento Grid v2
 * 引擎展示区 — 更丰富的视觉层次和交互反馈
 */
export function EngineBentoGrid() {
  return (
    <section className="section-gradient-2 relative border-t border-[var(--color-border-subtle)] py-28">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="mb-16">
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-[var(--color-motion)]/30" />
              <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-motion)]">
                多引擎架构
              </h2>
              <div className="h-px w-12 bg-[var(--color-motion)]/30" />
            </div>
            <p className="font-display mt-4 text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              根据场景选择最佳引擎
            </p>
            <p className="mt-3 text-[var(--color-text-muted)] max-w-xl">
              每个组件使用最适合的动画库，覆盖 100% 动画需求，无需自行选型
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {engines.map((engine, i) => (
            <ScrollReveal key={engine.name} delay={i * 0.1}>
              <EngineCard engine={engine} index={i} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
