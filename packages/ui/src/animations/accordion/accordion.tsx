"use client";

import { useState, useCallback, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export interface AccordionItem {
  title: string;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  /** 默认展开项索引 */
  defaultOpen?: number;
  /** 是否允许同时展开多项 */
  allowMultiple?: boolean;
  /** 动画时长 (s) */
  duration?: number;
}

export function Accordion({
  items,
  className,
  defaultOpen,
  allowMultiple = false,
  duration = 0.3,
}: AccordionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>(() => {
    if (defaultOpen === undefined) return [];
    return [defaultOpen];
  });

  const toggleItem = useCallback(
    (index: number) => {
      setOpenIndices((prev) => {
        const isOpen = prev.includes(index);
        if (allowMultiple) {
          return isOpen ? prev.filter((i) => i !== index) : [...prev, index];
        }
        return isOpen ? [] : [index];
      });
    },
    [allowMultiple],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      const count = items.length;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          document.getElementById(`accordion-trigger-${(index + 1) % count}`)?.focus();
          break;
        case 'ArrowUp':
          e.preventDefault();
          document.getElementById(`accordion-trigger-${(index - 1 + count) % count}`)?.focus();
          break;
        case 'Home':
          e.preventDefault();
          document.getElementById('accordion-trigger-0')?.focus();
          break;
        case 'End':
          e.preventDefault();
          document.getElementById(`accordion-trigger-${count - 1}`)?.focus();
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          toggleItem(index);
          break;
        default:
          break;
      }
    },
    [items.length, toggleItem],
  );

  return (
    <div className={cn('w-full divide-y divide-[var(--color-border-subtle)] rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-surface)]', className)}>
      {items.map((item, index) => {
        const isOpen = openIndices.includes(index);
        const panelId = `accordion-panel-${index}`;
        const buttonId = `accordion-trigger-${index}`;

        return (
          <div key={index}>
            <h3>
              <button
                id={buttonId}
                type="button"
                onClick={() => toggleItem(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between px-4 py-3 text-left text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-bg-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-inset"
              >
                <span className="font-medium">{item.title}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration }}
                  className="text-[var(--color-text-muted)]"
                  aria-hidden="true"
                >
                  ▼
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-4 py-3 text-[var(--color-text-muted)]">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
