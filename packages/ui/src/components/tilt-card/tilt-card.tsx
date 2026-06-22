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
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
          mass: 0.5,
          duration: speed,
        }}
      >
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
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
