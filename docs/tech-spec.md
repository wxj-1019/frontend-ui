# 企业级前端动画组件库技术方案文档

> 基于 React + Next.js + Monorepo 的动画/特效组件库，聚焦高端动画交互体验

---

## 一、项目概述

### 1.1 定位

本项目是一个**企业级前端动画/特效组件库**，提供高质量、可交互、完全可定制的动画 React 组件，用于构建令人印象深刻的用户界面。

**差异化定位**：
- **Props 调节面板**：文档站提供实时 Props 调节，竞品中仅 React Bits 有类似功能
- **多引擎动画架构**：集成 GSAP、Motion、react-spring、Anime.js 等 6+ 动画库，覆盖所有动画场景
- **Blocks 区块系统**：提供预制页面区块（Hero、Bento Grid 等），超越单组件层面
- **中文生态优先**：文档、社区、示例优先中文，填补国内动画组件库空白

### 1.2 核心能力

- **130+ 动画组件**：涵盖文字动画、交互动画、复合组件、背景特效、页面区块五大领域
- **多引擎动画架构**：根据组件特性选择最佳动画引擎，提供最优质的动画体验
- **最小依赖**：轻量且支持 Tree Shaking
- **完全可定制**：通过 Props 调节一切参数，或直接编辑源码
- **Copy-Paste 就绪**：支持自研 CLI、shadcn/jsrepo 安装，也支持直接复制代码
- **实时交互演示**：文档站提供属性调节面板和实时预览
- **预制 Blocks**：提供可组合的页面区块，快速搭建落地页

### 1.3 技术选型

| 类别 | 技术 | 说明 |
|------|------|------|
| 包管理 | pnpm + Turborepo | Monorepo 管理，增量构建 |
| 框架 | Next.js 15 (App Router) | 文档站点，支持 SSR/SEO |
| 样式 | Tailwind CSS 4 | 原子化 CSS，配合自定义动画插件 |
| 动画引擎 | GSAP + Motion + react-spring + Anime.js | 多引擎架构，覆盖所有动画场景 |
| 滚动引擎 | Lenis | 平滑滚动体验 |
| 3D 渲染 | Three.js (按需) | 背景特效和 3D 组件 |
| 语言 | TypeScript 5 | 严格模式 |
| 文档 | 自定义 Next.js 交互演示 + Storybook | 产品级文档站 + 组件开发调试 |
| 测试 | Vitest + Testing Library | 单元测试 + 组件测试 |
| Lint | ESLint + Prettier | 代码规范 |
| 版本 | Changesets | 变更日志与版本发布 |
| Git | Husky + lint-staged | 提交前检查 |

### 1.4 竞品对比

| 维度 | React Bits | Aceternity UI | Magic UI | shadcn/ui | **本方案** |
|------|-----------|---------------|----------|-----------|-------------|
| 定位 | 动画组件集 | 动画+组件+模板 | 动画组件 | 通用UI基础 | 动画组件库 |
| 组件数 | ~50 | 200+(含模板) | 150+ | 50+ | 计划130+ |
| 动画引擎 | CSS为主 | Motion | Motion | 无 | 多引擎(6+) |
| Props调节 | ✓ | ✗ | ✗ | ✗ | ✓ |
| Blocks | ✗ | ✓ | ✓ | ✓ | ✓ |
| 自研CLI | ✗ | ✗ | ✗ | ✓(shadcn) | ✓ |
| 中文生态 | ✗ | ✗ | ✗ | ✗ | ✓ |

---

## 二、项目架构

### 2.1 Monorepo 结构

