'use client';

import { useState, useCallback, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

export interface BounceCardsProps {
  /** 卡片列表 */
  cards: Array<{
    id: string;
    content: ReactNode;
    image?: string;
  }>;
  /** 自定义类名 */
  className?: string;
  /** 弹跳强度，默认 1 */
  intensity?: number;
  /** 动画持续时间（秒），默认 0.6 */
  duration?: number;
  /** 卡片间距（px），默认 16 */
  gap?: number;
  /** 最大堆叠数量，默认 5 */
  maxStack?: number;
  /** 是否循环 */
  loop?: boolean;
}

export function BounceCards({
  cards,
  className,
  intensity = 1,
  duration = 0.6,
  gap = 16,
  maxStack = 5,
  loop = false,
}: BounceCardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const visibleCards = cards.slice(currentIndex, currentIndex + maxStack);

  const handleSwipe = useCallback(
    (dir: 'left' | 'right') => {
      setDirection(dir);
      if (dir === 'right') {
        setCurrentIndex((prev) => {
          const next = prev + 1;
          if (next >= cards.length) {
            return loop ? 0 : prev;
          }
          return next;
        });
      } else {
        setCurrentIndex((prev) => {
          const next = prev - 1;
          if (next < 0) {
            return loop ? cards.length - 1 : 0;
          }
          return next;
        });
      }
    },
    [cards.length, loop]
  );

  return (
    <div className={cn('relative flex items-center justify-center', className)}>
      <div
        className="relative h-64 w-64"
        role="region"
        aria-label="弹跳卡片"
        aria-roledescription="carousel"
      >
        {visibleCards.map((card, index) => {
          const isFirst = index === 0;
          const isLast = index === visibleCards.length - 1;

          return (
            <motion.div
              key={card.id}
              className={cn(
                'absolute inset-0 cursor-grab rounded-xl bg-gray-800 shadow-xl',
                isFirst && 'z-50'
              )}
              initial={{
                x: direction === 'right' ? 300 : -300,
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                x: index * gap,
                y: index * gap * 0.5,
                opacity: 1 - index * 0.15,
                scale: 1 - index * 0.05,
                zIndex: maxStack - index,
                rotateZ: index * (isLast ? -5 : 2),
              }}
              exit={{
                x: direction === 'right' ? -300 : 300,
                opacity: 0,
                scale: 0.8,
              }}
              transition={{
                type: 'spring',
                stiffness: 300 * intensity,
                damping: 25,
                duration,
              }}
              drag={isFirst ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(_, info) => {
                if (isFirst) {
                  const threshold = 50;
                  if (info.offset.x > threshold) {
                    handleSwipe('right');
                  } else if (info.offset.x < -threshold) {
                    handleSwipe('left');
                  }
                }
              }}
              style={{
                boxShadow: `0 ${10 + index * 5}px ${20 + index * 10}px rgba(0,0,0,${0.2 + index * 0.1})`,
              }}
              aria-hidden={!isFirst}
            >
              {card.image && (
                <img
                  src={card.image}
                  alt=""
                  className="h-full w-full rounded-xl object-cover"
                  draggable={false}
                />
              )}
              {card.content && (
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  {card.content}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleSwipe('left')}
          disabled={!loop && currentIndex === 0}
          className="rounded-full bg-gray-700 p-2 text-white transition-colors hover:bg-gray-600 disabled:opacity-50"
          aria-label="Previous card"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => handleSwipe('right')}
          disabled={!loop && currentIndex >= cards.length - maxStack}
          className="rounded-full bg-gray-700 p-2 text-white transition-colors hover:bg-gray-600 disabled:opacity-50"
          aria-label="Next card"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
