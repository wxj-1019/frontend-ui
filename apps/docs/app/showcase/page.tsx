"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ComponentUniverse } from "@/components/sections/ComponentUniverse";
import { ScrollReveal } from "@frontend-ui/ui";
import Link from "next/link";

const stats = [
  { value: "130+", label: "动画组件", color: "#00F5FF" },
  { value: "5", label: "组件分类", color: "#FF006E" },
  { value: "6+", label: "动画引擎", color: "#8B5CF6" },
  { value: "100%", label: "TypeScript", color: "#88CE02" },
];

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 pt-24 pb-20">
        {/* Hero */}
        <ScrollReveal>
          <div className="mb-8 text-center">
            <h1 className="font-display text-4xl font-bold text-[var(--color-text-primary)]">
              组件宇宙
            </h1>
            <p className="mt-3 text-lg text-[var(--color-text-muted)]">
              可视化探索 130+ 动画组件的关系网络
            </p>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <ScrollReveal delay={0.1}>
          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-4 text-center"
              >
                <div className="font-display text-2xl font-bold" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-[var(--color-text-muted)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Component Universe */}
        <ScrollReveal delay={0.2}>
          <ComponentUniverse />
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={0.3}>
          <div className="mt-12 rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-8 text-center">
            <h2 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">
              准备好探索了吗？
            </h2>
            <p className="mt-3 text-[var(--color-text-muted)]">
              点击宇宙图中的任意分类节点，直达对应组件文档
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/text-animations"
                className="rounded-lg bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-[var(--color-bg-primary)] transition-all hover:shadow-lg hover:shadow-[var(--color-accent)]/25"
              >
                浏览组件
              </Link>
              <Link
                href="/docs"
                className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] px-6 py-3 text-sm font-semibold text-[var(--color-text-primary)] transition-all hover:border-[var(--color-accent)]/50"
              >
                查看文档
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  );
}
