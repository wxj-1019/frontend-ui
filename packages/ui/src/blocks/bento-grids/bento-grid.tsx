'use client';

import { cn } from '../../lib/utils';
import type { ReactNode } from 'react';

export interface BentoGridProps {
  children: ReactNode;
  /** Number of grid columns (default: 3) */
  columns?: 2 | 3 | 4;
  /** Gap between cells (default: 4 = 16px) */
  gap?: number;
  className?: string;
}

export interface BentoCardProps {
  children?: ReactNode;
  /** Whether this card spans the full width */
  wide?: boolean;
  /** Whether this card is tall (2x height) */
  tall?: boolean;
  /** Visual prominence */
  variant?: 'default' | 'accent' | 'subtle';
  className?: string;
  /** Optional icon or image at the top */
  icon?: ReactNode;
  /** Card title */
  title?: string;
  /** Card description */
  description?: string;
  /** Hover effect type */
  hoverEffect?: 'none' | 'lift' | 'glow';
}

export function BentoGrid({
  children,
  columns = 3,
  gap = 4,
  className,
}: BentoGridProps) {
  const colClass = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  } as const;

  return (
    <div
      className={cn('grid', colClass[columns], className)}
      style={{ gap: `${gap * 4}px` }}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  children,
  wide = false,
  tall = false,
  variant = 'default',
  className,
  icon,
  title,
  description,
  hoverEffect = 'lift',
}: BentoCardProps) {
  const variantStyles = {
    default:
      'border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]',
    accent: 'border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5',
    subtle:
      'border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)]',
  };

  const hoverStyles = {
    none: '',
    lift: 'hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--color-accent)]/5',
    glow: 'hover:shadow-[0_0_30px_-5px_var(--color-accent)] hover:border-[var(--color-accent)]/40',
  };

  return (
    <div
      className={cn(
        'group relative rounded-2xl p-6 transition-all duration-300',
        wide && 'sm:col-span-2',
        tall && 'sm:row-span-2',
        variantStyles[variant],
        hoverStyles[hoverEffect],
        className
      )}
    >
      {/* Icon */}
      {icon && (
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
          {icon}
        </div>
      )}

      {/* Title */}
      {title && (
        <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">
          {title}
        </h3>
      )}

      {/* Description */}
      {description && (
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          {description}
        </p>
      )}

      {/* Children (custom content) */}
      {children && (
        <div className={title || description ? 'mt-4' : ''}>{children}</div>
      )}
    </div>
  );
}
