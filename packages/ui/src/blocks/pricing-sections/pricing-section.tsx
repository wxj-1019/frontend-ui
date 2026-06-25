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
  /** 布局变体: card（卡片）/ comparison（对比表）/ grid（特性网格） */
  variant?: 'card' | 'comparison' | 'grid';
  className?: string;
  prefersReducedMotion?: boolean;
}

export function PricingSection({
  title,
  subtitle,
  plans,
  columns = 3,
  variant = 'card',
  className,
  prefersReducedMotion = false,
}: PricingSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

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

        {/* Variant body */}
        {variant === 'comparison' ? (
          <ComparisonTable
            plans={plans}
            isInView={isInView}
            prefersReducedMotion={prefersReducedMotion}
          />
        ) : variant === 'grid' ? (
          <FeatureGrid
            plans={plans}
            isInView={isInView}
            prefersReducedMotion={prefersReducedMotion}
          />
        ) : (
          <div
            className={cn('mt-16 grid gap-6 lg:gap-8', {
              'sm:grid-cols-2': columns === 2,
              'sm:grid-cols-2 lg:grid-cols-3': columns === 3,
              'sm:grid-cols-2 lg:grid-cols-4': columns === 4,
            })}
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
        )}
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   Variant: Card (existing)
   ════════════════════════════════════════════════════════════ */

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
      {plan.highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--color-accent)] px-4 py-1 text-xs font-semibold text-white">
          推荐
        </span>
      )}
      {plan.icon && (
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
          {plan.icon}
        </div>
      )}
      <h3 className="font-display text-xl font-bold text-[var(--color-text-primary)]">
        {plan.name}
      </h3>
      {plan.description && (
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          {plan.description}
        </p>
      )}
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

/* ════════════════════════════════════════════════════════════
   Variant: Comparison Table
   ════════════════════════════════════════════════════════════ */

function ComparisonTable({
  plans,
  isInView,
  prefersReducedMotion,
}: {
  plans: PricingPlan[];
  isInView: boolean;
  prefersReducedMotion: boolean;
}) {
  // Collect all feature names across plans
  const allFeatures = Array.from(new Set(plans.flatMap((p) => p.features)));

  return (
    <div className="mt-16 overflow-x-auto">
      <motion.table
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="w-full min-w-[600px] border-collapse"
      >
        {/* Header row */}
        <thead>
          <tr>
            <th className="p-4 text-left text-sm font-semibold text-[var(--color-text-muted)]">
              功能
            </th>
            {plans.map((plan, i) => (
              <th
                key={i}
                className={cn(
                  'p-4 text-center',
                  plan.highlighted && 'relative'
                )}
              >
                {plan.highlighted && (
                  <span className="mb-2 inline-block rounded-full bg-[var(--color-accent)] px-3 py-0.5 text-xs font-semibold text-white">
                    推荐
                  </span>
                )}
                <div className="font-display text-lg font-bold text-[var(--color-text-primary)]">
                  {plan.name}
                </div>
                <div className="mt-1">
                  <span className="font-display text-2xl font-bold text-[var(--color-text-primary)]">
                    {plan.price}
                  </span>
                  {plan.interval && (
                    <span className="text-sm text-[var(--color-text-muted)]">
                      /{plan.interval}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Feature rows */}
        <tbody>
          {allFeatures.map((feature, rowIdx) => (
            <tr
              key={feature}
              className={cn(
                'border-t border-[var(--color-border-default)] transition-colors',
                rowIdx % 2 === 0 ? 'bg-[var(--color-bg-secondary)]/50' : ''
              )}
            >
              <td className="p-4 text-sm text-[var(--color-text-primary)]">
                {feature}
              </td>
              {plans.map((plan, colIdx) => {
                const hasFeature = plan.features.includes(feature);
                return (
                  <td key={colIdx} className="p-4 text-center">
                    {hasFeature ? (
                      <svg
                        className="mx-auto h-5 w-5 text-[var(--color-accent)]"
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
                    ) : (
                      <svg
                        className="mx-auto h-5 w-5 text-[var(--color-text-disabled)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>

        {/* CTA row */}
        <tfoot>
          <tr>
            <td className="p-4" />
            {plans.map((plan, i) => (
              <td key={i} className="p-4 text-center">
                <button
                  className={cn(
                    'w-full rounded-lg py-2.5 text-sm font-semibold transition-all',
                    plan.highlighted
                      ? 'bg-[var(--color-accent)] text-white hover:brightness-110 shadow-lg shadow-[var(--color-accent)]/25'
                      : 'border border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:border-[var(--color-accent)]/50'
                  )}
                >
                  {plan.cta}
                </button>
              </td>
            ))}
          </tr>
        </tfoot>
      </motion.table>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   Variant: Feature Grid
   ════════════════════════════════════════════════════════════ */

function FeatureGrid({
  plans,
  isInView,
  prefersReducedMotion,
}: {
  plans: PricingPlan[];
  isInView: boolean;
  prefersReducedMotion: boolean;
}) {
  return (
    <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {plans.map((plan, i) => (
        <motion.div
          key={i}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.08 * i }}
          className={cn(
            'rounded-2xl border p-6',
            plan.highlighted
              ? 'border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5'
              : 'border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]'
          )}
        >
          <div className="flex items-center gap-4">
            {plan.icon && (
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xl">
                {plan.icon}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg font-bold text-[var(--color-text-primary)]">
                  {plan.name}
                </h3>
                {plan.highlighted && (
                  <span className="rounded-full bg-[var(--color-accent)]/20 px-2 py-0.5 text-[10px] font-semibold text-[var(--color-accent)]">
                    推荐
                  </span>
                )}
              </div>
              <div className="mt-1">
                <span className="font-display text-xl font-bold text-[var(--color-text-primary)]">
                  {plan.price}
                </span>
                {plan.interval && (
                  <span className="text-xs text-[var(--color-text-muted)]">
                    /{plan.interval}
                  </span>
                )}
              </div>
            </div>
          </div>

          {plan.description && (
            <p className="mt-4 text-sm text-[var(--color-text-muted)]">
              {plan.description}
            </p>
          )}

          <ul className="mt-4 space-y-2">
            {plan.features.map((feature, j) => (
              <li key={j} className="flex items-center gap-2 text-sm">
                <svg
                  className="h-3.5 w-3.5 shrink-0 text-[var(--color-success)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-[var(--color-text-muted)]">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          <button
            className={cn(
              'mt-6 w-full rounded-lg py-2.5 text-sm font-semibold transition-all',
              plan.highlighted
                ? 'bg-[var(--color-accent)] text-white hover:brightness-110'
                : 'border border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:border-[var(--color-accent)]/50'
            )}
          >
            {plan.cta}
          </button>
        </motion.div>
      ))}
    </div>
  );
}
