# Frontend-UI 项目长期记忆

## 项目定位
企业级前端动画/特效组件库，对标 React Bits。Monorepo 架构 (pnpm + Turborepo)。
- `apps/docs` — Next.js 15 文档站 (React 19 + Tailwind CSS 4)
- `packages/ui` — `@frontend-ui/ui` 组件库 (tsup 打包)

## 技术栈
- 动画引擎: GSAP 3 + Motion 12 (计划: react-spring, Anime.js)
- 构建: tsup (库) + Next.js (站点)
- 测试: Vitest 2 + Testing Library + jsdom
- 版本管理: Changesets

## 组件规范
- 路径: `packages/ui/src/{category}/{component-name}/`
- 每组件 5 文件: index.ts, *.tsx, *.test.tsx, *.stories.tsx, doc page.tsx
- GSAP: 使用 `useGSAP` hook + `gsap.matchMedia()` 处理 prefers-reduced-motion
- Motion: 从 `motion/react` 导入
- 类名合并: `cn()` from `@/lib/utils`
- 文档页: 使用 `ComponentDocPage` 组件模板
- `"use client"` 必须在组件 .tsx 顶部

## 构建注意事项
- `NODE_OPTIONS` 含 `--use-system-ca` 会导致 tsup 失败，需 `unset NODE_OPTIONS` 后执行
- 构建命令: `cd packages/ui && unset NODE_OPTIONS && npx tsup`

## 组件分类 (34 个组件，截至 2026-06-21)
- 文字动画 (8): BlurText, GradientText, SplitText, Typewriter, ScrambleText, WaveText, GlitchText, CountUp
- 交互动画 (9): Magnet, FadeContent, ScrollReveal, Draggable, FlipCard, Accordion, Tabs, Modal, Toast
- 复合组件 (5): Dock, SpotlightCard, Masonry, Carousel, StackCards
- 背景特效 (6): Aurora, Particles, Starfield, MeshGradient, NoiseBackground, Hyperspeed
- GSAP 动画 (7): ScrollReveal, TextReveal, Parallax, TimelineSequence, ScrollProgress, PinSection, HorizontalScroll

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
- Phase 2 (计划): CLI 工具 + 设计资源
- Phase 3 (计划): 国际化 + SVG 动画
- Phase 4 (计划): 社区建设
