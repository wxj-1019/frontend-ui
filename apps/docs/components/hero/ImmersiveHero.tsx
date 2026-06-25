"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { getTotalComponentCount } from "@/lib/component-registry";
import { ParticleBackground } from "@/components/effects/ParticleBackground";

/**
 * 沉浸式 Hero 区域
 * 粒子背景 + 3D 透视标题 + 动态光晕
 */
export function ImmersiveHero() {
  const totalComponents = getTotalComponentCount();

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* 粒子背景 */}
      <ParticleBackground />

      {/* 多层渐变光晕 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-[var(--color-accent)]/10 via-transparent to-transparent blur-3xl animate-aurora" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-gradient-radial from-[var(--color-motion)]/8 via-transparent to-transparent blur-3xl animate-aurora" style={{ animationDelay: "-5s" }} />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-gradient-radial from-[var(--color-spring)]/6 via-transparent to-transparent blur-3xl animate-aurora" style={{ animationDelay: "-10s" }} />
      </div>

      {/* 网格背景 */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

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

        {/* 主标题 - 3D 透视效果 */}
        <motion.h1
          initial={{ opacity: 0, y: 40, rotateX: 15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="perspective-container"
        >
          <span className="font-display text-6xl font-bold tracking-tight text-gradient-hero sm:text-7xl lg:text-8xl block">
            Frontend UI
          </span>
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
            <span className="relative z-10">开始使用</span>
          </Link>
          <Link
            href="/components"
            className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]/80 backdrop-blur-sm px-8 py-4 text-sm font-semibold text-[var(--color-text-primary)] transition-all hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-hover)] active:scale-[0.98]"
          >
            浏览组件
          </Link>
        </motion.div>

        {/* 统计 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4"
        >
          {[
            { value: totalComponents, label: "动画组件", suffix: "+" },
            { value: 5, label: "动画引擎", suffix: "" },
            { value: 6, label: "组件分类", suffix: "" },
            { value: 100, label: "TypeScript", suffix: "%" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-[var(--color-accent)]">
                {stat.value}{stat.suffix}
              </div>
              <div className="mt-1 text-sm text-[var(--color-text-muted)]">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 底部渐变过渡 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-bg-primary)] to-transparent pointer-events-none" />
    </section>
  );
}
