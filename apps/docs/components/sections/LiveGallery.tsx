"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { ScrollReveal } from "@frontend-ui/ui";
import {
  BlurText,
  GradientText,
  Magnet,
  TiltCard,
  GlowCard,
  GlassCard,
} from "@frontend-ui/ui";
import { Sparkles, Type, Zap, Layers } from "lucide-react";

const categories = [
  { id: "text-animations", label: "文字动画", icon: Type, color: "#00F5FF" },
  { id: "animations", label: "交互动画", icon: Zap, color: "#FF00FF" },
  { id: "components", label: "复合组件", icon: Layers, color: "#00FFAA" },
  { id: "backgrounds", label: "背景特效", icon: Sparkles, color: "#FFD700" },
];

/** 单个 Live 预览卡片 */
function LiveCard({
  title,
  category,
  href,
  children,
  color,
}: {
  title: string;
  category: string;
  href: string;
  children: React.ReactNode;
  color: string;
}) {
  return (
    <Link href={href} className="group block">
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]/80 backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-accent)]/30 hover:shadow-[0_0_40px_rgba(0,245,255,0.08)]"
      >
        {/* 预览区域 */}
        <div className="relative flex h-48 items-center justify-center overflow-hidden">
          {/* 动态网格背景 */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          {/* Hover 光晕 */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${color}10 0%, transparent 70%)`,
            }}
          />
          
          {/* 实际内容 */}
          <div className="relative z-10">{children}</div>
        </div>

        {/* 信息栏 */}
        <div className="flex items-center justify-between border-t border-[var(--color-border-subtle)] px-5 py-4">
          <div>
            <span className="font-display text-sm font-semibold text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-accent)]">
              {title}
            </span>
            <span
              className="ml-2 text-xs font-medium"
              style={{ color: `${color}AA` }}
            >
              {category}
            </span>
          </div>
          <svg
            className="h-4 w-4 text-[var(--color-text-subtle)] transition-all group-hover:translate-x-1 group-hover:text-[var(--color-accent)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </motion.div>
    </Link>
  );
}

/**
 * Live Gallery 组件预览墙
 * 更大的卡片、更丰富的实时预览
 */
export function LiveGallery() {
  const [activeCategory, setActiveCategory] = useState("all");

  const allCards = [
    {
      title: "BlurText",
      category: "文字动画",
      href: "/text-animations/blur-text",
      color: "#00F5FF",
      component: <BlurText text="Hello World" delay={0.1} />,
    },
    {
      title: "GradientText",
      category: "文字动画",
      href: "/text-animations/gradient-text",
      color: "#00F5FF",
      component: (
        <GradientText
          text="Gradient"
          className="text-2xl font-bold"
          from="from-[#00F5FF]"
          to="to-[#FF00FF]"
        />
      ),
    },
    {
      title: "Magnet",
      category: "交互动画",
      href: "/animations/magnet",
      color: "#FF00FF",
      component: (
        <Magnet strength={0.3}>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-accent)] text-lg text-[var(--color-bg-primary)] shadow-[0_0_20px_rgba(0,245,255,0.3)]">
            <Sparkles className="h-7 w-7" />
          </div>
        </Magnet>
      ),
    },
    {
      title: "TiltCard",
      category: "复合组件",
      href: "/components/tilt-card",
      color: "#00FFAA",
      component: (
        <TiltCard className="h-20 w-32 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] flex items-center justify-center">
          <span className="text-xs text-[var(--color-text-muted)]">Hover Me</span>
        </TiltCard>
      ),
    },
    {
      title: "GlowCard",
      category: "复合组件",
      href: "/components/spotlight-card",
      color: "#00FFAA",
      component: (
        <GlowCard className="h-20 w-32 rounded-xl">
          <div className="flex items-center justify-center h-full text-xs text-[var(--color-text-muted)]">
            Glow
          </div>
        </GlowCard>
      ),
    },
    {
      title: "GlassCard",
      category: "复合组件",
      href: "/components/glass-card",
      color: "#00FFAA",
      component: (
        <GlassCard className="h-20 w-32 rounded-xl flex items-center justify-center">
          <span className="text-xs text-[var(--color-text-muted)]">Glass</span>
        </GlassCard>
      ),
    },
    {
      title: "HighPerfParticles",
      category: "背景特效",
      href: "/backgrounds/high-perf-particles",
      color: "#FFD700",
      component: (
        <div className="relative h-20 w-32 overflow-hidden rounded-lg bg-black">
          {[...Array(15)].map((_, i) => (
            <span
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full"
              style={{
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 80 + 10}%`,
                backgroundColor: ["#00F5FF", "#FF00FF", "#00FFAA", "#FFD700"][i % 4],
                animation: `pulse 1.5s ease-in-out ${i * 0.1}s infinite`,
                opacity: 0.7,
              }}
            />
          ))}
        </div>
      ),
    },
    {
      title: "ThreeScene",
      category: "背景特效",
      href: "/backgrounds/three-scene",
      color: "#FFD700",
      component: (
        <div className="relative h-20 w-32 perspective-[600px]">
          <div className="absolute inset-0 rounded-lg bg-[var(--color-accent)]/20 animate-float" style={{ transform: 'translateZ(20px)' }} />
          <div className="absolute inset-0 rounded-lg border border-[var(--color-accent)]/30 animate-float" style={{ transform: 'translateZ(40px)', animationDelay: '0.5s' }} />
          <div className="absolute inset-0 rounded-lg border border-[var(--color-accent)]/20 animate-float" style={{ transform: 'translateZ(60px)', animationDelay: '1s' }} />
        </div>
      ),
    },
  ];

  const filteredCards = activeCategory === "all"
    ? allCards
    : allCards.filter((card) => {
        const catMap: Record<string, string> = {
          "text-animations": "文字动画",
          "animations": "交互动画",
          "components": "复合组件",
          "backgrounds": "背景特效",
        };
        return card.category === catMap[activeCategory];
      });

  return (
    <section className="relative border-t border-[var(--color-border-subtle)] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
              实时预览
            </h2>
            <p className="font-display mt-3 text-3xl font-bold text-[var(--color-text-primary)]">
              亲手感受每个组件
            </p>
            <p className="mt-3 text-[var(--color-text-muted)] max-w-xl mx-auto">
              所有组件均支持实时交互预览，所见即所得
            </p>
          </div>
        </ScrollReveal>

        {/* 分类筛选 */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setActiveCategory("all")}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                activeCategory === "all"
                  ? "bg-[var(--color-accent)] text-[var(--color-bg-primary)]"
                  : "border border-[var(--color-border-default)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-accent)]/50"
              }`}
            >
              全部
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? "text-[var(--color-bg-primary)]"
                    : "border border-[var(--color-border-default)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-accent)]/50"
                }`}
                style={
                  activeCategory === cat.id
                    ? { backgroundColor: cat.color, color: "#0A0A0F" }
                    : {}
                }
              >
                <cat.icon className="h-4 w-4" />
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* 卡片网格 */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredCards.map((card, i) => (
            <ScrollReveal key={card.title} delay={i * 0.05}>
              <LiveCard
                title={card.title}
                category={card.category}
                href={card.href}
                color={card.color}
              >
                {card.component}
              </LiveCard>
            </ScrollReveal>
          ))}
        </div>

        {/* 查看全部 */}
        <ScrollReveal delay={0.3}>
          <div className="mt-12 text-center">
            <Link
              href="/components"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]/80 backdrop-blur-sm px-8 py-4 text-sm font-medium text-[var(--color-text-primary)] transition-all hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)] hover:shadow-[0_0_30px_rgba(0,245,255,0.1)]"
            >
              浏览全部组件
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
