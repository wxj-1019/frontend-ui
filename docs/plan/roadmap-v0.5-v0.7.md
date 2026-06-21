# Frontend UI — 后续开发路线图

> 根据 2026-06-22 合规审计结果及项目路线规划，按 **C → A → B** 优先级推进

| 版本 | 阶段    | 主题         | 预估组件数 | 预计工时 |
| ---- | ------- | ------------ | ---------- | -------- |
| v0.5 | Phase C | 补齐缺失组件 | 39 → 44    | 2-3 天   |
| v0.6 | Phase A | 多引擎集成   | 44 → 48+   | 3-4 天   |
| v0.7 | Phase B | CLI 工具     | 48         | 2-3 天   |

---

## Phase C：补齐缺失组件

### 目标

根据 tech-spec 和竞品对标，补全 5 个缺失组件，将组件总数从 39 提升至 44。

### 任务分解

#### C1 — DecryptedText（文字动画）

| 项目 | 内容                                                                                      |
| ---- | ----------------------------------------------------------------------------------------- |
| 路径 | `packages/ui/src/text-animations/decrypted-text/`                                         |
| 引擎 | Motion                                                                                    |
| 描述 | 类似 ScrambleText 但更精确的逐字符解密动画，可指定解密后的最终文本                        |
| 文件 | `decrypted-text.tsx`, `decrypted-text.test.tsx`, `decrypted-text.stories.tsx`, `index.ts` |

**Props 设计：**

- `text: string` — 最终显示的文本
- `speed?: number` — 解密速度 (default 50ms)
- `chars?: string` — 用于混淆的字符集
- `revealDirection?: 'left' | 'right' | 'center'` — 解密方向
- `as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'p'` — 渲染标签
- `onComplete?: () => void` — 解密完成回调

**验收标准：**

1. ✅ 逐字符从混淆字符变为目标文本
2. ✅ 支持 `revealDirection` 三种方向
3. ✅ 鼠标悬停/点击可触发重新解密
4. ✅ `onComplete` 回调在全部解密完成后触发
5. ✅ 测试覆盖：渲染、方向、回调、重新触发

---

#### C2 — BlobCursor（鼠标特效）

| 项目 | 内容                                                                             |
| ---- | -------------------------------------------------------------------------------- |
| 路径 | `packages/ui/src/animations/blob-cursor/`                                        |
| 引擎 | Canvas + rAF                                                                     |
| 描述 | 鼠标跟随的 SVG/Canvas 流体气泡变形效果，类似 Magnetic 但呈球形变形               |
| 文件 | `blob-cursor.tsx`, `blob-cursor.test.tsx`, `blob-cursor.stories.tsx`, `index.ts` |

**实现思路：**

- Canvas 渲染一个弹性球体，跟随鼠标位置
- 使用正弦波扰动实现流体变形
- 鼠标快速移动时产生拖尾拉伸效果
- 性能优化：`IntersectionObserver` 暂停 + 视口内才启动

**Props 设计：**

- `color?: string` — 气泡颜色 (default `var(--color-accent)`)
- `size?: number` — 气泡半径 (default 80)
- `blobiness?: number` — 变形程度 (default 0.4)
- `speed?: number` — 跟随速度 (default 0.1)
- `mixBlendMode?: string` — 混合模式

**验收标准：**

1. ✅ 流体气泡跟随鼠标移动，带弹性延迟
2. ✅ 鼠标快速移动时产生拖尾变形
3. ✅ 支持 `prefers-reduced-motion` 时静态显示
4. ✅ 测试覆盖：渲染 Canvas、颜色 prop、禁用动画
5. ✅ 触屏设备自动禁用

---

#### C3 — BounceCards（复合组件）

| 项目 | 内容                                                                                |
| ---- | ----------------------------------------------------------------------------------- |
| 路径 | `packages/ui/src/components/bounce-cards/`                                          |
| 引擎 | Motion (spring)                                                                     |
| 描述 | 多张卡片叠放，悬停/点击时弹跳展开，类似 StackCards 但用弹簧物理                     |
| 文件 | `bounce-cards.tsx`, `bounce-cards.test.tsx`, `bounce-cards.stories.tsx`, `index.ts` |

**Props 设计：**

