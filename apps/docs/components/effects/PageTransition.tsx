"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * 页面转场动画组件。
 * 仅用于首页/分类页，文档区禁用（文档区不使用此组件）。
 * 页面挂载时淡入+轻微上移，尊重 prefers-reduced-motion。
 */
export function PageTransition({ children }: PageTransitionProps) {
  const shouldReduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // 确保仅在客户端挂载后才触发动画（避免 SSR 闪烁）
  useEffect(() => {
    setMounted(true);
  }, []);

  if (shouldReduce) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{
          duration: 0.3,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
