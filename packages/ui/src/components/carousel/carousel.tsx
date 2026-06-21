"use client";

import { Children, useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

export interface CarouselProps {
  children: React.ReactNode[];
  className?: string;
  autoPlay?: boolean;
  interval?: number;
  loop?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
}

export function Carousel({
  children,
  className,
  autoPlay = false,
  interval = 3000,
  loop = true,
  showArrows = true,
  showDots = true,
}: CarouselProps) {
  const items = Children.toArray(children);
  const count = items.length;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = useCallback(
    (dir: number) => {
      setDirection(dir);
      setIndex((prev) => {
        let next = prev + dir;
        if (next < 0) next = loop ? count - 1 : 0;
        if (next >= count) next = loop ? 0 : count - 1;
        return next;
      });
    },
    [count, loop]
  );

  const goTo = useCallback(
    (i: number) => {
      setDirection(i > index ? 1 : -1);
      setIndex(i);
    },
    [index]
  );

  useEffect(() => {
    if (!autoPlay || count <= 1) return;
    const timer = setInterval(() => paginate(1), interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, paginate, count]);

  if (count === 0) return null;

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]',
        className
      )}
    >
      <div className="relative h-full w-full">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={index}
            className="absolute inset-0 flex items-center justify-center"
            custom={direction}
            initial={{ x: direction > 0 ? '100%' : '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? '-100%' : '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_e, info) => {
              if (info.offset.x < -50) paginate(1);
              else if (info.offset.x > 50) paginate(-1);
            }}
          >
            {items[index]}
          </motion.div>
        </AnimatePresence>
      </div>

      {showArrows && count > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => paginate(-1)}
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-border-default)] bg-[var(--color-bg-elevated)]/80 text-[var(--color-text-primary)] backdrop-blur transition-colors hover:bg-[var(--color-hover)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => paginate(1)}
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-border-default)] bg-[var(--color-bg-elevated)]/80 text-[var(--color-text-primary)] backdrop-blur transition-colors hover:bg-[var(--color-hover)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}

      {showDots && count > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={cn(
                'h-2 w-2 rounded-full transition-colors',
                i === index
                  ? 'bg-[var(--color-accent)]'
                  : 'bg-[var(--color-border-default)] hover:bg-[var(--color-border-strong)]'
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