- `items: { id: string; content: ReactNode }[]` — 卡片列表
- `stackOffset?: number` — 叠放偏移量 (default 8)
- `spreadDistance?: number` — 展开间距 (default 60)
- `trigger?: 'hover' | 'click'` — 触发方式
- `onCardClick?: (id: string) => void`

**验收标准：**

1. ✅ 默认叠放展示，每张卡片可见部分偏移
2. ✅ 触发后弹簧物理展开，卡片依次排列
3. ✅ 点击卡片触发 `onCardClick`
4. ✅ 关闭后卡片弹簧归位
5. ✅ 测试覆盖：渲染、展开、点击回调

---

#### C4 — CrosshairCursor（鼠标特效）

| 项目 | 内容                                                                                            |
| ---- | ----------------------------------------------------------------------------------------------- |
| 路径 | `packages/ui/src/animations/crosshair-cursor/`                                                  |
| 引擎 | Canvas + rAF                                                                                    |
| 描述 | 瞄准镜/十字线光标，追踪鼠标位置，带环形波纹扩散效果                                             |
| 文件 | `crosshair-cursor.tsx`, `crosshair-cursor.test.tsx`, `crosshair-cursor.stories.tsx`, `index.ts` |

**Props 设计：**

- `size?: number` — 十字线尺寸 (default 30)
- `color?: string` — 颜色 (default `var(--color-accent)`)
- `ringCount?: number` — 波纹环数量 (default 3)
- `strokeWidth?: number` — 线宽 (default 1.5)
- `opacity?: number` — 整体不透明度 (default 0.6)

**验收标准：**

1. ✅ 十字线跟随鼠标，带 100ms 弹簧延迟
2. ✅ 鼠标点击时产生环形波纹扩散
3. ✅ 触屏设备自动隐藏
4. ✅ 测试覆盖：渲染 Canvas、尺寸 prop、点击波纹

---

#### C5 — GlowCard（复合组件）

| 项目 | 内容                                                                       |
| ---- | -------------------------------------------------------------------------- |
| 路径 | `packages/ui/src/components/glow-card/`                                    |
| 引擎 | Motion + CSS                                                               |
| 描述 | 边框发光追踪卡片，鼠标悬停时在边框上产生渐变流光效果                       |
| 文件 | `glow-card.tsx`, `glow-card.test.tsx`, `glow-card.stories.tsx`, `index.ts` |

**实现思路：**

- 参考 SpotlightCard 的鼠标位置追踪逻辑
- 在边框上绘制渐变发光轨道，沿鼠标位置旋转
- 使用 CSS `conic-gradient` + Motion `rotate` 动画

**Props 设计：**

- `children: ReactNode`
- `glowColor?: string` — 发光颜色
- `glowWidth?: number` — 发光宽度 (default 2)
- `animationSpeed?: number` — 流光速度 (default 3s)
- `borderRadius?: string` — 圆角

**验收标准：**

1. ✅ 边框发光轨道平滑跟随鼠标
2. ✅ 鼠标离开后发光渐隐，不突兀消失
3. ✅ 测试覆盖：children、className、禁用发光
4. ✅ 与现有 SpotlightCard 视觉不冲突

---

### Phase C 整体验收标准

| #     | 标准                                                         | 验证方式                     |
| ----- | ------------------------------------------------------------ | ---------------------------- |
| C-AC1 | 5 个组件全部创建（含测试、Stories、barrel export、doc page） | 目录结构检查                 |
| C-AC2 | 组件总数 39 → 44                                             | `component-registry.ts` 计数 |
| C-AC3 | TypeScript 0 errors（packages/ui + apps/docs）               | `tsc --noEmit`               |
| C-AC4 | 全部 119+ 测试通过                                           | `vitest run`                 |
| C-AC5 | tsup 构建成功                                                | `tsup`                       |
| C-AC6 | Sidebar + 首页 stats 同步更新                                | 视觉确认                     |

---

## Phase A：多引擎集成

### 目标

按 tech-spec 承诺集成 2 个新动画引擎（react-spring + Anime.js），创建 4+ 个基于新引擎的组件，覆盖弹簧物理和 SVG 路径动画场景。

### 任务分解

#### A1 — 安装 react-spring + 创建示例组件

| 项目   | 内容                                             |
| ------ | ------------------------------------------------ |
| 依赖   | `@react-spring/web`                              |
| 新组件 | `SpringNumber`（弹簧数字动画）                   |
| 路径   | `packages/ui/src/text-animations/spring-number/` |

