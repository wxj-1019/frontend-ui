# Frontend UI 沉浸式重构实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use compose:subagent (recommended) or compose:execute to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 基于 Awwwards、Codrops、Godly 2026 年设计趋势，对 Frontend UI 首页进行沉浸式重构，提升视觉冲击力和交互体验。

**Architecture:** 采用混合动画方案，Motion 处理基础动画，GSAP 处理复杂滚动动画。在现有 Next.js 项目结构上，添加可变字体、粒子背景、3D 卡片、磁性按钮等高级效果。

**Tech Stack:** Next.js 15, React 19, Framer Motion, GSAP, Tailwind CSS 4, TypeScript

## Global Constraints

- Node.js >= 18.0.0
- pnpm >= 9.0.0
- 所有颜色使用 CSS 变量（语义化 Token）
- 动画只动画 transform/opacity 属性（GPU 加速）
- 支持 prefers-reduced-motion 媒体查询
- WCAG AA 4.5:1 对比度标准

---

## 文件结构

```
apps/docs/
├── app/
│   ├── page.tsx                    # 首页（修改）
│   └── globals.css                 # 全局样式（修改）
├── components/
│   ├── effects/
│   │   ├── ParticleBackground.tsx  # 粒子背景（新建）
│   │   ├── MagneticButton.tsx      # 磁性按钮（新建）
│   │   ├── TiltCard.tsx            # 3D 卡片（新建）
│   │   └── FluidCursor.tsx         # 流体光标（新建）
│   ├── hero/
│   │   └── ImmersiveHero.tsx       # 沉浸式 Hero（修改）
│   └── sections/
│       ├── CategoryBento.tsx       # 分类展示（修改）
│       └── CTASection.tsx          # CTA 区域（新建）
└── lib/
    └── animations.ts               # 动画工具函数（新建）
```

---

### Task 1: 设计 Token 落地

**Covers:** [S2, S9]

**Files:**
- Modify: `apps/docs/app/globals.css`
- Create: `apps/docs/lib/animations.ts`

**Interfaces:**
- Consumes: 无
- Produces: CSS 变量定义、动画工具函数

- [ ] **Step 1: 更新 globals.css 添加设计 Token**

```css
/* 在 globals.css 中添加以下变量 */
:root {
  /* 背景色 */
  --color-bg-primary: #0a0a0f;
  --color-bg-secondary: #12121a;
  --color-bg-surface: #1a1a2e;
  
  /* 文字色 */
  --color-text-primary: #ffffff;
  --color-text-muted: #a8a8bc;
  --color-text-subtle: #8a8a9e;
  
  /* 强调色 */
  --color-accent: #00f5ff;
  --color-accent-secondary: #8b5cf6;
  --color-accent-tertiary: #ff006e;
  
  /* 边框 */
  --color-border-default: #2a2a3e;
  --color-border-subtle: rgba(255, 255, 255, 0.06);
  
  /* 交互状态 */
  --color-hover: rgba(0, 245, 255, 0.1);
  --color-focus-ring: rgba(0, 245, 255, 0.5);
  
  /* 字体 */
  --font-display: 'Space Grotesk', sans-serif;
  --font-sans: 'Outfit', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* 圆角 */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  
  /* 动画时长 */
  --duration-fast: 100ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  
  /* Easing */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* 减弱动效 */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: 创建动画工具函数**

```typescript
// apps/docs/lib/animations.ts
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const slideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const springTransition = {
  type: "spring",
  stiffness: 400,
  damping: 17,
};
```

- [ ] **Step 3: 运行开发服务器验证**

Run: `pnpm dev`
Expected: 开发服务器启动成功，无 CSS 错误

- [ ] **Step 4: 提交代码**

```bash
git add apps/docs/app/globals.css apps/docs/lib/animations.ts
git commit -m "feat: add design tokens and animation utilities"
```

---

### Task 2: 粒子背景组件

**Covers:** [S3]

**Files:**
- Create: `apps/docs/components/effects/ParticleBackground.tsx`
- Modify: `apps/docs/app/page.tsx`

**Interfaces:**
- Consumes: 无
- Produces: `<ParticleBackground />` 组件

- [ ] **Step 1: 创建粒子背景组件**

```tsx
// apps/docs/components/effects/ParticleBackground.tsx
'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const animationFrame = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles.current = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((p) => {
        // 鼠标扰动
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
          p.vx -= dx * 0.00005;
          p.vy -= dy * 0.00005;
        }

        p.x += p.vx;
        p.y += p.vy;

        // 边界检测
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // 绘制粒子
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 245, 255, ${p.opacity})`;
        ctx.fill();
      });

      animationFrame.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    resize();
    createParticles();
    animate();

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrame.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}
```

