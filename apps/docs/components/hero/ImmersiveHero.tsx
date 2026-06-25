'use client';

import { useRef, useCallback } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'motion/react';
import Link from 'next/link';
import { getTotalComponentCount } from '@/lib/component-registry';
import { ParticleBackground } from '@/components/effects/ParticleBackground';

/**
 * 沉浸式 Hero 区域 v2
 * 粒子背景 + 浮动几何体 + 3D 视差追踪 + 动态光晕 + 光弧扫描
 */
export function ImmersiveHero() {
  const totalComponents = getTotalComponentCount();
  const shouldReduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D 鼠标追踪
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Derived transform values
  const ringInnerX = useTransform(springX, (x) => -x * 0.7);
  const ringInnerY = useTransform(springY, (y) => -y * 0.7);
  const float1X = useTransform(springX, (x) => -x * 0.5);
  const float1Y = useTransform(springY, (y) => -y * 0.8);
  const float2X = useTransform(springX, (x) => x * 0.6);
  const float2Y = useTransform(springY, (y) => -y * 0.6);
  const float3X = useTransform(springX, (x) => -x * 0.3);
  const float3Y = useTransform(springY, (y) => y * 0.5);
  const glowX = useTransform(springX, (x) => x * 2);
  const glowY = useTransform(springY, (y) => y * 1.5);
  const gridX = useTransform(springX, (x) => x * 0.3);
  const gridY = useTransform(springY, (y) => y * 0.3);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (shouldReduce || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x * 20);
      mouseY.set(y * 15);
    },
    [shouldReduce, mouseX, mouseY]
  );

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden flex items-center justify-center"
    >
      {/* 粒子背景 */}
      <ParticleBackground />

      {/* 浮动装饰几何体 */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {/* 大圆环 */}
        <motion.div
          className="hero-geo-ring absolute -top-40 -right-40 h-96 w-96 rounded-full"
          style={!shouldReduce ? { x: springX, y: springY } : {}}
        />
        <motion.div
          className="hero-geo-ring-inner absolute -top-20 -right-20 h-64 w-64 rounded-full"
          style={!shouldReduce ? { x: ringInnerX, y: ringInnerY } : {}}
        />

        {/* 浮动矩形 */}
        <motion.div
          className="float-shape-1 absolute top-1/4 left-[10%] h-24 w-24 rounded-2xl border border-[var(--color-accent)]/10 bg-[var(--color-accent)]/3"
          style={!shouldReduce ? { x: float1X, y: float1Y } : {}}
        />
        <motion.div
          className="float-shape-2 absolute bottom-1/4 right-[12%] h-16 w-16 rounded-xl border border-[var(--color-motion)]/10 bg-[var(--color-motion)]/3"
          style={!shouldReduce ? { x: float2X, y: float2Y } : {}}
        />
        <motion.div
          className="float-shape-3 absolute top-1/3 right-[20%] h-12 w-12 rounded-full border border-[var(--color-spring)]/10 bg-[var(--color-spring)]/4"
          style={!shouldReduce ? { x: float3X, y: float3Y } : {}}
        />

        {/* 光弧扫描线 */}
        <div className="scan-line" />
      </div>

      {/* 多层渐变光晕 */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-gradient-radial from-[var(--color-accent)]/12 via-transparent to-transparent blur-3xl animate-aurora"
          style={!shouldReduce ? { x: glowX, y: glowY } : {}}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-gradient-radial from-[var(--color-motion)]/8 via-transparent to-transparent blur-3xl animate-aurora"
          style={{ animationDelay: '-5s' }}
        />
        <div
          className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-gradient-radial from-[var(--color-spring)]/6 via-transparent to-transparent blur-3xl animate-aurora"
          style={{ animationDelay: '-10s' }}
        />
      </div>

      {/* 网格背景 - 动态滚动 */}
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none animate-grid-scroll"
        style={!shouldReduce ? { x: gridX, y: gridY } : {}}
      />

      {/* 内容 */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 px-4 py-1.5 text-sm text-[var(--color-accent)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent)]" />
          </span>
          开源免费 · {totalComponents}+ 组件 · 5 大引擎
        </motion.div>

        {/* 主标题 - 增强渐变 + 3D */}
        <motion.h1
          initial={{ opacity: 0, y: 40, rotateX: shouldReduce ? 0 : 15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="perspective-container"
        >
          <motion.span className="font-display text-6xl font-bold tracking-tight text-gradient-hero sm:text-7xl lg:text-8xl block">
            Frontend UI
          </motion.span>
        </motion.h1>

        {/* 副标题 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-text-muted)] leading-relaxed"
        >
          企业级前端动画组件库，集成 GSAP、Motion、react-spring 等引擎
          <br className="hidden sm:inline" />
          构建令人印象深刻的沉浸式用户界面
        </motion.p>

        {/* CTA 按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <Link
            href="/docs"
            className="group relative overflow-hidden rounded-xl bg-[var(--color-accent)] px-8 py-4 text-sm font-semibold text-[var(--color-bg-primary)] transition-all hover:shadow-[0_0_40px_rgba(0,245,255,0.3)] active:scale-[0.98]"
          >
            {/* 按钮悬停光效 */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10">开始使用</span>
          </Link>
          <Link
            href="/components"
            className="group relative overflow-hidden rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]/80 backdrop-blur-sm px-8 py-4 text-sm font-semibold text-[var(--color-text-primary)] transition-all hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-hover)] active:scale-[0.98]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10">浏览组件</span>
          </Link>
        </motion.div>

        {/* 统计 - 增强设计 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4"
        >
          {[
            {
              value: totalComponents,
              label: '动画组件',
              suffix: '+',
              color: 'var(--color-accent)',
            },
            {
              value: 5,
              label: '动画引擎',
              suffix: '',
              color: 'var(--color-motion)',
            },
            {
              value: 6,
              label: '组件分类',
              suffix: '',
              color: 'var(--color-spring)',
            },
            {
              value: 100,
              label: 'TypeScript',
              suffix: '%',
              color: 'var(--color-gsap)',
            },
          ].map((stat) => (
            <div key={stat.label} className="text-center group">
              <motion.div
                className="text-3xl font-bold transition-all duration-300 group-hover:scale-110"
                style={{ color: stat.color as string }}
              >
                {stat.value}
                {stat.suffix}
              </motion.div>
              <div className="mt-1 text-sm text-[var(--color-text-muted)]">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* 装饰性滚动提示 */}
        {!shouldReduce && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-16 flex flex-col items-center gap-2"
          >
            <span className="text-xs text-[var(--color-text-subtle)]">
              向下滚动探索
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="h-6 w-[1px] bg-gradient-to-b from-[var(--color-accent)]/50 to-transparent"
            />
          </motion.div>
        )}
      </div>

      {/* 底部渐变过渡 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-bg-primary)] to-transparent pointer-events-none" />
    </section>
  );
}
