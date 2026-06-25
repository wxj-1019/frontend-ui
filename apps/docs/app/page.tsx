'use client';

import { Footer } from '@/components/layout/Footer';
import { EnhancedNavbar } from '@/components/layout/EnhancedNavbar';
import { IntroAnimation } from '@/components/effects/IntroAnimation';
import { PageTransition } from '@/components/effects/PageTransition';
import { ImmersiveHero } from '@/components/hero/ImmersiveHero';
import { CategoryBento } from '@/components/sections/CategoryBento';
import { EngineBentoGrid } from '@/components/sections/EngineBentoGrid';
import { LiveGallery } from '@/components/sections/LiveGallery';
import { BlocksShowcase } from '@/components/sections/BlocksShowcase';
import { NarrativeScroll } from '@/components/sections/NarrativeScroll';
import { motion, useReducedMotion } from 'motion/react';
import { slideUp, slideUpReduced } from '@/lib/animations';
import Link from 'next/link';

export default function HomePage() {
  const shouldReduce = useReducedMotion();

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <IntroAnimation />
      <PageTransition>
        <EnhancedNavbar />

        <main id="main-content" tabIndex={-1}>
          {/* 沉浸式 Hero */}
          <ImmersiveHero />

          {/* 分类快速入口 */}
          <CategoryBento />

          {/* Bento Grid 引擎展示 */}
          <EngineBentoGrid />

          {/* Live Gallery 组件预览 */}
          <LiveGallery />

          {/* Blocks 展示 */}
          <BlocksShowcase />

          {/* 滚动叙事体验 */}
          <NarrativeScroll
            scenes={[
              {
                title: '构建动画界面曾经很复杂',
                description:
                  '需要同时掌握多个动画库、处理性能优化、确保无障碍兼容…… 但现在一切都变了。',
                highlight: '很复杂',
                decor: '⏳',
                items: [
                  {
                    label: '多引擎碎片化',
                    description: 'GSAP、Motion、CSS 各有一套 API',
                  },
                  {
                    label: '性能隐忧',
                    description: '动效卡顿、GPU 加速手动优化',
                  },
                  {
                    label: '无障碍缺失',
                    description: '动效忽略 prefers-reduced-motion',
                  },
                ],
              },
              {
                title: '现在，一行代码搞定',
                description:
                  '从 130+ 精心设计的动画组件中找到你需要的，安装即用。',
                highlight: '一行代码',
                decor: '⚡',
                items: [
                  {
                    label: 'TypeScript 优先',
                    description: '完整的类型推导，IDE 智能提示',
                  },
                  {
                    label: '多引擎统一',
                    description:
                      'GSAP / Motion / CSS / react-spring / Anime.js 统一封装',
                  },
                  {
                    label: '无障碍内置',
                    description: '每个组件都内置 prefers-reduced-motion 支持',
                  },
                ],
              },
              {
                title: '从组件到页面，一站式构建',
                description:
                  '不止是独立组件，更有完整的页面级 Blocks 区块，开箱即用。',
                highlight: '一站式',
                decor: '🏗️',
                items: [
                  {
                    label: 'Hero 区块',
                    description: '粒子背景、渐变、沉浸式叙事',
                  },
                  { label: 'Bento 网格', description: '响应式自适应布局' },
                  {
                    label: '定价方案',
                    description: '多变体：卡片、对比表、特性网格',
                  },
                  { label: '功能展示', description: '交替/居中布局' },
                  { label: '行动号召', description: '多风格 CTA 区块' },
                ],
              },
              {
                title: '开始构建你的下一个杰作',
                description:
                  '开源免费，社区驱动。选择 Frontend UI，让动画成为你的优势。',
                highlight: '杰作',
                decor: '🚀',
              },
            ]}
          />

          {/* CTA Section — 增强版 */}
          <section className="relative border-t border-[var(--color-border-subtle)] overflow-hidden">
            {/* 动态渐变背景 */}
            <div className="cta-gradient-bg absolute inset-0" />
            <div className="absolute inset-0" aria-hidden="true">
              <div
                className="absolute -bottom-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[var(--color-accent)]/10 blur-[120px]"
                aria-hidden="true"
              />
              <div
                className="absolute top-1/4 right-1/4 h-60 w-60 rounded-full bg-[var(--color-motion)]/8 blur-[100px]"
                aria-hidden="true"
              />
              <div
                className="absolute bottom-1/3 left-1/5 h-40 w-40 rounded-full bg-[var(--color-spring)]/6 blur-[80px]"
                aria-hidden="true"
              />

              {/* 装饰浮动元素 */}
              <motion.div
                className="absolute left-[15%] top-[20%] h-12 w-12 rounded-full border border-[var(--color-accent)]/10 bg-[var(--color-accent)]/3 float-shape-1"
                aria-hidden="true"
              />
              <motion.div
                className="absolute right-[20%] bottom-[30%] h-8 w-8 rounded-lg border border-[var(--color-motion)]/10 bg-[var(--color-motion)]/3 float-shape-2"
                aria-hidden="true"
              />
            </div>

            <div className="relative mx-auto max-w-3xl px-6 py-28 text-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={shouldReduce ? slideUpReduced : slideUp}
                transition={{ duration: shouldReduce ? 0 : 0.5 }}
              >
                <span className="inline-block rounded-full border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 px-4 py-1.5 text-sm text-[var(--color-accent)] mb-6">
                  🚀 准备好了
                </span>
                <h2 className="font-display text-4xl font-bold text-[var(--color-text-primary)] sm:text-5xl">
                  准备好开始了吗？
                </h2>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={shouldReduce ? slideUpReduced : slideUp}
                transition={{
                  duration: shouldReduce ? 0 : 0.5,
                  delay: shouldReduce ? 0 : 0.1,
                }}
              >
                <p className="mt-4 text-lg text-[var(--color-text-muted)]">
                  安装 Frontend UI，开始构建令人印象深刻的动画界面
                </p>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={shouldReduce ? slideUpReduced : slideUp}
                transition={{
                  duration: shouldReduce ? 0 : 0.5,
                  delay: shouldReduce ? 0 : 0.2,
                }}
              >
                <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]/80 backdrop-blur-sm px-6 py-4 transition-all hover:border-[var(--color-accent)]/50 group">
                  <span className="text-sm text-[var(--color-text-subtle)]">
                    $
                  </span>
                  <code className="font-mono text-sm text-[var(--color-text-primary)]">
                    npx frontend-ui add blur-text
                  </code>
                  <button
                    className="ml-2 text-[var(--color-text-subtle)] transition-all hover:text-[var(--color-accent)] hover:scale-110 active:scale-95"
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
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={shouldReduce ? slideUpReduced : slideUp}
                transition={{
                  duration: shouldReduce ? 0 : 0.5,
                  delay: shouldReduce ? 0 : 0.3,
                }}
              >
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/docs"
                    className="group relative overflow-hidden rounded-xl bg-[var(--color-accent)] px-8 py-4 text-sm font-semibold text-[var(--color-bg-primary)] transition-all hover:shadow-[0_0_40px_rgba(0,245,255,0.3)] active:scale-[0.98]"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <span className="relative z-10 inline-flex items-center gap-2">
                      查看文档
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
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </Link>
                  <a
                    href="https://github.com/frontend-ui/frontend-ui"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]/80 backdrop-blur-sm px-8 py-4 text-sm font-semibold text-[var(--color-text-primary)] transition-all hover:border-[var(--color-accent)]/50 active:scale-[0.98]"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <span className="relative z-10 inline-flex items-center gap-2">
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        />
                      </svg>
                      GitHub Star
                    </span>
                  </a>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </PageTransition>
    </div>
  );
}
