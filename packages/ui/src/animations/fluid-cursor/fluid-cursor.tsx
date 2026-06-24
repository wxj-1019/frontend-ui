"use client";

import { useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "motion/react";

export interface FluidCursorProps {
  /** 流体颜色 */
  color?: string;
  /** 粒子数量 */
  particleCount?: number;
  /** 拖尾长度 */
  trailLength?: number;
  /** 流体粘稠度 (0-1) */
  viscosity?: number;
  /** 发光强度 */
  glowIntensity?: number;
  /** 混合模式 */
  blendMode?: string;
}

interface FluidParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  life: number;
  maxLife: number;
}

export function FluidCursor({
  color = "#00F5FF",
  particleCount = 40,
  trailLength = 15,
  viscosity = 0.92,
  glowIntensity = 0.6,
  blendMode = "screen",
}: FluidCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -100, y: -100, prevX: -100, prevY: -100 });
  const particlesRef = useRef<FluidParticle[]>([]);
  const shouldReduce = useReducedMotion();

  const hexToRgb = useCallback((hex: string) => {
    const clean = hex.replace("#", "");
    const full = clean.length === 3
      ? clean.split("").map((c) => c + c).join("")
      : clean;
    const num = parseInt(full, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  }, []);

  useEffect(() => {
    if (shouldReduce) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const [r, g, b] = hexToRgb(color);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      const dx = mouseRef.current.x - mouseRef.current.prevX;
      const dy = mouseRef.current.y - mouseRef.current.prevY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      for (let i = 0; i < Math.min(3, Math.ceil(speed / 5)); i++) {
        if (particlesRef.current.length < particleCount) {
          particlesRef.current.push({
            x: mouseRef.current.x + (Math.random() - 0.5) * 10,
            y: mouseRef.current.y + (Math.random() - 0.5) * 10,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            radius: Math.random() * 8 + 4,
            life: 1,
            maxLife: Math.random() * 0.5 + 0.5,
          });
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = blendMode as GlobalCompositeOperation;

      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= viscosity;
        p.vy *= viscosity;
        p.life -= 0.008;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const alpha = p.life * glowIntensity;
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.radius * (2 - p.life)
        );
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * (2 - p.life), 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      if (particles.length > 1) {
        for (let i = 0; i < particles.length - 1; i++) {
          const p1 = particles[i];
          const p2 = particles[i + 1];
          const dist = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.15 * (p1.life + p2.life) / 2})`;
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        }
      }

      ctx.globalCompositeOperation = "source-over";
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [shouldReduce, color, particleCount, viscosity, glowIntensity, blendMode, hexToRgb]);

  if (shouldReduce) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}
