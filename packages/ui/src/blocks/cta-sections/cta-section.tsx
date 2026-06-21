'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { cn } from '../../lib/utils';
import type { ReactNode } from 'react';

export interface CTAction {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export interface CTASectionProps {
  title: string;
  description?: string;
  actions?: CTAction[];
  /** Visual style variant */
  variant?: 'gradient' | 'minimal' | 'accent';
  className?: string;
  children?: ReactNode;
  prefersReducedMotion?: boolean;
}

export function CTASection({
  title,
  description,
  actions,
  variant = 'gradient',
  className,
  children,
  prefersReducedMotion = false,
}: CTASectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const variantStyles = {
    gradient:
      'bg-gradient-to-br from-[var(--color-accent)]/20 via-[var(--color-bg-primary)] to-[var(--color-bg-primary)] border border-[var(--color-accent)]/10',
    minimal:
      'bg-[var(--color-bg-secondary)] border border-[var(--color-border-default)]',
    accent: 'bg-[var(--color-accent)]/5 border border-[var(--color-accent)]/20',
  };

  return (
    <section ref={ref} className={cn('py-20', className)}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={cn(
            'relative overflow-hidden rounded-2xl px-8 py-16 text-center sm:px-16 sm:py-20',
            variantStyles[variant]
          )}
        >
          {/* Grid pattern overlay for gradient variant */}
          {variant === 'gradient' && (
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage: [
                  'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
                  'linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                ].join(', '),
                backgroundSize: '32px 32px',
              }}
              aria-hidden
            />
          )}

          {/* Ambient glow */}
          <div
            className="pointer-events-none absolute -top-20 right-1/4 h-64 w-64 rounded-full bg-[var(--color-accent)]/10 blur-[100px]"
            aria-hidden
          />

          {/* Content */}
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              {title}
            </h2>

            {description && (
              <p className="mt-4 text-lg text-[var(--color-text-muted)]">
                {description}
              </p>
            )}

            {actions && actions.length > 0 && (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                {actions.map((action, i) => (
                  <a
                    key={i}
                    href={action.href || '#'}
                    onClick={(e) => {
                      if (!action.href) e.preventDefault();
                      action.onClick?.();
                    }}
                    className={cn(
                      'inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all',
                      action.variant === 'secondary'
                        ? 'border border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-accent)]/5'
                        : 'bg-[var(--color-accent)] text-white hover:brightness-110 shadow-lg shadow-[var(--color-accent)]/25'
                    )}
                  >
                    {action.label}
                  </a>
                ))}
              </div>
            )}

            {children && <div className="mt-8">{children}</div>}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
