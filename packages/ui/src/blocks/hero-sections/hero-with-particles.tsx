'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import type { HeroSectionBaseProps } from './types';

export interface HeroWithParticlesProps extends HeroSectionBaseProps {
  /** Number of particles */
  particleCount?: number;
  /** Particle color (CSS color string) */
  particleColor?: string;
  /** Particle connection distance (px) */
  connectionDistance?: number;
  /** Particle speed multiplier */
  speed?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export function HeroWithParticles({
  title,
  subtitle,
  actions,
  className,
  particleCount = 80,
  particleColor,
  connectionDistance = 150,
  speed = 1,
  prefersReducedMotion = false,
  children,
}: HeroWithParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  // Initialize particles
  const initParticles = useCallback(
    (width: number, height: number) => {
      const count = Math.min(
        particleCount,
        Math.floor((width * height) / 8000)
      );
      return Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5 * speed,
        vy: (Math.random() - 0.5) * 0.5 * speed,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      }));
    },
    [particleCount, speed]
  );

  // Resize observer
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setCanvasSize({ width, height });
        particlesRef.current = initParticles(width, height);
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [initParticles]);

  // Animation loop
  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resolve CSS variable to actual color (Canvas cannot use var() directly)
    const container = containerRef.current;
    let resolvedAccent = '#00f5ff';
    if (particleColor) {
      resolvedAccent = particleColor;
    } else if (container) {
      const computed = getComputedStyle(container)
        .getPropertyValue('--color-accent')
        .trim();
      if (computed) resolvedAccent = computed;
    }

    // Build rgba template for opacity blending
    const hex = resolvedAccent.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const colorTemplate = isNaN(r)
      ? resolvedAccent
      : `rgba(${r}, ${g}, ${b}, VAR_OPACITY)`;

    let running = true;

    const animate = () => {
      if (!running) return;
      const { width, height } = canvasSize;
      if (width === 0 || height === 0) {
        animFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      const particles = particlesRef.current;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = colorTemplate.replace('VAR_OPACITY', String(p.opacity));
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = colorTemplate.replace(
              'VAR_OPACITY',
              String(0.15 * (1 - dist / connectionDistance))
            );
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      running = false;
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [canvasSize, connectionDistance, particleColor, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden rounded-xl bg-[var(--color-bg-primary)]',
        'px-6 py-20 sm:px-12 sm:py-28 lg:px-20',
        className
      )}
    >
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="pointer-events-none absolute inset-0"
        aria-hidden
      />

      {/* Gradient overlay for readability */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--color-bg-primary)]/0 via-[var(--color-bg-primary)]/0 to-[var(--color-bg-primary)]/80"
        aria-hidden
      />

      {/* Content */}
      <div className="relative mx-auto max-w-4xl text-center">
        {/* Label badge */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="inline-block rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-4 py-1.5 text-xs font-medium tracking-wider text-[var(--color-accent)] uppercase">
            Frontend UI
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl font-bold leading-tight tracking-tight text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-muted)] sm:text-xl"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Actions */}
        {actions && actions.length > 0 && (
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            {actions.map((action, i) => (
              <a
                key={i}
                href={action.href || '#'}
                onClick={(e) => {
                  if (!action.href) e.preventDefault();
                  action.onClick?.();
                }}
                className={cn(
                  'inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all',
                  action.variant === 'secondary'
                    ? 'border border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-accent)]/5'
                    : 'bg-[var(--color-accent)] text-white hover:brightness-110 shadow-lg shadow-[var(--color-accent)]/25'
                )}
              >
                {action.label}
              </a>
            ))}
          </motion.div>
        )}

        {children && (
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-12"
          >
            {children}
          </motion.div>
        )}
      </div>
    </div>
  );
}
