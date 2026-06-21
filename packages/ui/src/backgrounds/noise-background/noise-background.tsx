import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

export interface NoiseBackgroundProps {
  className?: string;
  /** 噪点不透明度 (0-1) */
  opacity?: number;
  /** 噪点密度/频率 (0-1)，越大颗粒越细 */
  frequency?: number;
  /** 噪点颜色 */
  color?: string;
  /** 是否启用动画 */
  animated?: boolean;
}

// 将颜色转换为 RGB 分量
function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean;
  const num = parseInt(full, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

export function NoiseBackground({
  className,
  opacity = 0.05,
  frequency = 0.8,
  color = '#ffffff',
  animated = true,
}: NoiseBackgroundProps) {
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

    const [r, g, b] = hexToRgb(color);

    // 根据频率决定采样步长：frequency 越大颗粒越细（步长越小）
    const step = Math.max(1, Math.round((1 - frequency) * 8) + 1);

    let animationId: number;

    const drawNoise = () => {
      const w = canvas.width;
      const h = canvas.height;
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;

      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          // 随机亮度（0 或接近 0/255 的抖动）
          const value = Math.random();
          const alphaByte = Math.floor(value * 255 * opacity);
          // 写入一个 step×step 的块
          for (let dy = 0; dy < step && y + dy < h; dy++) {
            for (let dx = 0; dx < step && x + dx < w; dx++) {
              const idx = ((y + dy) * w + (x + dx)) * 4;
              data[idx] = r;
              data[idx + 1] = g;
              data[idx + 2] = b;
              data[idx + 3] = alphaByte;
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);

      if (animated) {
        animationId = requestAnimationFrame(drawNoise);
      }
    };

    drawNoise();

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', resize);
      }
      if (animated) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [opacity, frequency, color, animated, isVisible]);

  return (
    <div ref={containerRef} className={cn('absolute inset-0', className)}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
