"use client";

import Link from "next/link";
import { EngineComparison } from "@/components/ui/EngineComparison";

export default function EngineComparisonPage() {
  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--color-text-subtle)]">
        <Link href="/docs" className="hover:text-[var(--color-text-primary)]">
          文档
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text-primary)]">动画引擎对比</span>
      </nav>

      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-[var(--color-text-primary)]">
          动画引擎对比
        </h1>
        <p className="mt-2 text-lg text-[var(--color-text-muted)]">
          同一效果，不同引擎实现 — 帮助你选择最适合的动画库
        </p>
      </div>

      {/* Engine Comparison */}
      <EngineComparison />

      {/* Description */}
      <div className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-6">
        <h2 className="font-display text-xl font-semibold text-[var(--color-text-primary)]">
          如何选择？
        </h2>
        <div className="mt-4 space-y-4 text-[var(--color-text-muted)]">
          <div>
            <h3 className="font-display font-medium text-[var(--color-text-primary)]">
              Motion (Framer Motion)
            </h3>
            <p className="text-sm">
              最适合 React 项目。声明式 API，与 React 生态深度集成。适合大多数 UI 动画场景。
            </p>
          </div>
          <div>
            <h3 className="font-display font-medium text-[var(--color-text-primary)]">
              GSAP
            </h3>
            <p className="text-sm">
              最强大的时间轴控制。适合复杂序列动画、ScrollTrigger、SVG 动画。学习曲线较陡。
            </p>
          </div>
          <div>
            <h3 className="font-display font-medium text-[var(--color-text-primary)]">
              react-spring (即将推出)
            </h3>
            <p className="text-sm">
              基于物理的弹簧动画。动画更自然流畅，适合需要物理感的交互。
            </p>
          </div>
          <div>
            <h3 className="font-display font-medium text-[var(--color-text-primary)]">
              Anime.js (即将推出)
            </h3>
            <p className="text-sm">
              轻量级 SVG 动画库。适合 SVG 路径动画、形状变形、简单时间轴。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