- [ ] **Step 2: 在首页引入粒子背景**

```tsx
// apps/docs/app/page.tsx
import { ParticleBackground } from '@/components/effects/ParticleBackground';

// 在 Hero 区域添加
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  <ParticleBackground />
  {/* 其他内容 */}
</section>
```

- [ ] **Step 3: 运行测试验证**

Run: `pnpm dev`
Expected: 粒子背景正常显示，鼠标移动产生扰动效果

- [ ] **Step 4: 提交代码**

```bash
git add apps/docs/components/effects/ParticleBackground.tsx apps/docs/app/page.tsx
git commit -m "feat: add particle background with mouse interaction"
```

---

### Task 3: 磁性按钮组件

**Covers:** [S5]

**Files:**
- Create: `apps/docs/components/effects/MagneticButton.tsx`
- Modify: `apps/docs/app/page.tsx`

**Interfaces:**
- Consumes: 无
- Produces: `<MagneticButton />` 组件

- [ ] **Step 1: 创建磁性按钮组件**

```tsx
// apps/docs/components/effects/MagneticButton.tsx
'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  strength = 0.3,
  className = '',
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative px-8 py-4 bg-[var(--color-accent)] text-[var(--color-bg-primary)] rounded-xl font-semibold transition-shadow ${className} ${
        isHovered ? 'shadow-[0_0_30px_rgba(0,245,255,0.5)]' : ''
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.button>
  );
}
```

- [ ] **Step 2: 在首页 CTA 区域使用**

```tsx
// apps/docs/app/page.tsx
import { MagneticButton } from '@/components/effects/MagneticButton';

// 替换原有按钮
<MagneticButton onClick={() => router.push('/docs')}>
  查看文档
</MagneticButton>
```

- [ ] **Step 3: 运行测试验证**

Run: `pnpm dev`
Expected: 按钮跟随鼠标移动，悬停时发光

- [ ] **Step 4: 提交代码**

```bash
git add apps/docs/components/effects/MagneticButton.tsx apps/docs/app/page.tsx
git commit -m "feat: add magnetic button with hover effects"
```

---

### Task 4: 3D 卡片组件

**Covers:** [S4]

**Files:**
- Create: `apps/docs/components/effects/TiltCard.tsx`
- Modify: `apps/docs/components/sections/CategoryBento.tsx`

**Interfaces:**
- Consumes: 无
- Produces: `<TiltCard />` 组件

- [ ] **Step 1: 创建 3D 卡片组件**

```tsx
// apps/docs/components/effects/TiltCard.tsx
'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export function TiltCard({ children, className = '' }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPos);
    y.set(yPos);
    setGlarePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setGlarePosition({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative bg-[var(--color-bg-secondary)] rounded-xl p-6 cursor-pointer ${className}`}
    >
      <div
        className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.15) 0%, transparent 50%)`,
        }}
      />
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: 在分类展示区使用**

```tsx
// apps/docs/components/sections/CategoryBento.tsx
import { TiltCard } from '@/components/effects/TiltCard';

// 替换原有卡片
<TiltCard>
  <div className="text-center">
    <div className="text-4xl mb-4">✨</div>
    <h3 className="text-xl font-bold text-[var(--color-text-primary)]">BlurText</h3>
    <p className="text-sm text-[var(--color-text-muted)] mt-2">模糊渐入的文字动画</p>
  </div>
