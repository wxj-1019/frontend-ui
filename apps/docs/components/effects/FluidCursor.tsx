"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

export function FluidCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const followerX = useSpring(cursorX, { stiffness: 50, damping: 20 });
  const followerY = useSpring(cursorY, { stiffness: 50, damping: 20 });
  const shouldReduce = useReducedMotion();
  const visibleRef = useRef(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldReduce) return;
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 4);
      cursorY.set(e.clientY - 4);
      if (!visibleRef.current) {
        visibleRef.current = true;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY, shouldReduce]);

  if (shouldReduce) return null;

  return (
    <>
      <motion.div
        ref={dotRef}
        style={{ x: cursorX, y: cursorY, opacity: 0 }}
        className="fixed w-2 h-2 bg-[var(--color-accent)] rounded-full pointer-events-none z-[9999] mix-blend-difference"
      />
      <motion.div
        ref={ringRef}
        style={{ x: followerX, y: followerY, opacity: 0 }}
        className="fixed w-8 h-8 border border-[var(--color-accent)] rounded-full pointer-events-none z-[9998] mix-blend-difference"
      />
    </>
  );
}
