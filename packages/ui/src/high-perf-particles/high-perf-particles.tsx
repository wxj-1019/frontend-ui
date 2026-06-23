'use client';

import { useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
  alpha: number;
}

export interface HighPerfParticlesProps {
  className?: string;
  particleCount?: number;
  color?: string;
  interactive?: boolean;
  speed?: number;
  trail?: boolean;
  glow?: boolean;
  turbulence?: number;
  gravity?: number;
}

export function HighPerfParticles({
  className,
  particleCount = 2000,
  interactive = true,
  speed = 1,
  trail = true,
  glow = true,
  turbulence = 0.5,
  gravity = 0,
}: HighPerfParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const animRef = useRef<number>(0);
  const visibleRef = useRef(true);
  const poolRef = useRef<Particle[]>([]);

  const spawnParticle = useCallback(
    (w: number, h: number): Particle => {
      const pool = poolRef.current;
      if (pool.length > 0) return pool.pop()!;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * speed * 2,
        vy: (Math.random() - 0.5) * speed * 2,
        life: Math.random() * 100 + 50,
        maxLife: 100 + Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        hue: Math.random() * 60 + 200,
        alpha: 1,
      };
    },
    [speed]
  );

  const returnToPool = useCallback((p: Particle) => {
    poolRef.current.push(p);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    ctxRef.current = ctx;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    // IntersectionObserver for performance
    const io = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { threshold: 0.05 }
    );
    io.observe(canvas);

    const mouse = mouseRef.current;
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => { mouse.active = false; };

    if (interactive) {
      canvas.addEventListener('mousemove', onMove);
      canvas.addEventListener('mouseleave', onLeave);
    }

    const draw = () => {
      if (!visibleRef.current) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      const particles = particlesRef.current;
      const pool = poolRef.current;

      // Maintain particle count
      while (particles.length < particleCount) {
        particles.push(spawnParticle(w, h));
      }
      while (particles.length > particleCount) {
        returnToPool(particles.pop()!);
      }

      // Clear with trail effect
      if (trail) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
        ctx.fillRect(0, 0, w, h);
      } else {
        ctx.clearRect(0, 0, w, h);
      }

      ctx.save();
      if (glow) {
        ctx.globalCompositeOperation = 'lighter';
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life--;

        if (p.life <= 0) {
          returnToPool(p);
          particles[i] = spawnParticle(w, h);
          continue;
        }

        // Physics
        p.x += p.vx;
        p.y += p.vy;
        p.vy += gravity * 0.01;

        // Mouse interaction
        if (interactive && mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100 && dist > 0) {
            const force = (100 - dist) / 100;
            p.vx += (dx / dist) * force * 0.5;
            p.vy += (dy / dist) * force * 0.5;
          }
        }

        // Turbulence
        if (turbulence > 0) {
          p.vx += (Math.random() - 0.5) * turbulence * 0.1;
          p.vy += (Math.random() - 0.5) * turbulence * 0.1;
        }

        // Damping
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Wrap around
        if (p.x < 0) p.x += w;
        if (p.x > w) p.x -= w;
        if (p.y < 0) p.y += h;
        if (p.y > h) p.y -= h;

        // Draw
        const lifeRatio = p.life / p.maxLife;
        p.alpha = lifeRatio * 0.8;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 + (1 - lifeRatio) * 2), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, ${p.alpha})`;
        ctx.fill();

        // Glow ring
        if (glow) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, ${p.alpha * 0.1})`;
          ctx.fill();
        }
      }

      ctx.restore();
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
      io.disconnect();
      if (interactive) {
        canvas.removeEventListener('mousemove', onMove);
        canvas.removeEventListener('mouseleave', onLeave);
      }
    };
  }, [particleCount, interactive, speed, trail, glow, turbulence, gravity, spawnParticle, returnToPool]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('block h-full w-full', className)}
      style={{ background: 'transparent' }}
    />
  );
}
