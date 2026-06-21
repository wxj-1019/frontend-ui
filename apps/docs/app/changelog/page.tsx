"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@frontend-ui/ui";

const changelog = [
  {
    version: "0.0.1",
    date: "2026-06-20",
    title: "初始发布",
    changes: [
      "Monorepo 架构：pnpm + Turborepo + Changesets",
      "Design Token 系统：语义化 CSS 变量 + 暗亮双主题",
      "组件文档页模板：ComponentDocPage 声明式配置",
      "首页：Hero Timeline + 引擎展示 + 实时预览 + Blocks 横向滚动",
      "Cmd+K 全局搜索",
      "组件宇宙：Canvas 2D 节点图可视化",
      "CursorEffect：GSAP quickTo GPU 加速（已移除）",
      "WCAG 2.2 AA 可访问性：focus-visible、skip-link、matchMedia",
      "GSAP 全站动画优化：ScrollReveal、Parallax、Timeline、TextReveal",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 pt-24 pb-20">
        <ScrollReveal>
          <div className="mb-12">
            <h1 className="font-display text-4xl font-bold text-[var(--color-text-primary)]">
              更新日志
            </h1>
            <p className="mt-3 text-lg text-[var(--color-text-muted)]">
              Frontend UI 版本变更记录
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-12">
          {changelog.map((release, i) => (
            <ScrollReveal key={release.version} delay={i * 0.1}>
              <div className="rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-8">
                <div className="mb-6 flex items-center gap-4">
                  <span className="rounded-full bg-[var(--color-accent)]/10 px-3 py-1 font-mono text-sm font-semibold text-[var(--color-accent)]">
                    v{release.version}
                  </span>
                  <span className="text-sm text-[var(--color-text-subtle)]">
                    {release.date}
                  </span>
                </div>
                <h2 className="font-display text-xl font-semibold text-[var(--color-text-primary)]">
                  {release.title}
                </h2>
                <ul className="mt-4 space-y-2">
                  {release.changes.map((change) => (
                    <li
                      key={change}
                      className="flex items-start gap-3 text-[var(--color-text-muted)]"
                    >
                      <span className="mt-0.5 text-[var(--color-accent)]">→</span>
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
