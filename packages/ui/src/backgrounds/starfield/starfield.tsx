import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

export interface StarfieldProps {
  className?: string;
  /** 星星数量 */
  count?: number;
  /** 飞行速度 */
  speed?: number;
  /** 是否启用深度（远小近大） */
  depth?: boolean;
  /** 星星颜色 */
  starColor?: string;
}

interface Star {
  x: number;
  y: number;
  z: number;
  pz: number;
}

export function Starfield({
  className,
  count = 200,
  speed = 0.5,
  depth = true,
  starColor = '#ffffff',
}: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const shouldReduce = useReducedMotion();
  const starsRef = useRef<Star[] | null>(null);

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

    let resizeTimeout: ReturnType<typeof setTimeout> | null = null;

    const resize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        // 重新初始化星星
        starsRef.current = null;
      }, 100);
    };
    resize();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', resize);
    }

    let animationId: number;

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      // 重新初始化星星数组（resize 后或首次运行）
      if (!starsRef.current) {
        starsRef.current = Array.from({ length: count }, () => ({
          x: (Math.random() - 0.5) * w,
          y: (Math.random() - 0.5) * h,
          z: Math.random() * w,
          pz: 0,
        }));
      }
      const stars = starsRef.current;

      // 拖尾效果：用半透明黑覆盖代替 clearRect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.pz = star.z;
        star.z -= speed;

        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * w;
          star.y = (Math.random() - 0.5) * h;
          star.z = w;
          star.pz = star.z;
        }

        const sx = cx + (star.x / star.z) * w;
        const sy = cy + (star.y / star.z) * w;
        const psx = cx + (star.x / star.pz) * w;
        const psy = cy + (star.y / star.pz) * w;

        // 深度决定大小（越近越大）
        const sizeRatio = depth ? (1 - star.z / w) : 0.5;
        const radius = Math.max(0.1, sizeRatio * 2);

        // 越近越亮
        const alpha = depth ? sizeRatio : 0.8;
        ctx.strokeStyle = starColor;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = radius;

        ctx.beginPath();
        ctx.moveTo(psx, psy);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }
      // 重置 globalAlpha，避免影响后续渲染
      ctx.globalAlpha = 1;

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', resize);
      }
      if (resizeTimeout) clearTimeout(resizeTimeout);
      cancelAnimationFrame(animationId);
    };
  }, [count, speed, depth, starColor, isVisible, shouldReduce]);

  return (
    <div ref={containerRef} className={cn('absolute inset-0 bg-black', className)}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
