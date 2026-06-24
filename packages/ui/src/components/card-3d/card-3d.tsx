"use client";

import { cn } from '@/lib/utils';
import { useRef, useCallback, useState } from 'react';

export interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  /** 透视深度，默认 1000 */
  perspective?: number;
  /** 最大旋转角度，默认 15 */
  maxRotation?: number;
  /** 发光强度，默认 0.3 */
  glowIntensity?: number;
  /** 发光颜色，默认 accent */
  glowColor?: string;
}

export function Card3D({
  children,
  className,
  perspective = 1000,
  maxRotation = 15,
  glowIntensity = 0.3,
  glowColor = 'var(--color-accent)',
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('rotateX(0deg) rotateY(0deg)');
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxRotation;
      const rotateY = ((x - centerX) / centerX) * maxRotation;

      setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
      setGlowPosition({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
      });
    },
    [maxRotation]
  );

  const handleMouseLeave = useCallback(() => {
    setTransform('rotateX(0deg) rotateY(0deg)');
    setGlowPosition({ x: 50, y: 50 });
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        'relative overflow-hidden rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] transition-transform duration-200',
        className
      )}
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${glowColor}${Math.round(glowIntensity * 255).toString(16).padStart(2, '0')}, transparent 60%)`,
        }}
      />
      {/* 3D content */}
      <div
        className="relative h-full w-full transition-transform duration-200 ease-out"
        style={{ transform: transform }}
      >
        {children}
      </div>
    </div>
  );
}
