import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

export interface ParticlesProps {
  className?: string;
  count?: number;
  color?: string;
}

export function Particles({
  className,
  count = 50,
  color = '#ffffff',
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const shouldReduce = useReducedMotion();
  const particlesRef = useRef<ReturnType<typeof createParticles> | null>(null);
  const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // IntersectionObserver: 视口外暂停动画
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
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
      // 重新初始化粒子位置到可见区域
      particlesRef.current = null;
    };
    resize();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', resize);
    }

    // 创建粒子
    function createParticles() {
      return Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      }));
    }

    if (!particlesRef.current) {
      particlesRef.current = createParticles();
    }
    let particles = particlesRef.current;

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 确保粒子数组引用是最新的（resize 后可能重新创建）
      if (!particlesRef.current) {
        particlesRef.current = createParticles();
        particles = particlesRef.current;
      }

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', resize);
      }
      cancelAnimationFrame(animationId);
    };
  }, [count, color, isVisible, shouldReduce]);

  return (
    <div ref={containerRef} className={cn('absolute inset-0', className)}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
