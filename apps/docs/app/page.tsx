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
import { motion } from 'motion/react';
import {
  slideUp,
  slideUpReduced,
  getAnimationVariants,
} from '@/lib/animations';
import Link from 'next/link';

export default function HomePage() {
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

          {/* CTA Section */}
          <section className="relative border-t border-[var(--color-border-subtle)] py-24">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -bottom-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[var(--color-accent)]/10 blur-[120px]" />
              <div className="absolute top-1/4 right-1/4 h-60 w-60 rounded-full bg-[var(--color-motion)]/8 blur-[100px]" />
            </div>
            <div className="relative mx-auto max-w-3xl px-6 text-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={getAnimationVariants(slideUp, slideUpReduced)}
              >
                <h2 className="font-display text-3xl font-bold text-[var(--color-text-primary)]">
                  准备好开始了吗？
                </h2>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={getAnimationVariants(slideUp, slideUpReduced)}
                transition={{ delay: 0.1 }}
              >
                <p className="mt-4 text-[var(--color-text-muted)]">
                  安装 Frontend UI，开始构建令人印象深刻的动画界面
                </p>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={getAnimationVariants(slideUp, slideUpReduced)}
                transition={{ delay: 0.2 }}
              >
                <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]/80 backdrop-blur-sm px-6 py-4 transition-all hover:border-[var(--color-accent)]/50">
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
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={getAnimationVariants(slideUp, slideUpReduced)}
                transition={{ delay: 0.3 }}
              >
                <div className="mt-6">
                  <Link
                    href="/docs"
                    className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-8 py-4 text-sm font-semibold text-[var(--color-bg-primary)] transition-all hover:shadow-[0_0_40px_rgba(0,245,255,0.3)] active:scale-[0.98]"
                  >
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
                  </Link>
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