**SpringNumber Props：**

- `value: number` — 目标值
- `precision?: number` — 小数位数 (default 0)
- `duration?: number` — 动画时长 (default 2000)
- `format?: (val: number) => string` — 自定义格式化

**验收标准：**

1. ✅ `@react-spring/web` 成功安装且 `tsup` 构建无报错
2. ✅ SpringNumber 从初始值弹簧过渡到目标值
3. ✅ 组件引用方式与其他组件一致（`@frontend-ui/ui` 导出）

#### A2 — react-spring 进阶组件：SpringMorph

| 项目 | 内容                                               |
| ---- | -------------------------------------------------- |
| 路径 | `packages/ui/src/animations/spring-morph/`         |
| 描述 | 形态变化过渡，包裹任意元素时在多个内容之间弹簧过渡 |

**Props 设计：**

- `morphKey: string | number` — 切换触发值
- `children: ReactNode` — 需过渡的内容
- `config?: SpringConfig` — 弹簧配置覆写

**验收标准：**

1. ✅ `morphKey` 变化时内容以弹簧形变动画过渡
2. ✅ 支持自定义弹簧配置

#### A3 — 安装 Anime.js + 创建示例组件

| 项目   | 内容                                        |
| ------ | ------------------------------------------- |
| 依赖   | `animejs`                                   |
| 新组件 | `SvgPathDraw`（SVG 路径描边动画）           |
| 路径   | `packages/ui/src/animations/svg-path-draw/` |

**SvgPathDraw Props：**

- `path: string` — SVG path `d` 属性
- `duration?: number` — 描边时长 (default 2000)
- `color?: string` — 描边颜色
- `strokeWidth?: number` — 线宽 (default 2)
- `loop?: boolean` — 是否循环
- `reverse?: boolean` — 是否反向绘制

**验收标准：**

1. ✅ `animejs` 成功安装且构建无报错
2. ✅ SVG path 从起点到终点逐段描边绘制
3. ✅ 支持 loop 循环

#### A4 — Anime.js 进阶：MorphingSVG

| 项目 | 内容                                       |
| ---- | ------------------------------------------ |
| 路径 | `packages/ui/src/animations/morphing-svg/` |
| 描述 | SVG 路径变形动画，多条 path 之间平滑变形   |

**Props 设计：**

- `paths: string[]` — 要变形的 path 数组
- `duration?: number` — 每次变形时长
- `interval?: number` — 自动播放间隔
- `onCycle?: (index: number) => void`

**验收标准：**

1. ✅ 多条 path 之间平滑变形（morph）
2. ✅ 支持自动轮播或手动控制
3. ✅ path 节点数不同的自动插值填充

#### A5 — Lenis 平滑滚动集成

| 项目 | 内容                                    |
| ---- | --------------------------------------- |
| 依赖 | `lenis` + `@darkroom.engineering/lenis` |
| 集成 | 在 docs 站点中作为可选功能              |
| 组件 | `SmoothScrollProvider`                  |

**验收标准：**

1. ✅ Lenis 成功安装并初始化
2. ✅ Next.js App Router 兼容（正确 cleanup）
3. ✅ 不影响 GSAP ScrollTrigger 的正常工作

---

### Phase A 整体验收标准

| #     | 标准                                              | 验证方式              |
| ----- | ------------------------------------------------- | --------------------- |
| A-AC1 | 2 个新引擎成功集成到 Monorepo                     | `pnpm ls` + tsup 构建 |
| A-AC2 | 4+ 个新组件全部实现并导出                         | 组件浏览页面可见      |
| A-AC3 | 组件总数 44 → 48+                                 | 注册表计数            |
| A-AC4 | 所有组件测试通过                                  | `vitest run`          |
| A-AC5 | 构建产物不含未使用的引擎代码（Tree Shaking 验证） | 检查 dist 产物大小    |

---

## Phase B：CLI 工具

### 目标

创建 `packages/cli/`，实现 `npx frontend-ui add <component>` 工作流，对标 shadcn CLI 但差异化定位为动画组件专项。

### 任务分解

#### B1 — CLI 脚手架

| 项目 | 内容                               |
| ---- | ---------------------------------- |
| 路径 | `packages/cli/`                    |
| 入口 | `src/index.ts` → `bin/frontend-ui` |
| 技术 | Commander.js + prompts + fs-extra  |
| 命名 | `@frontend-ui/cli`                 |

