# 自研组件库实施路线图 — 深度调研报告

> 调研维度：从零开始构建 React UI 组件库的完整实施路径
> 调研时间：2025年7月
> 搜索次数：12次独立搜索，覆盖中英文信息源

---

## 一、关键发现总览

构建一个生产级的 React UI 组件库需要系统性地覆盖以下核心领域：**项目初始化与工具链选型**、**组件架构与 API 设计**、**样式与主题系统**、**文档与示例**、**测试与可访问性**、**发布与版本管理**。2025年的主流技术栈已从传统的 Webpack + Babel 组合明显转向 **Vite/tsup + TypeScript** 的轻量方案，同时在架构设计上 **Headless UI + 样式分离** 模式（以 Radix UI 和 shadcn/ui 为代表）已成为行业共识。[^183^][^251^][^252^]

---

## 二、项目初始化：目录结构、技术选型、开发环境配置

### 2.1 推荐技术栈（2025年）

根据多方调研，2025年构建 React 组件库的推荐技术栈已形成明确共识：[^3^][^301^][^299^]

| 类别 | 推荐工具 | 备选方案 | 说明 |
|------|----------|----------|------|
| 构建工具 | **tsup** / **Vite Library Mode** | Rollup, Rspack | tsup 适合中小型库快速发布，Vite 适合需要更复杂配置的场景 |
| 框架 | React 18+ / 19 | — | 推荐使用 React 18+ 以利用新特性 |
| 语言 | **TypeScript 5.x** | — | strict 模式必须开启 |
| 包管理 | **pnpm** + Workspaces | npm, yarn | pnpm 的 monorepo 支持更优 |
| 测试 | **Vitest** + **RTL** | Jest + RTL | Vitest 与 Vite 生态更契合 |
| 文档 | **Storybook 8** | VitePress, Docusaurus | Storybook 提供组件隔离开发和交互式文档 |
| 代码规范 | **ESLint 9** (Flat Config) + **Prettier** | Biome | ESLint 9 的新配置格式更简洁 |
| 版本管理 | **Changesets** | semantic-release | Changesets 对 monorepo 支持更灵活 |
| Monorepo | **Turborepo** | Nx | Turborepo 更轻量，Nx 更企业级 |

### 2.2 推荐目录结构

#### 方案 A：单包结构（适合中小型组件库）

```
my-react-ui-library/
├── dist/                          # 构建输出
├── src/
│   ├── index.ts                   # 主入口文件
│   ├── components/                # UI 组件目录
│   │   ├── Button/
│   │   │   ├── Button.tsx         # 组件实现
│   │   │   ├── Button.module.css  # 组件样式 (CSS Modules)
│   │   │   ├── Button.stories.tsx # Storybook 故事
│   │   │   ├── Button.test.tsx    # 测试文件
│   │   │   └── index.ts           # 组件入口
│   │   └── Card/
│   │       ├── Card.tsx
│   │       ├── Card.module.css
│   │       ├── Card.stories.tsx
│   │       ├── Card.test.tsx
│   │       └── index.ts
│   ├── hooks/                     # 自定义 Hooks
│   ├── styles/                    # 全局样式、Design Tokens
│   │   ├── tokens.css             # CSS 变量定义
│   │   └── global.css
│   └── utils/                     # 工具函数
│       └── helpers.ts
├── .storybook/                    # Storybook 配置
├── .github/                       # GitHub Actions CI/CD
│   └── workflows/
│       └── release.yml
├── .changeset/                    # Changesets 配置
├── vitest.config.ts               # Vitest 配置
├── vite.config.ts                 # Vite 配置
├── tsconfig.json                  # TypeScript 配置
├── tsup.config.ts                 # tsup 配置 (可选)
├── package.json
└── README.md
```

> 来源：综合 [^3^][^301^][^278^]

#### 方案 B：Monorepo 结构（适合大型组件库/多包管理）

```
company-monorepo/
├── apps/                          # 应用层
│   ├── web-dashboard/             # 消费示例
│   └── docs/                      # 文档站点
├── packages/
│   ├── ui-kit/                    # 核心组件库
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── styles/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── hooks/                     # 共享 hooks
│   ├── utils/                     # 共享工具
│   ├── eslint-config/             # 共享 ESLint 配置
│   └── typescript-config/         # 共享 TS 配置
├── .changeset/                    # Changesets 版本管理
├── turbo.json                     # Turborepo 构建配置
├── pnpm-workspace.yaml
└── package.json
```

