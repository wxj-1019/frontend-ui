'use client';

import { useRef, useCallback, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface ClickSparkProps {
  /** 被包裹的元素 */
  children: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 粒子数量，默认 30 */
  particleCount?: number;
  /** 粒子颜色数组，默认使用 accent 色系 */
  colors?: string[];
  /** 粒子扩散半径（px），默认 120 */
  radius?: number;
  /** 动画持续时间（ms），默认 600 */
  duration?: number;
  /** 粒子大小范围 [min, max]，默认 [2, 6] */
  particleSize?: [number, number];
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

export function ClickSpark({
  children,
  className,
  particleCount = 30,
  colors,
  radius = 120,
  duration = 600,
  particleSize = [2, 6],
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationIdRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const defaultColors = [
    'var(--color-accent)',
    '#60a5fa',
    '#a78bfa',
    '#f472b6',
    '#34d399',
  ];

  const activeColors = colors || defaultColors;

  const getColor = useCallback((colorVar: string): string => {
    // 如果是 CSS 变量，尝试运行时解析
    if (colorVar.startsWith('var(')) {
      try {
        const temp = document.createElement('div');
        temp.style.color = colorVar;
        document.body.appendChild(temp);
        const resolved = getComputedStyle(temp).color;
        document.body.removeChild(temp);
        return resolved;
      } catch {
        return '#00f5ff';
      }
    }
    return colorVar;
  }, []);

  const createParticles = useCallback(
    (x: number, y: number) => {
      const particles: Particle[] = [];

      for (let i = 0; i < particleCount; i++) {
        const angle =
          (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
        const speed = (Math.random() * 0.5 + 0.5) * (radius / duration) * 3;
        const size =
          Math.random() * (particleSize[1] - particleSize[0]) + particleSize[0];
        const colorVar =
          activeColors[Math.floor(Math.random() * activeColors.length)];
        const color = getColor(colorVar);

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size,
          color,
          alpha: 1,
          life: 0,
          maxLife: duration,
        });
      }

      return particles;
    },
    [particleCount, activeColors, radius, duration, particleSize, getColor]
  );

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };
    resize();

    let animId: number;

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      const alive: Particle[] = [];

      for (const p of particles) {
        p.life += 16; // ~60fps per frame
        if (p.life >= p.maxLife) continue;

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.alpha = 1 - p.life / p.maxLife;

        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.alpha, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        alive.push(p);
      }

      particlesRef.current = alive;

      if (alive.length > 0) {
        animId = requestAnimationFrame(loop);
        animationIdRef.current = animId;
      } else {
        animationIdRef.current = 0;
      }
    };

    animId = requestAnimationFrame(loop);
    animationIdRef.current = animId;
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // 取消当前动画
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = 0;
      }

      const newParticles = createParticles(x, y);
      particlesRef.current = newParticles;

      // 确保 Canvas 尺寸正确
      const canvas = canvasRef.current;
      if (canvas) {
        const parent = canvas.parentElement;
        if (parent) {
          canvas.width = parent.offsetWidth;
          canvas.height = parent.offsetHeight;
        }
      }

      animate();
    },
    [createParticles, animate]
  );

  return (
    <div
      ref={containerRef}
      className={cn('relative inline-block cursor-pointer', className)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="点击触发粒子效果"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          // 模拟中心点击
          const container = containerRef.current;
          if (container) {
            const rect = container.getBoundingClientRect();
            const x = rect.width / 2;
            const y = rect.height / 2;
            if (animationIdRef.current) {
              cancelAnimationFrame(animationIdRef.current);
              animationIdRef.current = 0;
            }
            particlesRef.current = createParticles(x, y);
            animate();
          }
        }
      }}
    >
      {children}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0"
        style={{ width: '100%', height: '100%' }}
        aria-hidden="true"
      />
    </div>
  );
}
