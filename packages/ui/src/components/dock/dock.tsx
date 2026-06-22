'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { type Ref } from 'react';

export interface DockProps {
  items: { icon: React.ReactNode; label: string }[];
  className?: string;
  ref?: Ref<HTMLDivElement>;
}

export function Dock({ items, className, ref }: DockProps) {
  return (
    <motion.div
      ref={ref}
      role="toolbar"
      aria-label="Dock 导航"
      className={cn(
        'flex items-end gap-2 rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-bg-elevated)]/80 px-4 pb-3 pt-4 backdrop-blur-md',
        className
      )}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="group relative flex flex-col items-center gap-1"
          whileHover={{ scale: 1.2, y: -8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <button
            type="button"
            aria-label={item.label}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-border-subtle)] text-[var(--color-text-muted)] transition-colors group-hover:bg-[var(--color-hover)] group-hover:text-[var(--color-text-primary)]"
          >
            {item.icon}
          </button>
          <span className="text-xs text-[var(--color-text-subtle)] opacity-0 transition-opacity group-hover:opacity-100">
            {item.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
