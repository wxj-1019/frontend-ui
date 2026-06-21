'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { cn } from '../../lib/utils';
import type { ReactNode } from 'react';

export interface PricingPlan {
  name: string;
  price: string;
  description?: string;
  features: string[];
  cta: string;
  /** Whether this plan is highlighted/recommended */
  highlighted?: boolean;
  /** Monthly or annual */
  interval?: string;
  icon?: ReactNode;
}

export interface PricingSectionProps {
  title: string;
  subtitle?: string;
  plans: PricingPlan[];
  columns?: 2 | 3 | 4;
  className?: string;
  prefersReducedMotion?: boolean;
}

export function PricingSection({
  title,
  subtitle,
  plans,
  columns = 3,
  className,
  prefersReducedMotion = false,
}: PricingSectionProps) {
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

        {/* Plans grid */}
        <div
          className={cn(
            'mt-16 grid gap-6 lg:gap-8',
            colClass[columns] || 'sm:grid-cols-2 lg:grid-cols-3'
          )}
        >
          {plans.map((plan, i) => (
            <PricingCard
              key={i}
              plan={plan}
              index={i}
              isInView={isInView}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Single Pricing Card ─────────────────────────────────── */

function PricingCard({
  plan,
  index,
  isInView,
  prefersReducedMotion,
}: {
  plan: PricingPlan;
  index: number;
  isInView: boolean;
  prefersReducedMotion: boolean;
}) {
  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className={cn(
        'relative flex flex-col rounded-2xl border p-8 transition-all duration-300',
        plan.highlighted
          ? 'border-[var(--color-accent)]/40 bg-[var(--color-accent)]/5 shadow-lg shadow-[var(--color-accent)]/10 scale-105'
          : 'border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] hover:border-[var(--color-accent)]/30'
      )}
    >
      {/* Recommended badge */}
      {plan.highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--color-accent)] px-4 py-1 text-xs font-semibold text-white">
          推荐
        </span>
      )}

      {/* Icon */}
      {plan.icon && (
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
          {plan.icon}
        </div>
      )}

      {/* Plan name */}
      <h3 className="font-display text-xl font-bold text-[var(--color-text-primary)]">
        {plan.name}
      </h3>

      {/* Description */}
      {plan.description && (
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          {plan.description}
        </p>
      )}

      {/* Price */}
      <div className="mt-6 flex items-baseline gap-1">
        <span className="font-display text-4xl font-bold text-[var(--color-text-primary)]">
          {plan.price}
        </span>
        {plan.interval && (
          <span className="text-sm text-[var(--color-text-muted)]">
            /{plan.interval}
          </span>
        )}
      </div>

      {/* Features */}
      <ul className="mt-6 flex-1 space-y-3">
        {plan.features.map((feature, j) => (
          <li key={j} className="flex items-start gap-3 text-sm">
            <svg
              className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-[var(--color-text-muted)]">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        className={cn(
          'mt-8 w-full rounded-lg py-3 text-sm font-semibold transition-all',
          plan.highlighted
            ? 'bg-[var(--color-accent)] text-white hover:brightness-110 shadow-lg shadow-[var(--color-accent)]/25'
            : 'border border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-accent)]/5'
        )}
      >
        {plan.cta}
      </button>
    </motion.div>
  );
}
