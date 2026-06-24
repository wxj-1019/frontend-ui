"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ScrollReveal } from "@frontend-ui/ui";
import { Type, Zap, Layers, Sparkles, ArrowUpRight } from "lucide-react";

const categories = [
  {
    id: "text-animations",
    title: "文字动画",
    description: "BlurText, GradientText, SplitText, Typewriter 等",
    icon: Type,
    color: "#00F5FF",
    count: 13,
    gradient: "from-[#00F5FF]/20 to-[#00F5FF]/5",
    borderColor: "rgba(0, 245, 255, 0.2)",
    hoverBorder: "rgba(0, 245, 255, 0.5)",
  },
  {
    id: "animations",
    title: "交互动画",
    description: "Magnet, ScrollReveal, Draggable, FlipCard 等",
    icon: Zap,
    color: "#FF00FF",
    count: 21,
    gradient: "from-[#FF00FF]/20 to-[#FF00FF]/5",
    borderColor: "rgba(255, 0, 255, 0.2)",
    hoverBorder: "rgba(255, 0, 255, 0.5)",
  },
  {
    id: "components",
    title: "复合组件",
    description: "Dock, SpotlightCard, TiltCard, GlassCard 等",
    icon: Layers,
    color: "#00FFAA",
    count: 13,
    gradient: "from-[#00FFAA]/20 to-[#00FFAA]/5",
    borderColor: "rgba(0, 255, 170, 0.2)",
    hoverBorder: "rgba(0, 255, 170, 0.5)",
  },
  {
    id: "backgrounds",
    title: "背景特效",
    description: "Aurora, HighPerfParticles, ThreeScene, Starfield 等",
    icon: Sparkles,
    color: "#FFD700",
    count: 11,
    gradient: "from-[#FFD700]/20 to-[#FFD700]/5",
    borderColor: "rgba(255, 215, 0, 0.2)",
    hoverBorder: "rgba(255, 215, 0, 0.5)",
  },
];

/**
 * 分类快速入口 — Bento 风格 4 卡片网格
 */
export function CategoryBento() {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => {
            const Icon = cat.icon;

            return (
              <ScrollReveal key={cat.id} delay={i * 0.1}>
                <Link href={`/${cat.id}`} className="group block">
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="relative overflow-hidden rounded-2xl border bg-[var(--color-bg-secondary)]/80 p-6 backdrop-blur-sm transition-all duration-300"
                    style={{ borderColor: cat.borderColor }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = cat.hoverBorder;
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${cat.color}15`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = cat.borderColor;
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    {/* 背景渐变 */}
                    <div
                      className={`absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br ${cat.gradient} opacity-60 blur-2xl transition-opacity group-hover:opacity-100`}
                    />

                    <div className="relative">
                      {/* 图标 + 数量 */}
                      <div className="flex items-center justify-between">
                        <div
                          className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                          style={{
                            backgroundColor: `${cat.color}15`,
                            color: cat.color,
                          }}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <span
                          className="rounded-full px-2.5 py-1 text-xs font-bold"
                          style={{
                            backgroundColor: `${cat.color}12`,
                            color: cat.color,
                          }}
                        >
                          {cat.count}
                        </span>
                      </div>

                      {/* 标题 */}
                      <h3 className="mt-4 font-display text-lg font-semibold text-[var(--color-text-primary)]">
                        {cat.title}
                      </h3>

                      {/* 描述 */}
                      <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
                        {cat.description}
                      </p>

                      {/* 箭头 */}
                      <div className="mt-4 flex items-center gap-1 text-sm text-[var(--color-text-subtle)] transition-colors group-hover:text-[var(--color-text-primary)]">
                        <span>探索全部</span>
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
