# Frontend-UI 项目长期记忆

## 项目定位

企业级前端动画/特效组件库，对标 React Bits。Monorepo 架构 (pnpm + Turborepo)。

- `apps/docs` — Next.js 15 文档站 (React 19 + Tailwind CSS 4)
- `packages/ui` — `@frontend-ui/ui` 组件库 (tsup 打包)

## 技术栈

- 动画引擎: GSAP 3 + Motion 12 + react-spring + animejs v4
- 构建: tsup (库) + Next.js (站点)
- 测试: Vitest 2 + Testing Library + jsdom
- 版本管理: Changesets

## 组件规范

- 路径: `packages/ui/src/{category}/{component-name}/`
- 每组件 5 文件: index.ts, _.tsx, _.test.tsx, \*.stories.tsx, doc page.tsx
- GSAP: 使用 `useGSAP` hook + `gsap.matchMedia()` 处理 prefers-reduced-motion
- Motion: 从 `motion/react` 导入
- 类名合并: `cn()` from `@/lib/utils`
- 文档页: 使用 `ComponentDocPage` 组件模板
- `"use client"` 必须在组件 .tsx 顶部

## 构建注意事项

- `NODE_OPTIONS` 含 `--use-system-ca` 会导致 tsup 失败，需 `unset NODE_OPTIONS` 后执行
- 构建命令: `cd packages/ui && unset NODE_OPTIONS && npx tsup`

## 组件分类 (46 组件，截至 2026-06-22)

- 文字动画 (9): BlurText, GradientText, SplitText, Typewriter, ScrambleText, WaveText, GlitchText, CountUp, **DecryptedText**
- 交互动画 (14): Magnet, FadeContent, ScrollReveal, Draggable, FlipCard, Accordion, Tabs, Modal, Toast, ClickSpark, **BlobCursor**, **CrosshairCursor**, **FloatAnimation** (react-spring), **StaggerAnimation** (animejs)
- 复合组件 (8): Dock, SpotlightCard, Masonry, Carousel, StackCards, TiltCard, **BounceCards**, **GlowCard**
- 背景特效 (6): Aurora, Particles, Starfield, MeshGradient, NoiseBackground, Hyperspeed
- GSAP 动画 (7): ScrollReveal, TextReveal, Parallax, TimelineSequence, ScrollProgress, PinSection, HorizontalScroll
- 页面区块 (5): HeroWithGradient, HeroWithParticles, BentoGrid, BentoCard, FeatureSection, PricingSection, CTASection

## Block 规范

- Block 是比组件更高层级的页面区块，每个 Block 类型可包含多个变体
- 路径: `packages/ui/src/blocks/{block-type}/`
- 3 类已实现: hero-sections（双变体）, bento-grids（网格+卡片）, feature-sections（双布局）
- Block 使用 Motion 引擎入场动画 + Canvas（粒子类）+ CSS（布局类）
- 测试需注意 ResizeObserver polyfill（已在 test-setup.ts 中添加）
- **jsdom 特殊行为**:
  - `getBoundingClientRect()` 默认返回全零！涉及除以 centerX/centerY 的计算会产生 Infinity，CSS transform 值被丢弃。测试中需 mock 返回非零值。
  - `<img alt="">` 隐式 role="presentation" 而非 "img"，查询需用 `container.querySelector('img')`。
  - Motion (framer-motion) 的 `whileHover` 可能覆盖直接设置的 `style.transform`，测试应避免依赖其值。

## CLI 工具

- 路径: `packages/cli/`
- 命令: `frontend-ui init`, `frontend-ui add <component>`, `frontend-ui list`
- 技术栈: TypeScript + Commander.js + chalk + fs-extra + prompts
- 构建: `cd packages/cli && unset NODE_OPTIONS && npx tsup`

## CSS / 设计约定

- 深空主题暗色默认 + 亮色主题
- 字体: 标题 Space Grotesk + 正文 Outfit + 代码 JetBrains Mono (via next/font/google)
- 单一品牌强调色: `--color-accent` (#00F5FF 暗色 / #0891B2 亮色)
- 语义状态色: `--color-success`, `--color-warning`
- 禁用自定义光标 (CursorEffect 已移除)
- UI 图标统一使用 lucide-react，避免 emoji
- 交互状态色使用 `color-mix(in srgb, var(--color-accent) <opacity>, transparent)` 保持单一 accent
- globals.css 中需手动添加组件所需 keyframes (如 glitch-1/glitch-2)

## Roadmap

- Phase 1 (已完成): 组件扩充 13→34
- Phase 2 (已完成): CLI 工具 + 多引擎集成
- Phase 3 (计划): 国际化 + SVG 动画
- Phase 4 (计划): 社区建设
