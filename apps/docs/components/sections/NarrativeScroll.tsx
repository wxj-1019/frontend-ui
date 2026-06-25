'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'motion/react';

// ─── Narrative Scene ────────────────────────────────────

interface NarrativeScene {
  title: string;
  description: string;
  highlight?: string;
  decor?: string;
  items?: { label: string; description?: string }[];
}

// ─── Props ───────────────────────────────────────────────

interface NarrativeScrollProps {
  scenes: NarrativeScene[];
  className?: string;
}

// ─── Simple class helper ────────────────────────────

function cx(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

// ─── Single Scene ────────────────────────────────────────

function SceneCard({
  scene,
  index,
  progress,
  total,
}: {
  scene: NarrativeScene;
  index: number;
  progress: MotionValue<number>;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const sceneProgress = useTransform(
    progress,
    [index / total, (index + 1) / total],
    [0, 1]
  );

  const opacity = useTransform(
    sceneProgress,
    [0, 0.3, 0.7, 1],
    [0.3, 1, 1, 0.3]
  );
  const y = useTransform(sceneProgress, [0, 0.3, 0.7, 1], [60, 0, 0, -40]);
  const scale = useTransform(
    sceneProgress,
    [0, 0.3, 0.7, 1],
    [0.9, 1, 1, 0.95]
  );

  return (
    <motion.div
      ref={ref}
      style={shouldReduce ? {} : { opacity, y, scale }}
      className="relative mx-auto max-w-4xl px-6 py-24 sm:py-32"
    >
      {/* 场景编号 */}
      <div className="mb-8 flex items-center gap-4">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
          style={{
            backgroundColor: `var(--color-${['accent', 'motion', 'spring', 'gsap'][index % 4]})`,
            color: 'var(--color-bg-primary)',
          }}
        >
          {index + 1}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-[var(--color-accent)]/20 to-transparent" />
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* 左侧: 内容 */}
        <div className="flex-1">
          {/* 装饰表情 */}
          {scene.decor && (
            <motion.span
              className="inline-block text-4xl mb-4"
              animate={shouldReduce ? {} : { rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              {scene.decor}
            </motion.span>
          )}

          <h2 className="font-display text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl lg:text-5xl leading-tight">
            {scene.highlight ? (
              <>
                {scene.title.split(scene.highlight)[0]}
                <span
                  className="text-gradient"
                  style={{
                    backgroundImage: `linear-gradient(135deg, var(--color-accent), var(--color-${['motion', 'spring', 'gsap', 'anime'][index % 4]}))`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {scene.highlight}
                </span>
                {scene.title.split(scene.highlight)[1]}
              </>
            ) : (
              scene.title
            )}
          </h2>

          <p className="mt-6 text-lg text-[var(--color-text-muted)] leading-relaxed">
            {scene.description}
          </p>

          {/* 项目列表 */}
          {scene.items && (
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {scene.items.map((item) => (
                <motion.div
                  key={item.label}
                  className="group rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]/40 p-4 transition-all duration-300 hover:border-[var(--color-accent)]/20 hover:bg-[var(--color-bg-secondary)]/70 hover:shadow-[0_0_30px_rgba(0,245,255,0.05)]"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                      style={{
                        backgroundColor: `var(--color-${['accent', 'motion', 'spring', 'gsap'][index % 4]})20`,
                        color: `var(--color-${['accent', 'motion', 'spring', 'gsap'][index % 4]})`,
                      }}
                    >
                      ✓
                    </span>
                    <div>
                      <div className="font-semibold text-sm text-[var(--color-text-primary)]">
                        {item.label}
                      </div>
                      {item.description && (
                        <div className="mt-0.5 text-xs text-[var(--color-text-subtle)]">
                          {item.description}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* 右侧: 装饰视觉 */}
        <div className="hidden lg:flex lg:w-48 shrink-0 items-center justify-center">
          <div className="relative h-40 w-40">
            {/* 同心圆装饰 */}
            <motion.div
              className="absolute inset-0 rounded-full border"
              style={{
                borderColor: `var(--color-${['accent', 'motion', 'spring', 'gsap'][index % 4]})15`,
              }}
              animate={shouldReduce ? {} : { rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-4 rounded-full border"
              style={{
                borderColor: `var(--color-${['accent', 'motion', 'spring', 'gsap'][index % 4]})10`,
              }}
              animate={shouldReduce ? {} : { rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-8 rounded-full"
              style={{
                backgroundColor: `var(--color-${['accent', 'motion', 'spring', 'gsap'][index % 4]})8`,
              }}
              animate={shouldReduce ? {} : { scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Progress Bar ────────────────────────────────────────

function ProgressIndicator({ progress }: { progress: MotionValue<number> }) {
  const progressScale = useTransform(progress, [0, 1], [0, 100]);

  return (
    <div className="fixed left-6 top-1/3 hidden h-40 w-1 lg:block z-30">
      {/* 轨道 */}
      <div className="absolute inset-0 rounded-full bg-[var(--color-border-subtle)]" />
      {/* 进度 */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 rounded-full bg-gradient-to-t from-[var(--color-accent)] to-[var(--color-motion)]"
        style={{
          height: useTransform(progressScale, [0, 100], ['0%', '100%']),
        }}
      />
      {/* 圆点 */}
      <motion.div
        className="absolute -left-1 h-3 w-3 rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-bg-primary)]"
        style={{
          bottom: useTransform(progressScale, [0, 100], ['0%', '100%']),
        }}
      />
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────

export function NarrativeScroll({ scenes, className }: NarrativeScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  if (scenes.length === 0) return null;

  // 在减弱动效模式下使用简化版本
  if (shouldReduce) {
    return (
      <section
        ref={containerRef}
        className={cx(
          'relative border-t border-[var(--color-border-subtle)]',
          className
        )}
      >
        {/* 进度指示器 */}
        <ProgressIndicator progress={scrollYProgress} />

        <div className="mx-auto max-w-7xl">
          <div className="py-20 px-6 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-[var(--color-accent)]/30" />
              <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                故事线
              </h2>
              <div className="h-px w-12 bg-[var(--color-accent)]/30" />
            </div>
            <p className="text-[var(--color-text-muted)]">滚动浏览完整叙事</p>
          </div>

          {scenes.map((scene, i) => (
            <SceneCard
              key={i}
              scene={scene}
              index={i}
              progress={scrollYProgress}
              total={scenes.length}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className={cx(
        'relative border-t border-[var(--color-border-subtle)]',
        className
      )}
    >
      {/* Section Header */}
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-8">
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-[var(--color-accent)]/30" />
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            故事线
          </h2>
          <div className="h-px w-12 bg-[var(--color-accent)]/30" />
        </div>
        <p className="mt-4 text-center text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
          Frontend UI 的进化之旅
        </p>
      </div>

      {/* 进度指示器 */}
      <ProgressIndicator progress={scrollYProgress} />

      <div className="mx-auto max-w-7xl">
        {scenes.map((scene, i) => (
          <SceneCard
            key={i}
            scene={scene}
            index={i}
            progress={scrollYProgress}
            total={scenes.length}
          />
        ))}
      </div>

      {/* 底部装饰 */}
      <div className="relative h-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--color-bg-primary)]" />
      </div>
    </section>
  );
}
