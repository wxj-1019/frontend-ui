"use client";

import { cn } from '@/lib/utils';

export interface ShinyTextProps {
  text: string;
  className?: string;
  /** 扫光速度（秒），默认 3 */
  speed?: number;
  /** 扫光颜色，默认白色 */
  shineColor?: string;
  as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'p';
}

export function ShinyText({
  text,
  className,
  speed = 3,
  shineColor = 'rgba(255, 255, 255, 0.8)',
  as: Tag = 'span',
}: ShinyTextProps) {
  return (
    <Tag
      className={cn(
        'inline-block relative overflow-hidden',
        className
      )}
      style={{
        background: 'linear-gradient(90deg, var(--color-text-primary) 0%, var(--color-text-primary) 40%, var(--color-text-primary) 60%, var(--color-text-primary) 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
      aria-label={text}
    >
      <span className="relative z-10">{text}</span>
      <span
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${shineColor} 50%, transparent 100%)`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: `shine-sweep ${speed}s linear infinite`,
        }}
        aria-hidden="true"
      >
        {text}
      </span>
    </Tag>
  );
}
