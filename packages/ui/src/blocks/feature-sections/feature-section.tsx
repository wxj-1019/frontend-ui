'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { cn } from '../../lib/utils';
import type { ReactNode } from 'react';

export interface FeatureItem {
  title: string;
  description: string;
  icon?: ReactNode;
}

export interface FeatureSectionProps {
  /** Section title */
  title: string;
  /** Section subtitle */
  subtitle?: string;
  /** Feature items to display */
  features: FeatureItem[];
  /** Layout alternation direction */
  layout?: 'alternating' | 'center';
  /** Number of columns in grid layout (for 'center' layout) */
  columns?: 2 | 3 | 4;
  className?: string;
  prefersReducedMotion?: boolean;
}

export function FeatureSection({
  title,
  subtitle,
  features,
  layout = 'alternating',
  columns = 3,
  className,
  prefersReducedMotion = false,
}: FeatureSectionProps) {
  if (layout === 'center') {
    return (
      <CenterLayout
        title={title}
        subtitle={subtitle}
        features={features}
        columns={columns}
        className={className}
        prefersReducedMotion={prefersReducedMotion}
      />
    );
  }

  return (
    <AlternatingLayout
      title={title}
      subtitle={subtitle}
      features={features}
      className={className}
      prefersReducedMotion={prefersReducedMotion}
    />
  );
}

/* ─── Center Layout (feature cards grid) ─────────────────── */

function CenterLayout({
  title,
  subtitle,
  features,
  columns,
  className,
  prefersReducedMotion,
}: {
  title: string;
  subtitle?: string;
  features: FeatureItem[];
  columns: number;
  className?: string;
  prefersReducedMotion?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const colClass: Record<number, string> = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section ref={ref} className={cn('py-20', className)}>
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-lg text-[var(--color-text-muted)]"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Feature grid */}
        <div className={cn('mt-16 grid gap-8', colClass[columns])}>
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="group rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-6 transition-all hover:border-[var(--color-accent)]/30 hover:shadow-lg hover:shadow-[var(--color-accent)]/5"
            >
              {feature.icon && (
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                  {feature.icon}
                </div>
              )}
              <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Alternating Layout (left-right) ───────────────────── */

function AlternatingLayout({
  title,
  subtitle,
  features,
  className,
  prefersReducedMotion,
}: {
  title: string;
  subtitle?: string;
  features: FeatureItem[];
  className?: string;
  prefersReducedMotion?: boolean;
}) {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  return (
    <section className={cn('py-20', className)}>
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div ref={headerRef} className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-lg text-[var(--color-text-muted)]"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Alternating features */}
        <div className="mt-20 space-y-24">
          {features.map((feature, i) => (
            <AlternatingRow
              key={i}
              feature={feature}
              index={i}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AlternatingRow({
  feature,
  index,
  prefersReducedMotion,
}: {
  feature: FeatureItem;
  index: number;
  prefersReducedMotion?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isReversed = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col items-center gap-12 lg:flex-row',
        isReversed && 'lg:flex-row-reverse'
      )}
    >
      {/* Visual placeholder */}
      <motion.div
        initial={
          prefersReducedMotion ? {} : { opacity: 0, x: isReversed ? -40 : 40 }
        }
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex w-full lg:w-1/2"
      >
        <div className="flex h-64 w-full items-center justify-center rounded-2xl border border-[var(--color-border-default)] bg-gradient-to-br from-[var(--color-accent)]/10 to-transparent lg:h-80">
          {feature.icon ? (
            <div className="text-[var(--color-accent)] opacity-60">
              {feature.icon}
            </div>
          ) : (
            <span className="font-display text-6xl font-bold text-[var(--color-accent)]/20">
              {String(index + 1).padStart(2, '0')}
            </span>
          )}
        </div>
      </motion.div>

      {/* Text content */}
      <motion.div
        initial={
          prefersReducedMotion ? {} : { opacity: 0, x: isReversed ? 40 : -40 }
        }
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="w-full lg:w-1/2"
      >
        <span className="text-xs font-bold tracking-widest text-[var(--color-accent)] uppercase">
          Feature {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="font-display mt-3 text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
          {feature.title}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-[var(--color-text-muted)]">
          {feature.description}
        </p>
      </motion.div>
    </div>
  );
}
