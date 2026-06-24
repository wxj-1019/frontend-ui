'use client';

import { useRef, useCallback, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface MagneticGridProps {
  children: ReactNode;
  className?: string;
  /** Magnetic pull strength (0-1) */
  strength?: number;
  /** Grid columns */
  columns?: 2 | 3 | 4;
  /** Gap between items */
  gap?: number;
}

export interface MagneticItemProps {
  children: ReactNode;
  className?: string;
  /** Individual strength override */
  strength?: number;
}

export function MagneticGrid({
  children,
  className,
  strength = 0.3,
  columns = 3,
  gap = 4,
}: MagneticGridProps) {
  const colClass = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  } as const;

  return (
    <div
      className={cn('grid', colClass[columns], className)}
      style={{ gap: `${gap * 4}px` }}
      data-magnetic-strength={strength}
    >
      {children}
    </div>
  );
}

export function MagneticItem({
  children,
  className,
  strength,
}: MagneticItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = itemRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      el.style.transform = `translate(${x * (strength ?? 0.3)}px, ${y * (strength ?? 0.3)}px)`;
    },
    [strength],
  );

  const handleMouseLeave = useCallback(() => {
    const el = itemRef.current;
    if (!el) return;
    el.style.transform = 'translate(0, 0)';
  }, []);

  return (
    <div
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn('transition-transform duration-200 ease-out', className)}
    >
      {children}
    </div>
  );
}
