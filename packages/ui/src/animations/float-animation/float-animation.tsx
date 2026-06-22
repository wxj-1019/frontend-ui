'use client';

import { cn } from '@/lib/utils';
import { useSpring, animated, to } from '@react-spring/web';
import { useState, type ReactNode } from 'react';

export interface FloatAnimationProps {
  /** 被包裹的元素 */
  children: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 浮动幅度（px），默认 10 */
  amplitude?: number;
  /** 浮动周期（秒），默认 3 */
  duration?: number;
  /** 是否自动播放 */
  autoPlay?: boolean;
  /** 浮动方向 */
  direction?: 'vertical' | 'horizontal' | 'both';
  /** 是否暂停（鼠标悬停时） */
  pauseOnHover?: boolean;
}

export function FloatAnimation({
  children,
  className,
  amplitude = 10,
  duration = 3,
  autoPlay = true,
  direction = 'vertical',
  pauseOnHover = false,
}: FloatAnimationProps) {
  const [isPaused, setIsPaused] = useState(false);

  const fromY = direction !== 'horizontal' ? -amplitude : 0;
  const fromX = direction !== 'vertical' ? -amplitude : 0;
  const toY = direction !== 'horizontal' ? amplitude : 0;
  const toX = direction !== 'vertical' ? amplitude : 0;

  const springs = useSpring({
    from: { x: fromX, y: fromY },
    to: autoPlay
      ? [
          { x: toX, y: toY },
          { x: fromX, y: fromY },
        ]
      : { x: 0, y: 0 },
    loop: autoPlay && !isPaused,
    config: { duration: duration * 1000 },
    pause: isPaused,
  });

  return (
    <animated.div
      className={cn('inline-block', className)}
      style={{
        transform: to(
          [springs.x, springs.y],
          (x, y) => `translate(${x}px, ${y}px)`
        ),
      }}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {children}
    </animated.div>
  );
}
