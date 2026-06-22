'use client';

import { useRef, useCallback, useEffect, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface CrosshairCursorProps {
  /** 被包裹的元素 */
  children: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 十字线大小（px），默认 40 */
  size?: number;
  /** 线条颜色 */
  color?: string;
  /** 线条宽度（px），默认 1.5 */
  strokeWidth?: number;
  /** 是否显示中心点 */
  showCenter?: boolean;
  /** 中心点大小（px），默认 4 */
  centerSize?: number;
  /** 是否显示坐标 */
  showCoordinates?: boolean;
}

interface Position {
  x: number;
  y: number;
}

export function CrosshairCursor({
  children,
  className,
  size = 40,
  color = 'var(--color-accent)',
  strokeWidth = 1.5,
  showCenter = true,
  centerSize = 4,
  showCoordinates = false,
}: CrosshairCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const crosshairRef = useRef<HTMLDivElement>(null);
  const coordsRef = useRef<HTMLDivElement>(null);
  const posRef = useRef<Position>({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);
  const isInsideRef = useRef(false);
  const animateRef = useRef<() => void>(() => {});

  const animate = useCallback(() => {
    const crosshair = crosshairRef.current;
    const coords = coordsRef.current;

    if (!crosshair || !isInsideRef.current) return;

    const { x, y } = posRef.current;
    crosshair.style.transform = `translate(${x}px, ${y}px)`;

    if (coords && showCoordinates) {
      coords.textContent = `${Math.round(x)}, ${Math.round(y)}`;
      coords.style.transform = `translate(${x + 15}px, ${y + 15}px)`;
    }

    rafRef.current = requestAnimationFrame(animateRef.current);
  }, [showCoordinates]);

  useEffect(() => {
    animateRef.current = animate;
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      posRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseEnter = (e: MouseEvent) => {
      isInsideRef.current = true;
      const crosshair = crosshairRef.current;
      const coords = coordsRef.current;

      if (crosshair) {
        crosshair.style.opacity = '1';
      }
      if (coords && showCoordinates) {
        coords.style.opacity = '1';
      }

      const rect = container.getBoundingClientRect();
      posRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      rafRef.current = requestAnimationFrame(animate);
    };

    const handleMouseLeave = () => {
      isInsideRef.current = false;
      const crosshair = crosshairRef.current;
      const coords = coordsRef.current;

      if (crosshair) {
        crosshair.style.opacity = '0';
      }
      if (coords && showCoordinates) {
        coords.style.opacity = '0';
      }

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [animate, showCoordinates]);

  return (
    <div
      ref={containerRef}
      className={cn('relative cursor-none', className)}
      role="presentation"
    >
      {children}

      {/* Crosshair */}
      <div
        ref={crosshairRef}
        className="pointer-events-none absolute left-0 top-0 opacity-0 will-change-transform"
        style={{
          marginLeft: -size / 2,
          marginTop: -size / 2,
        }}
        aria-hidden="true"
      >
        {/* Horizontal line */}
        <div
          className="absolute"
          style={{
            left: 0,
            top: size / 2 - strokeWidth / 2,
            width: size,
            height: strokeWidth,
            backgroundColor: color,
          }}
        />

        {/* Vertical line */}
        <div
          className="absolute"
          style={{
            left: size / 2 - strokeWidth / 2,
            top: 0,
            width: strokeWidth,
            height: size,
            backgroundColor: color,
          }}
        />

        {/* Center dot */}
        {showCenter && (
          <div
            className="absolute rounded-full"
            style={{
              left: size / 2 - centerSize / 2,
              top: size / 2 - centerSize / 2,
              width: centerSize,
              height: centerSize,
              backgroundColor: color,
            }}
          />
        )}
      </div>

      {/* Coordinates */}
      {showCoordinates && (
        <div
          ref={coordsRef}
          className="pointer-events-none absolute left-0 top-0 font-mono text-xs opacity-0 will-change-transform"
          style={{ color }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
