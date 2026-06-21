"use client";

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

export interface FlipCardProps {
  children?: React.ReactNode;
  className?: string;
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  /** 翻转触发方式 */
  trigger?: 'hover' | 'click';
  /** 翻转方向 */
  flipDirection?: 'horizontal' | 'vertical';
}

export function FlipCard({
  children,
  className,
  frontContent,
  backContent,
  trigger = 'hover',
  flipDirection = 'horizontal',
}: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  const handleToggle = useCallback(() => {
    if (trigger === 'click') setFlipped((p) => !p);
  }, [trigger]);

  const handleHoverStart = useCallback(() => {
    if (trigger === 'hover') setFlipped(true);
  }, [trigger]);

  const handleHoverEnd = useCallback(() => {
    if (trigger === 'hover') setFlipped(false);
  }, [trigger]);

  const rotateAxis = flipDirection === 'horizontal' ? 'rotateY' : 'rotateX';

  return (
    <motion.div
      className={cn('relative inline-block [perspective:1000px]', className)}
      onClick={handleToggle}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      style={{ perspective: 1000 }}
      role="button"
      tabIndex={0}
      aria-label={`翻转卡片，${trigger} 触发`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setFlipped((p) => !p);
        }
      }}
    >
      <motion.div
        className="relative [transform-style:preserve-3d]"
        animate={{ [rotateAxis]: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className="[backface-visibility:hidden]"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {frontContent}
          {children}
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]"
          style={{
            backfaceVisibility: 'hidden',
            transform: flipDirection === 'horizontal' ? 'rotateY(180deg)' : 'rotateX(180deg)',
          }}
        >
          {backContent}
        </div>
      </motion.div>
    </motion.div>
  );
}
