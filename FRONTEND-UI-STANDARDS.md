---
name: frontend-ui-standards
description: Frontend UI 项目组件与文件规范 — 目录结构、命名约定、代码风格、类型安全、动画模式、测试要求、设计系统一致性。所有贡献者必须遵循。
---

# Frontend UI 组件与文件规范

> 本文档整合了项目现有 skills 中的最佳实践，是 Frontend UI 贡献者的必读规范。

---

## 1. 目录结构规范

### 1.1 Monorepo 布局

```
frontend-ui/
├── apps/
│   └── docs/                    # Next.js 文档站
│       ├── app/                 # App Router 路由
│       ├── components/          # 站点专属组件（非复用）
│       ├── lib/                 # 注册表、工具函数
│       └── package.json
├── packages/
│   ├── ui/                      # 核心组件库（发布到 npm）
│   │   ├── src/
│   │   │   ├── text-animations/ # 13 个文字动画组件
│   │   │   ├── animations/      # 20 个动画交互组件
│   │   │   ├── components/     # 12 个 UI 组件
│   │   │   ├── backgrounds/    # 9 个背景组件
│   │   │   ├── gsap-animations/# 7 个 GSAP 组件
│   │   │   ├── blocks/         # 5 个布局区块
│   │   │   ├── hooks/          # 自定义 Hooks
│   │   │   ├── lib/            # 工具函数（cn 等）
│   │   │   └── test-utils/     # 测试工具
│   │   └── package.json
│   └── cli/                     # CLI 工具
│       ├── src/
│       │   ├── commands/         # init, add, list
│       │   └── utils/            # 注册表、安装器
│       └── package.json
├── .storybook/                  # Storybook 配置
├── docs/                        # 项目文档（非代码）
│   ├── tech-spec.md
│   ├── design-spec.md
│   └── FRONTEND-UI-STANDARDS.md  # ← 本文件
├── skills/                      # AI 技能库
│   ├── design/                  # 19 个设计技能
│   └── tech/                    # 29 个技术技能
├── pnpm-workspace.yaml
├── turbo.json
└── package.json
```

### 1.2 组件目录结构（强制）

每个组件必须遵循以下文件结构：

```
packages/ui/src/{category}/{component-name}/
├── {component-name}.tsx        # 组件源码（必须）
├── {component-name}.test.tsx   # 测试文件（必须）
├── {component-name}.stories.tsx # Storybook 故事（必须）
├── index.ts                    # 导出文件（必须）
└── README.md                   # 组件说明（可选，复杂组件推荐）
```

**示例：**
```
packages/ui/src/text-animations/blur-text/
├── blur-text.tsx
├── blur-text.test.tsx
├── blur-text.stories.tsx
└── index.ts
```

---

## 2. 命名规范

### 2.1 文件命名

| 类型 | 命名规则 | 示例 |
|------|---------|------|
| 组件文件 | kebab-case.tsx | `blur-text.tsx` |
| 测试文件 | kebab-case.test.tsx | `blur-text.test.tsx` |
| 故事文件 | kebab-case.stories.tsx | `blur-text.stories.tsx` |
| 工具文件 | camelCase.ts | `useMousePosition.ts` |
| 目录名 | kebab-case | `blur-text/` |
| 类型文件 | PascalCase.ts | `AnimationTypes.ts` |

### 2.2 代码命名

| 类型 | 规则 | 示例 |
|------|------|------|
| 组件名 | PascalCase | `BlurText`, `FadeContent` |
| Props 接口 | `ComponentNameProps` | `BlurTextProps` |
| Hook 名 | camelCase，前缀 use | `useMousePosition` |
| 工具函数 | camelCase | `cn`, `clamp` |
| 常量 | UPPER_SNAKE_CASE | `DEFAULT_DURATION` |
| 布尔 props | is/has/can 前缀 | `isLoading`, `hasError` |
| 事件回调 | on + 动作 | `onClick`, `onComplete`, `onDragEnd` |

### 2.3 导出规范

```typescript
// index.ts — 统一导出
export { BlurText } from './blur-text';
export type { BlurTextProps } from './blur-text';

// 禁止默认导出（default export）
// ❌ export default BlurText;
// ✅ export { BlurText };
```

---

## 3. 组件代码规范

### 3.1 文件头部（必须）

