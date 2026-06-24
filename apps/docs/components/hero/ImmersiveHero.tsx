"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { getTotalComponentCount } from "@/lib/component-registry";

/**
 * 沉浸式 Hero 区域
 * 粒子背景 + 3D 透视标题 + 动态光晕
 */
export function ImmersiveHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isReady, setIsReady] = useState(false);
  const totalComponents = getTotalComponentCount();

  // 粒子背景动画
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
      pulse: number;
    }> = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    const initParticles = () => {
      const count = Math.min(120, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 12000));
      particles = [];
      for (let i = 0; i < count; i++) {
        const colors = ["#00F5FF", "#FF00FF", "#00FFAA", "#FFD700", "#FF006E"];
        particles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          alpha: Math.random() * 0.6 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          pulse: Math.random() * Math.PI * 2,
        });
      }
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.02;

        // 鼠标排斥
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150 && dist > 0) {
          const force = (150 - dist) / 150 * 0.5;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // 阻尼
        p.vx *= 0.99;
        p.vy *= 0.99;

        // 边界环绕
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // 绘制粒子
        const alpha = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fill();

        // 连接线
        particles.slice(i + 1).forEach((p2) => {
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (dist2 < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = alpha * (1 - dist2 / 100) * 0.2;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(draw);
    };

    resize();
    initParticles();
    draw();
    setIsReady(true);

    const handleResize = () => {
      resize();
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* 粒子背景画布 */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: isReady ? 1 : 0, transition: "opacity 1s ease" }}
      />

      {/* 多层渐变光晕 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-[var(--color-accent)]/10 via-transparent to-transparent blur-3xl animate-aurora" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-gradient-radial from-[var(--color-motion)]/8 via-transparent to-transparent blur-3xl animate-aurora" style={{ animationDelay: "-5s" }} />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-gradient-radial from-[var(--color-spring)]/6 via-transparent to-transparent blur-3xl animate-aurora" style={{ animationDelay: "-10s" }} />
      </div>

      {/* 网格背景 */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      {/* 内容 */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 px-4 py-1.5 text-sm text-[var(--color-accent)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent)]" />
          </span>
          开源免费 · {totalComponents}+ 组件 · 5 大引擎
        </motion.div>

        {/* 主标题 - 3D 透视效果 */}
        <motion.h1
          initial={{ opacity: 0, y: 40, rotateX: 15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="perspective-container"
        >
          <span className="font-display text-6xl font-bold tracking-tight text-gradient-hero sm:text-7xl lg:text-8xl block">
            Frontend UI
          </span>
        </motion.h1>

        {/* 副标题 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-text-muted)] leading-relaxed"
        >
          企业级前端动画组件库，集成 GSAP、Motion、react-spring 等引擎
          <br className="hidden sm:inline" />
          构建令人印象深刻的沉浸式用户界面
        </motion.p>

        {/* CTA 按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <Link
            href="/docs"
            className="group relative overflow-hidden rounded-xl bg-[var(--color-accent)] px-8 py-4 text-sm font-semibold text-[var(--color-bg-primary)] transition-all hover:shadow-[0_0_40px_rgba(0,245,255,0.3)] active:scale-[0.98]"
          >
            <span className="relative z-10">开始使用</span>
          </Link>
          <Link
            href="/components"
            className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]/80 backdrop-blur-sm px-8 py-4 text-sm font-semibold text-[var(--color-text-primary)] transition-all hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-hover)] active:scale-[0.98]"
          >
            浏览组件
          </Link>
        </motion.div>

        {/* 统计 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4"
        >
          {[
            { value: totalComponents, label: "动画组件", suffix: "+" },
            { value: 5, label: "动画引擎", suffix: "" },
            { value: 6, label: "组件分类", suffix: "" },
            { value: 100, label: "TypeScript", suffix: "%" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-[var(--color-accent)]">
                {stat.value}{stat.suffix}
              </div>
              <div className="mt-1 text-sm text-[var(--color-text-muted)]">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 底部渐变过渡 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-bg-primary)] to-transparent pointer-events-none" />
    </section>
  );
}
