'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { cn } from '../../lib/utils';

// ─── Types ───────────────────────────────────────────────

export interface FullscreenNavLink {
  /** 链接标签 */
  label: string;
  /** 跳转目标 */
  href?: string;
  /** 点击回调 */
  onClick?: () => void;
  /** 子链接（支持二级菜单） */
  children?: FullscreenNavLink[];
  /** 图标（可选） */
  icon?: React.ReactNode;
}

export interface FullscreenNavProps {
  /** 导航链接列表 */
  links: FullscreenNavLink[];
  /** 开关按钮标签 */
  triggerLabel?: string;
  /** 自定义类名 */
  className?: string;
  /** 动画变体：fade（淡入）/ slide（滑入）/ scale（缩放） */
  variant?: 'fade' | 'slide' | 'scale';
  /** 背景色 */
  backgroundColor?: string;
  /** 关闭时回调 */
  onClose?: () => void;
  /** 测试用：跳过动效 */
  prefersReducedMotion?: boolean;
}

// ─── Animation Variants ──────────────────────────────────

const variants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    initial: { opacity: 0, clipPath: 'circle(0% at 100% 0%)' },
    animate: { opacity: 1, clipPath: 'circle(150% at 100% 0%)' },
    exit: { opacity: 0, clipPath: 'circle(0% at 100% 0%)' },
  },
  scale: {
    initial: { opacity: 0, scale: 0.95, transformOrigin: 'top right' },
    animate: { opacity: 1, scale: 1, transformOrigin: 'top right' },
    exit: { opacity: 0, scale: 0.95, transformOrigin: 'top right' },
  },
};

// ─── Item Animation ──────────────────────────────────────

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.05,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

// ─── Component ───────────────────────────────────────────

export function FullscreenNav({
  links,
  triggerLabel = 'Menu',
  className,
  variant = 'slide',
  backgroundColor,
  onClose,
  prefersReducedMotion = false,
}: FullscreenNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const systemReduce = useReducedMotion();
  const shouldReduce = prefersReducedMotion || systemReduce;
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    onClose?.();
    // 焦点回到触发按钮
    setTimeout(() => triggerRef.current?.focus(), 100);
  }, [onClose]);

  // ESC 关闭
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      // Focus trap
      if (e.key === 'Tab' && menuRef.current) {
        const focusable = menuRef.current.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, close]);

  // 禁止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const animVariant = shouldReduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : variants[variant];

  return (
    <div className={cn('relative', className)}>
      {/* 触发按钮 */}
      <button
        ref={triggerRef}
        onClick={toggle}
        className="relative z-50 flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium
          text-[var(--color-text-primary)] bg-[var(--color-bg-surface)]
          border border-[var(--color-border-default)]
          hover:border-[var(--color-accent)]/50
          transition-colors duration-200
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
        aria-expanded={isOpen}
        aria-controls="fullscreen-nav-menu"
        aria-label={isOpen ? '关闭导航菜单' : '打开导航菜单'}
      >
        <span className="flex flex-col gap-[3px]">
          <motion.span
            animate={isOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            className="block h-[1.5px] w-4 bg-current rounded-full"
          />
          <motion.span
            animate={isOpen ? { opacity: 0, x: -4 } : { opacity: 1, x: 0 }}
            className="block h-[1.5px] w-4 bg-current rounded-full"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            className="block h-[1.5px] w-4 bg-current rounded-full"
          />
        </span>
        <span className="hidden sm:inline">{triggerLabel}</span>
      </button>

      {/* 全屏菜单 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            id="fullscreen-nav-menu"
            role="dialog"
            aria-modal="true"
            aria-label="导航菜单"
            variants={animVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'fixed inset-0 z-40 flex items-center justify-center',
              'bg-[var(--color-bg-primary)]/95 backdrop-blur-xl'
            )}
            style={backgroundColor ? { backgroundColor } : undefined}
          >
            <nav aria-label="主导航">
              <ul className="flex flex-col items-center gap-6">
                {links.map((link, i) => (
                  <motion.li
                    key={link.label}
                    custom={i}
                    variants={shouldReduce ? undefined : itemVariants}
                    initial={shouldReduce ? {} : 'hidden'}
                    animate={shouldReduce ? {} : 'visible'}
                  >
                    <a
                      href={link.href || '#'}
                      onClick={(e) => {
                        if (!link.href) e.preventDefault();
                        link.onClick?.();
                        close();
                      }}
                      className="group relative text-3xl sm:text-4xl font-display font-light
                        text-[var(--color-text-primary)] no-underline
                        transition-colors duration-300
                        hover:text-[var(--color-accent)]
                        focus-visible:outline-none focus-visible:text-[var(--color-accent)]"
                    >
                      {link.label}
                      {/* 悬浮下划线 */}
                      <span
                        className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[var(--color-accent)]
                        transition-all duration-300 group-hover:w-full"
                      />
                    </a>
                    {/* 子链接 */}
                    {link.children && link.children.length > 0 && (
                      <ul className="mt-3 flex justify-center gap-4">
                        {link.children.map((child) => (
                          <li key={child.label}>
                            <a
                              href={child.href || '#'}
                              onClick={(e) => {
                                if (!child.href) e.preventDefault();
                                child.onClick?.();
                                close();
                              }}
                              className="text-sm text-[var(--color-text-muted)]
                                hover:text-[var(--color-accent)]
                                transition-colors duration-200"
                            >
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* 关闭按钮（右下角） */}
            <button
              onClick={close}
              className="absolute bottom-8 right-8 px-6 py-3 rounded-xl
                text-sm font-medium
                bg-[var(--color-bg-surface)] text-[var(--color-text-muted)]
                border border-[var(--color-border-default)]
                hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)]
                transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
              aria-label="关闭菜单"
            >
              关闭 ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
