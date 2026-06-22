"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { type ReactNode } from "react";

export interface SpringMorphProps {
  /** 切换键值，变化时触发形变动画 */
  morphKey: string | number;
  /** 渲染内容 */
  children: ReactNode;
  /** 自定义类名 */
  className?: string;
}

export function SpringMorph({
  morphKey,
  children,
  className,
}: SpringMorphProps) {
  return (
    <div className={cn("relative", className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={morphKey}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 280, damping: 20 }}
          className="will-change-transform"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
