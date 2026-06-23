"use client";

import { cn } from '@/lib/utils';

export interface NeonTextProps {
  text: string;
  className?: string;
  color?: string;
  flicker?: boolean;
  as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'p';
}

export function NeonText({
  text,
  className,
  color = 'var(--color-accent)',
  flicker = true,
  as: Tag = 'span',
}: NeonTextProps) {
  return (
    <Tag
      className={cn(
        'inline-block font-bold',
        flicker && 'animate-neon-flicker',
        className
      )}
      style={{
        color: '#fff',
        textShadow: `
          0 0 7px ${color},
          0 0 10px ${color},
          0 0 21px ${color},
          0 0 42px ${color},
          0 0 82px ${color},
          0 0 92px ${color},
          0 0 102px ${color},
          0 0 151px ${color}
        `,
      }}
      aria-label={text}
    >
      {text}
    </Tag>
  );
}