</TiltCard>
```

- [ ] **Step 3: 运行测试验证**

Run: `pnpm dev`
Expected: 卡片跟随鼠标 3D 倾斜，带有光泽效果

- [ ] **Step 4: 提交代码**

```bash
git add apps/docs/components/effects/TiltCard.tsx apps/docs/components/sections/CategoryBento.tsx
git commit -m "feat: add 3D tilt card with glare effect"
```

---

### Task 5: 流体光标组件

**Covers:** [S3]

**Files:**
- Create: `apps/docs/components/effects/FluidCursor.tsx`
- Modify: `apps/docs/app/page.tsx`

**Interfaces:**
- Consumes: 无
- Produces: `<FluidCursor />` 组件

- [ ] **Step 1: 创建流体光标组件**

```tsx
// apps/docs/components/effects/FluidCursor.tsx
'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function FluidCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const followerX = useSpring(cursorX, { stiffness: 50, damping: 20 });
  const followerY = useSpring(cursorY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 4);
      cursorY.set(e.clientY - 4);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
        }}
        className="fixed w-2 h-2 bg-[var(--color-accent)] rounded-full pointer-events-none z-[9999] mix-blend-difference"
      />
      <motion.div
        style={{
          x: followerX,
          y: followerY,
        }}
        className="fixed w-8 h-8 border border-[var(--color-accent)] rounded-full pointer-events-none z-[9998] mix-blend-difference"
      />
    </>
  );
}
```

- [ ] **Step 2: 在首页引入光标**

```tsx
// apps/docs/app/page.tsx
import { FluidCursor } from '@/components/effects/FluidCursor';

// 在页面顶部添加
<div className="min-h-screen bg-[var(--color-bg-primary)]">
  <FluidCursor />
  {/* 其他内容 */}
</div>
```

- [ ] **Step 3: 运行测试验证**

Run: `pnpm dev`
Expected: 自定义光标跟随鼠标，外圈延迟跟随

- [ ] **Step 4: 提交代码**

```bash
git add apps/docs/components/effects/FluidCursor.tsx apps/docs/app/page.tsx
git commit -m "feat: add fluid cursor with spring follow"
```

---

### Task 6: 沉浸式 Hero 区域

**Covers:** [S3]

**Files:**
- Modify: `apps/docs/components/hero/ImmersiveHero.tsx`

**Interfaces:**
- Consumes: `<ParticleBackground />`, `<MagneticButton />`
- Produces: 完整的 Hero 区域

- [ ] **Step 1: 更新 Hero 区域组件**

```tsx
// apps/docs/components/hero/ImmersiveHero.tsx
'use client';

import { motion } from 'motion/react';
import { ParticleBackground } from '@/components/effects/ParticleBackground';
import { MagneticButton } from '@/components/effects/MagneticButton';
import { slideUp, staggerContainer } from '@/lib/animations';