```
frontend-ui/
├── apps/
│   └── docs/                      # Next.js 15 文档站点 (端口 3000)
│       ├── app/
│       │   ├── (categories)/
│       │   │   ├── text-animations/    # 文字动画分类页
│       │   │   ├── animations/         # 交互动画分类页
│       │   │   ├── components/         # 复合组件分类页
│       │   │   ├── backgrounds/        # 背景特效分类页
│       │   │   └── blocks/            # 页面区块分类页
│       │   ├── showcase/              # 用户案例展示页
│       │   ├── layout.tsx
│       │   └── page.tsx
│       ├── components/
│       │   ├── ComponentPreview/    # 实时预览组件
│       │   ├── PropsPanel/          # 属性调节面板
│       │   ├── CodeBlock/           # 代码展示与复制
│       │   └── BlockPreview/        # 区块预览组件
│       ├── lib/
│       │   └── component-registry.ts  # 组件注册表
│       ├── next.config.ts
│       ├── package.json
│       └── tsconfig.json
├── packages/
│   ├── ui/                        # 动画组件库包
│   │   ├── src/
│   │   │   ├── text-animations/   # 文字动画组件
│   │   │   ├── animations/        # 交互动画组件
│   │   │   ├── components/        # 复合组件
│   │   │   ├── backgrounds/       # 背景特效组件
│   │   │   ├── blocks/            # 页面区块组件
│   │   │   │   ├── hero-sections/
│   │   │   │   ├── bento-grids/
│   │   │   │   ├── feature-sections/
│   │   │   │   ├── pricing-sections/
│   │   │   │   └── cta-sections/
│   │   │   ├── hooks/             # 动画相关 Hooks
│   │   │   ├── lib/
│   │   │   │   └── utils.ts       # cn() 工具函数
│   │   │   └── index.ts           # 统一导出
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vitest.config.ts
│   └── cli/                       # 自研 CLI 工具包
│       ├── src/
│       │   ├── commands/
│       │   │   ├── add.ts          # 添加组件
│       │   │   ├── init.ts         # 初始化项目
│       │   │   └── list.ts         # 列出可用组件
│       │   └── index.ts
│       └── package.json
├── .storybook/                    # Storybook 配置
├── .changeset/                    # Changesets 配置
├── pnpm-workspace.yaml
├── turbo.json
├── package.json
├── tsconfig.base.json
├── .eslintrc.json
├── .prettierrc
└── .gitignore
```

### 2.2 组件分类体系

按**功能领域**分类，新增 Blocks 页面区块类别：

| 分类 | 说明 | 示例组件 |
|------|------|---------|
| **Text Animations** | 文字动画效果 | BlurText, SplitText, GradientText, DecryptedText, ShinyText |
| **Animations** | 交互动画效果 | Magnet, FadeContent, ClickSpark, BlobCursor, Crosshair |
| **Components** | 复合 UI 组件 | Dock, Carousel, SpotlightCard, BounceCards, InfiniteMenu |
| **Backgrounds** | 背景特效 | Aurora, Particles, Hyperspeed, Ballpit, GridMotion |
| **Blocks** | 页面区块 | HeroSection, BentoGrid, FeatureSection, PricingSection, CTASection |

### 2.3 组件目录规范

每个组件独立目录，包含：

```
packages/ui/src/{category}/{component-name}/
├── index.ts                          # 统一导出
├── {component-name}.tsx              # 组件实现
├── {component-name}.stories.tsx      # Storybook 故事
├── {component-name}.test.tsx         # 单元测试
└── types.ts                          # 类型定义（可选）
```

### 2.4 Blocks 目录规范

Blocks 是可组合的页面区块，比单个组件更高层级：

```
packages/ui/src/blocks/hero-sections/
├── index.ts
├── hero-with-gradient.tsx            # 渐变背景 Hero
├── hero-with-3d.tsx                  # 3D 背景 Hero
├── hero-with-parallax.tsx            # 视差 Hero
├── hero-sections.stories.tsx
└── types.ts
```

---

## 三、核心依赖分析

### 3.1 动画引擎（多引擎架构）

本组件库采用**多引擎架构**，根据组件特性和使用场景选择最佳动画引擎：

| 库 | 用途 | 安装方式 | 包体积 | 适用场景 |
|----|------|---------|--------|---------|
| `gsap` + `@gsap/react` | 时间轴动画、复杂序列动画 | peerDependencies | ~30KB | ScrollTrigger、Timeline、复杂动画序列 |
| `motion` (Framer Motion) | React 声明式动画、手势交互 | peerDependencies | ~30KB | 声明式动画、布局动画、手势 |
| `react-spring` | 弹簧物理动画 | peerDependencies | ~19KB | 自然物理感动画、流畅过渡 |
| `animejs` (Anime.js) | SVG 动画、路径绘制 | peerDependencies | ~24KB | SVG 变形、路径动画、Stagger |
| `auto-animate` | 零配置动画 | dependencies | ~4KB | 快速添加基础过渡动画 |
| `tailwindcss-animate` | Tailwind 动画插件 | dependencies | <1KB | CSS 动画类名增强 |
| `lenis` | 平滑滚动 | peerDependencies | ~10KB | 丝滑滚动体验 |
| `three` + `@react-three/fiber` + `@react-three/drei` | 3D 渲染（按需） | optionalDependencies | ~150KB | 3D 背景和特效组件 |
| `@use-gesture/react` | 手势识别 | dependencies | ~5KB | 拖拽、缩放等手势支持 |

