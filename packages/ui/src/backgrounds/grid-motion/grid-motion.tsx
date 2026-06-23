"use client";

import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'motion/react';

export interface GridMotionProps {
  className?: string;
  /** 网格列数，默认 5 */
  columns?: number;
  /** 网格行数，默认 4 */
  rows?: number;
  /** 方块尺寸，默认 40 */
  size?: number;
  /** 动画速度，默认 2 */
  speed?: number;
  /** 方块颜色，默认 accent */
  color?: string;
  /** 方块圆角，默认 4 */
  radius?: number;
  /** 透明度范围 [min, max]，默认 [0.1, 0.6] */
  opacityRange?: [number, number];
}

export function GridMotion({
  className,
  columns = 5,
  rows = 4,
  size = 40,
  speed = 2,
  color = 'var(--color-accent)',
  radius = 4,
  opacityRange = [0.1, 0.6],
}: GridMotionProps) {
  const shouldReduce = useReducedMotion();

  const total = columns * rows;
  const items = Array.from({ length: total }, (_, i) => i);

  return (
    <div
      className={cn('flex flex-wrap', className)}
      style={{
        width: columns * (size + 4),
        gap: 4,
      }}
      aria-hidden="true"
    >
      {items.map((index) => {
        const delay = (index % columns) * 0.1 + Math.floor(index / columns) * 0.15;
        const duration = speed + Math.random() * 1;
        const [minOpacity, maxOpacity] = opacityRange;

        return (
          <motion.div
            key={index}
            className="flex-shrink-0"
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              backgroundColor: color,
              willChange: 'opacity',
            }}
            initial={{ opacity: minOpacity }}
            animate={shouldReduce ? { opacity: minOpacity } : {
              opacity: [minOpacity, maxOpacity, minOpacity],
            }}
            transition={{
              duration,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
              delay: shouldReduce ? 0 : delay,
            }}
          />
        );
      })}
    </div>
  );
}