**验收标准：**

1. ✅ `npx frontend-ui add <component>` 执行成功
2. ✅ 输出帮助信息（`--help`）
3. ✅ Monorepo 中 `pnpm -F @frontend-ui/cli build` 构建成功

#### B2 — 组件选择交互

| 项目 | 内容                 |
| ---- | -------------------- |
| 交互 | 交互式命令行选择器   |
| 功能 | 搜索、分类过滤、多选 |

**验收标准：**

1. ✅ `npx frontend-ui` 无参数时显示分类列表
2. ✅ 支持模糊搜索过滤组件
3. ✅ 支持多选批量添加组件
4. ✅ 显示组件预览信息（名称、描述、引擎标签）

#### B3 — 组件源码复制

| 项目 | 内容                                     |
| ---- | ---------------------------------------- |
| 核心 | 将组件源码复制到用户项目的对应目录       |
| 流程 | 解析组件 → 复制源码 → 更新 barrel export |

**验收标准：**

1. ✅ 正确识别组件文件列表（.tsx, .stories.tsx, .test.tsx, index.ts）
2. ✅ 复制到用户指定的目标目录（默认 `src/components/ui/`）
3. ✅ 自动生成或更新 barrel export
4. ✅ 输出成功信息包含导入语句

#### B4 — 依赖管理

| 项目 | 内容                       |
| ---- | -------------------------- |
| 功能 | 自动检查并安装组件所需依赖 |

**验收标准：**

1. ✅ 根据组件元数据检测缺少的 peerDependencies
2. ✅ 提示用户运行安装命令（或自动运行）
3. ✅ 输出详细的 `package.json` 变更说明

#### B5 — 配置文件支持

| 项目 | 内容                                |
| ---- | ----------------------------------- |
| 功能 | 支持 `frontend-ui.config.json` 配置 |
| 选项 | 目标目录、包管理器、样式框架等      |

**验收标准：**

1. ✅ 读取项目根目录的 `frontend-ui.config.json`
2. ✅ 支持 `--config` 参数指定配置文件路径
3. ✅ CLI 参数优先级高于配置文件

---

### Phase B 整体验收标准

| #     | 标准                                      | 验证方式                                      |
| ----- | ----------------------------------------- | --------------------------------------------- |
| B-AC1 | `packages/cli/` 目录结构完整，构建通过    | `tsup`                                        |
| B-AC2 | 核心工作流端到端测试通过                  | 在临时目录运行完整流程                        |
| B-AC3 | 交互式界面用户友好                        | 手动测试搜索/过滤/多选                        |
| B-AC4 | 与 Monorepo 集成，root workspace 可以引用 | `pnpm -F docs exec frontend-ui add tilt-card` |

---

## 路线图总览

```
现在                          v0.5                          v0.6                          v0.7
  │                           │                              │                             │
  ▼                           ▼                              ▼                             ▼
┌─────────┐          ┌──────────────────┐          ┌──────────────────┐          ┌──────────────────┐
│ 39 组件  │   ──→    │ 44 组件          │   ──→    │ 48+ 组件         │   ──→    │ 48+ 组件          │
│ 2 引擎   │          │ 2 引擎           │          │ 4 引擎           │          │ 4 引擎 + CLI      │
│ 无 CLI   │          │ 无 CLI           │          │ 无 CLI           │          │ 有 CLI            │
└─────────┘          └──────────────────┘          └──────────────────┘          └──────────────────┘
                           Phase C                        Phase A                        Phase B
                     补齐 5 个缺失组件              集成 react-spring + Anime.js     CLI 工具 + Lenis
```

## 长期展望（Phase D+）

| 阶段 | 主题        | 说明                                            |
| ---- | ----------- | ----------------------------------------------- |
| D    | 文档站增强  | BlockPreview 组件、i18n 国际化、Showcase 子页面 |
| E    | 社区建设    | GitHub Issues 模板、贡献指南、Storybook 部署    |
| F    | 设计资源    | Figma 组件库、Figma to Code 工作流              |
| G    | 高级 Blocks | 数据仪表盘、全屏导航、定价页面、多步骤表单      |

---

_本文档由 AI 辅助生成，具体实现时可根据实际情况调整优先级和范围。_
