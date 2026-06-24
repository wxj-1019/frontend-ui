"use client";

import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

export interface ParticleOceanProps {
  className?: string;
  /** 粒子数量 */
  count?: number;
  /** 粒子基础颜色 */
  color?: string;
  /** 流动速度 */
  speed?: number;
  /** 是否响应鼠标 */
  interactive?: boolean;
  /** 粒子大小范围 */
  sizeRange?: [number, number];
}

interface OceanParticle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  angle: number;
  speed: number;
  size: number;
  opacity: number;
  phase: number;
}

export function ParticleOcean({
  className,
  count = 150,
  color = '#00F5FF',
  speed = 0.5,
  interactive = true,
  sizeRange = [1, 3],
}: ParticleOceanProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const shouldReduce = useReducedMotion();
  const particlesRef = useRef<OceanParticle[] | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || shouldReduce) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particlesRef.current = null;
    };
    resize();
    window.addEventListener('resize', resize);

    const [minSize, maxSize] = sizeRange;

    const createParticles = (w: number, h: number): OceanParticle[] =>
      Array.from({ length: count }, () => {
        const x = Math.random() * w;
        const y = Math.random() * h;
        return {
          x,
          y,
          originX: x,
          originY: y,
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.5 + 0.2,
          size: Math.random() * (maxSize - minSize) + minSize,
          opacity: Math.random() * 0.5 + 0.3,
          phase: Math.random() * Math.PI * 2,
        };
      });

    if (!particlesRef.current) {
      particlesRef.current = createParticles(canvas.width, canvas.height);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }

    let animationId: number;
    const timeRef = { value: 0 };

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      timeRef.value += 0.01 * speed;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color;

      const particles = particlesRef.current!;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of particles) {
        // 正弦波流动
        const flowX = Math.sin(p.angle + timeRef.value + p.phase) * 20;
        const flowY = Math.cos(p.angle + timeRef.value * 0.7 + p.phase) * 15;

        p.x = p.originX + flowX;
        p.y = p.originY + flowY;

        // 鼠标交互：排斥效果
        if (interactive && mx > -100) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100 && dist > 0) {
            const force = (100 - dist) / 100;
            p.x += (dx / dist) * force * 30;
            p.y += (dy / dist) * force * 30;
          }
        }

        // 边界环绕
        if (p.x < 0) p.x += w;
        if (p.x > w) p.x -= w;
        if (p.y < 0) p.y += h;
        if (p.y > h) p.y -= h;

        ctx.globalAlpha = p.opacity * (0.7 + 0.3 * Math.sin(timeRef.value + p.phase));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (interactive) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationId);
    };
  }, [count, color, speed, interactive, sizeRange, isVisible, shouldReduce]);

  return (
    <div ref={containerRef} className={cn('absolute inset-0', className)}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
