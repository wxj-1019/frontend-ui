"use client";

import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export interface ToastProps {
  children?: React.ReactNode;
  className?: string;
  open: boolean;
  onClose: () => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  /** 自动关闭时长 (ms)，0 表示不自动关闭 */
  duration?: number;
}

const positionMap: Record<NonNullable<ToastProps['position']>, string> = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
};

function getInitial(position: NonNullable<ToastProps['position']>) {
  if (position.startsWith('top')) return { opacity: 0, y: -24 };
  if (position.startsWith('bottom')) return { opacity: 0, y: 24 };
  return { opacity: 0, y: 0 };
}

export function Toast({
  children,
  className,
  open,
  onClose,
  position = 'top-right',
  duration = 3000,
}: ToastProps) {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open || duration <= 0) return;
    const timer = window.setTimeout(handleClose, duration);
    return () => window.clearTimeout(timer);
  }, [open, duration, handleClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      aria-live="polite"
      aria-atomic="true"
      className={cn('pointer-events-none fixed z-50 flex flex-col gap-2', positionMap[position])}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            role="status"
            initial={getInitial(position)}
            animate={{ opacity: 1, y: 0 }}
            exit={getInitial(position)}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className={cn(
              'pointer-events-auto flex items-start gap-3 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] px-4 py-3 shadow-xl',
              className,
            )}
          >
            <div className="flex-1 text-sm text-[var(--color-text-primary)]">
              {children}
            </div>
            <button
              type="button"
              onClick={handleClose}
              aria-label="关闭通知"
              className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-primary)]"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>,
    document.body,
  );
}
