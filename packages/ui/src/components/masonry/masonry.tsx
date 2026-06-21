"use client";

import { Children, useId, useMemo } from 'react';
import { cn } from '@/lib/utils';

export interface MasonryProps {
  children: React.ReactNode;
  className?: string;
  columns?: number;
  gap?: number;
  breakpointCols?: { [minWidth: number]: number };
}

export function Masonry({
  children,
  className,
  columns = 3,
  gap = 16,
  breakpointCols,
}: MasonryProps) {
  const reactId = useId().replace(/[:]/g, '');
  const uniqueClass = `masonry-${reactId}`;
  const items = Children.toArray(children);

  const baseStyle: React.CSSProperties = {
    columnCount: columns,
    columnGap: `${gap}px`,
  };

  const responsiveCss = useMemo(() => {
    if (!breakpointCols) return '';
    const entries = Object.entries(breakpointCols).sort(
      (a, b) => Number(a[0]) - Number(b[0])
    );
    return entries
      .map(
        ([minWidth, cols]) =>
          `@media (min-width: ${minWidth}px) { .${uniqueClass} { column-count: ${cols}; } }`
      )
      .join('\n');
  }, [breakpointCols, uniqueClass]);

  return (
    <>
      {responsiveCss && (
        <style dangerouslySetInnerHTML={{ __html: responsiveCss }} />
      )}
      <div className={cn(uniqueClass, className)} style={baseStyle}>
        {items.map((item, i) => (
          <div
            key={i}
            style={{ breakInside: 'avoid', marginBottom: `${gap}px` }}
          >
            {item}
          </div>
        ))}
      </div>
    </>
  );
}
