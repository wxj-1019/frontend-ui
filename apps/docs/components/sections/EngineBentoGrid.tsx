"use client";

import { motion } from "motion/react";
import { ScrollReveal } from "@frontend-ui/ui";

const engines = [
  {
    name: "GSAP",
    description: "时间轴动画 · ScrollTrigger · 高性能",
    color: "#88CE02",
    glow: "var(--glow-gsap)",
    borderClass: "border-glow-gsap",
    icon: (
      <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    features: ["Timeline", "ScrollTrigger", "MorphSVG"],
  },
  {
    name: "Motion",
    description: "声明式动画 · 手势交互 · 布局动画",
    color: "#FF00FF",
    glow: "var(--glow-motion)",
    borderClass: "border-glow-motion",
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    features: ["AnimatePresence", "Layout", "Gestures"],
  },
  {
    name: "react-spring",
    description: "弹簧物理 · 自然流畅 · 数值插值",
    color: "#00FFAA",
    glow: "var(--glow-spring)",
    borderClass: "border-glow-spring",
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    features: ["Spring Physics", "Interpolation", "Parallax"],
  },
  {
    name: "Anime.js",
    description: "SVG 路径 · 描边动画 · 变形插值",
    color: "#FF006E",
    glow: "var(--glow-anime)",
    borderClass: "border-glow-anime",
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    features: ["Path Draw", "Morphing", "Stagger"],
  },
];

/**
 * Bento Grid 引擎展示
 * 灵感来自 Godly 和 Awwwards 的卡片布局
 */
export function EngineBentoGrid() {
  return (
    <section className="relative border-t border-[var(--color-border-subtle)] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
              多引擎架构
            </h2>
            <p className="font-display mt-3 text-3xl font-bold text-[var(--color-text-primary)]">
              根据场景选择最佳引擎
            </p>
            <p className="mt-3 text-[var(--color-text-muted)] max-w-xl mx-auto">
              每个组件使用最适合的动画库，覆盖 100% 动画需求，无需自行选型
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {engines.map((engine, i) => (
            <ScrollReveal key={engine.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative overflow-hidden rounded-2xl border ${engine.borderClass} bg-[var(--color-bg-secondary)]/80 backdrop-blur-sm p-8 transition-all duration-300 hover:shadow-[0_0_40px_${engine.color}15]`}
                style={{ borderColor: `${engine.color}30` }}
              >
                {/* 背景光晕 */}
                <div
                  className="absolute -top-20 -right-20 h-40 w-40 rounded-full opacity-0 blur-[80px] transition-opacity duration-500 group-hover:opacity-60"
                  style={{ backgroundColor: engine.color }}
                />

                <div className="relative">
                  {/* 图标 + 名称 */}
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
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
                      <p className="text-sm text-[var(--color-text-muted)]">
                        {engine.description}
                      </p>
                    </div>
                  </div>

                  {/* Feature 标签 */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {engine.features.map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full px-3 py-1 text-xs font-medium transition-colors"
                        style={{
                          backgroundColor: `${engine.color}10`,
                          color: engine.color,
                          border: `1px solid ${engine.color}25`,
                        }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Hover 指示 */}
                  <div className="mt-6 flex items-center gap-2 text-sm text-[var(--color-text-subtle)] transition-colors group-hover:text-[var(--color-text-primary)]">
                    <span>查看相关组件</span>
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
