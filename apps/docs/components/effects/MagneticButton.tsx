"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  variant?: "primary" | "outline";
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
}

export function MagneticButton({
  children,
  strength = 0.3,
  className = "",
  variant = "primary",
  onClick,
  href,
  target,
  rel,
  type = "button",
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const shouldReduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (shouldReduce) return;
      const el = href ? anchorRef.current : buttonRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * strength);
      y.set((e.clientY - centerY) * strength);
    },
    [shouldReduce, strength, x, y, href]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const isExternal = href ? /^https?:\/\//.test(href) : false;
  const finalTarget = target ?? (isExternal ? "_blank" : undefined);
  const finalRel = rel ?? (isExternal ? "noopener noreferrer" : undefined);

  const baseClass = [
    "relative px-8 py-4 rounded-xl font-semibold",
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",
    "focus-visible:ring-offset-[var(--color-bg-primary)]",
    "transition-shadow duration-150",
    variant === "primary"
      ? "bg-[var(--color-accent)] text-[var(--color-bg-primary)] hover:shadow-[0_0_30px_rgba(0,245,255,0.4)]"
      : "bg-transparent border border-[var(--color-accent)] text-[var(--color-accent)] hover:shadow-[0_0_20px_rgba(0,245,255,0.2)]",
    className,
  ].join(" ");

  if (href) {
    return (
      <motion.a
        ref={anchorRef}
        href={href}
        target={finalTarget}
        rel={finalRel}
        style={{ x: springX, y: springY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className={baseClass}
        whileHover={shouldReduce ? {} : { scale: 1.02 }}
        whileTap={shouldReduce ? {} : { scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={baseClass}
      whileHover={shouldReduce ? {} : { scale: 1.02 }}
      whileTap={shouldReduce ? {} : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.button>
  );
}