### 3.2 动画引擎选择策略

根据组件类型选择最佳动画引擎：

| 组件类型 | 首选引擎 | 备选引擎 | 选择理由 |
|---------|---------|---------|---------|
| 文字动画 | Motion | GSAP | 声明式 API 更简洁 |
| 滚动触发动画 | GSAP (ScrollTrigger) | - | ScrollTrigger 功能最强大 |
| 复杂时间轴 | GSAP (Timeline) | Anime.js | GSAP 时间轴控制最精确 |
| 物理弹簧动画 | react-spring | Motion | 弹簧物理更自然 |
| SVG 路径动画 | Anime.js | GSAP | Anime.js SVG 工具最丰富 |
| 布局动画 | Motion | - | layout prop 一行搞定 |
| 手势交互 | Motion + @use-gesture | - | 生态最成熟 |
| 零配置快速动画 | AutoAnimate | tailwindcss-animate | 一行代码添加动画 |
| 3D 动画 | Three.js + R3F | - | React 3D 生态首选 |

### 3.3 动画库生态概览

| 库 | GitHub Stars | npm 周下载 | 生态成熟度 | 社区活跃度 |
|----|-------------|-----------|-----------|-----------|
| GSAP | 25k+ | 3M+ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Motion (Framer Motion) | 23k+ | 55M+ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| react-spring | 28k+ | 4M+ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Anime.js | 40k+ | 13M+ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| AutoAnimate | 13k+ | 1M+ | ⭐⭐⭐ | ⭐⭐⭐ |
| tailwindcss-animate | 2k+ | 91M+ | ⭐⭐⭐⭐ | ⭐⭐⭐ |

### 3.4 样式与工具

| 库 | 用途 |
|----|------|
| `tailwindcss` | 原子化 CSS |
| `tailwind-merge` | 合并 Tailwind 类名 |
| `clsx` | 条件类名组合 |
| `class-variance-authority` | 组件变体管理 |
| `lucide-react` | 图标库 |

### 3.5 CLI 工具依赖

| 库 | 用途 |
|----|------|
| `commander` | 命令行参数解析 |
| `prompts` | 交互式提示 |
| `fs-extra` | 文件操作增强 |
| `cosmiconfig` | 配置文件查找 |

---

## 四、与竞品的差异与优势

### 4.1 架构差异

| 维度 | React Bits | Aceternity UI | 本方案 | 优势说明 |
|------|-----------|---------------|--------|---------|
| 动画引擎 | CSS为主 | Motion | 多引擎(6+) | 覆盖所有动画场景 |
| UI 框架 | ChakraUI v3 | Tailwind | Tailwind CSS 4 | 更轻量，无运行时依赖 |
| Monorepo | 单项目 | 单项目 | pnpm + Turborepo | 更利于长期维护和独立发布 |
| 组件分发 | jsrepo + shadcn | npm/Copy | 自研CLI + npm + shadcn | 多渠道分发 |
| 多版本 | 4 变体 | 仅 TS-TW | 仅 TS-TW | 聚焦现代标准，减少维护成本 |
| 页面区块 | ✗ | ✓(付费) | ✓(免费) | 免费提供预制 Blocks |
| Props调节 | ✓ | ✗ | ✓ | 核心差异化功能 |

### 4.2 关键优势

1. **多引擎动画架构**：集成 6+ 动画库，根据场景选择最佳引擎，覆盖 100% 动画需求
2. **Props 调节面板**：文档站实时调节参数，所见即所得
3. **免费 Blocks**：预制页面区块，快速搭建落地页
4. **自研 CLI**：`npx frontend-ui add <component>` 一键安装
5. **中文生态**：文档、社区、示例优先中文

---

## 五、文档站设计

### 5.1 页面结构

