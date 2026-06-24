'use client';

import { useRef, useState, useEffect, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export interface GlassNavbarProps {
  className?: string;
  children?: ReactNode;
  sticky?: boolean;
  blur?: number;
  opacity?: number;
}

export function GlassNavbar({
  className,
  children,
  sticky = true,
  blur = 12,
  opacity = 0.15,
}: GlassNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const effectiveBlur = isMobile ? Math.min(blur, 8) : blur;
  const effectiveOpacity = isMobile ? Math.max(opacity, 0.6) : opacity;

  return (
    <motion.nav
      ref={ref}
      className={cn(
        'relative z-50 border-b border-white/[0.08]',
        sticky && 'sticky top-0',
        className
      )}
      initial={false}
      animate={{
        backgroundColor: scrolled
          ? `rgba(255, 255, 255, ${effectiveOpacity})`
          : `rgba(255, 255, 255, ${effectiveOpacity * 0.3})`,
      }}
      transition={{ duration: 0.3 }}
      style={{
        backdropFilter: `blur(${effectiveBlur}px)`,
        WebkitBackdropFilter: `blur(${effectiveBlur}px)`,
      }}
    >
      {/* Glow effect */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
        }}
        aria-hidden="true"
      />
      {/* Subtle border glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)`,
        }}
        aria-hidden="true"
      />
      <div className="relative flex items-center justify-between px-6 py-4">
        {children}
      </div>
    </motion.nav>
  );
}
