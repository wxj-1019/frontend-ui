'use client';

import { useRef, useCallback, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

export interface GlowCardProps {
  /** 卡片内容 */
  children: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 发光颜色 */
  glowColor?: string;
  /** 发光强度，默认 1 */
  intensity?: number;
  /** 边框颜色 */
  borderColor?: string;
  /** 是否启用 3D 倾斜 */
  enableTilt?: boolean;
  /** 倾斜角度范围（度），默认 10 */
  tiltRange?: number;
  /** 是否显示光晕动画 */
  showGlow?: boolean;
  /** 光晕大小（px），默认 200 */
  glowSize?: number;
  /** 背景颜色 */
  backgroundColor?: string;
}

export function GlowCard({
  children,
  className,
  glowColor = 'var(--color-accent)',
  intensity = 1,
  borderColor,
  enableTilt = true,
  tiltRange = 10,
  showGlow = true,
  glowSize = 200,
  backgroundColor = 'rgba(17, 24, 39, 0.8)',
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      setMousePos({ x, y });

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -tiltRange;
        const rotateY = ((x - centerX) / centerX) * tiltRange;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    },
    [enableTilt, tiltRange]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    const card = cardRef.current;
    if (card) {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        'relative overflow-hidden rounded-xl p-6',
        'transition-shadow duration-300',
        className
      )}
      style={{
        backgroundColor,
        border: borderColor ? `1px solid ${borderColor}` : '1px solid rgba(255, 255, 255, 0.1)',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Glow effect */}
      {showGlow && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? intensity : 0,
            background: `radial-gradient(${glowSize}px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 60%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Border glow */}
      {borderColor && (
        <div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? intensity * 0.5 : 0,
            boxShadow: `inset 0 0 20px ${borderColor}, 0 0 20px ${borderColor}`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
