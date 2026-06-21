"use client";

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  cursorClassName?: string;
  onComplete?: () => void;
  loop?: boolean;
}

export function Typewriter({
  text,
  className,
  speed = 50,
  delay = 0,
  cursor = true,
  cursorClassName,
  onComplete,
  loop = false,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const indexRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const startTimeout = setTimeout(() => {
      setIsTyping(true);
      indexRef.current = 0;
      setDisplayText('');
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [delay, text]);

  useEffect(() => {
    if (!isTyping) return;

    const typeNextChar = () => {
      if (indexRef.current < text.length) {
        setDisplayText(text.slice(0, indexRef.current + 1));
        indexRef.current += 1;
        timeoutRef.current = setTimeout(typeNextChar, speed);
      } else {
        setIsTyping(false);
        onComplete?.();
        if (loop) {
          timeoutRef.current = setTimeout(() => {
            indexRef.current = 0;
            setDisplayText('');
            setIsTyping(true);
          }, 2000);
        }
      }
    };

    typeNextChar();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isTyping, text, speed, onComplete, loop]);

  // 光标闪烁
  useEffect(() => {
    if (!cursor || isTyping) return;

    const blinkInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(blinkInterval);
  }, [cursor, isTyping]);

  return (
    <span className={cn('inline', className)}>
      {displayText}
      {cursor && (
        <span
          className={cn(
            'inline-block w-[2px] ml-[2px] bg-current',
            showCursor ? 'opacity-100' : 'opacity-0',
            'transition-opacity duration-100',
            cursorClassName
          )}
          aria-hidden="true"
        />
      )}
    </span>
  );
}
