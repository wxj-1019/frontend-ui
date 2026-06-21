import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

export interface HyperspeedProps {
  className?: string;
  /** 飞行速度 */
  speed?: number;
  /** 星星数量 */
  count?: number;
  /** 星轨颜色 */
  color?: string;
  /** 拖尾长度 (0-1)，越大轨迹越长 */
  trailLength?: number;
}

interface WarpStar {
  x: number;
  y: number;
  z: number;
  pz: number;
}

export function Hyperspeed({
  className,
  speed = 2,
  count = 300,
  color = '#00ffff',
  trailLength = 0.15,
}: HyperspeedProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

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
    if (!isVisible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', resize);
    }

    const w0 = canvas.width;
    const stars: WarpStar[] = Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * w0,
      y: (Math.random() - 0.5) * w0,
      z: Math.random() * w0,
      pz: 0,
    }));

    let animationId: number;

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      // 用半透明黑覆盖产生拖尾；trailLength 越大覆盖越浅，轨迹越长
      const fadeAlpha = Math.max(0.01, Math.min(1, 1 - trailLength));
      ctx.fillStyle = `rgba(0, 0, 0, ${fadeAlpha})`;
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.pz = star.z;
        star.z -= speed;

        if (star.z < 1) {
          star.x = (Math.random() - 0.5) * w;
          star.y = (Math.random() - 0.5) * w;
          star.z = w;
          star.pz = star.z;
        }

        const sx = cx + (star.x / star.z) * w;
        const sy = cy + (star.y / star.z) * w;
        const psx = cx + (star.x / star.pz) * w;
        const psy = cy + (star.y / star.pz) * w;

        // 越近越亮、越粗
        const ratio = 1 - star.z / w;
        const alpha = Math.min(1, ratio * 1.5);
        const lineWidth = Math.max(0.3, ratio * 2);

        ctx.strokeStyle = color;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(psx, psy);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', resize);
      }
      cancelAnimationFrame(animationId);
    };
  }, [speed, count, color, trailLength, isVisible]);

  return (
    <div ref={containerRef} className={cn('absolute inset-0 bg-black', className)}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