```tsx
// packages/ui/src/text-animations/blur-text/blur-text.tsx
'use client';  // 所有组件库文件必须使用 'use client'

import { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

// 1. 类型定义
export interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

// 2. 组件实现
export function BlurText({
  text,
  className,
  delay = 0,
  duration = 0.5,
}: BlurTextProps) {
  // 组件逻辑...
  return (
    <motion.span className={cn('inline-block', className)}>
      {text}
    </motion.span>
  );
}

// 3. displayName（forwardRef 组件必须）
BlurText.displayName = 'BlurText';
```

### 3.2 Props 设计规范

```typescript
// ✅ 好的 Props 设计：defaults + 可选 + 扩展
export interface ComponentProps {
  // 必需 props
  text: string;
  
  // 可选 props with defaults
  className?: string;
  delay?: number;        // default: 0
  duration?: number;     // default: 0.5
  
  // 回调
  onComplete?: () => void;
  onError?: (error: Error) => void;
  
  // 条件渲染
  as?: 'h1' | 'h2' | 'p' | 'span';  // 多态组件
}

// ❌ 不好的 Props 设计
interface BadProps {
  text: string;          // 缺少 className
  customClass?: string; // 不用 className
  animationSpeed?: number; // 命名不一致
  handleClick?: () => void; // 不用 onClick 前缀
}
```

### 3.3 forwardRef 规范

```tsx
import { forwardRef } from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'destructive';
  size?: 'default' | 'sm' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'default', isLoading, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md',
          variant === 'primary' && 'bg-primary text-primary-foreground',
          variant === 'destructive' && 'bg-destructive text-destructive-foreground',
          size === 'sm' && 'h-9 px-3',
          size === 'lg' && 'h-11 px-8',
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? 'Loading...' : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

---

## 4. 样式规范

### 4.1 Tailwind CSS 使用规则

```tsx
// ✅ 使用 cn() 合并类名
import { cn } from '@/lib/utils';

className={cn(
  'base-classes',
  condition && 'conditional-classes',
  'responsive:md:classes',
  className  // 允许外部覆盖
)}

// ✅ 使用 Tailwind 语义化颜色 token
className="bg-primary text-primary-foreground hover:bg-primary/90"

// ❌ 禁止使用硬编码颜色
className="bg-[#3b82f6] text-[#ffffff]"  // ❌ 禁止
className="bg-blue-500"  // ❌ 禁止（不用 Tailwind 默认色）
```

### 4.2 设计系统一致性（8px 网格）

```
Spacing Scale (Tailwind):
  1 (4px)   → p-1, m-1, gap-1
  2 (8px)   → p-2, m-2, gap-2
  3 (12px)  → p-3, m-3, gap-3
  4 (16px)  → p-4, m-4, gap-4
  5 (20px)  → p-5, m-5, gap-5
  6 (24px)  → p-6, m-6, gap-6
  8 (32px)  → p-8, m-8, gap-8
  10 (40px) → p-10, m-10, gap-10
  12 (48px) → p-12
  16 (64px) → p-16
  20 (80px) → p-20
  24 (96px) → p-24

禁止值：p-2.5, m-3.5, gap-7 等非标准值
```

### 4.3 5 状态交互模型

每个交互元素必须定义 5 种状态：

```tsx
<button
  className={cn(
    // 1. Default
    'bg-primary text-primary-foreground',
    // 2. Hover
    'hover:bg-primary/90',
    // 3. Focus
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    // 4. Active
    'active:scale-95',
    // 5. Disabled
    'disabled:opacity-50 disabled:cursor-not-allowed'
  )}
/>
```

### 4.4 圆角策略

项目统一使用 **Subtle** 策略：

```
按钮:    rounded-md  (6px)
卡片:    rounded-lg  (8px)
输入框:  rounded-md  (6px)
标签:    rounded-full (pill)
模态框:  rounded-lg  (8px)
```

---

## 5. 动画规范

### 5.1 动画引擎选择决策表

| 场景 | 推荐引擎 | 原因 |
|------|---------|------|
| 简单 enter/exit | Motion | 声明式 API，React 原生 |
| 复杂 timeline | GSAP | 时间线控制最佳 |
| 物理弹簧效果 | react-spring | 弹簧物理参数可调 |
| SVG 路径描边 | anime.js | strokeDashoffset 最简 |
| 滚动触发动画 | GSAP + ScrollTrigger | 滚动联动最成熟 |
| 平滑滚动 | Lenis | 平滑滚动体验 |
| 3D 效果 | Three.js | WebGL 渲染 |
| 轻量 CSS 效果 | CSS | 性能最优 |

### 5.2 动画性能铁律

```tsx
// ✅ 只动画这些属性（GPU 加速）
transform: translateX, translateY, translateZ, scale, rotate, skew
opacity

