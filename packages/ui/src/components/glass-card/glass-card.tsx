"use client";

import { cn } from '@/lib/utils';
import { useRef, useCallback, useState } from 'react';

export interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  /** 卡片圆角 */
  borderRadius?: number;
  /** 边框发光颜色 */
  glowColor?: string;
  /** 发光强度 (0-1) */
  glowIntensity?: number;
  /** 毛玻璃模糊程度 */
  blur?: number;
  /** 背景透明度 */
  backgroundOpacity?: number;
  /** 是否启用3D倾斜 */
  tilt?: boolean;
  /** 最大倾斜角度 */
  tiltDegree?: number;
}

export function GlassCard({
  children,
  className,
  borderRadius = 16,
  glowColor = 'var(--color-accent)',
  glowIntensity = 0.3,
  blur = 20,
  backgroundOpacity = 0.15,
  tilt = true,
  tiltDegree = 10,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('rotateX(0deg) rotateY(0deg)');
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!tilt || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -tiltDegree;
      const rotateY = ((x - centerX) / centerX) * tiltDegree;

      setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
      setGlowPosition({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
      });
    },
    [tilt, tiltDegree]
  );

  const handleMouseLeave = useCallback(() => {
    setTransform('rotateX(0deg) rotateY(0deg)');
    setGlowPosition({ x: 50, y: 50 });
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn('relative overflow-hidden', className)}
      style={{
        borderRadius: `${borderRadius}px`,
        transform: transform,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.2s ease-out',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 玻璃背景层 */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius: `${borderRadius}px`,
          background: `rgba(255, 255, 255, ${backgroundOpacity})`,
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
          border: `1px solid rgba(255, 255, 255, 0.1)`,
        }}
      />

      {/* 发光边框效果 */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          borderRadius: `${borderRadius}px`,
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${glowColor}${Math.round(glowIntensity * 255).toString(16).padStart(2, '0')}, transparent 60%)`,
          mixBlendMode: 'overlay',
        }}
      />

      {/* 内容层 */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
