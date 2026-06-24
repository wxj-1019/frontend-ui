"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { cn } from '@/lib/utils';

export interface ScrollParallaxProps {
  children: React.ReactNode;
  className?: string;
  /** 视差速度倍数，负数为反向 */
  speed?: number;
  /** 缩放范围 */
  scale?: [number, number];
  /** 旋转范围 */
  rotate?: [number, number];
  /** 透明度范围 */
  opacity?: [number, number];
  /** 是否启用模糊 */
  blur?: boolean;
}

export function ScrollParallax({
  children,
  className,
  speed = 0.5,
  scale,
  rotate,
  opacity,
  blur = false,
}: ScrollParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const currentScale = scale
    ? useTransform(scrollYProgress, [0, 0.5, 1], [scale[0], 1, scale[1]])
    : undefined;
  const currentRotate = rotate
    ? useTransform(scrollYProgress, [0, 1], [rotate[0], rotate[1]])
    : undefined;
  const currentOpacity = opacity
    ? useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [opacity[0], 1, 1, opacity[1]])
    : undefined;
  const currentBlur = blur
    ? useTransform(scrollYProgress, [0, 0.5, 1], ['8px', '0px', '8px'])
    : undefined;

  return (
    <div ref={ref} className={cn('relative', className)}>
      <motion.div
        style={{
          y,
          scale: currentScale,
          rotate: currentRotate,
          opacity: currentOpacity,
          filter: currentBlur ? useTransform(currentBlur, (v) => `blur(${v})`) : undefined,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
