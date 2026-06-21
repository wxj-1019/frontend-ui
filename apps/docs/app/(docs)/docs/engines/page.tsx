"use client";

import Link from "next/link";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { ScrollReveal } from "@frontend-ui/ui";

const engines = [
  {
    name: "Motion",
    version: "12.x",
    color: "#ff00ff",
    description: "React 动画库的未来。声明式 API，与 React 生态深度集成。",
    features: ["声明式 API", "手势支持", "布局动画", "服务器组件"],
    bestFor: ["大多数 React UI 动画", "页面转场", "手势交互", "布局变化"],
    install: "npm install motion",
    code: `import { motion } from "motion/react";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Hello Motion
</motion.div>`,
  },
  {
    name: "GSAP",
    version: "3.x",
    color: "#88ce02",
    description: "最强大的 JavaScript 动画引擎。无与伦比的性能和控制力。",
    features: ["时间轴控制", "ScrollTrigger", "SVG 动画", "100+ 缓动函数"],
    bestFor: ["复杂序列动画", "滚动驱动动画", "SVG 路径动画", "高性能场景"],
    install: "npm install gsap @gsap/react",
    code: `import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.from(".box", {
  opacity: 0,
  x: -100,
  scrollTrigger: {
    trigger: ".box",
    start: "top center"
  }
});`,
  },
  {
    name: "react-spring",
    version: "9.x",
    color: "#00ffaa",
    description: "基于物理的弹簧动画。让动画更自然、更流畅。",
    features: ["物理弹簧", "性能优化", "原生支持", "自动缓动"],
    bestFor: ["自然流畅的动画", "物理感交互", "拖拽效果", "弹性元素"],
    install: "npm install @react-spring/web",
    code: `import { useSpring, animated } from "@react-spring/web";

const styles = useSpring({
  from: { opacity: 0, y: 100 },
  to: { opacity: 1, y: 0 },
});

<animated.div style={styles}>
  Hello Spring
</animated.div>`,
  },
  {
    name: "Anime.js",
    version: "4.x",
    color: "#ff6b6b",
    description: "轻量级动画库。简洁的 API，适合快速动画开发。",
    features: ["轻量级", "SVG 动画", "时间轴", "简单易用"],
    bestFor: ["SVG 动画", "形状变形", "简单序列", "入门学习"],
    install: "npm install animejs",
    code: `import { animate } from "animejs";

animate(".box", {
  translateX: 250,
  rotate: "1turn",
  duration: 800,
  ease: "easeInOutSine"
});`,
  },
];

const comparison = [
  { feature: "声明式 API", motion: "✅", gsap: "⚠️", spring: "✅", anime: "❌" },
  { feature: "时间轴", motion: "⚠️", gsap: "✅", spring: "❌", anime: "✅" },
  { feature: "滚动动画", motion: "⚠️", gsap: "✅", spring: "❌", anime: "❌" },
  { feature: "物理弹簧", motion: "❌", gsap: "❌", spring: "✅", anime: "❌" },
  { feature: "手势支持", motion: "✅", gsap: "⚠️", spring: "⚠️", anime: "❌" },
  { feature: "SVG 动画", motion: "⚠️", gsap: "✅", spring: "❌", anime: "✅" },
  { feature: "性能", motion: "✅", gsap: "✅", spring: "✅", anime: "✅" },
  { feature: "包大小", motion: "~35kb", gsap: "~30kb", spring: "~20kb", anime: "~15kb" },
];