// ❌ 绝不动画这些属性（触发 layout）
width, height, top, left, margin, padding, border-width
```

### 5.3 prefers-reduced-motion（强制）

```tsx
import { useReducedMotion } from 'motion/react'; // 或对应引擎的 hook

function AnimatedComponent() {
  const prefersReducedMotion = useReducedMotion();
  // 或：const prefersReducedMotion = typeof window !== 'undefined' && 
  //      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
    />
  );
}
```

### 5.4 动画时长规范

```
微交互 (hover, focus):  150-200ms
状态切换:               200-300ms
页面过渡:               300-500ms
复杂序列:               500-1000ms
背景动画:               连续循环
```

### 5.5 缓动函数规范

```tsx
// 标准缓动（UI 交互）
const easeStandard = [0.4, 0, 0.2, 1];      // 等效 ease-out
const easeDecelerate = [0, 0, 0.2, 1];      // 等效 ease-out
const easeAccelerate = [0.4, 0, 1, 1];      // 等效 ease-in

// 推荐：使用 cubic-bezier 数组
<motion.div
  transition={{ ease: [0.16, 1, 0.3, 1] }}
/>
```

---

## 6. 类型规范

### 6.1 类型定义位置

```tsx
// ✅ 组件 Props 与组件同文件
// blur-text.tsx
export interface BlurTextProps { ... }
export function BlurText(props: BlurTextProps) { ... }

// ✅ 复用类型放到 types/ 目录
// packages/ui/src/types/animation.ts
export interface AnimationCallbacks {
  onStart?: () => void;
  onComplete?: () => void;
}

// ✅ 工具类型
// packages/ui/src/types/utils.ts
export type VariantProps<T extends (...args: any[]) => any> = ...;
```

### 6.2 严格类型检查

```typescript
// tsconfig.json 必须启用：
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true
  }
}
```

### 6.3 as const 与 satisfies

```typescript
// ✅ 使用 as const 保证不可变
const VARIANTS = ['default', 'primary', 'destructive'] as const;
export type Variant = (typeof VARIANTS)[number];

// ✅ 使用 satisfies 约束类型但不加宽
const config = {
  duration: 1000,
  easing: 'ease-in-out' as const,
} satisfies AnimationConfig;
```

---

## 7. 测试规范

### 7.1 测试文件模板

```tsx
// blur-text.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BlurText } from './blur-text';