> 来源：[^73^][^201^][^256^]

### 2.3 核心配置文件示例

#### TypeScript 配置（tsconfig.json）

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["dom", "dom.iterable", "esnext"],
    "jsx": "react-jsx",
    "declaration": true,
    "declarationDir": "dist/types",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.stories.tsx", "**/*.test.tsx"]
}
```

> 来源：[^3^]

#### Vite 库模式配置（vite.config.ts）

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MyUILibrary',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
```

> 来源：[^254^][^258^][^259^]

#### tsup 配置（tsup.config.ts）— 推荐用于快速发布

```typescript
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  treeshake: true,
});
```

> 来源：[^301^][^304^]

### 2.4 package.json 关键字段配置

```json
{
  "name": "@scope/my-react-ui-library",
  "version": "0.1.0",
  "description": "A React UI component library",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "default": "./dist/index.js"
    }
  },
  "files": ["dist"],
  "sideEffects": false,
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "typecheck": "tsc --noEmit",
    "prepublishOnly": "pnpm build"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

> 来源：[^301^][^70^]

**关键要点**：
- `exports` 字段是现代 npm 包的条件导出标准，必须同时支持 ESM (`import`) 和 CJS (`require`) [^301^]
- `sideEffects: false` 是启用 tree-shaking 的关键声明 [^334^]
- `peerDependencies` 将 React 声明为 peer dependency，避免将 React 打包进库中 [^3^]

---

## 三、组件开发规范：API设计、Props命名、Composition模式

### 3.1 组件设计核心原则

#### 3.1.1 受控组件优先

有赞 Zent 组件库的最佳实践表明，组件库应保持 **所有状态由 props 控制** 的设计原则，组件内部不维护 state：[^317^][^320^]

```tsx
// ✅ 推荐：完全受控的 Button 组件
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent) => void;
  href?: string;  // 支持作为链接渲染
}
```

#### 3.1.2 命名约定

行业最佳实践已形成明确的命名规范：[^279^][^278^][^295^]

| 类别 | 命名规范 | 示例 |
|------|----------|------|
| 组件文件 | PascalCase | `Button.tsx`, `Card.tsx` |
| 组件 Props 接口 | `{Component}Props` | `ButtonProps`, `CardProps` |
| Hooks 文件 | camelCase + `use` 前缀 | `useTheme.ts`, `useMediaQuery.ts` |
| 工具函数 | camelCase | `helpers.ts`, `formatDate.ts` |
| CSS Modules | `{Component}.module.css` | `Button.module.css` |
| 样式变体 prop | `variant` | `variant="primary\|secondary\|outline"` |
| 尺寸 prop | `size` | `size="sm\|md\|lg"` |
| 受控值变更回调 | `onValueChange` | `onValueChange(value: string)` |
| 开关状态回调 | `onOpenChange` | `onOpenChange(open: boolean)` |
| 样式覆盖 | `className` | 始终透传到根元素 |
| 多态渲染 | `asChild` | 如 Radix UI 的 asChild 模式 |

> 来源：[^279^][^295^][^294^]

**关键原则**：
- 使用 `onValueChange` 而非 `onChange` 以避免与原生事件冲突（Radix UI 推广此约定）[^279^]
- 使用 `variant` 而非多个 boolean prop（如 `outlined`, `ghost`），避免组合爆炸 [^279^]
- `disabled` 应始终是 boolean，不作为 variant 的一种 [^279^]

### 3.2 Composition（组合）模式

#### 3.2.1 Compound Components（复合组件）

Compound Components 是组件库中最重要的设计模式之一，多个子组件协同工作形成完整功能：[^199^][^200^][^202^][^204^]

```tsx
// ✅ Tabs 复合组件示例
<Tabs defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">Content 1</Tabs.Content>
  <Tabs.Content value="tab2">Content 2</Tabs.Content>
</Tabs>
```

实现方式使用 React Context 共享状态：[^199^]

```tsx
const TabsContext = createContext<{
  activeIndex: number;
  setActiveIndex: (i: number) => void;
} | null>(null);

function Tabs({ children, defaultValue }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      {children}
    </TabsContext.Provider>
  );
}

Tabs.List = TabList;
Tabs.Trigger = TabTrigger;
Tabs.Content = TabContent;
```

#### 3.2.2 类型安全的复合组件

使用 Component Factory Pattern 实现 TypeScript 类型安全：[^204^]

```tsx
export const createRadioGroup = <T extends string = never>() => ({
  RadioGroup: RadioGroup as (props: RadioGroupProps<T>) => ReactElement,
  RadioGroupItem: RadioGroupItem as (props: RadioGroupItemProps<T>) => ReactElement,
});

// 使用
type ThemeValue = 'system' | 'light' | 'dark';
const Theme = createRadioGroup<ThemeValue>();
```

#### 3.2.3 Headless Components 架构

Radix UI 开创的 Headless UI 模式将交互逻辑与视觉样式完全分离：[^183^][^251^][^252^]

```tsx
// 使用 Radix UI 的 Dialog 原语（无任何预设样式）
import * as Dialog from '@radix-ui/react-dialog';

<Dialog.Root>
  <Dialog.Trigger>Open Dialog</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay className="dialog-overlay" />
    <Dialog.Content className="dialog-content">
      <Dialog.Title>Dialog Title</Dialog.Title>
      <Dialog.Description>Description here</Dialog.Description>
      <Dialog.Close>Close</Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

**Headless UI 核心优势**：[^183^][^251^]
- **完全无样式**：开发者拥有全部样式控制权
- **可访问性内置**：自动处理 ARIA 属性、焦点管理、键盘导航
- **完全可组合**：通过 `asChild` prop 将行为注入到自定义组件
- **TypeScript 全类型支持**

### 3.3 Props API 设计最佳实践

#### 关键决策指南

1. **Children vs Render Props**：默认使用 `children`，仅在子组件需要父组件数据时使用 render props [^279^]
2. **Boolean Props vs String Variants**：超过两种状态时始终使用 string variant：`variant="outline"` 优于 `outlined={true}` [^279^]
3. **className 透传**：始终接受 `className` 并透传到根元素，支持样式覆盖 [^279^]
4. **受控与非受控**：交互组件应同时支持两种模式，`defaultValue` 用于非受控，`value` + `onValueChange` 用于受控 [^279^]
5. **Ref 转发**：使用 `React.forwardRef` 或 React 19 的原生 ref 支持，确保组件可以获取底层 DOM [^202^]

---

## 四、样式系统构建：从零构建主题系统

### 4.1 Design Tokens 设计令牌

Design Tokens 是现代主题系统的基础，将视觉属性（颜色、字体、间距）抽象为可复用的变量：[^219^]

```css
/* tokens.css - 基础令牌 */
:root {
  /* 颜色基础令牌 */
  --color-blue-500: #3366FF;
  --color-red-500: #dc3545;
  --color-green-500: #28a745;
  
  /* 语义化令牌 */
  --color-primary: var(--color-blue-500);
  --color-error: var(--color-red-500);
  --color-success: var(--color-green-500);
  
  /* 间距令牌 */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  /* 字体令牌 */
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  
  /* 圆角令牌 */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
}
```

### 4.2 多主题支持（浅色/深色模式）

```css
/* light-theme.css */
[data-theme="light"] {
  --color-background: #ffffff;
  --color-text: #1a1a1a;
  --color-surface: #f5f5f5;
  --color-border: #e0e0e0;
}

