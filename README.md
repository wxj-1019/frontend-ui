# Frontend UI

企业级前端动画组件库，对标 React Bits。

## 特性

- **53+ 动画组件**：涵盖文本动画、交互组件、GSAP 动画、背景特效等
- **TypeScript**：完整类型支持
- **Tree-shakable**：按需导入，减小包体积
- **Tailwind CSS 4**：基于 CSS 的样式方案
- **Motion + GSAP**：支持 Framer Motion 和 GSAP 两套动画引擎
- **无障碍访问**：内置 ARIA 属性支持
- **CLI 工具**：快速添加组件到项目

## 快速开始

### 安装

```bash
pnpm add @frontend-ui/ui
```

### 使用

```tsx
import { BlurText, GradientText } from '@frontend-ui/ui';

function App() {
  return (
    <div>
      <BlurText text="Hello World" />
      <GradientText text="Animated Text" />
    </div>
  );
}
```

## 组件分类

| 分类                | 组件                                                                                                                                                                                      |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Text Animations** | BlurText, GradientText, SplitText, Typewriter, ScrambleText, WaveText, GlitchText, CountUp, DecryptedText, SpringNumber                                                                   |
| **Animations**      | Magnet, FadeContent, Draggable, ClickSpark, FlipCard, Accordion, Tabs, Modal, Toast, BlobCursor, CrosshairCursor, FloatAnimation, StaggerAnimation, MorphingSvg, SpringMorph, SvgPathDraw |
| **GSAP Animations** | ScrollReveal, TextReveal, Parallax, TimelineSequence, ScrollProgress, PinSection, HorizontalScroll                                                                                        |
| **Components**      | SpotlightCard, Dock, Masonry, Carousel, StackCards, TiltCard, GlowCard, BounceCards                                                                                                       |
| **Backgrounds**     | Aurora, Particles, Starfield, MeshGradient, NoiseBackground, Hyperspeed                                                                                                                   |
| **Blocks**          | HeroSections, FeatureSections, CTASections, PricingSections, BentoGrids                                                                                                                   |
| **Hooks**           | SmoothScrollProvider, useMousePosition                                                                                                                                                    |

## 开发

```bash
# 安装依赖
pnpm install

# 启动开发服务
pnpm dev

# 运行测试
pnpm test

# 代码检查
pnpm lint

# 构建
pnpm build

# 启动 Storybook
pnpm storybook
```

## 项目结构

```
frontend-ui/
├── packages/
│   ├── ui/          # 核心组件库
│   └── cli/         # CLI 工具
├── apps/
│   └── docs/        # 文档站点 (Next.js)
└── package.json
```

## License

MIT
