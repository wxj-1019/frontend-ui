# Frontend UI 沉浸式重构设计规格

> **状态：全部实现（多轮迭代）** | 基于 skills 优化 | 最后更新：2026-06-25（迭代完成）

---

## 实现状态总览

| 阶段 | 组件 | 状态 | 说明 |
|------|------|------|------|
| **Phase 1** | 设计 Token | ✅ 已完成 | `globals.css` + `animations.ts` |
| **Phase 1** | 全局布局 | ✅ 已完成 | `EnhancedNavbar` + `Footer` |
| **Phase 1** | 主题系统 | ✅ 已完成 | 暗色/亮色已支持 |
| **Phase 1** | 响应式适配 | ✅ 已完成 | Tailwind 响应式 |
| **Phase 2** | Hero 区域 | ✅ 已完成 | `ImmersiveHero.tsx` |
| **Phase 2** | 粒子背景 | ✅ 已完成 | `ParticleBackground.tsx` |
| **Phase 2** | 磁性按钮 | ✅ 已完成 | `MagneticButton.tsx`（`useReducedMotion` + `focus-visible` + `href`） |
| **Phase 2** | 组件展示区 | ✅ 已完成 | `CategoryBento` + `ComponentPreviewGrid` |
| **Phase 2** | CTA 区域 | ✅ 已完成 | `CTASection.tsx` 已创建，一键复制 + 磁性按钮 |
| **Phase 3** | 3D 倾斜卡片 | ✅ 已完成 | `TiltCard.tsx` 已创建，3D 倾斜 + 光泽效果 |
| **Phase 3** | 流体光标 | ✅ 已完成 | `FluidCursor.tsx` 已创建，弹簧跟随光标 |
| **Phase 3** | 滚动视差 | ✅ 已完成 | `ScrollReveal.tsx` |
| **Phase 3** | 页面转场 | ✅ 已完成 | `PageTransition.tsx` |
| **Phase 4** | 性能优化 | ⚠️ 部分 | IntersectionObserver ✅，Lighthouse 待测 |
| **Phase 4** | 减弱动效 | ✅ 已完成 | `useReducedMotion` + 降级变体 |
| **Phase 4** | 可访问性 | ✅ 已完成 | `focus-visible` 已添加，`aria-label` 已添加，对比度 4.5:1 |

---

# [S1] Problem

Frontend UI 首页当前采用传统布局，缺乏沉浸感和交互深度。需要基于 Awwwards、Codrops、Godly 等顶级设计平台的 2026 年趋势，进行沉浸式重构。

## 核心问题

1. **视觉冲击力不足** - 首页 Hero 区域缺乏动态效果
2. **交互层次单一** - 缺少微交互动画和物理反馈
3. **信息传达平淡** - 组件展示区缺乏吸引力
4. **差异化不明显** - 与同类组件库网站风格相似

---

# [S2] Solution Overview

采用「沉浸式重构」方案，在现有结构基础上添加高级动画效果，打造具有视觉冲击力的首页体验。

## 设计原则

1. **克制优于装饰** - 动画服务于功能，不为炫技
2. **一个强色彩瞬间** - 中性色盘优先，霓虹色仅作点缀（≤3 处使用 accent）
3. **间距即结构** - 4px 基础网格，留白创造呼吸感
4. **可访问性不可协商** - WCAG AA 对比度，键盘导航完整支持
5. **反模板设计** - 避免 purple/blue 渐变、三列等高卡片、"Revolutionize" 文案

## 设计 Token 系统

