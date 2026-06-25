"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export function TiltCard({ children, className = "" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(
    useTransform(y, [0, 1], [10, -10]),
    { stiffness: 300, damping: 30 }
  );
  const rotateY = useSpring(
    useTransform(x, [0, 1], [-10, 10]),
    { stiffness: 300, damping: 30 }
  );

  const updateGlare = useCallback((xPos: number, yPos: number) => {
    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle at ${xPos * 100}% ${yPos * 100}%, rgba(255,255,255,0.08) 0%, transparent 50%)`;
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width;
    const yPos = (e.clientY - rect.top) / rect.height;
    x.set(xPos);
    y.set(yPos);
    updateGlare(xPos, yPos);
  }, [x, y, updateGlare]);

  const handleMouseLeave = useCallback(() => {
    x.set(0.5);
    y.set(0.5);
    updateGlare(0.5, 0.5);
  }, [x, y, updateGlare]);

  return (
    <motion.div
      ref={ref}
      style={shouldReduce ? {} : {
        rotateX,
        rotateY,
        perspective: 1000,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
        group relative bg-[var(--color-bg-surface)] rounded-md p-6
        border border-[var(--color-border-default)]
        hover:border-[var(--color-border-hover)]
        transition-colors duration-200
        ${className}
      `}
      whileHover={shouldReduce ? {} : { scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* 光泽效果 - 通过 ref 直接更新 DOM 避免 re-render */}
      <div
        ref={glareRef}
        className="absolute inset-0 rounded-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 50%)",
        }}
      />
      {children}
    </motion.div>
  );
}
