'use client';

import Link from 'next/link';
import { Type, Zap, Layers, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  BlurText,
  SpotlightCard,
  ScrollReveal,
  Parallax,
} from '@frontend-ui/ui';
import { IntroAnimation } from '@/components/effects/IntroAnimation';
import { PageTransition } from '@/components/effects/PageTransition';
import { HeroTimeline } from '@/components/effects/HeroTimeline';
import { ComponentPreviewGrid } from '@/components/sections/ComponentPreviewGrid';
import { BlocksShowcase } from '@/components/sections/BlocksShowcase';

const categories = [
  {
    title: '文字动画',
    description: 'BlurText, GradientText, SplitText 等',
    href: '/text-animations',
    count: 13,
    icon: <Type className="h-6 w-6" />,
  },
  {
    title: '交互动画',
    description: 'Magnet, FadeContent, ScrollReveal 等',
    href: '/animations',
    count: 19,
    icon: <Zap className="h-6 w-6" />,
  },
  {
    title: '复合组件',
    description: 'Dock, SpotlightCard, GlassNavbar 等',
    href: '/components',
    count: 13,
    icon: <Layers className="h-6 w-6" />,
  },
  {
    title: '背景特效',
    description: 'Aurora, HighPerfParticles, ThreeScene 等',
    href: '/backgrounds',
    count: 11,
    icon: <Sparkles className="h-6 w-6" />,
  },
];