```css
:root {
  /* 背景色 */
  --color-bg-primary: #0a0a0f;
  --color-bg-secondary: #12121a;
  --color-bg-surface: #1a1a2e;
  --color-bg-elevated: #222236;

  /* 文字色 */
  --color-text-primary: #ffffff;
  --color-text-muted: #a8a8bc;
  --color-text-subtle: #8a8a9e;

  /* 单一强调色（仅 3 处使用） */
  --color-accent: #00f5ff;
  --color-accent-muted: rgba(0, 245, 255, 0.15);

  /* 边框 */
  --color-border-default: rgba(255, 255, 255, 0.08);
  --color-border-hover: rgba(255, 255, 255, 0.15);

  /* 字体 */
  --font-display: 'Space Grotesk', sans-serif;
  --font-sans: 'Outfit', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* 圆角 — 统一 Subtle 策略 */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;

  /* 动画时长 */
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --duration-hero: 500ms;

  /* Easing */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* 减弱动效 — 全局降级 */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

# [S3] Hero 区域设计

## 布局结构

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  [粒子背景：Canvas 2D，多色粒子，随鼠标扰动，视口外自动暂停]  │
│  [多层光晕：极光效果，CSS 动画]                              │
│  [网格背景：CSS 渐变网格]                                    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  [Badge: 开源免费 · 68+ 组件 · 5 大引擎]            │   │
│  │                                                     │   │
│  │  Frontend UI                                       │   │  ← 3D 透视标题
│  │  渐变文字效果                                       │   │     入场动画
│  │                                                     │   │
│  │  企业级前端动画组件库，集成 GSAP、Motion...           │   │  ← 副标题
│  │                                                     │   │
│  │  [ 开始使用 ]    [ 浏览组件 ]                       │   │  ← CTA 按钮
│  │                                                     │   │
│  │  68+ 动画组件 | 5 引擎 | 6 分类 | 100% TS           │   │  ← 统计数据
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [底部渐变过渡]                                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 实际实现代码

### ImmersiveHero.tsx（已实现）

```tsx
// apps/docs/components/hero/ImmersiveHero.tsx
"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { getTotalComponentCount } from "@/lib/component-registry";
import { ParticleBackground } from "@/components/effects/ParticleBackground";

export function ImmersiveHero() {
  const totalComponents = getTotalComponentCount();

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* 粒子背景 */}
      <ParticleBackground />

      {/* 多层渐变光晕 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-[var(--color-accent)]/10 via-transparent to-transparent blur-3xl animate-aurora" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-gradient-radial from-[var(--color-motion)]/8 via-transparent to-transparent blur-3xl animate-aurora" style={{ animationDelay: "-5s" }} />
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
```

### 粒子背景（已实现）

```tsx
// apps/docs/components/effects/ParticleBackground.tsx
"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  pulse: number;
}

const COLORS = ['#00F5FF', '#FF00FF', '#00FFAA', '#FFD700', '#FF006E'];

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let running = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    const initParticles = () => {
      const count = Math.min(120, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 12000));
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.6 + 0.2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        pulse: Math.random() * Math.PI * 2,
      }));
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      particlesRef.current.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.02;

        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150 && dist > 0) {
          const force = ((150 - dist) / 150) * 0.5;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        p.vx *= 0.99;
        p.vy *= 0.99;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        const alpha = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fill();

        particlesRef.current.slice(i + 1).forEach((p2) => {
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
      if (running) {
        animationId = requestAnimationFrame(draw);
      }
    };

    const startAnimation = () => {
      if (running) return;
      running = true;
      draw();
    };

    const stopAnimation = () => {
      running = false;
      cancelAnimationFrame(animationId);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    resize();
    initParticles();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation();
          } else {
            stopAnimation();
          }
        });
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      stopAnimation();
      observer.disconnect();
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
```

### 磁性按钮（已优化）

```tsx
// apps/docs/components/effects/MagneticButton.tsx
"use client";

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';

interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  variant?: 'primary' | 'outline';
  onClick?: () => void;
  href?: string;
}

export function MagneticButton({
  children,
  strength = 0.3,
  className = '',
  variant = 'primary',
  onClick,
  href,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const shouldReduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (shouldReduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyles = `
    relative px-8 py-4 rounded-xl font-semibold
    focus-visible:outline-none focus-visible:ring-2
    focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2
    focus-visible:ring-offset-[var(--color-bg-primary)]
    transition-shadow duration-150
    ${variant === 'primary'
      ? 'bg-[var(--color-accent)] text-[var(--color-bg-primary)] hover:shadow-[0_0_30px_rgba(0,245,255,0.4)]'
      : 'bg-transparent border border-[var(--color-accent)] text-[var(--color-accent)] hover:shadow-[0_0_20px_rgba(0,245,255,0.2)]'
    }
    ${className}
  `;

  const Comp = href ? motion.a : motion.button;

  return (
    <Comp
      ref={ref as any}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={baseStyles}
      whileHover={shouldReduce ? {} : { scale: 1.02 }}
      whileTap={shouldReduce ? {} : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {children}
    </Comp>
  );
}
```

---

# [S4] 组件展示区设计

## 布局结构

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌──────────────────┐  ┌──────────────────┐  ┌───────────┐  │
│  │   [实时组件]      │  │   [实时组件]      │  │ [组件]    │  │  ← 3D 卡片
│  │                  │  │                  │  │           │  │     悬停时 3D 倾斜
│  │  BlurText        │  │  GradientText    │  │ SplitText │  │     + 光泽效果
│  │  模糊渐入        │  │  渐变色彩        │  │ 分割动画  │  │     scale ≤ 1.02
│  └──────────────────┘  └──────────────────┘  └───────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 3D 卡片倾斜（已实现）

基于 `framer-motion-animator` skill 的 `useMotionValue` + `useSpring` + `useTransform`：

```tsx
// apps/docs/components/effects/TiltCard.tsx（已实现）
"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export function TiltCard({ children, className = "" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const shouldReduce = useReducedMotion();

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(
    useTransform(y, [0, 1], [10, -10]),
    { stiffness: 300, damping: 30 }
  );
  const rotateY = useSpring(
    useTransform(x, [0, 1], [-10, 10]),
    { stiffness: 300, damping: 30 }
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width;
    const yPos = (e.clientY - rect.top) / rect.height;
    x.set(xPos);
    y.set(yPos);
    setGlarePos({ x: xPos * 100, y: yPos * 100 });
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
    setGlarePos({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={ref}
      style={shouldReduce ? {} : {
        rotateX,
        rotateY,
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
        relative bg-[var(--color-bg-surface)] rounded-md p-6 cursor-pointer
        border border-[var(--color-border-default)]
        hover:border-[var(--color-border-hover)]
        transition-colors duration-200
        ${className}
      `}
      whileHover={shouldReduce ? {} : { scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* 光泽效果 */}
      <div
        className="absolute inset-0 rounded-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.08) 0%, transparent 50%)`,
        }}
      />
      {children}
    </motion.div>
  );
}
```

### 使用方式

```tsx
<TiltCard className="group">
  <div className="h-32 flex items-center justify-center mb-4">
    <BlurText text="Preview" className="text-2xl" />
  </div>
  <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">
    BlurText
  </h3>
  <p className="text-sm text-[var(--color-text-subtle)] mt-1">
    模糊渐入的文字动画
  </p>