export default function EnginesPage() {
  return (
    <div className="space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--color-text-subtle)]">
        <Link href="/docs" className="hover:text-[var(--color-text-primary)]">
          文档
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text-primary)]">动画引擎</span>
      </nav>

      {/* Header */}
      <ScrollReveal>
        <div>
          <h1 className="font-display text-4xl font-bold text-[var(--color-text-primary)]">
            动画引擎
          </h1>
          <p className="mt-4 text-lg text-[var(--color-text-muted)]">
            Frontend UI 采用多引擎架构，每个组件都使用最适合的动画库实现
          </p>
        </div>
      </ScrollReveal>

      {/* Engine Cards */}
      <div className="space-y-6">
        {engines.map((engine, index) => (
          <ScrollReveal key={engine.name} delay={index * 0.1}>
            <div className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] p-6">
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl font-display text-lg font-bold"
                    style={{ backgroundColor: engine.color + "20", color: engine.color }}
                  >
                    {engine.name[0]}
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-[var(--color-text-primary)]">
                      {engine.name}
                    </h2>
                    <span className="text-sm text-[var(--color-text-muted)]">
                      v{engine.version}
                    </span>
                  </div>
                </div>
                <span
                  className="rounded-full px-3 py-1 text-xs font-medium"
                  style={{ backgroundColor: engine.color + "20", color: engine.color }}
                >
                  内置引擎
                </span>
              </div>

              {/* Content */}
              <div className="grid gap-6 p-6 lg:grid-cols-2">
                {/* Left */}
                <div className="space-y-4">
                  <p className="text-[var(--color-text-muted)]">{engine.description}</p>
                  
                  <div>
                    <h3 className="mb-2 text-sm font-medium text-[var(--color-text-primary)]">
                      核心特性
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {engine.features.map((feature) => (
                        <span
                          key={feature}
                          className="rounded-md bg-[var(--color-bg-primary)] px-2 py-1 text-xs text-[var(--color-text-muted)]"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-medium text-[var(--color-text-primary)]">
                      最适合
                    </h3>
                    <ul className="space-y-1 text-sm text-[var(--color-text-muted)]">
                      {engine.bestFor.map((use) => (
                        <li key={use} className="flex items-center gap-2">
                          <span className="text-[var(--color-accent)]">•</span>
                          {use}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right */}
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 text-sm font-medium text-[var(--color-text-primary)]">
                      安装
                    </h3>
                    <CodeBlock code={engine.install} language="bash" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-sm font-medium text-[var(--color-text-primary)]">
                      使用示例
                    </h3>
                    <CodeBlock code={engine.code} language="tsx" />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Comparison Table */}
      <ScrollReveal>
        <div className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] overflow-hidden">
          <div className="border-b border-[var(--color-border-subtle)] p-6">
            <h2 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">
              功能对比
            </h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              ✅ 完整支持 &nbsp; ⚠️ 部分支持 &nbsp; ❌ 不支持
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--color-border-subtle)]">
                  <th className="px-6 py-3 text-left text-sm font-medium text-[var(--color-text-muted)]">
                    功能
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-[#ff00ff]">
                    Motion
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-[#88ce02]">
                    GSAP
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-[#00ffaa]">
                    react-spring
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-[#ff6b6b]">
                    Anime.js
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.feature} className="border-b border-[var(--color-border-subtle)] last:border-0">
                    <td className="px-6 py-3 text-sm text-[var(--color-text-primary)]">
                      {row.feature}
                    </td>
                    <td className="px-6 py-3 text-center text-sm text-[var(--color-text-muted)]">
                      {row.motion}
                    </td>
                    <td className="px-6 py-3 text-center text-sm text-[var(--color-text-muted)]">
                      {row.gsap}
                    </td>
                    <td className="px-6 py-3 text-center text-sm text-[var(--color-text-muted)]">
                      {row.spring}
                    </td>
                    <td className="px-6 py-3 text-center text-sm text-[var(--color-text-muted)]">
                      {row.anime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ScrollReveal>

      {/* Multi-engine Architecture */}
      <ScrollReveal>
        <div className="rounded-xl border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 p-6">
          <h2 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">
            多引擎架构的优势
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <div>
              <h3 className="font-display font-semibold text-[var(--color-text-primary)]">
                最佳实践
              </h3>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                每个组件都使用最适合的动画引擎，而非一刀切
              </p>
            </div>
            <div>
              <h3 className="font-display font-semibold text-[var(--color-text-primary)]">
                无缝切换
              </h3>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                统一的 API 设计，切换引擎无需修改使用方式
              </p>
            </div>
            <div>
              <h3 className="font-display font-semibold text-[var(--color-text-primary)]">
                按需引入
              </h3>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                Tree Shaking 支持，只打包你使用的引擎
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Navigation */}
      <ScrollReveal>
        <div className="flex justify-between">
          <Link
            href="/docs/getting-started"
            className="flex items-center gap-2 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] px-4 py-2 text-sm text-[var(--color-text-muted)] transition-all hover:border-[var(--color-accent)]/50 hover:text-[var(--color-text-primary)]"
          >
            ← 快速开始
          </Link>
          <Link
            href="/docs/cli"
            className="flex items-center gap-2 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] px-4 py-2 text-sm text-[var(--color-text-muted)] transition-all hover:border-[var(--color-accent)]/50 hover:text-[var(--color-text-primary)]"
          >
            CLI 工具 →
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}
