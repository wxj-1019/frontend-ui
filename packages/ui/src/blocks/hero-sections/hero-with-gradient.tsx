'use client';

import { useRef } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import type { HeroSectionBaseProps } from './types';

export interface HeroWithGradientProps extends HeroSectionBaseProps {
  /** Gradient direction */
  gradientDirection?: 'to-right' | 'to-bottom-right' | 'to-bottom';
  /** Whether to show animated grid pattern overlay */
  showGrid?: boolean;
}

export function HeroWithGradient({
  title,
  subtitle,
  actions,
  className,
  gradientDirection = 'to-bottom-right',
  showGrid = true,
  prefersReducedMotion = false,
  children,
}: HeroWithGradientProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const gridStyle = showGrid
    ? {
        backgroundImage: [
          'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        ].join(', '),
        backgroundSize: '32px 32px',
      }
    : {};

  const dirMap = {
    'to-right': 'bg-gradient-to-r',
    'to-bottom-right': 'bg-gradient-to-br',
    'to-bottom': 'bg-gradient-to-b',
  } as const;

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden rounded-xl',
        dirMap[gradientDirection],
        'from-[var(--color-accent)]/20 via-[var(--color-bg-primary)] to-[var(--color-bg-primary)]',
        'px-6 py-20 sm:px-12 sm:py-28 lg:px-20',
        className
      )}
    >
      {/* Grid overlay */}
      {showGrid && (
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={gridStyle}
          aria-hidden
        />
      )}

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-[var(--color-accent)]/10 blur-[120px]"
        aria-hidden
      />

      {/* Content */}
      <div className="relative mx-auto max-w-4xl text-center">
        {/* Label badge */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="inline-block rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-4 py-1.5 text-xs font-medium tracking-wider text-[var(--color-accent)] uppercase">
            Frontend UI
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl font-bold leading-tight tracking-tight text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-muted)] sm:text-xl"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Actions */}
        {actions && actions.length > 0 && (
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
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
          </motion.div>
        )}

        {/* Children (extra content below CTA) */}
        {children && (
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-12"
          >
            {children}
          </motion.div>
        )}
      </div>
    </div>
  );
}