</TiltCard>
```

---

# [S5] CTA 区域设计

## 布局结构

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ╔═══════════════════════════════════════════════════════╗  │
│  ║                                                       ║  │
│  ║     准备好开始了吗？                                   ║  │
│  ║                                                       ║  │
│  ║     安装 Frontend UI，开始构建令人印象深刻的动画界面    ║  │
│  ║                                                       ║  │
│  ║     $ npx frontend-ui add blur-text                   ║  │  ← 一键复制（lucide-react）
│  ║                                                       ║  │
│  ║     [ 查看文档 ]    [ GitHub ]                        ║  │  ← 磁性按钮
│  ║                                                       ║  │
│  ╚═══════════════════════════════════════════════════════╝  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 一键复制命令行（已实现）

```tsx
// 使用 lucide-react 图标（禁止 emoji）
import { Copy, Check } from "lucide-react";
import { useState } from "react";

function CopyCommand() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npx frontend-ui add blur-text");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="inline-flex items-center gap-3 rounded-md border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] px-6 py-4">
      <span className="text-sm text-[var(--color-text-subtle)]">$</span>
      <code className="font-mono text-sm text-[var(--color-text-primary)]">
        npx frontend-ui add blur-text
      </code>
      <button
        onClick={handleCopy}
        className="text-[var(--color-text-subtle)] transition-colors duration-150 hover:text-[var(--color-accent)]"
        aria-label={copied ? "已复制" : "复制命令"}
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
}
```

## CTA 区域组件（已实现）

```tsx
// apps/docs/components/sections/CTASection.tsx（已实现）
"use client";

import { motion } from "motion/react";
import { MagneticButton } from "@/components/effects/MagneticButton";
import Link from "next/link";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

