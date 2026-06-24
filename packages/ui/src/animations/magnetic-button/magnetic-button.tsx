"use client";

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { useRef, useState, useCallback } from 'react';

export interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  /** 磁吸强度，默认 0.5 */
  strength?: number;
  /** 点击效果缩放，默认 0.95 */
  activeScale?: number;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  className,
  strength = 0.5,
  activeScale = 0.95,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = (e.clientX - centerX) * strength * 0.3;
      const distY = (e.clientY - centerY) * strength * 0.3;
      setPosition({ x: distX, y: distY });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return (
    <motion.button
      ref={ref}
      className={cn(
        'relative inline-flex items-center justify-center overflow-hidden rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] px-6 py-3 text-sm font-semibold text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-hover)] cursor-pointer',
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{
        x: position.x,
        y: position.y,
      }}
      whileTap={{ scale: activeScale }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
      type="button"
    >
      {children}
    </motion.button>
  );
}
