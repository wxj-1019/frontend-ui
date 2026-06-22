'use client';

import { useRef, useCallback, useEffect, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface BlobCursorProps {
  /** 被包裹的元素 */
  children: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** Blob 大小（px），默认 80 */
  size?: number;
  /** Blob 颜色，默认使用 accent 色 */
  color?: string;
  /** 不透明度，默认 0.5 */
  opacity?: number;
  /** 模糊半径（px），默认 40 */
  blur?: number;
  /** 跟随弹簧刚度，默认 0.15 */
  stiffness?: number;
  /** 是否隐藏默认光标 */
  hideCursor?: boolean;
}

interface BlobState {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  scale: number;
}

export function BlobCursor({
  children,
  className,
  size = 80,
  color = 'var(--color-accent)',
  opacity = 0.5,
  blur = 40,
  stiffness = 0.15,
  hideCursor = false,
}: BlobCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<BlobState>({
    x: -100,
    y: -100,
    targetX: -100,
    targetY: -100,
    scale: 1,
  });
  const rafRef = useRef<number>(0);
  const isInsideRef = useRef(false);
  const animateRef = useRef<() => void>(() => {});

  const animate = useCallback(() => {
    const state = stateRef.current;
    const blob = blobRef.current;

    if (!blob || !isInsideRef.current) return;

    // 弹簧跟随
    state.x += (state.targetX - state.x) * stiffness;
    state.y += (state.targetY - state.y) * stiffness;

    blob.style.transform = `translate(${state.x - size / 2}px, ${state.y - size / 2}px) scale(${state.scale})`;

    rafRef.current = requestAnimationFrame(animateRef.current);
  }, [size, stiffness]);

  useEffect(() => {
    animateRef.current = animate;
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      stateRef.current.targetX = e.clientX - rect.left;
      stateRef.current.targetY = e.clientY - rect.top;
    };

    const handleMouseEnter = (e: MouseEvent) => {
      isInsideRef.current = true;
      stateRef.current.scale = 1;
      const rect = container.getBoundingClientRect();
      stateRef.current.x = e.clientX - rect.left;
      stateRef.current.y = e.clientY - rect.top;
      rafRef.current = requestAnimationFrame(animate);
    };

    const handleMouseLeave = () => {
      isInsideRef.current = false;
      stateRef.current.scale = 0;
      const blob = blobRef.current;
      if (blob) {
        blob.style.transform = `translate(${stateRef.current.x - size / 2}px, ${stateRef.current.y - size / 2}px) scale(0)`;
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };

    const handleMouseDown = () => {
      stateRef.current.scale = 0.8;
    };

    const handleMouseUp = () => {
      stateRef.current.scale = 1;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseup', handleMouseUp);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseup', handleMouseUp);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [animate, size]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative',
        hideCursor ? 'cursor-none' : 'cursor-default',
        className
      )}
      role="presentation"
    >
      {children}
      <div
        ref={blobRef}
        className="pointer-events-none absolute left-0 top-0 will-change-transform"
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: color,
          opacity,
          filter: `blur(${blur}px)`,
          transform: 'translate(-100px, -100px) scale(0)',
        }}
        aria-hidden="true"
      />
    </div>
  );
}
