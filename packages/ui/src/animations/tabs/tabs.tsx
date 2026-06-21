"use client";

import { useState, useCallback, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export interface TabItem {
  label: string;
  content: ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  className?: string;
  /** 默认激活索引 */
  defaultIndex?: number;
  /** 朝向 */
  orientation?: 'horizontal' | 'vertical';
}

export function Tabs({
  tabs,
  className,
  defaultIndex = 0,
  orientation = 'horizontal',
}: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const isVertical = orientation === 'vertical';
  const layoutAxis = isVertical ? 'y' : 'x';

  return (
    <div
      className={cn(
        'w-full',
        isVertical ? 'flex gap-4' : 'flex flex-col gap-2',
        className,
      )}
      role="tablist"
      aria-orientation={orientation}
    >
      {/* Tab triggers */}
      <div
        className={cn(
          'relative flex gap-1',
          isVertical ? 'flex-col' : 'flex-row',
          isVertical && 'border-r border-[var(--color-border-default)] pr-2',
        )}
      >
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={index}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`tab-panel-${index}`}
              id={`tab-trigger-${index}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => handleSelect(index)}
              className={cn(
                'relative rounded-md px-4 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'text-[var(--color-text-primary)]'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]',
              )}
            >
              {tab.label}
              {isActive && (
                <motion.span
                  layoutId={`tab-indicator-${orientation}`}
                  className="absolute inset-0 -z-10 rounded-md bg-[var(--color-accent)]/15 ring-1 ring-[var(--color-accent)]/40"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  style={{
                    // 仅动画一个轴向
                    [layoutAxis]: 0,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab panels */}
      <div className="relative flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            role="tabpanel"
            id={`tab-panel-${activeIndex}`}
            aria-labelledby={`tab-trigger-${activeIndex}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="rounded-lg bg-[var(--color-bg-surface)] p-4 text-[var(--color-text-primary)]"
          >
            {tabs[activeIndex]?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