```
/                              # 首页：组件库概览
├── /text-animations           # 文字动画分类页
│   ├── /blur-text             # 单个组件演示页
│   ├── /split-text
│   └── ...
├── /animations                # 交互动画分类页
├── /components                # 复合组件分类页
├── /backgrounds               # 背景特效分类页
├── /blocks                    # 页面区块分类页
│   ├── /hero-sections         # Hero 区块
│   ├── /bento-grids           # Bento Grid 区块
│   ├── /feature-sections      # Feature 区块
│   └── ...
├── /showcase                  # 用户案例展示
├── /get-started               # 快速开始指南
└── /docs                      # API 文档
```

### 5.2 组件演示页结构

每个组件页面包含：

1. **实时预览区**：组件实际渲染效果
2. **属性调节面板**：滑动条、开关等调节 Props（核心差异化）
3. **代码展示区**：当前配置对应的代码，支持一键复制
4. **API 文档**：Props 表格、类型定义
5. **安装命令**：自研 CLI / shadcn / jsrepo 命令

### 5.3 Block 演示页结构

每个 Block 页面包含：

1. **全屏预览**：区块在真实页面中的效果
2. **响应式切换**：桌面/平板/手机预览
3. **代码展示**：完整区块代码，支持一键复制
4. **组合示例**：展示多个 Block 的组合效果

### 5.4 核心组件

| 组件 | 说明 |
|------|------|
| `ComponentPreview` | 包裹组件，提供隔离的渲染环境 |
| `PropsPanel` | 根据组件 Props 类型自动生成调节面板 |
| `CodeBlock` | 代码展示，支持语法高亮和复制 |
| `CategoryGrid` | 分类页组件卡片网格 |
| `BlockPreview` | 区块预览，支持响应式切换 |

### 5.5 Showcase 页面

展示使用本组件库构建的真实网站，建立社区信任：

```
/showcase
├── /portfolio       # 个人作品集案例
├── /saas           # SaaS 产品案例
├── /landing-page   # 落地页案例
└── /submit         # 提交你的项目
```

---

## 六、开发规范

### 6.1 组件开发规范

1. **命名**：PascalCase，语义化（如 `BlurText` 而非 `TextBlur`）
2. **Props**：全部可选，提供合理的默认值
3. **类型**：导出组件 Props 类型接口
4. **动画策略**（多引擎选择）：
   - 简单动画：CSS 动画 / tailwindcss-animate / AutoAnimate
   - 声明式动画：Motion (Framer Motion)
   - 物理弹簧动画：react-spring
   - 复杂时间轴/ScrollTrigger：GSAP
   - SVG 路径动画：Anime.js
   - 布局动画：Motion (layout prop)
   - 手势交互：Motion + @use-gesture
5. **性能**：使用 `will-change`、`transform` 优化，避免布局抖动

### 6.2 GSAP React 最佳实践

> ⚠️ 所有 GSAP 组件必须遵循以下规范，否则会导致内存泄漏或 SSR 错误：

```
GSAP React 规范：
├── ✅ 使用 useGSAP() Hook（自动清理，替代 useEffect + ctx.revert()）
├── ✅ 使用 ref 作为 target，传入 scope（避免全局选择器污染）
├── ✅ 使用 autoAlpha 替代 opacity（含 visibility:hidden 优化）
├── ✅ 使用 gsap.matchMedia() 统一处理响应式+减弱动效
├── ✅ 使用 quickTo() 处理高频更新（光标跟随、滚动）
├── ✅ 使用 stagger 替代手动 delay
├── ❌ 禁止在 SSR 中调用 gsap.*（Next.js 必须客户端执行）
├── ❌ 禁止使用 selector 作为 target 而不传 scope
├── ❌ 禁止跳过清理（ctx.revert() 或 useGSAP 自动清理）
└── ❌ 禁止在 SSR 期间创建 ScrollTrigger
```

**useGSAP Hook 规范**：
```tsx
// ✅ 推荐写法
"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function MyComponent() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.to(boxRef.current, { x: 100 });
  }, { scope: containerRef, dependencies: [someValue] });

  return <div ref={containerRef}>...</div>;
}

// ❌ 禁止写法
useEffect(() => {
  const ctx = gsap.context(() => { ... }, containerRef);
  return () => ctx.revert();
}, []);
```

