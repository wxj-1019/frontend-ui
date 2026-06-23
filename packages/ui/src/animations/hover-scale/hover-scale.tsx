"use client";

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

export interface HoverScaleProps {
  children: React.ReactNode;
  className?: string;
  /** 悬停缩放比例，默认 1.05 */
  scale?: number;
  /** 动画持续时间（秒），默认 0.2 */
  duration?: number;
  /** 是否启用阴影效果，默认 true */
  shadow?: boolean;
}

export function HoverScale({
  children,
  className,
  scale = 1.05,
  duration = 0.2,
  shadow = true,
}: HoverScaleProps) {
  return (
    <motion.div
      className={cn('inline-block', className)}
      whileHover={{
        scale,
        boxShadow: shadow
          ? '0 8px 30px rgba(0, 0, 0, 0.3)'
          : undefined,
      }}
      transition={{
        duration,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        willChange: 'transform',
      }}
    >
      {children}
    </motion.div>
  );
}
