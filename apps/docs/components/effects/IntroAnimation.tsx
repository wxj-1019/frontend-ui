"use client";

import { useEffect, useState, useRef } from "react";
import { Sparkles } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const STORAGE_KEY = "frontend-ui-intro-seen";

export function IntroAnimation() {
  const [show, setShow] = useState(false);
  const shouldReduce = useReducedMotion();
  const unmountedRef = useRef(false);

  useEffect(() => {
    return () => {
      unmountedRef.current = true;
    };
  }, []);

  useEffect(() => {
    // SSR 安全：仅在客户端执行
    if (typeof window === "undefined") return;
    // 减弱动效模式跳过
    if (shouldReduce) return;

    try {
      const seen = sessionStorage.getItem(STORAGE_KEY);
      if (!seen) {
        setShow(true);
        // 锁定滚动
        document.body.style.overflow = "hidden";
      }
    } catch {
      // sessionStorage 不可用时静默跳过
    }
  }, [shouldReduce]);

  const handleComplete = () => {
    setShow(false);
    document.body.style.overflow = "";
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  };

  return (
    <AnimatePresence onExitComplete={handleComplete}>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-bg-primary)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* 中心光晕 */}
          <motion.div
            className="absolute h-64 w-64 rounded-full bg-[var(--color-accent)]/20 blur-[100px]"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          {/* Logo 文字 */}
          <div className="relative flex flex-col items-center">
            <motion.div
              className="font-display text-5xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-7xl"
              initial={{ opacity: 0, y: 20, filter: "blur(20px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-flex items-center text-[var(--color-accent)]">
                <Sparkles className="h-8 w-8 sm:h-10 sm:w-10" />
              </span>{" "}
              Frontend UI
            </motion.div>

            {/* 副标题 */}
            <motion.div
              className="mt-4 text-sm uppercase tracking-[0.3em] text-[var(--color-text-muted)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Animation Component Library
            </motion.div>

            {/* 进度条 */}
            <motion.div
              className="mt-8 h-0.5 w-32 overflow-hidden rounded-full bg-[var(--color-border-default)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <motion.div
                className="h-full rounded-full bg-[var(--color-accent)]"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.0, delay: 0.9, ease: "easeInOut" }}
                onAnimationComplete={() => {
                  // 延迟一点再退出，让用户看到完整状态
                  const timer = setTimeout(() => {
                    if (!unmountedRef.current) {
                      setShow(false);
                    }
                  }, 200);
                  return () => clearTimeout(timer);
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
