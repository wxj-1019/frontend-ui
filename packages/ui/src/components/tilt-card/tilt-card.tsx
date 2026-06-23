'use client';

import { useRef, useState, useCallback, type ReactNode, type Ref } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltDegree?: number;
  perspective?: number;
  scale?: number;
  glare?: boolean;
  glareOpacity?: number;
  speed?: number;
  ref?: Ref<HTMLDivElement>;
  /** 3D 深度层次，每层 translateZ 的距离 */
  depthLayers?: number;
  /** 是否启用浮动效果 */
  floating?: boolean;
  /** 边框发光强度 */
  borderGlow?: boolean;
  /** 内部阴影层 */
  innerShadow?: boolean;
}

export function TiltCard({
  children,
  className,
  tiltDegree = 10,
  perspective = 1000,
  scale = 1.02,
  glare = true,
  glareOpacity = 0.25,
  speed = 0.4,
  ref,
  depthLayers = 3,
  floating = false,
  borderGlow = false,
  innerShadow = false,
}: TiltCardProps) {
  const internalRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = internalRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);
      setTilt({ rotateX: -deltaY * tiltDegree, rotateY: deltaX * tiltDegree });
      const glareX = ((e.clientX - rect.left) / rect.width) * 100;
      const glareY = ((e.clientY - rect.top) / rect.height) * 100;
      setGlarePos({ x: glareX, y: glareY });
    },
    [tiltDegree]
  );

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  return (
    <div
      ref={(node) => {
        internalRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      className={cn('relative inline-block', className)}
      style={{ perspective }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative overflow-hidden rounded-xl"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          scale: isHovered ? scale : 1,
          y: floating ? [0, -6, 0] : 0,
        }}
        transition={{
          rotateX: { type: 'spring', stiffness: 300, damping: 20, mass: 0.5, duration: speed },
          rotateY: { type: 'spring', stiffness: 300, damping: 20, mass: 0.5, duration: speed },
          scale: { type: 'spring', stiffness: 300, damping: 20, mass: 0.5, duration: speed },
          y: floating ? { duration: 4, repeat: Infinity, ease: 'easeInOut' } : { duration: speed },
        }}
      >
        {/* 3D Depth Layers */}
        {Array.from({ length: depthLayers }).map((_, i) => (
          <div
            key={i}
            className="pointer-events-none absolute inset-0 rounded-xl"
            aria-hidden="true"
            style={{
              transform: `translateZ(${(i + 1) * 20}px)`,
              border: i === depthLayers - 1 && borderGlow
                ? '1px solid rgba(255, 255, 255, 0.15)'
                : undefined,
              boxShadow: i === 0 && innerShadow
                ? 'inset 0 0 40px rgba(0, 0, 0, 0.2)'
                : undefined,
              opacity: isHovered ? 0.5 - i * 0.1 : 0,
              transition: `opacity ${speed}s ease`,
            }}
          />
        ))}

        {children}

        {glare && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-xl"
            aria-hidden="true"
            animate={{ opacity: isHovered ? glareOpacity : 0 }}
            transition={{ duration: speed }}
            style={{
              background: isHovered
                ? `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 60%)`
                : undefined,
              transform: 'translateZ(40px)',
            }}
          />
        )}

        {/* Border glow on hover */}
        {borderGlow && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-xl"
            aria-hidden="true"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: speed }}
            style={{
              boxShadow: `0 0 30px rgba(255, 255, 255, 0.1), inset 0 0 30px rgba(255, 255, 255, 0.05)`,
              transform: 'translateZ(60px)',
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