/* dark-theme.css */
[data-theme="dark"] {
  --color-background: #1a1a1a;
  --color-text: #ffffff;
  --color-surface: #2d2d2d;
  --color-border: #404040;
}
```

React 中实现主题切换：[^219^][^322^]

```tsx
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

### 4.3 CSS-in-JS vs CSS Modules vs CSS Variables

| 方案 | 优点 | 缺点 | 适用场景 |
|------|------|------|----------|
| **CSS Modules** | 本地作用域、无运行时开销、IDE 支持好 | 动态主题需要额外处理 | 大多数组件库的首选 |
| **CSS Variables** | 原生支持、动态主题切换无 JS 开销、可继承 | IE 不支持（已不重要） | 与 CSS Modules 配合使用 |
| **Tailwind CSS** | 开发效率高、一致的设计系统 | 学习曲线、HTML 冗长 | shadcn/ui 模式 |
| **Styled Components** | 动态样式能力强 | 运行时开销、SSR 复杂 | 需要高度动态样式的场景 |

> 综合来源：[^219^][^229^][^224^]

**2025年推荐方案**：CSS Modules + CSS Variables 的组合，或者 Tailwind CSS（如果采用 shadcn/ui 模式）。[^278^][^224^]

---

## 五、文档与示例：Storybook 配置、组件文档规范

