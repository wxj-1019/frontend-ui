"use client";

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { useRef } from 'react';

export interface AuroraProps {
  className?: string;
  colors?: string[];
  speed?: number;
  intensity?: number;
}

export function Aurora({
  className,
  colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4'],
  speed = 1,
  intensity = 0.5,
}: AuroraProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={cn('absolute inset-0 overflow-hidden', className)}
      aria-hidden="true"
    >
      <div className="absolute inset-0">
        {colors.map((color, i) => {
          const delay = i * (3 / colors.length);
          const duration = 12 + i * 2;
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
                filter: `blur(80px)`,
                width: '60%',
                height: '60%',
                opacity: intensity,
                willChange: 'transform',
              }}
              initial={{
                x: `${20 + i * 15}%`,
                y: `${20 + (i % 2) * 30}%`,
                scale: 0.8,
              }}
              animate={{
                x: [
                  `${20 + i * 15}%`,
                  `${60 + i * 10}%`,
                  `${10 + i * 20}%`,
                  `${20 + i * 15}%`,
                ],
                y: [
                  `${20 + (i % 2) * 30}%`,
                  `${50 - (i % 2) * 20}%`,
                  `${40 + (i % 2) * 10}%`,
                  `${20 + (i % 2) * 30}%`,
                ],
                scale: [0.8, 1.2, 1, 0.8],
              }}
              transition={{
                duration: duration / speed,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: delay / speed,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