**quickTo 规范**（光标跟随等高频场景）：
```tsx
// ✅ 使用 quickTo（60fps）
useGSAP(() => {
  const xTo = gsap.quickTo(element, "x", { duration: 0.4, ease: "power3" });
  const yTo = gsap.quickTo(element, "y", { duration: 0.4, ease: "power3" });
  window.addEventListener("mousemove", (e) => { xTo(e.pageX); yTo(e.pageY); });
});

// ❌ 禁止使用普通 tween（性能差）
gsap.to(element, { x: mouseX, y: mouseY, duration: 0.4 });
```

### 6.3 文件模板

```tsx
// packages/ui/src/text-animations/blur-text/blur-text.tsx
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export function BlurText({
  text,
  className,
  delay = 0,
  duration = 0.5,
}: BlurTextProps) {
  return (
    <motion.span
      className={cn("inline-block", className)}
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ delay, duration }}
    >
      {text}
    </motion.span>
  );
}
```

### 6.4 GSAP 组件模板（使用 useGSAP Hook）

```tsx
// packages/ui/src/animations/scroll-reveal/scroll-reveal.tsx
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
}

export function ScrollReveal({
  children,
  className,
  direction = "up",
  duration = 1,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const directionOffset = {
      up: { y: 50 },
      down: { y: -50 },
      left: { x: 50 },
      right: { x: -50 },
    };

    gsap.from(containerRef.current, {
      opacity: 0,
      autoAlpha: 0, // autoAlpha = opacity + visibility:hidden
      ...directionOffset[direction],
      duration,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: containerRef, dependencies: [direction, duration] });

  return (
    <div ref={containerRef} className={cn(className)}>
      {children}
    </div>
  );
}
```

**关键优化点**：
- 使用 `useGSAP()` Hook 替代 `useEffect`，自动处理清理（revert on unmount）
- 使用 `autoAlpha` 替代 `opacity`（包含 visibility:hidden 优化）
- 使用 `scope` 限定选择器范围，避免全局污染
- 使用 `gsap.matchMedia()` 统一处理响应式和 prefers-reduced-motion：

```tsx
// 使用 matchMedia 统一处理响应式+减弱动效
useGSAP(() => {
  const mm = gsap.matchMedia();

  mm.add({
    reduceMotion: "(prefers-reduced-motion: reduce)",
    isDesktop: "(min-width: 768px)",
  }, (context) => {
    const { reduceMotion } = context.conditions;

    gsap.from(containerRef.current, {
      opacity: 0,
      y: reduceMotion ? 0 : 50,
      duration: reduceMotion ? 0 : 1,
      scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
    });

    return () => {}; // cleanup
  });
}, { scope: containerRef });
```

### 6.5 react-spring 组件模板

```tsx
// packages/ui/src/animations/spring-bounce/spring-bounce.tsx
"use client";

import { animated, useSpring } from "@react-spring/web";
import { cn } from "@/lib/utils";

export interface SpringBounceProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
}

export function SpringBounce({
  children,
  className,
  scale = 1.1,
}: SpringBounceProps) {
  const [spring, api] = useSpring(() => ({
    scale: 1,
    config: { tension: 300, friction: 10 },
  }));

  return (
    <animated.div
      className={cn("inline-block cursor-pointer", className)}
      style={spring}
      onMouseEnter={() => api.start({ scale })}
      onMouseLeave={() => api.start({ scale: 1 })}
    >
      {children}
    </animated.div>
  );
}
```

### 6.6 Anime.js 组件模板

```tsx
// packages/ui/src/animations/svg-morph/svg-morph.tsx
"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { animate } from "animejs";

export interface SvgMorphProps {
  className?: string;
  pathFrom: string;
  pathTo: string;
  duration?: number;
}

export function SvgMorph({
  className,
  pathFrom,
  pathTo,
  duration = 1000,
}: SvgMorphProps) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;

    const animation = animate(pathRef.current, {
      d: [pathFrom, pathTo],
      duration,
      loop: true,
      alternate: true,
      ease: "inOutQuad",
    });

    return () => animation.cancel();
  }, [pathFrom, pathTo, duration]);

  return (
    <svg className={cn("w-full h-full", className)} viewBox="0 0 100 100">
      <path ref={pathRef} d={pathFrom} fill="currentColor" />
    </svg>
  );
}
```

### 6.7 AutoAnimate 组件模板