### 5.1 Storybook 8 配置

Storybook 是组件库文档和开发环境的行业标准：[^313^][^315^][^316^]

```bash
# 初始化 Storybook
npx storybook@latest init
```

配置 `.storybook/main.ts`：

```typescript
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',      // 可访问性检查
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
```

### 5.2 组件故事编写规范

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],  // 自动生成文档
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
};

export const Loading: Story = {
  args: {
    variant: 'primary',
    loading: true,
    children: 'Loading...',
  },
};
```

> 来源：[^315^][^318^]

### 5.3 MDX 自定义文档

对于需要更丰富文档的组件，可使用 MDX 格式：[^313^][^321^][^324^]

```mdx
// Button.mdx
import { Meta, Story, ArgsTable } from '@storybook/blocks';
import * as ButtonStories from './Button.stories';

<Meta of={ButtonStories} />

# Button 组件

Button 组件用于触发用户操作，支持多种视觉变体和状态。

## 基本用法

<Story of={ButtonStories.Primary} />

## API 参考

<ArgsTable of={ButtonStories} />

## 使用指南

### 主要操作按钮

用于页面中的主要操作，每页建议只使用一个。

### 次要操作按钮

用于次要或辅助操作。
```

### 5.4 文档自动化最佳实践

1. 使用 `tags: ['autodocs']` 自动生成基础文档 [^315^]
2. 使用 `react-docgen-typescript` 自动从 TypeScript 类型生成 Props 表格 [^315^]
3. 每个组件目录下放置同名的 `.stories.tsx` 和 `.mdx` 文件
4. 在 CI 中构建 Storybook 静态站点并部署

---

## 六、测试策略与可访问性

### 6.1 测试架构

```
测试层级：
├── 单元测试 (Vitest + React Testing Library)
│   ├── 组件渲染测试
│   ├── Props 交互测试
│   └── 用户事件模拟
├── 可访问性测试 (axe-core + jest-axe/vitest-axe)
│   ├── ARIA 属性检查
│   ├── 颜色对比度
│   └── 键盘导航
├── 端到端测试 (Playwright)
│   └── 关键用户流程
└── 视觉回归测试 (Chromatic/Storybook)
    └── 组件视觉快照对比
```

> 来源：[^138^][^317^]

### 6.2 测试示例

```tsx
// Button.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### 6.3 可访问性（A11y）测试

```tsx
// 使用 axe-core 进行自动化可访问性测试
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('button has no accessibility violations', async ({ page }) => {
  await page.goto('http://localhost:6006/iframe.html?id=components-button--primary');
  
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  expect(accessibilityScanResults.violations).toHaveLength(0);
});
```

> 来源：[^138^]

### 6.4 可访问性开发要求

- 所有交互组件必须支持键盘导航 [^3^]
- 遵循 WAI-ARIA 设计模式 [^251^]
- 使用 `@axe-core/react` 在开发时自动检查 [^138^]
- 为组件编写语义化 HTML，正确使用 ARIA 属性
- 确保足够的颜色对比度（WCAG 2.1 AA 标准）

---

## 七、发布与版本管理

### 7.1 版本管理工具对比

| 工具 | 自动化程度 | Monorepo 支持 | 特点 | 推荐场景 |
|------|-----------|--------------|------|----------|
| **Changesets** | 中等（需手动创建变更集） | ✅ 优秀 | 灵活的变更集管理，适合团队协作 | **推荐用于组件库** |
| **semantic-release** | 高（全自动基于提交消息） | ⚠️ 需额外配置 | 完全自动化，基于 Conventional Commits | 自动化要求高的项目 |
| **Lerna** | 中等 | ✅ 原生支持 | 老牌 monorepo 工具，功能全面 | 大型 monorepo |
| **release-it** | 高 | ⚠️ 有限 | 轻量级 CLI，交互式发布 | 中小型项目 |

> 来源：[^303^][^223^][^228^]

### 7.2 Changesets 配置（推荐）

初始化 Changesets：[^223^][^225^][^228^]

```bash
npm i -D @changesets/cli
npx changeset init
```

配置 `.changeset/config.json`：

```json
{
  "$schema": "https://unpkg.com/@changesets/config@3.0.0/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": []
}
```

