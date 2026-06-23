"use client";

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'motion/react';

export function ThemeTransition() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [circle, setCircle] = useState({ x: 0, y: 0, r: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    if (!buttonRef.current || isAnimating) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const r = Math.max(x, y, window.innerWidth - x, window.innerHeight - y);

    setCircle({ x, y, r });
    setIsAnimating(true);

    // 延迟切换主题，让动画先开始
    setTimeout(() => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }, 100);

    // 动画结束后清理
    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };

  if (!mounted) return null;

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="relative z-50 rounded-lg p-2 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-hover)] hover:text-[var(--color-text-primary)]"
        aria-label="切换主题"
      >
        {theme === 'dark' ? (
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </button>

      {/* Circular Mask Transition */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            className="fixed inset-0 z-40 pointer-events-none"
            style={{
              backgroundColor: theme === 'dark' ? '#FAFAFA' : '#0A0A0F',
              clipPath: `circle(0px at ${circle.x}px ${circle.y}px)`,
            }}
            initial={{ clipPath: `circle(0px at ${circle.x}px ${circle.y}px)` }}
            animate={{
              clipPath: `circle(${circle.r}px at ${circle.x}px ${circle.y}px)`,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