```tsx
// packages/ui/src/components/animated-list/animated-list.tsx
"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import autoAnimate from "@formkit/auto-animate";

export interface AnimatedListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  className?: string;
}

export function AnimatedList<T>({
  items,
  renderItem,
  className,
}: AnimatedListProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current, {
        duration: 300,
        easing: "ease-in-out",
      });
    }
  }, []);

  return (
    <div ref={parentRef} className={cn("space-y-2", className)}>
      {items.map((item, index) => (
        <div key={index}>{renderItem(item)}</div>
      ))}
    </div>
  );
}
```

---

## 七、构建与发布

### 7.1 构建流程

```bash
# 构建组件库
pnpm --filter @frontend-ui/ui build

# 构建文档站
pnpm --filter docs build

# 构建 CLI
pnpm --filter @frontend-ui/cli build

# 构建 Storybook
pnpm storybook:build
```

### 7.2 发布流程

```bash
# 生成变更集
pnpm changeset

# 版本升级
pnpm changeset version

# 发布
pnpm changeset publish
```

### 7.3 组件分发

| 方式 | 命令 | 说明 |
|------|------|------|
| 自研 CLI | `npx frontend-ui add blur-text` | 推荐方式，自动处理依赖 |
| npm 包 | `npm install @frontend-ui/ui` | 完整安装 |
| shadcn | `npx shadcn@latest add @frontend-ui/blur-text` | shadcn 兼容 |
| jsrepo | `npx jsrepo add @frontend-ui/ui` | jsrepo 兼容 |
| Copy-Paste | 直接从文档站复制代码 | 零依赖 |

---

## 八、社区与生态

### 8.1 社区渠道

| 渠道 | 说明 | 启动时间 |
|------|------|---------|
| GitHub Discussions | 技术问答、功能请求 | Phase 2 |
| Discord 社区 | 实时交流、反馈收集 | Phase 2 |
| 微信群 | 中文用户交流 | Phase 2 |
| 贡献指南 | 开发者贡献流程 | Phase 2 |

### 8.2 贡献者激励

- **Contributor Badge**：在文档站展示贡献者
- **Components Bounty**：组件开发悬赏
- **Showcase 投稿**：展示使用本库的项目

### 8.3 文档国际化

- 默认中文，支持切换英文
- 社区贡献翻译

---

## 九、Roadmap

### Phase 1: 脚手架搭建 ✓（当前）
- [x] Monorepo 配置
- [x] 组件库基础结构
- [x] 文档站基础结构
- [x] Storybook 配置
- [x] 代码规范工具

### Phase 2: 核心组件开发（并行文档站）
**组件开发（30个核心组件，展示多引擎能力）**：
- [ ] Text Animations（8 个）：BlurText, SplitText, GradientText, DecryptedText, ShinyText, TypewriterText, GlitchText, NeonText
- [ ] Animations（8 个）：Magnet, FadeContent, ClickSpark, ScrollReveal, Parallax, MagneticButton, HoverScale, RotateOnHover
- [ ] Components（7 个）：Dock, Carousel, SpotlightCard, BounceCards, InfiniteMenu, TiltCard, FlipCard
- [ ] Backgrounds（4 个）：Aurora, Particles, Hyperspeed, GridMotion
- [ ] Blocks（3 个）：HeroSection, BentoGrid, FeatureSection

**多引擎展示**：
- [ ] GSAP 组件示例：ScrollReveal, Parallax, Timeline
- [ ] Motion 组件示例：FadeContent, Layout动画
- [ ] react-spring 组件示例：SpringBounce, 物理弹簧效果
- [ ] Anime.js 组件示例：SvgMorph, 路径动画
- [ ] AutoAnimate 组件示例：AnimatedList, 零配置过渡

**文档站同步**：
- [ ] 每个组件配文档页
- [ ] Props 调节面板
- [ ] 代码复制功能
- [ ] 搜索与筛选

**社区启动**：
- [ ] GitHub Discussions
- [ ] 贡献指南
- [ ] Discord/微信群

### Phase 3: Blocks 与生态
- [ ] Blocks 区块扩展（20+ 区块）
- [ ] Showcase 用户案例页
- [ ] 自研 CLI 工具
- [ ] 暗色模式切换
- [ ] i18n 国际化

### Phase 4: 分发与商业化
- [ ] npm 包发布
- [ ] shadcn 集成
- [ ] jsrepo 注册表
- [ ] Pro 版本（高级组件/模板）
- [ ] 模板市场

---

*文档更新时间：2026-06-20*