### 7.3 GitHub Actions 自动发布流程

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    branches:
      - main

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: pnpm/action-setup@v2
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: https://registry.npmjs.org

      - run: pnpm install --frozen-lockfile
      - run: pnpm run typecheck
      - run: pnpm run test
      - run: pnpm run build

      - name: Create Release Pull Request or Publish
        uses: changesets/action@v1
        with:
          version: pnpm changeset version
          publish: pnpm changeset publish
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

> 来源：[^223^][^228^][^225^]

### 7.4 Changesets 工作流

1. 开发者完成代码修改后运行 `npx changeset` [^225^]
2. 选择变更类型（patch / minor / major）并填写描述
3. Changesets 在 `.changeset/` 目录下创建变更记录文件
4. 提交 PR 时附带变更集文件
5. 合并到 main 后，Changesets Action 自动创建 "Version Packages" PR
6. 审核并合并版本 PR 后，自动发布到 npm 并创建 GitHub Release

---

## 八、Bundle 优化与 Tree Shaking

### 8.1 确保 Tree Shaking 有效的关键配置

```json
{
  "sideEffects": false,
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./button": {
      "types": "./dist/components/Button/index.d.ts",
      "import": "./dist/components/Button/index.js"
    }
  }
}
```

> 来源：[^334^][^332^]

