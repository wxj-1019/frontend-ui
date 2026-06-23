"use client";

import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

export interface GenerativeBackgroundProps {
  className?: string;
  /** 基础色调 */
  baseHue?: number;
  /** 饱和度 */
  saturation?: number;
  /** 亮度 */
  lightness?: number;
  /** 动画速度 */
  speed?: number;
  /** 噪声密度 */
  density?: number;
}

export function GenerativeBackground({
  className,
  baseHue = 200,
  saturation = 60,
  lightness = 20,
  speed = 0.3,
  density = 0.5,
}: GenerativeBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const shouldReduce = useReducedMotion();

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
    };
    resize();
    window.addEventListener('resize', resize);

    let time = 0;
    let animationId: number;

    // 2D 噪声函数
    const noise2D = (x: number, y: number, t: number): number => {
      const nx = Math.sin(x * 0.01 + t) * Math.cos(y * 0.01 - t * 0.5);
      const ny = Math.cos(x * 0.008 - t * 0.3) * Math.sin(y * 0.012 + t * 0.7);
      return (nx + ny) * 0.5 + 0.5;
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      time += 0.005 * speed;

      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;
      const step = Math.max(1, Math.round((1 - density) * 4) + 1);

      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const n = noise2D(x, y, time);
          const hue = (baseHue + n * 60) % 360;
          const sat = saturation + n * 20;
          const light = lightness + n * 15;

          const [r, g, b] = hslToRgb(hue, sat, light);
          const alpha = Math.floor(n * 30);

          for (let dy = 0; dy < step && y + dy < h; dy++) {
            for (let dx = 0; dx < step && x + dx < w; dx++) {
              const idx = ((y + dy) * w + (x + dx)) * 4;
              data[idx] = r;
              data[idx + 1] = g;
              data[idx + 2] = b;
              data[idx + 3] = alpha;
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [baseHue, saturation, lightness, speed, density, isVisible, shouldReduce]);

  if (shouldReduce) {
    return (
      <div
        ref={containerRef}
        className={cn('absolute inset-0', className)}
        style={{
          background: `linear-gradient(135deg, hsl(${baseHue}, ${saturation}%, ${lightness}%), hsl(${(baseHue + 40) % 360}, ${saturation}%, ${lightness - 5}%))`,
        }}
      />
    );
  }

  return (
    <div ref={containerRef} className={cn('absolute inset-0', className)}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }

  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255),
  ];
}