export function ImmersiveHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6"
      >
        {/* 可变字体标题 */}
        <motion.h1
          variants={slideUp}
          className="font-display text-7xl md:text-8xl font-light text-[var(--color-text-primary)] mb-2"
          style={{ letterSpacing: '-0.02em' }}
        >
          F R O N T E N D
        </motion.h1>
        
        <motion.h1
          variants={slideUp}
          className="font-display text-7xl md:text-8xl font-black mb-6"
          style={{
            background: 'linear-gradient(90deg, #00f5ff, #8b5cf6, #ff006e)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          UI
        </motion.h1>
        
        {/* 霓虹分割线 */}
        <motion.div
          variants={slideUp}
          className="w-48 h-0.5 mx-auto mb-6"
          style={{
            background: 'linear-gradient(90deg, transparent, #00f5ff, transparent)',
          }}
        />
        
        {/* 副标题 */}
        <motion.p
          variants={slideUp}
          className="text-xl text-[var(--color-text-muted)] mb-10"
        >
          130+ 动画组件 · 多引擎架构 · 开源免费
        </motion.p>
        
        {/* CTA 按钮 */}
        <motion.div variants={slideUp} className="flex gap-4 justify-center">
          <MagneticButton>开始使用</MagneticButton>
          <MagneticButton className="bg-transparent border border-[var(--color-accent)] text-[var(--color-accent)]">
            浏览组件
          </MagneticButton>
        </motion.div>
        
        {/* 滚动提示 */}
        <motion.div
          variants={slideUp}
          className="mt-16 text-[var(--color-text-subtle)] text-sm"
        >
          ↓ 向下滚动探索
        </motion.div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: 运行测试验证**

Run: `pnpm dev`
Expected: Hero 区域完整显示，粒子背景、磁性按钮正常工作

- [ ] **Step 3: 提交代码**

```bash
git add apps/docs/components/hero/ImmersiveHero.tsx
git commit -m "feat: redesign hero with variable font and particles"
```

---

### Task 7: CTA 区域

**Covers:** [S5]

**Files:**
- Create: `apps/docs/components/sections/CTASection.tsx`
- Modify: `apps/docs/app/page.tsx`

**Interfaces:**
- Consumes: `<MagneticButton />`
- Produces: `<CTASection />` 组件

- [ ] **Step 1: 创建 CTA 区域组件**

```tsx
// apps/docs/components/sections/CTASection.tsx
'use client';

import { motion } from 'motion/react';
import { MagneticButton } from '@/components/effects/MagneticButton';
import { ScrollReveal } from '@frontend-ui/ui';
import Link from 'next/link';

export function CTASection() {
  const handleCopy = () => {
    navigator.clipboard.writeText('npx frontend-ui add blur-text');
  };

  return (
    <section className="relative border-t border-[var(--color-border-subtle)] py-24">
      {/* 背景光效 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[var(--color-accent)]/10 blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 h-60 w-60 rounded-full bg-[var(--color-accent-secondary)]/8 blur-[100px]" />
      </div>
      
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <ScrollReveal>
          <h2 className="font-display text-3xl font-bold text-[var(--color-text-primary)]">
            准备好开始了吗？
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={0.1}>
          <p className="mt-4 text-[var(--color-text-muted)]">
            安装 Frontend UI，开始构建令人印象深刻的动画界面
          </p>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]/80 backdrop-blur-sm px-6 py-4 transition-all hover:border-[var(--color-accent)]/50">
            <span className="text-sm text-[var(--color-text-subtle)]">$</span>
            <code className="font-mono text-sm text-[var(--color-text-primary)]">
              npx frontend-ui add blur-text
            </code>
            <button
              className="ml-2 text-[var(--color-text-subtle)] transition-colors hover:text-[var(--color-accent)]"
              onClick={handleCopy}
              aria-label="复制命令"
            >
              📋
            </button>
          </div>
        </ScrollReveal>
        
        <ScrollReveal delay={0.3}>
          <div className="mt-6 flex gap-4 justify-center">
            <Link href="/docs">
              <MagneticButton>查看文档</MagneticButton>
            </Link>
            <MagneticButton className="bg-transparent border border-[var(--color-accent)] text-[var(--color-accent)]">
              GitHub
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 在首页引入 CTA 区域**

```tsx
// apps/docs/app/page.tsx
import { CTASection } from '@/components/sections/CTASection';

// 替换原有 CTA 区域
<CTASection />
```

- [ ] **Step 3: 运行测试验证**

Run: `pnpm dev`
Expected: CTA 区域完整显示，磁性按钮和复制功能正常

- [ ] **Step 4: 提交代码**

```bash
git add apps/docs/components/sections/CTASection.tsx apps/docs/app/page.tsx
git commit -m "feat: add CTA section with magnetic buttons"
```

---

### Task 8: 性能优化与可访问性

**Covers:** [S6, S9]

**Files:**
- Modify: `apps/docs/app/page.tsx`
- Modify: `apps/docs/components/effects/ParticleBackground.tsx`

**Interfaces:**
- Consumes: 所有动画组件
- Produces: 优化后的页面

- [ ] **Step 1: 添加 IntersectionObserver 优化**

```tsx
// 在 ParticleBackground.tsx 中添加
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate();
        } else {
          cancelAnimationFrame(animationFrame.current);
        }
      });
    },
    { threshold: 0.1 }
  );

  if (canvasRef.current) {
    observer.observe(canvasRef.current);
  }

  return () => observer.disconnect();
}, []);
```

- [ ] **Step 2: 添加减弱动效支持**

```tsx
// 在 FluidCursor.tsx 中添加
import { useEffect, useState } from 'react';

export function FluidCursor() {
  const [shouldReduce, setShouldReduce] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduce(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setShouldReduce(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  if (shouldReduce) return null;
  
  // ... 其余代码
}
```

- [ ] **Step 3: 运行性能测试**

Run: `pnpm build && pnpm start`
Expected: 构建成功，Lighthouse 性能分数 > 90

- [ ] **Step 4: 提交代码**

```bash
git add -A
git commit -m "feat: add performance optimizations and reduced motion support"
```

---

## 自检清单

- [ ] 所有设计 Token 已落地
- [ ] 粒子背景性能优化（IntersectionObserver）
- [ ] 磁性按钮移动端降级
- [ ] 3D 卡片触摸设备禁用
- [ ] 流体光标减弱动效支持
- [ ] 所有动画支持 prefers-reduced-motion
- [ ] 键盘导航完整支持
- [ ] 对比度达到 WCAG AA 标准

---

*计划版本：v1.0*
*创建时间：2026-06-24*