### 8.2 Bundle 分析工具

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    // ...其他插件
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'stats.html',
    }),
  ],
});
```

> 来源：[^329^][^330^][^331^]

### 8.3 Bundle 优化最佳实践

1. **声明 `sideEffects: false`** — 告知打包器代码无副作用，可以安全 tree-shake [^334^]
2. **使用 ESM 格式** — `"module": "ESNext"` 确保输出 ES Modules [^307^]
3. **外部化 peer dependencies** — React、ReactDOM 不应被打包 [^301^]
4. **精确导入** — 避免 `import _ from 'lodash'`，改用 `import trim from 'lodash/trim'` [^330^]
5. **使用 `/* #__PURE__ */` 注释** — 标记无副作用的函数调用 [^334^]
6. **分割子路径导出** — 支持 `import { Button } from '@scope/ui/button'` [^70^]

---

## 九、实际案例分析

### 9.1 Radix UI — Headless 组件架构标杆

Radix UI 是一个开源的 headless UI 组件库，其架构设计值得深入学习：[^183^][^251^][^252^]

**核心特点**：
- **Accessibility First**：所有组件遵循 WAI-ARIA 设计模式，自动处理焦点管理、键盘导航
- **完全无样式**：只提供交互逻辑，零 CSS
- **Compound Components**：每个组件拆分为多个子部分（如 Dialog.Root, Dialog.Trigger, Dialog.Content）
- **`asChild` 模式**：允许将组件行为无缝注入到自定义元素
- **TypeScript 全类型支持**

**采用率**：截至2024年底，Radix UI 达到每周 910 万次 npm 下载量，成为 headless 组件的事实标准。[^252^]

### 9.2 shadcn/ui — 复制粘贴式组件分发

shadcn/ui 引入了革命性的"copy-paste"分发模型：[^252^]

- 不通过 npm 安装组件，而是使用 CLI 将源代码直接添加到项目中
- 基于 Radix UI 原语 + Tailwind CSS 样式
- **防止供应商锁定**：组件代码完全属于项目
- 允许 40% 更快的团队上手速度（据 DevGenius 数据）[^252^]

### 9.3 有赞 Zent — 国内组件库实践

有赞前端团队开源的 Zent 组件库提供了宝贵的工程实践经验：[^317^][^320^]

- **45+ 组件**，覆盖有赞各类 PC 业务场景
- 组件初始化命令 `yarn new-component` 自动生成目录和模板代码
- PR 标题规范：`[bug fix / breaking change / new feature] ComponentName: description`
- 发包前必须跑通全部测试
- 中英文双语文档

### 9.4 CKEditor 5 — Bundle 优化案例

CKEditor 团队通过系统优化将 bundle 大小减少了 40%：[^334^]

- 使用 `/* #__PURE__ */` 注释标记无副作用代码
- 优化 sideEffects 声明
- 替换重型依赖（如 `lodash-es` → `es-toolkit`）
- 设置最高的兼容 `target` 以包含更少 polyfill
- 使用 bundle 分析工具定位问题

---

## 十、主要参与者与来源

| 来源类型 | 代表 | 贡献领域 |
|----------|------|----------|
| 开源组件库 | Radix UI, shadcn/ui, Chakra UI, Ant Design | 架构模式、API设计 |
| 技术博客 | DronaHQ, Refine.dev, tkDodo | 入门教程、最佳实践 |
| 国内实践 | 有赞 Zent, 蚂蚁数据团队 | 工程化经验、规范 |
| 构建工具 | Vite, tsup, Rollup, esbuild | 打包配置优化 |
| 版本管理 | Changesets, semantic-release | 发布流程自动化 |
| 文档工具 | Storybook | 组件文档化 |
| 社区讨论 | GitHub Discussions, Vercel Academy | 技术选型建议 |

---

## 十一、趋势与信号

1. **Headless UI 成为主流**：Radix UI 的周下载量超过 910 万 [^252^]，shadcn/ui 的复制粘贴模式正改变组件分发方式
2. **构建工具轻量化**：tsup 和 Vite Library Mode 正在取代传统 Rollup 配置 [^301^][^304^]
3. **CSS Variables + CSS Modules** 成为样式方案的首选，替代运行时 CSS-in-JS [^219^]
4. **Changesets 超越 semantic-release** 成为 monorepo 版本管理首选 [^303^]
5. **TypeScript strict 模式** 成为组件库标配，非可选 [^220^][^278^]
6. **Bundle 大小意识增强**：tree-shaking 友好成为组件库的必要条件 [^334^][^332^]
7. **AI 辅助开发**：2025 年出现 AI 自动生成组件库 CI 配置和文档的趋势 [^73^]

---

## 十二、争议与冲突观点

### 12.1 Vite vs tsup 选择之争

- **支持 tsup**：适合中小型库，零配置，发布速度快 [^301^][^304^]
- **支持 Vite**：功能更全面，HMR 更好，适合大型项目 [^254^][^256^]
- **中立观点**：两者底层都用 esbuild/Rollup，根据项目复杂度选择 [^299^]

### 12.2 Monorepo vs 单包

- **支持 Monorepo**：组件独立发布、更细粒度的 tree-shaking [^256^]
- **支持单包**：配置简单、心智负担低、适合小型团队 [^3^]
- **混合方案**：单包开发，monorepo 模式发布（如 `@scope/ui/button` 子路径）[^70^]

### 12.3 CSS 方案之争

- **Tailwind CSS**：开发效率高，但 HTML 冗长，学习曲线存在
- **CSS Modules + CSS Variables**：运行时零开销，IDE 支持好
- **Styled Components**：动态能力强，但有运行时开销

---

## 十三、完整实施路线图（建议时序）

### Phase 1：基础搭建（1-2周）
1. 初始化项目：TypeScript + tsup/Vite
2. 配置代码规范：ESLint + Prettier
3. 配置测试：Vitest + RTL
4. 配置 Storybook
5. 设置 CI：GitHub Actions（lint + test + build）

### Phase 2：基础设施组件（2-3周）
1. 定义 Design Tokens（CSS Variables）
2. 实现 ThemeProvider
3. 构建基础组件：Button, Input, Card
4. 编写组件故事和测试
5. 建立文档模板

### Phase 3：核心组件开发（4-6周）
1. 布局组件：Stack, Grid, Flex
2. 数据录入：Select, Checkbox, Radio, Switch
3. 反馈组件：Modal, Toast, Tooltip
4. 导航组件：Tabs, Breadcrumb, Menu
5. 每个组件配套：实现 + 测试 + 文档 + 故事

### Phase 4：工程化完善（2周）
1. 配置 Changesets 版本管理
2. 设置自动发布 CI/CD
3. Bundle 分析和优化
4. 可访问性全面检查
5. 编写贡献指南

### Phase 5：持续迭代
1. 收集使用反馈
2. 新增业务组件
3. 性能优化
4. 版本迭代

---

## 十四、推荐深入调研方向

1. **React Server Components (RSC) 对组件库的影响** — 如何兼容 Next.js App Router
2. **CSS Houdini 与自定义属性** — 下一代主题系统实现
3. **微前端场景下的组件库共享** — Module Federation 集成
4. **Design Tokens 自动化** — 从 Figma 到代码的自动化链路
5. **Web Components 封装** — 组件库跨框架使用方案
6. **性能监控体系** — 组件级别的运行时性能追踪

---

*本报告基于 12 次独立网络搜索、覆盖中英文 40+ 信息源整理而成，所有发现均附有内联引用。*
