"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { BlurText, GradientText, Magnet, ScrollReveal } from "@frontend-ui/ui";

/** 单个预览卡片 */
function PreviewCard({
  title,
  category,
  href,
  children,
}: {
  title: string;
  category: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="group block">
      <div className="relative overflow-hidden rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] transition-all hover:border-[var(--color-accent)]/40 hover:shadow-lg hover:shadow-[var(--color-accent)]/5">
        {/* 预览区 */}
        <div className="relative flex h-36 items-center justify-center overflow-hidden">
          {/* 背景网格 */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
          {/* 悬浮光晕 */}
          <div className="absolute inset-0 bg-gradient-radial from-[var(--color-accent)]/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:from-[var(--color-accent)]/5 group-hover:opacity-100" />
          {/* 实际预览内容 */}
          <div className="relative">{children}</div>
        </div>
        {/* 信息栏 */}
        <div className="flex items-center justify-between border-t border-[var(--color-border-subtle)] px-4 py-3">
          <div>
            <span className="font-display text-sm font-semibold text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-accent)]">
              {title}
            </span>
            <span className="ml-2 text-xs text-[var(--color-text-subtle)]">
              {category}
            </span>
          </div>
          <svg
            className="h-4 w-4 text-[var(--color-text-subtle)] transition-all group-hover:translate-x-0.5 group-hover:text-[var(--color-accent)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

/** 循环切换文字 demo */
function TypingDemo() {
  const words = ["Motion", "GSAP", "Spring"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center">
      <div className="font-mono text-2xl font-bold text-[var(--color-text-primary)]">
        {words[index]}
        <span className="ml-0.5 inline-block animate-pulse text-[var(--color-accent)]">|</span>
      </div>
      <div className="mt-1 text-xs text-[var(--color-text-subtle)]">多引擎支持</div>
    </div>
  );
}

export function ComponentPreviewGrid() {
  return (
    <section className="relative border-t border-[var(--color-border-subtle)] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="text-center">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
              实时预览
            </h2>
            <p className="font-display mt-3 text-2xl font-bold text-[var(--color-text-primary)]">
              亲手感受每个组件
            </p>
            <p className="mt-2 text-[var(--color-text-muted)]">
              所有组件均支持实时交互预览，所见即所得
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ScrollReveal delay={0}>
            <PreviewCard title="BlurText" category="文字动画" href="/text-animations/blur-text">
              <BlurText text="Hello World" delay={0.1} />
            </PreviewCard>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <PreviewCard title="GradientText" category="文字动画" href="/text-animations/gradient-text">
              <GradientText
                text="Gradient Magic"
                className="text-2xl font-bold"
                from="from-[var(--color-accent)]"
                to="to-[var(--color-accent)]/70"
              />
            </PreviewCard>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <PreviewCard title="Magnet" category="交互动画" href="/animations/magnet">
              <Magnet strength={0.2}>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-accent)] text-lg text-[var(--color-bg-primary)]">
                  <Sparkles className="h-6 w-6" />
                </div>
              </Magnet>
            </PreviewCard>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <PreviewCard title="Typing" category="文字动画" href="/text-animations">
              <TypingDemo />
            </PreviewCard>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <PreviewCard title="HighPerfParticles" category="背景特效" href="/backgrounds/high-perf-particles">
              <div className="relative h-12 w-24 overflow-hidden rounded-lg bg-black">
                {[...Array(12)].map((_, i) => (
                  <span
                    key={i}
                    className="absolute h-1 w-1 rounded-full bg-cyan-400/80"
                    style={{
                      left: `${Math.random() * 80 + 10}%`,
                      top: `${Math.random() * 80 + 10}%`,
                      animation: `pulse 1.5s ease-in-out ${i * 0.15}s infinite`,
                    }}
                  />
                ))}
              </div>
            </PreviewCard>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <PreviewCard title="Glass Navbar" category="复合组件" href="/components/glass-navbar">
              <div className="h-8 w-28 rounded-lg border border-white/10 bg-white/10 backdrop-blur-md flex items-center justify-center">
                <span className="text-[10px] text-white/70">Glass UI</span>
              </div>
            </PreviewCard>
          </ScrollReveal>

          <ScrollReveal delay={0.6}>
            <PreviewCard title="3D Scene" category="背景特效" href="/backgrounds/three-scene">
              <div className="relative h-12 w-24 perspective-[600px]">
                <div className="absolute inset-0 rounded-lg bg-[var(--color-accent)]/20" style={{ transform: 'translateZ(20px)' }} />
                <div className="absolute inset-0 rounded-lg border border-[var(--color-accent)]/30" style={{ transform: 'translateZ(40px)' }} />
              </div>
            </PreviewCard>
          </ScrollReveal>

          <ScrollReveal delay={0.7}>
            <PreviewCard title="Glow Card" category="复合组件" href="/components/spotlight-card">
              <div className="group/card relative h-12 w-24 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] shadow-[0_0_20px_color-mix(in_srgb,var(--color-accent)_15%,transparent)] transition-all hover:shadow-[0_0_30px_color-mix(in_srgb,var(--color-accent)_30%,transparent)]">
                <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-[var(--color-text-muted)]">
                  Hover Me
                </div>
              </div>
            </PreviewCard>
          </ScrollReveal>
        </div>

        {/* View All Link */}
        <ScrollReveal delay={0.3}>
          <div className="mt-10 text-center">
            <Link
              href="/text-animations"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] px-6 py-3 text-sm font-medium text-[var(--color-text-primary)] transition-all hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)]"
            >
              浏览全部 73 组件
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
