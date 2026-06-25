'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { cn } from '../../lib/utils';

// ─── Types ───────────────────────────────────────────────

export interface DashboardCard {
  /** 卡片 ID */
  id: string;
  /** 标题 */
  title: string;
  /** 数值（可显示动画） */
  value: string | number;
  /** 副标题/单位 */
  subtitle?: string;
  /** 变化率（如 "+12.5%"） */
  change?: string;
  /** 变化方向 */
  changeDirection?: 'up' | 'down' | 'neutral';
  /** 图标 */
  icon?: React.ReactNode;
  /** 卡片色系 */
  color?: 'accent' | 'success' | 'warning' | 'default';
}

export interface DashboardRow {
  /** 行标题 */
  title: string;
  /** 行描述 */
  description?: string;
  /** 布局方式 */
  layout?: 'kpi' | 'chart' | 'mixed';
  /** 该行的卡片 */
  cards?: DashboardCard[];
}

export interface DashboardProps {
  /** 仪表盘标题 */
  title: string;
  /** 副标题 */
  subtitle?: string;
  /** 数据行 */
  rows: DashboardRow[];
  /** 自定义类名 */
  className?: string;
  /** 列数：2/3/4 */
  columns?: 2 | 3 | 4;
  /** 测试用：跳过动效 */
  prefersReducedMotion?: boolean;
}

// ─── Sub-components ──────────────────────────────────────

function KpiCard({
  card,
  index,
  prefersReducedMotion,
}: {
  card: DashboardCard;
  index: number;
  prefersReducedMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  const colorMap = {
    accent: 'border-l-[var(--color-accent)]',
    success: 'border-l-[var(--color-success)]',
    warning: 'border-l-[var(--color-warning)]',
    default: 'border-l-[var(--color-border-default)]',
  };

  const changeColorMap = {
    up: 'text-[var(--color-success)]',
    down: 'text-[var(--color-warning)]',
    neutral: 'text-[var(--color-text-muted)]',
  };

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: prefersReducedMotion ? 0 : index * 0.08,
        duration: 0.4,
      }}
      className={cn(
        'rounded-xl border border-[var(--color-border-default)]',
        'bg-[var(--color-bg-secondary)] p-5',
        'border-l-4',
        colorMap[card.color || 'default'],
        'hover:border-[var(--color-accent)]/30 transition-colors duration-200'
      )}
    >
      <div className="flex items-start justify-between">
        <div className="text-sm text-[var(--color-text-muted)]">
          {card.title}
        </div>
        {card.icon && (
          <div className="text-[var(--color-text-subtle)]">{card.icon}</div>
        )}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold font-display text-[var(--color-text-primary)]">
          {card.value}
        </span>
        {card.subtitle && (
          <span className="text-sm text-[var(--color-text-subtle)]">
            {card.subtitle}
          </span>
        )}
      </div>
      {card.change && (
        <div
          className={cn(
            'mt-1 text-xs font-medium',
            changeColorMap[card.changeDirection || 'neutral']
          )}
        >
          {card.change}
        </div>
      )}
    </motion.div>
  );
}

// ─── Component ───────────────────────────────────────────

export function Dashboard({
  title,
  subtitle,
  rows,
  className,
  columns = 3,
  prefersReducedMotion = false,
}: DashboardProps) {
  const shouldReduce = useReducedMotion() || prefersReducedMotion;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  const gridCols = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section
      ref={sectionRef}
      className={cn('py-16', className)}
      aria-label={title}
    >
      {/* 标题 */}
      <motion.div
        initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h2 className="text-3xl font-bold font-display text-[var(--color-text-primary)]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-[var(--color-text-muted)]">{subtitle}</p>
        )}
      </motion.div>

      {/* 数据行 */}
      <div className="space-y-12">
        {rows.map((row, rowIdx) => (
          <div key={row.title}>
            {/* 行标题 */}
            <motion.div
              initial={shouldReduce ? {} : { opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: shouldReduce ? 0 : 0.2 + rowIdx * 0.1 }}
              className="mb-4"
            >
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                {row.title}
              </h3>
              {row.description && (
                <p className="text-sm text-[var(--color-text-muted)]">
                  {row.description}
                </p>
              )}
            </motion.div>

            {/* KPI 卡片网格 */}
            {row.cards && row.cards.length > 0 && (
              <div className={cn('grid grid-cols-1 gap-4', gridCols[columns])}>
                {row.cards.map((card, i) => (
                  <KpiCard
                    key={card.id}
                    card={card}
                    index={i}
                    prefersReducedMotion={shouldReduce}
                  />
                ))}
              </div>
            )}

            {/* Chart 占位 — 用户可以传入自定义图表 */}
            {row.layout === 'chart' && (
              <motion.div
                initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: shouldReduce ? 0 : 0.3, duration: 0.5 }}
                className={cn(
                  'rounded-xl border border-[var(--color-border-default)]',
                  'bg-[var(--color-bg-secondary)] p-6 min-h-[300px]',
                  'flex items-center justify-center'
                )}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3 opacity-30">📊</div>
                  <p className="text-sm text-[var(--color-text-subtle)]">
                    图表区域 — 可集成 Chart.js / Recharts / ECharts
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
