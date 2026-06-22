"use client";

import { cn } from '@/lib/utils';
import { useState, useEffect, useCallback, useRef } from 'react';

export interface DecryptedTextProps {
  /** 目标文本 */
  text: string;
  /** 类名 */
  className?: string;
  /** 动画持续时间 (ms) */
  duration?: number;
  /** 解密速度 (ms) */
  speed?: number;
  /** 解密字符集 */
  characters?: string;
  /** 是否自动播放 */
  autoPlay?: boolean;
  /** 动画完成回调 */
  onComplete?: () => void;
}

const DEFAULT_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

export function DecryptedText({
  text,
  className,
  duration = 1500,
  speed = 30,
  characters = DEFAULT_CHARACTERS,
  autoPlay = true,
  onComplete,
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(autoPlay ? '' : text);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimeRef = useRef<number>(0);

  const getRandomChar = useCallback(() => {
    return characters[Math.floor(Math.random() * characters.length)];
  }, [characters]);

  const animate = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    startTimeRef.current = Date.now();
    setDisplayText('');

    const step = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const revealCount = Math.floor(progress * text.length);

      let result = '';
      for (let i = 0; i < text.length; i++) {
        if (i < revealCount) {
          result += text[i];
        } else {
          result += getRandomChar();
        }
      }

      setDisplayText(result);

      if (progress < 1) {
        animationRef.current = setTimeout(step, speed);
      } else {
        setIsAnimating(false);
        onComplete?.();
      }
    };

    step();
  }, [text, duration, speed, getRandomChar, isAnimating, onComplete]);

  const hasAutoPlayedRef = useRef(false);

  useEffect(() => {
    if (autoPlay && !hasAutoPlayedRef.current) {
      hasAutoPlayedRef.current = true;
      const timer = setTimeout(() => animate(), 0);
      return () => clearTimeout(timer);
    }

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [autoPlay, animate]);

  return (
    <span
      className={cn(
        'inline-block font-mono tabular-nums',
        className
      )}
      role="text"
      aria-label={text}
    >
      {displayText || text}
    </span>
  );
}
