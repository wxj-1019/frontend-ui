'use client';

import { cn } from '@/lib/utils';
import { useRef, useEffect, useCallback, type ReactNode } from 'react';
import { animate } from 'animejs';
import { stagger } from 'animejs/utils';

export interface StaggerAnimationProps {
  /** 子元素列表 */
  children: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 子元素类名 */
  itemClassName?: string;
  /** 交错延迟（ms），默认 100 */
  staggerDelay?: number;
  /** 动画持续时间（ms），默认 600 */
  duration?: number;
  /** 动画类型 */
  animationType?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'scaleUp' | 'rotateIn';
  /** 是否自动播放 */
  autoPlay?: boolean;
  /** 缓动函数 */
  easing?: string;
}

export function StaggerAnimation({
  children,
  className,
  itemClassName,
  staggerDelay = 100,
  duration = 600,
  animationType = 'fadeIn',
  autoPlay = true,
  easing = 'easeOutElastic(1, .5)',
}: StaggerAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const getAnimationParams = useCallback(() => {
    const staggerParam = stagger(staggerDelay);

    switch (animationType) {
      case 'fadeIn':
        return {
          opacity: [0, 1],
          delay: staggerParam,
          duration,
          ease: easing,
        };
      case 'slideUp':
        return {
          opacity: [0, 1],
          translateY: [40, 0],
          delay: staggerParam,
          duration,
          ease: easing,
        };
      case 'slideLeft':
        return {
          opacity: [0, 1],
          translateX: [40, 0],
          delay: staggerParam,
          duration,
          ease: easing,
        };
      case 'scaleUp':
        return {
          opacity: [0, 1],
          scale: [0.5, 1],
          delay: staggerParam,
          duration,
          ease: easing,
        };
      case 'rotateIn':
        return {
          opacity: [0, 1],
          rotate: ['-15deg', '0deg'],
          scale: [0.8, 1],
          delay: staggerParam,
          duration,
          ease: easing,
        };
      default:
        return {
          opacity: [0, 1],
          delay: staggerParam,
          duration,
          ease: easing,
        };
    }
  }, [animationType, staggerDelay, duration, easing]);

  useEffect(() => {
    if (!autoPlay || !containerRef.current) return;

    const targets = containerRef.current.children;
    if (!targets.length) return;

    const anim = animate(targets, getAnimationParams());

    return () => {
      anim.cancel();
    };
  }, [autoPlay, getAnimationParams]);

  return (
    <div
      ref={containerRef}
      className={cn('flex flex-wrap', className)}
      role="list"
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div
              key={index}
              className={cn(
                autoPlay ? 'opacity-0' : '',
                itemClassName
              )}
              role="listitem"
            >
              {child}
            </div>
          ))
        : (
            <div
              className={cn(
                autoPlay ? 'opacity-0' : '',
                itemClassName
              )}
              role="listitem"
            >
              {children}
            </div>
          )}
    </div>
  );
}