describe('BlurText', () => {
  it('renders with default props', () => {
    render(<BlurText text="Hello" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<BlurText text="Hello" className="custom" />);
    expect(container.firstChild).toHaveClass('custom');
  });

  it('calls onComplete when animation finishes', async () => {
    const onComplete = vi.fn();
    render(<BlurText text="Hello" onComplete={onComplete} />);
    // 动画完成后验证...
  });

  it('matches snapshot', () => {
    const { container } = render(<BlurText text="Hello" />);
    expect(container).toMatchSnapshot();
  });
});
```

### 7.2 测试覆盖率要求

| 组件类型 | 目标覆盖率 | 必测内容 |
|---------|----------|---------|
| Text Animations | 90% | Props, animation completion, callback |
| Animations | 85% | Events, state transitions, cleanup |
| Components | 90% | Accessibility, keyboard nav, focus |
| Backgrounds | 70% | Canvas rendering, resize, cleanup |
| GSAP | 75% | ScrollTrigger, timeline |
| Blocks | 80% | Layout, responsive |
| Hooks | 95% | Return values, cleanup, edge cases |

### 7.3 可访问性测试（强制）

```tsx
import { toHaveNoViolations } from 'jest-axe';
import { axe } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('has no accessibility violations', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## 8. Storybook 规范

### 8.1 故事文件结构

```tsx
// blur-text.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { BlurText } from './blur-text';

const meta: Meta<typeof BlurText> = {
  title: 'Text Animations/BlurText',  // 分类/组件名
  component: BlurText,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    delay: { control: { type: 'range', min: 0, max: 2, step: 0.1 } },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { text: 'Hello World' },
};

export const LongText: Story = {
  args: { text: 'The quick brown fox...', delay: 0.05 },
};
```

### 8.2 分类规则

```
侧边栏结构：
├── Text Animations
│   ├── BlurText
│   ├── GradientText
│   └── ...
├── Animations
│   ├── FadeContent
│   ├── Magnet
│   └── ...
├── Components
│   ├── Button
│   ├── Card
│   └── ...
├── Backgrounds
│   ├── Particles
│   ├── Starfield
│   └── ...
├── GSAP Animations
│   ├── ScrollReveal
│   └── ...
├── Blocks
│   ├── HeroSection
│   └── ...
└── Hooks
    ├── useMousePosition
    └── ...
```

---

## 9. 文档站规范

### 9.1 文档页结构

```tsx
// apps/docs/app/(docs)/text-animations/[slug]/page.tsx
import { ComponentPreview } from '@/components/component-preview';
import { ComponentProps } from '@/components/component-props';
import { componentRegistry } from '@/lib/component-registry';

export default function ComponentPage({ params }: { params: { slug: string } }) {
  const component = componentRegistry.find(c => c.slug === params.slug);
  
  return (
    <div>
      <h1>{component.name}</h1>
      <p>{component.description}</p>
      
      {/* 实时预览 */}
      <ComponentPreview component={component} />
      
      {/* 安装方式 */}
      <InstallTabs component={component.name} />
      
      {/* Props 表格 */}
      <ComponentProps props={component.props} />
      
      {/* 代码示例 */}
      <CodeExample code={component.example} />
    </div>
  );
}
```

### 9.2 组件注册表同步（强制）

新增组件后必须更新 `apps/docs/lib/component-registry.ts`：

```typescript
export const componentRegistry = [
  // ... 已有组件
  {
    name: 'NewComponent',
    slug: 'new-component',
    category: 'text-animations',
    description: 'Component description',
    props: [
      { name: 'text', type: 'string', required: true, description: '...' },
    ],
  },
];
```

---

## 10. 提交规范

### 10.1 Commit Message 格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type 类型：**

| 类型 | 说明 | 示例 |
|------|------|------|
| `feat` | 新功能 | `feat(text-animations): add GlitchText component` |
| `fix` | 修复 | `fix(animations): resolve Magnet hover bug` |
| `docs` | 文档 | `docs: update README` |
| `style` | 格式 | `style: format with prettier` |
| `refactor` | 重构 | `refactor(components): simplify Button logic` |
| `test` | 测试 | `test(backgrounds): add Particles canvas tests` |
| `chore` | 构建 | `chore: update dependencies` |
| `perf` | 性能 | `perf: optimize particle rendering` |

### 10.2 Changeset 规范

每次发布版本前必须添加 changeset：

```bash
pnpm changeset
# 选择受影响的包
# 选择版本类型 (patch/minor/major)
# 写变更描述
```

---

## 11. 新增组件完整流程

```
1. 确定组件类别 → 选 {text-animations|animations|components|backgrounds|gsap-animations|blocks|hooks}
2. 创建目录结构 → mkdir packages/ui/src/{category}/{component-name}
3. 编写组件代码 → {component}.tsx + interface
4. 编写测试 → {component}.test.tsx（覆盖率达标）
5. 编写 Story → {component}.stories.tsx
6. 创建 index.ts → export { Component } from './component'
7. 更新注册表 → apps/docs/lib/component-registry.ts
8. 编写文档 → 文档站添加页面
9. 运行测试 → pnpm --filter @frontend-ui/ui test
10. 运行 lint → pnpm --filter @frontend-ui/ui lint
11. 运行 build → pnpm --filter @frontend-ui/ui build
12. 添加 changeset → pnpm changeset
```

---

## 12. 快速检查清单

### 新增组件前检查

- [ ] 目录结构符合规范
- [ ] 文件命名符合 kebab-case
- [ ] 使用 `'use client'` 指令
- [ ] Props 接口导出为 `ComponentNameProps`
- [ ] 使用 `cn()` 合并类名
- [ ] 允许外部 `className` 覆盖
- [ ] 支持 `prefers-reduced-motion`
- [ ] 使用设计系统 Token（非硬编码颜色）
- [ ] 遵循 8px 网格间距
- [ ] 5 状态交互模型完整
- [ ] 测试文件已编写
- [ ] Storybook 故事已编写
- [ ] 组件注册表已更新
- [ ] `index.ts` 导出正确
- [ ] `displayName` 已设置（forwardRef 组件）

---

> **参考 skills：** `frontend-ui-engineering`, `typescript-component-types`, `component-testing`, `monorepo-engineering`, `shadcn`, `using-ui-stack`, `impeccable`, `storybook-patterns`

*Version: 1.0.0 | Frontend UI Component Standards*