const engines = [
  {
    name: 'GSAP',
    description: '时间轴动画 · ScrollTrigger · 高性能',
    color: '#88ce02',
    icon: (
      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: 'Motion',
    description: '声明式动画 · 手势交互 · 布局动画',
    color: '#f0f',
    icon: (
      <svg
        className="h-8 w-8"
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
  },
  {
    name: 'react-spring',
    description: '弹簧物理 · 自然流畅 · 数值插值',
    color: '#00ffaa',
    icon: (
      <svg
        className="h-8 w-8"
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
  },
  {
    name: 'Anime.js',
    description: 'SVG 路径 · 描边动画 · 变形插值',
    color: '#FF006E',
    icon: (
      <svg
        className="h-8 w-8"
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
  },
];

const stats = [
  { value: '73', label: '动画组件' },
  { value: '5', label: '动画引擎' },
  { value: '6', label: '组件分类' },
  { value: '100%', label: 'TypeScript' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <IntroAnimation />
      <PageTransition>
        <Navbar />

        <main id="main-content" tabIndex={-1}>
          {/* Hero Section */}
          <section className="relative overflow-hidden pt-32 pb-24">
            {/* Animated Background Glow with Parallax */}
            <div className="absolute inset-0 overflow-hidden">
              <Parallax speed={-0.15}>
                <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--color-accent)]/15 blur-[150px] animate-pulse" />
              </Parallax>
              <Parallax speed={0.1}>
                <div className="absolute top-20 right-1/4 h-64 w-64 rounded-full bg-[var(--color-accent)]/10 blur-[120px] animate-pulse delay-1000" />
              </Parallax>
              <Parallax speed={-0.08}>
                <div className="absolute top-40 left-1/4 h-48 w-48 rounded-full bg-[var(--color-accent)]/10 blur-[100px] animate-pulse delay-500" />
              </Parallax>
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

            <HeroTimeline className="relative mx-auto max-w-7xl px-6 text-center">
              {/* Badge */}
              <div className="hero-item mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 px-4 py-1.5 text-sm text-[var(--color-accent)]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                </span>
                开源免费 · 多引擎架构
              </div>

              {/* Title */}
              <h1 className="hero-item font-display text-5xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-6xl lg:text-7xl">
                <BlurText text="Frontend UI" delay={0.2} />
              </h1>

              {/* Subtitle */}
              <p className="hero-item mx-auto mt-6 max-w-2xl text-lg text-[var(--color-text-muted)]">
                企业级前端动画组件库，集成 GSAP、Motion 等动画引擎，
                <br className="hidden sm:inline" />
                构建令人印象深刻的用户界面
              </p>

              {/* CTA Buttons */}
              <div className="hero-item mt-10 flex items-center justify-center gap-4">
                <Link
                  href="/docs"
                  className="group relative overflow-hidden rounded-lg bg-[var(--color-accent)] px-8 py-3.5 text-sm font-semibold text-[var(--color-bg-primary)] transition-all hover:shadow-lg hover:shadow-[var(--color-accent)]/25 active:scale-[0.98]"
                >
                  <span className="relative z-10">开始使用</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)] opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
                <Link
                  href="/components"
                  className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] px-8 py-3.5 text-sm font-semibold text-[var(--color-text-primary)] transition-all hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-hover)] active:scale-[0.98]"
                >
                  浏览组件
                </Link>
              </div>

              {/* Stats */}
              <div className="hero-item mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl font-bold text-[var(--color-accent)]">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-sm text-[var(--color-text-muted)]">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </HeroTimeline>
          </section>

          {/* Engines Section */}
          <section className="relative border-t border-[var(--color-border-subtle)] py-20">
            <div className="mx-auto max-w-7xl px-6">
              <ScrollReveal>
                <div className="text-center">
                  <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
                    多引擎架构
                  </h2>
                  <p className="font-display mt-3 text-2xl font-bold text-[var(--color-text-primary)]">
                    根据场景选择最佳引擎
                  </p>
                  <p className="mt-2 text-[var(--color-text-muted)]">
                    每个组件使用最适合的动画库，覆盖 100% 动画需求
                  </p>
                </div>
              </ScrollReveal>

              <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
                {engines.map((engine, i) => (
                  <ScrollReveal key={engine.name} delay={i * 0.1}>
                    <div className="group relative overflow-hidden rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-6 text-center transition-all hover:border-[var(--color-accent)]/50 hover:shadow-lg hover:shadow-[var(--color-accent)]/5 hover:scale-[1.02]">
                      {/* Glow Effect */}
                      <div
                        className="absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full opacity-0 blur-[60px] transition-opacity group-hover:opacity-100"
                        style={{ backgroundColor: engine.color + '40' }}
                      />
                      <div
                        className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                        style={{
                          backgroundColor: engine.color + '15',
                          color: engine.color,
                        }}
                      >
                        {engine.icon}
                      </div>
                      <h3 className="font-display relative mt-4 text-lg font-semibold text-[var(--color-text-primary)]">
                        {engine.name}
                      </h3>
                      <p className="relative mt-1 text-sm text-[var(--color-text-muted)]">
                        {engine.description}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* Categories Section */}
          <section className="relative border-t border-[var(--color-border-subtle)] py-20">
            <div className="mx-auto max-w-7xl px-6">
              <ScrollReveal>
                <div className="text-center">
                  <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
                    组件分类
                  </h2>
                  <p className="font-display mt-3 text-2xl font-bold text-[var(--color-text-primary)]">
                    覆盖所有动画场景
                  </p>
                </div>
              </ScrollReveal>

              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {categories.map((category, i) => (
                  <ScrollReveal key={category.href} delay={i * 0.1}>
                    <Link href={category.href} className="block h-full">
                      <SpotlightCard className="h-full transition-transform hover:scale-[1.02]">
                        <div className="text-2xl text-[var(--color-accent)]">
                          {category.icon}
                        </div>
                        <h3 className="font-display mt-4 text-lg font-semibold text-[var(--color-text-primary)]">
                          {category.title}
                        </h3>
                        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                          {category.description}
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-xs text-[var(--color-text-subtle)]">
                            {category.count}+ 组件
                          </span>
                          <span className="text-xs text-[var(--color-accent)] transition-transform group-hover:translate-x-1">
                            查看 →
                          </span>
                        </div>
                      </SpotlightCard>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* Component Live Preview Grid */}
          <ComponentPreviewGrid />

          {/* Blocks Horizontal Scroll */}
          <BlocksShowcase />

          {/* CTA Section */}
          <section className="relative border-t border-[var(--color-border-subtle)] py-20">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -bottom-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[var(--color-accent)]/10 blur-[120px]" />
            </div>
            <div className="relative mx-auto max-w-3xl px-6 text-center">
              <ScrollReveal>
                <h2 className="font-display text-3xl font-bold text-[var(--color-text-primary)]">
                  准备好开始了吗？
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p className="mt-4 text-[var(--color-text-muted)]">
                  安装 Frontend UI，开始构建令人印象深刻的动画界面
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] px-6 py-4 transition-all hover:border-[var(--color-accent)]/50">
                  <span className="text-sm text-[var(--color-text-subtle)]">
                    $
                  </span>
                  <code className="font-mono text-sm text-[var(--color-text-primary)]">
                    npx frontend-ui add blur-text
                  </code>
                  <button
                    className="ml-2 text-[var(--color-text-subtle)] transition-colors hover:text-[var(--color-accent)]"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        'npx frontend-ui add blur-text'
                      )
                    }
                    aria-label="复制命令"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
              </ScrollReveal>
            </div>
          </section>
        </main>

        <Footer />
      </PageTransition>
    </div>
  );
}