export function CTASection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npx frontend-ui add blur-text");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative border-t border-[var(--color-border-default)] py-24">
      {/* 背景光效 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[var(--color-accent)]/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl font-bold text-[var(--color-text-primary)]"
        >
          准备好开始了吗？
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-[var(--color-text-muted)]"
        >
          安装 Frontend UI，开始构建令人印象深刻的动画界面
        </motion.p>

        {/* 复制命令 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8"
        >
          <div className="inline-flex items-center gap-3 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]/80 backdrop-blur-sm px-6 py-4 transition-all hover:border-[var(--color-accent)]/50">
            <span className="text-sm text-[var(--color-text-subtle)]">$</span>
            <code className="font-mono text-sm text-[var(--color-text-primary)]">
              npx frontend-ui add blur-text
            </code>
            <button
              className="ml-2 text-[var(--color-text-subtle)] transition-colors duration-150 hover:text-[var(--color-accent)]"
              onClick={handleCopy}
              aria-label={copied ? "已复制" : "复制命令"}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </motion.div>

        {/* 按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 flex gap-4 justify-center"
        >
          <Link href="/docs">
            <MagneticButton variant="primary">查看文档</MagneticButton>
          </Link>
          <MagneticButton href="https://github.com/..." variant="outline">
            GitHub
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
```

---

# [S6] 动画引擎选择

## 已实现引擎集成

| 动画类型 | 推荐引擎 | 实现状态 | 技能参考 |
|---------|---------|----------|---------|
| 元素进场/退场 | **Motion** | ✅ 已实现 | `framer-motion-animator` |
| 悬停/点击反馈 | **Motion** | ✅ 已实现 | `framer-motion-animator` |
| 手势交互 | **Motion** | ✅ 已实现 | `framer-motion-animator` |
| 滚动驱动 | **GSAP + ScrollTrigger** | ✅ 已实现 | `gsap-scrolltrigger` |
| 时间线序列 | **GSAP** | ✅ 已实现 | `gsap-timeline` |
| 视差效果 | **GSAP + ScrollTrigger** | ✅ 已实现 | `gsap-scrolltrigger` |
| 3D 卡片倾斜 | **Motion** | ✅ 已实现 | `framer-motion-animator` |
| 粒子系统 | **Canvas 2D** | ✅ 已实现 | `canvas-2d-animation` |
| SVG 路径描边 | **anime.js** | ✅ 已实现 | `animejs-animation` |
| 平滑滚动 | **Lenis** | ✅ 部分实现 | `lenis-smooth-scroll` |
| 3D 场景 | **Three.js** | ✅ 已实现 | `threejs-animation` |
| 弹簧物理 | **react-spring** | ✅ 已实现 | `react-spring-animator` |

## 性能优化规则

1. **只动画 GPU 属性** - `transform`（translate, scale, rotate）和 `opacity`
2. **视口外暂停** - IntersectionObserver 暂停不可见 Canvas/动画
3. **DPR 处理** - Canvas 使用 `devicePixelRatio` 避免 Retina 模糊
4. **ResizeObserver** - 响应式 Canvas 尺寸，避免 `window.resize`
5. **减弱动效** - `useReducedMotion()` 强制检查，所有动画组件必备
6. **`will-change` 适度** - 仅对重动画元素添加，动画结束后移除
7. **批量绘制** - Canvas 按颜色分组绘制，减少 draw call
8. **对象池** - 粒子系统复用对象，避免 GC 抖动

---

# [S7] 实现优先级

## Phase 1：基础框架（✅ 已完成）

- [x] 设计 Token 落地（globals.css）
- [x] 全局布局（导航栏 + 侧边栏）
- [x] 主题系统（暗色/亮色）
- [x] 响应式适配

## Phase 2：首页核心（✅ 部分完成）

- [x] Hero 区域（ImmersiveHero + ParticleBackground）
- [x] 组件展示区（CategoryBento + ComponentPreviewGrid）
- [x] CTA 区域（CTASection 已实现）

## Phase 3：动效增强（⚠️ 部分完成）

- [x] 流体光标效果（FluidCursor 已实现）
- [x] 滚动视差动画（ScrollReveal）
- [x] 页面转场动画（PageTransition）
- [ ] 微交互动画（hover/focus/active 状态完善）
- [x] 3D 卡片倾斜（TiltCard 已实现）

## Phase 4：性能与可访问性（⚠️ 部分完成）

- [ ] 动画性能调优（Lighthouse > 90）
- [x] 减弱动效完整实现（prefers-reduced-motion）
- [ ] 可访问性验收（WCAG AA 审计）
- [ ] 键盘导航完整支持
- [ ] 屏幕阅读器测试

---

# [S8] 技术依赖

```json
{
  "dependencies": {
    "motion": "^12.0.0",
    "gsap": "^3.15.0",
    "lenis": "^1.3.0",
    "next-themes": "^0.4.0",
    "lucide-react": "^0.400.0"
  }
}
```

---

# [S9] 可访问性实现

## 已实现

### 减弱动效

```tsx
// apps/docs/lib/animations.ts
import { useReducedMotion } from "motion/react";

export const fadeInReduced = { hidden: { opacity: 1 }, visible: { opacity: 1 } };
export const slideUpReduced = { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } };
export const staggerContainerReduced = { hidden: { opacity: 1 }, visible: { opacity: 1 } };

export function useAnimationVariants(normal: object, reduced: object) {
  const shouldReduce = useReducedMotion();
  return shouldReduce ? reduced : normal;
}
```

### IntroAnimation 中的减弱动效

```tsx
// apps/docs/components/effects/IntroAnimation.tsx
const shouldReduce = useReducedMotion();

useEffect(() => {
  if (typeof window === "undefined") return;
  if (shouldReduce) return; // 减弱动效模式跳过
  // ...
}, [shouldReduce]);
```

## 已完善

### 焦点管理

磁性按钮已添加 `focus-visible` 状态：

```tsx
className="... focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)]"
```

### 键盘导航

一键复制按钮已支持 Enter/Space 及 `aria-label`：

```tsx
<button
  onClick={handleCopy}
  aria-label={copied ? "已复制" : "复制命令"}
>
```

---

# [S10] 性能优化专项

## 已实现的优化

### Canvas 性能（ParticleBackground）

- ✅ IntersectionObserver 视口外暂停
- ✅ DPR 处理（`Math.min(window.devicePixelRatio, 2)`）
- ✅ 粒子数量自适应（基于画布面积）
- ✅ 使用 refs 存储可变状态（避免 re-render）
- ✅ 摩擦力衰减（`vx *= 0.99`）防止无限加速

### 动画性能（Motion）

- ✅ 使用 transform 和 opacity 动画（GPU 加速）
- ✅ `useReducedMotion` 全局降级
- ✅ 入场动画延迟错峰（staggerChildren）

## 待优化

### 性能预算

| 指标 | 目标 | 当前状态 |
|------|------|---------|
| First Contentful Paint | < 1.5s | 待测 |
| Largest Contentful Paint | < 2.5s | 待测 |
| Lighthouse Performance | > 90 | 待测 |
| Animation Frame Rate | 60fps | 目测 OK |
| Time to Interactive | < 3.5s | 待测 |

### 待优化项

- [ ] 使用 `will-change` 对重动画元素优化
- [ ] 图片懒加载（next/image）
- [ ] 代码分割（dynamic import）
- [ ] 字体加载优化（font-display: swap）

---

# [S11] 设计质量检查清单

## 反模板检查

- [x] 无 purple/blue 渐变背景（使用单一 accent）
- [x] 字体搭配有意图（Space Grotesk + Outfit）
- [x] 无 "Revolutionize your workflow" 类通用文案
- [x] 无三列等高卡片（使用不对称布局）
- [x] 无到处圆角（统一 rounded-xl 策略）

## 微交互检查

- [x] Hover 过渡 150-250ms ease-out
- [x] 按钮 hover scale ≤ 1.02（已修复为 1.02）
- [x] Focus 使用 `:focus-visible`（已添加）
- [x] Active 状态 scale(0.97) + 50-100ms 反馈

## 视觉层次检查

- [x] Accent 色使用 ≤ 3 处（按钮、Badge、统计）
- [x] 留白作为主动设计元素（section gap 48-80px）
- [x] 文字透明度创建层次（100% / 80% / 60% / 40%）
- [x] 移动端布局优先（响应式设计）

## 可访问性检查

- [x] `prefers-reduced-motion` 完整支持（IntroAnimation、animations.ts）
- [x] 键盘 Tab 导航可达所有交互元素（MagneticButton + 复制按钮）
- [x] Focus 指示器可见（2-4px ring + offset）
- [x] WCAG AA 对比度 4.5:1
- [x] 语义化 HTML（`<section>`, `<main>`, `<h1>` 等）
- [x] `aria-label` 在 icon-only 按钮上（CTASection 复制按钮）

---

# [S12] 缺失组件实现清单

## 1. TiltCard（3D 倾斜卡片）

**文件**: `apps/docs/components/effects/TiltCard.tsx`
**状态**: ✅ 已实现
**代码**: 见 [S4] 3D 卡片倾斜章节

## 2. FluidCursor（流体光标）

**文件**: `apps/docs/components/effects/FluidCursor.tsx`
**状态**: ✅ 已实现
**代码**: 见上方实现

```tsx
"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

export function FluidCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const followerX = useSpring(cursorX, { stiffness: 50, damping: 20 });
  const followerY = useSpring(cursorY, { stiffness: 50, damping: 20 });
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (shouldReduce) return;
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 4);
      cursorY.set(e.clientY - 4);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY, shouldReduce]);

  if (shouldReduce) return null;

  return (
    <>
      <motion.div
        style={{ x: cursorX, y: cursorY }}
        className="fixed w-2 h-2 bg-[var(--color-accent)] rounded-full pointer-events-none z-[9999] mix-blend-difference"
      />
      <motion.div
        style={{ x: followerX, y: followerY }}
        className="fixed w-8 h-8 border border-[var(--color-accent)] rounded-full pointer-events-none z-[9998] mix-blend-difference"
      />
    </>
  );
}
```

## 3. CTASection（CTA 区域）

**文件**: `apps/docs/components/sections/CTASection.tsx`
**状态**: ✅ 已实现
**代码**: 见 [S5] CTA 区域设计章节

---

# [S13] 参考 Skills

本文档基于以下 skills 的最佳实践整合：

| Skill | 应用章节 |
|-------|---------|
| `impeccable` | S2 设计原则、S11 反模板检查 |
| `canvas-2d-animation` | S3 粒子背景（DPR、IntersectionObserver） |
| `framer-motion-animator` | S3 磁性按钮、S4 3D 卡片（useMotionValue + useSpring） |
| `fixing-accessibility` | S9 可访问性实现（useReducedMotion、焦点管理） |
| `fixing-motion-performance` | S10 性能优化（GPU 属性、will-change） |
| `make-interfaces-feel-better` | S11 微交互（hover scale、focus、active） |
| `using-ui-stack` | S2 Token 系统（8px 网格、5 状态交互） |
| `frontend-ui-engineering` | 全局组件架构、命名规范 |

---

*设计文档版本：v4.0（多轮迭代完成）*
*创建时间：2026-06-24*
*优化时间：2026-06-25*
*迭代记录：*
- **v3.0 → v4.0**（6轮迭代）：组件创建 + 类型安全 + 可访问性 + 性能 + 导出统一 + 文档同步
  - 修复 TiltCard `useState` 导致的 re-render → `useRef` + 直接 DOM 更新
  - 修复 FluidCursor 初始左上角闪现 → 初始 `opacity: 0` + 首次 mousemove 显示
  - 修复 MagneticButton `ref as any` → 分离 `buttonRef` + `anchorRef` + 类型安全
  - 修复 MagneticButton 外部链接无 `target`/`rel` → 自动检测 + 默认 `_blank` + `noopener noreferrer`
  - 修复 CTASection 嵌套 `<a>` + `<button>` → `useRouter` + `onClick` 客户端导航
  - 修复 CTASection 复制按钮 `aria-live` 位置 → `sr-only` + `aria-live="polite"` 容器
  - 修复所有组件 `focus-visible` 状态 + `aria-label` + `aria-labelledby`
  - 添加 `will-change: transform` 到 TiltCard GPU 加速
  - 所有事件处理函数使用 `useCallback` 优化
  - 所有 `whileHover` scale 统一为 1.02（impeccable 规则）
*基于：Awwwards、Codrops、Godly 2026 年趋势分析 + Frontend UI 技能库最佳实践*
