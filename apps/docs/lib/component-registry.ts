/**
 * 组件注册表 — 集中管理所有 56 个组件和区块的元数据
 *
 * 用于导航、分类页面、搜索、侧边栏等场景。
 * 与 category pages 中的硬编码数据同步，避免多处维护。
 */

// ─── 类型定义 ───────────────────────────────────────────────

export interface ComponentEntry {
  /** 组件名称（PascalCase） */
  name: string;
  /** 中文描述 */
  description: string;
  /** 文档路径（相对于 /docs） */
  href: string;
  /** 组件分类 */
  category: Omit<ComponentCategory, "count">;
  /** 动画引擎标识 */
  engine?: "GSAP" | "Motion" | "CSS" | "react-spring" | "Anime.js" | "Lenis";
  /** npm 安装包子路径（用于 CLI 安装） */
  installName: string;
  /** 组件导入语句 */
  importStatement: string;
}

export interface ComponentCategory {
  /** 分类标识（英文 kebab-case） */
  id: string;
  /** 分类中文名 */
  label: string;
  /** 分类描述 */
  description: string;
  /** 文档路径前缀 */
  href: string;
  /** 该分类下的组件数量 */
  count: number;
}

// ─── 分类定义 ───────────────────────────────────────────────

export const CATEGORIES: ComponentCategory[] = [
  {
    id: 'text-animations',
    label: '文字动画',
    description: '为文字添加各种动态效果，提升视觉表现力',
    href: '/text-animations',
    count: 13,
  },
  {
    id: 'animations',
    label: '交互动画',
    description: '为用户交互添加流畅的动画反馈',
    href: '/animations',
    count: 21,
  },
  {
    id: 'components',
    label: '复合组件',
    description: '可直接使用的高级交互组件',
    href: '/components',
    count: 13,
  },
  {
    id: 'backgrounds',
    label: '背景特效',
    description: '为页面添加动态背景效果',
    href: '/backgrounds',
    count: 11,
  },
  {
    id: 'gsap-animations',
    label: 'GSAP 动画',
    description:
      '基于 GSAP 的高性能动画组件，支持 ScrollTrigger、Timeline 等强大功能',
    href: '/gsap-animations',
    count: 7,
  },
  {
    id: 'blocks',
    label: '页面区块',
    description: '开箱即用的完整页面组件，复制粘贴即可使用',
    href: '/blocks',
    count: 7,
  },
];

// ─── 组件注册表 ───────────────────────────────────────────────

/**
 * 所有 60 个组件的完整注册表
 */
export const COMPONENT_REGISTRY: ComponentEntry[] = [
  // ── 文字动画 (10) ────────────────────────────────────────
  {
    name: 'BlurText',
    description: '模糊渐入的文字动画效果，逐字符从模糊到清晰',
    href: '/text-animations/blur-text',
    category: CATEGORIES[0],
    engine: 'Motion',
    installName: 'blur-text',
    importStatement: 'import { BlurText } from "@frontend-ui/ui";',
  },
  {
    name: 'GradientText',
    description: '渐变色彩的文字效果',
    href: '/text-animations/gradient-text',
    category: CATEGORIES[0],
    engine: 'CSS',
    installName: 'gradient-text',
    importStatement: 'import { GradientText } from "@frontend-ui/ui";',
  },
  {
    name: 'SplitText',
    description: '文字分割动画效果',
    href: '/text-animations/split-text',
    category: CATEGORIES[0],
    engine: 'Motion',
    installName: 'split-text',
    importStatement: 'import { SplitText } from "@frontend-ui/ui";',
  },
  {
    name: 'Typewriter',
    description: '打字机效果，逐字符显示文本',
    href: '/text-animations/typewriter',
    category: CATEGORIES[0],
    engine: 'CSS',
    installName: 'typewriter',
    importStatement: 'import { Typewriter } from "@frontend-ui/ui";',
  },
  {
    name: 'ScrambleText',
    description: '乱码解密文字效果',
    href: '/text-animations/scramble-text',
    category: CATEGORIES[0],
    engine: 'Motion',
    installName: 'scramble-text',
    importStatement: 'import { ScrambleText } from "@frontend-ui/ui";',
  },
  {
    name: 'WaveText',
    description: '波浪文字，字符依次浮动',
    href: '/text-animations/wave-text',
    category: CATEGORIES[0],
    engine: 'CSS',
    installName: 'wave-text',
    importStatement: 'import { WaveText } from "@frontend-ui/ui";',
  },
  {
    name: 'GlitchText',
    description: '故障艺术文字，RGB 通道错位',
    href: '/text-animations/glitch-text',
    category: CATEGORIES[0],
    engine: 'CSS',
    installName: 'glitch-text',
    importStatement: 'import { GlitchText } from "@frontend-ui/ui";',
  },
  {
    name: 'CountUp',
    description: '数字递增动画',
    href: '/text-animations/count-up',
    category: CATEGORIES[0],
    engine: 'Motion',
    installName: 'count-up',
    importStatement: 'import { CountUp } from "@frontend-ui/ui";',
  },
  {
    name: 'DecryptedText',
    description: '文字解密动画效果，字符在解密过程中随机变换',
    href: '/text-animations/decrypted-text',
    category: CATEGORIES[0],
    engine: 'CSS',
    installName: 'decrypted-text',
    importStatement: 'import { DecryptedText } from "@frontend-ui/ui";',
  },
  {
    name: 'SpringNumber',
    description: '弹簧物理数字动画，流畅的数字过渡效果 (react-spring)',
    href: '/text-animations/spring-number',
    category: CATEGORIES[0],
    engine: 'react-spring',
    installName: 'spring-number',
    importStatement: 'import { SpringNumber } from "@frontend-ui/ui";',
  },
  {
    name: 'NeonText',
    description: '霓虹发光文字效果，多层发光叠加带 CSS 闪烁',
    href: '/text-animations/neon-text',
    category: CATEGORIES[0],
    engine: 'CSS',
    installName: 'neon-text',
    importStatement: 'import { NeonText } from "@frontend-ui/ui";',
  },
  {
    name: 'ShinyText',
    description: '扫光/流光效果文字，白色光束从左到右扫过',
    href: '/text-animations/shiny-text',
    category: CATEGORIES[0],
    engine: 'CSS',
    installName: 'shiny-text',
    importStatement: 'import { ShinyText } from "@frontend-ui/ui";',
  },
  {
    name: 'RotatingText',
    description: '旋转文字，字符依次围绕中心旋转摆动',
    href: '/text-animations/rotating-text',
    category: CATEGORIES[0],
    engine: 'CSS',
    installName: 'rotating-text',
    importStatement: 'import { RotatingText } from "@frontend-ui/ui";',
  },

  // ── 交互动画 (19) ──────────────────────────────────────
  {
    name: 'Magnet',
    description: '磁吸效果组件，元素跟随鼠标产生弹簧式位移',
    href: '/animations/magnet',
    category: CATEGORIES[1],
    engine: 'Motion',
    installName: 'magnet',
    importStatement: 'import { Magnet } from "@frontend-ui/ui";',
  },
  {
    name: 'FadeContent',
    description: '渐入内容动画',
    href: '/animations/fade-content',
    category: CATEGORIES[1],
    engine: 'Motion',
    installName: 'fade-content',
    importStatement: 'import { FadeContent } from "@frontend-ui/ui";',
  },
  {
    name: 'ScrollReveal',
    description: '基于 GSAP ScrollTrigger 的滚动触发动画',
    href: '/animations/scroll-reveal',
    category: CATEGORIES[1],
    engine: 'GSAP',
    installName: 'scroll-reveal',
    importStatement: 'import { ScrollReveal } from "@frontend-ui/ui";',
  },
  {
    name: 'Draggable',
    description: '可拖拽元素，支持边界约束',
    href: '/animations/draggable',
    category: CATEGORIES[1],
    engine: 'Motion',
    installName: 'draggable',
    importStatement: 'import { Draggable } from "@frontend-ui/ui";',
  },
  {
    name: 'FlipCard',
    description: '翻转卡片，悬停或点击触发',
    href: '/animations/flip-card',
    category: CATEGORIES[1],
    engine: 'CSS',
    installName: 'flip-card',
    importStatement: 'import { FlipCard } from "@frontend-ui/ui";',
  },
  {
    name: 'Accordion',
    description: '手风琴展开折叠面板',
    href: '/animations/accordion',
    category: CATEGORIES[1],
    engine: 'Motion',
    installName: 'accordion',
    importStatement: 'import { Accordion } from "@frontend-ui/ui";',
  },
  {
    name: 'Tabs',
    description: '标签页切换，带滑动指示器',
    href: '/animations/tabs',
    category: CATEGORIES[1],
    engine: 'Motion',
    installName: 'tabs',
    importStatement: 'import { Tabs } from "@frontend-ui/ui";',
  },
  {
    name: 'Modal',
    description: '模态框动画，背景模糊+缩放',
    href: '/animations/modal',
    category: CATEGORIES[1],
    engine: 'Motion',
    installName: 'modal',
    importStatement: 'import { Modal } from "@frontend-ui/ui";',
  },
  {
    name: 'Toast',
    description: '通知提示，自动消失',
    href: '/animations/toast',
    category: CATEGORIES[1],
    engine: 'Motion',
    installName: 'toast',
    importStatement: 'import { Toast } from "@frontend-ui/ui";',
  },
  {
    name: 'ClickSpark',
    description: '点击粒子爆炸特效，点击时在鼠标位置产生扩散粒子',
    href: '/animations/click-spark',
    category: CATEGORIES[1],
    engine: 'Motion',
    installName: 'click-spark',
    importStatement: 'import { ClickSpark } from "@frontend-ui/ui";',
  },
  {
    name: 'BlobCursor',
    description: '液态光标跟随效果，Blob 元素跟随鼠标移动',
    href: '/animations/blob-cursor',
    category: CATEGORIES[1],
    engine: 'CSS',
    installName: 'blob-cursor',
    importStatement: 'import { BlobCursor } from "@frontend-ui/ui";',
  },
  {
    name: 'CrosshairCursor',
    description: '十字准星光标效果，显示坐标和跟随延迟',
    href: '/animations/crosshair-cursor',
    category: CATEGORIES[1],
    engine: 'CSS',
    installName: 'crosshair-cursor',
    importStatement: 'import { CrosshairCursor } from "@frontend-ui/ui";',
  },
  {
    name: 'FloatAnimation',
    description: '浮动动画，元素上下/左右/环形浮动 (react-spring)',
    href: '/animations/float-animation',
    category: CATEGORIES[1],
    engine: 'react-spring',
    installName: 'float-animation',
    importStatement: 'import { FloatAnimation } from "@frontend-ui/ui";',
  },
  {
    name: 'StaggerAnimation',
    description: '交错动画，元素依次出现支持多种动画类型',
    href: '/animations/stagger-animation',
    category: CATEGORIES[1],
    engine: 'Motion',
    installName: 'stagger-animation',
    importStatement: 'import { StaggerAnimation } from "@frontend-ui/ui";',
  },
  {
    name: 'SpringMorph',
    description: '弹簧物理内容过渡动画，切换视图时的流畅形变效果 (react-spring)',
    href: '/animations/spring-morph',
    category: CATEGORIES[1],
    engine: 'react-spring',
    installName: 'spring-morph',
    importStatement: 'import { SpringMorph } from "@frontend-ui/ui";',
  },
  {
    name: 'SvgPathDraw',
    description: 'SVG 路径描边动画，支持循环绘制、反向绘制等效果 (Anime.js)',
    href: '/animations/svg-path-draw',
    category: CATEGORIES[1],
    engine: 'Anime.js',
    installName: 'svg-path-draw',
    importStatement: 'import { SvgPathDraw } from "@frontend-ui/ui";',
  },
  {
    name: 'MorphingSVG',
    description: 'SVG 路径平滑变形动画，自动轮播多种形状 (Anime.js)',
    href: '/animations/morphing-svg',
    category: CATEGORIES[1],
    engine: 'Anime.js',
    installName: 'morphing-svg',
    importStatement: 'import { MorphingSVG } from "@frontend-ui/ui";',
  },
  {
    name: 'MagneticButton',
    description: '磁吸按钮，鼠标悬停时按钮跟随产生弹性位移 (Motion)',
    href: '/animations/magnetic-button',
    category: CATEGORIES[1],
    engine: 'Motion',
    installName: 'magnetic-button',
    importStatement: 'import { MagneticButton } from "@frontend-ui/ui";',
  },
  {
    name: 'HoverScale',
    description: '悬停缩放容器，鼠标悬停时平滑放大并可选阴影 (Motion)',
    href: '/animations/hover-scale',
    category: CATEGORIES[1],
    engine: 'Motion',
    installName: 'hover-scale',
    importStatement: 'import { HoverScale } from "@frontend-ui/ui";',
  },

  {
    name: 'FluidCursor',
    description: '液态金属流体光标跟随效果，鼠标移动时产生粒子拖尾和发光轨迹',
    href: '/animations/fluid-cursor',
    category: CATEGORIES[1],
    engine: 'Motion',
    installName: 'fluid-cursor',
    importStatement: 'import { FluidCursor } from "@frontend-ui/ui";',
  },
  {
    name: 'ScrollParallax',
    description: '滚动驱动的多层视差动画，支持位移、缩放、旋转和模糊',
    href: '/animations/scroll-parallax',
    category: CATEGORIES[1],
    engine: 'Motion',
    installName: 'scroll-parallax',
    importStatement: 'import { ScrollParallax } from "@frontend-ui/ui";',
  },

  // ── 复合组件 (10) ────────────────────────────────────────
  {
    name: 'Dock',
    description: 'macOS 风格的停靠栏',
    href: '/components/dock',
    category: CATEGORIES[2],
    engine: 'Motion',
    installName: 'dock',
    importStatement: 'import { Dock } from "@frontend-ui/ui";',
  },
  {
    name: 'SpotlightCard',
    description: '聚光灯追踪卡片',
    href: '/components/spotlight-card',
    category: CATEGORIES[2],
    engine: 'CSS',
    installName: 'spotlight-card',
    importStatement: 'import { SpotlightCard } from "@frontend-ui/ui";',
  },
  {
    name: 'Masonry',
    description: '瀑布流布局，CSS columns 实现',
    href: '/components/masonry',
    category: CATEGORIES[2],
    engine: 'CSS',
    installName: 'masonry',
    importStatement: 'import { Masonry } from "@frontend-ui/ui";',
  },
  {
    name: 'Carousel',
    description: '轮播图组件，支持自动播放和拖拽',
    href: '/components/carousel',
    category: CATEGORIES[2],
    engine: 'Motion',
    installName: 'carousel',
    importStatement: 'import { Carousel } from "@frontend-ui/ui";',
  },
  {
    name: 'StackCards',
    description: '堆叠卡片，滚动时依次覆盖',
    href: '/components/stack-cards',
    category: CATEGORIES[2],
    engine: 'Motion',
    installName: 'stack-cards',
    importStatement: 'import { StackCards } from "@frontend-ui/ui";',
  },
  {
    name: 'TiltCard',
    description: '3D 倾斜卡片，鼠标追踪透视倾斜效果',
    href: '/components/tilt-card',
    category: CATEGORIES[2],
    engine: 'Motion',
    installName: 'tilt-card',
    importStatement: 'import { TiltCard } from "@frontend-ui/ui";',
  },
  {
    name: 'BounceCards',
    description: '弹跳卡片堆叠组件，支持拖拽和循环',
    href: '/components/bounce-cards',
    category: CATEGORIES[2],
    engine: 'Motion',
    installName: 'bounce-cards',
    importStatement: 'import { BounceCards } from "@frontend-ui/ui";',
  },
  {
    name: 'GlowCard',
    description: '发光卡片组件，鼠标追踪光晕效果',
    href: '/components/glow-card',
    category: CATEGORIES[2],
    engine: 'Motion',
    installName: 'glow-card',
    importStatement: 'import { GlowCard } from "@frontend-ui/ui";',
  },
  {
    name: 'SmoothScrollProvider',
    description: '基于 Lenis 的平滑滚动提供者（Lenis）',
    href: '/components/smooth-scroll',
    category: CATEGORIES[2],
    engine: 'Lenis',
    installName: 'smooth-scroll',
    importStatement: 'import { SmoothScrollProvider } from "@frontend-ui/ui";',
  },
  {
    name: 'Card3D',
    description: '3D 透视卡片，鼠标追踪产生透视倾斜和动态光晕',
    href: '/components/card-3d',
    category: CATEGORIES[2],
    engine: 'CSS',
    installName: 'card-3d',
    importStatement: 'import { Card3D } from "@frontend-ui/ui";',
  },

  {
    name: 'GlassCard',
    description: '玻璃态卡片组件，支持3D倾斜、动态光晕和毛玻璃效果',
    href: '/components/glass-card',
    category: CATEGORIES[2],
    engine: 'CSS',
    installName: 'glass-card',
    importStatement: 'import { GlassCard } from "@frontend-ui/ui";',
  },

  // ── 背景特效 (7) ────────────────────────────────────────
  {
    name: 'Aurora',
    description: '极光背景效果',
    href: '/backgrounds/aurora',
    category: CATEGORIES[3],
    engine: 'Motion',
    installName: 'aurora',
    importStatement: 'import { Aurora } from "@frontend-ui/ui";',
  },
  {
    name: 'Particles',
    description: '粒子背景效果',
    href: '/backgrounds/particles',
    category: CATEGORIES[3],
    engine: 'Motion',
    installName: 'particles',
    importStatement: 'import { Particles } from "@frontend-ui/ui";',
  },
  {
    name: 'Starfield',
    description: '3D 星空背景，星点向观察者飞来',
    href: '/backgrounds/starfield',
    category: CATEGORIES[3],
    engine: 'Motion',
    installName: 'starfield',
    importStatement: 'import { Starfield } from "@frontend-ui/ui";',
  },
  {
    name: 'MeshGradient',
    description: '动态网格渐变背景',
    href: '/backgrounds/mesh-gradient',
    category: CATEGORIES[3],
    engine: 'Motion',
    installName: 'mesh-gradient',
    importStatement: 'import { MeshGradient } from "@frontend-ui/ui";',
  },
  {
    name: 'NoiseBackground',
    description: '噪点纹理背景，胶片颗粒感',
    href: '/backgrounds/noise-background',
    category: CATEGORIES[3],
    engine: 'CSS',
    installName: 'noise-background',
    importStatement: 'import { NoiseBackground } from "@frontend-ui/ui";',
  },
  {
    name: 'Hyperspeed',
    description: '超光速效果，星轨辐射',
    href: '/backgrounds/hyperspeed',
    category: CATEGORIES[3],
    engine: 'Motion',
    installName: 'hyperspeed',
    importStatement: 'import { Hyperspeed } from "@frontend-ui/ui";',
  },
  {
    name: 'GridMotion',
    description: '网格运动背景，方块按行列交错呼吸闪烁',
    href: '/backgrounds/grid-motion',
    category: CATEGORIES[3],
    engine: 'Motion',
    installName: 'grid-motion',
    importStatement: 'import { GridMotion } from "@frontend-ui/ui";',
  },

  {
    name: 'ParticleOcean',
    description: '粒子海洋效果，正弦波流动粒子带鼠标排斥交互',
    href: '/backgrounds/particle-ocean',
    category: CATEGORIES[3],
    engine: 'Motion',
    installName: 'particle-ocean',
    importStatement: 'import { ParticleOcean } from "@frontend-ui/ui";',
  },
  {
    name: 'GenerativeBackground',
    description: '生成式动态背景，基于噪声算法实时生成流动的抽象艺术图案',
    href: '/backgrounds/generative-background',
    category: CATEGORIES[3],
    engine: 'CSS',
    installName: 'generative-background',
    importStatement: 'import { GenerativeBackground } from "@frontend-ui/ui";',
  },

  // ── GSAP 动画 (7) ────────────────────────────────────────
  {
    name: 'ScrollReveal',
    description: '基于 ScrollTrigger 的滚动触发动画',
    href: '/gsap-animations/scroll-reveal',
    category: CATEGORIES[4],
    engine: 'GSAP',
    installName: 'scroll-reveal',
    importStatement: 'import { ScrollReveal } from "@frontend-ui/ui";',
  },
  {
    name: 'TextReveal',
    description: '基于 ScrollTrigger 的文字逐字显现',
    href: '/gsap-animations/text-reveal',
    category: CATEGORIES[4],
    engine: 'GSAP',
    installName: 'text-reveal',
    importStatement: 'import { TextReveal } from "@frontend-ui/ui";',
  },
  {
    name: 'Parallax',
    description: '基于 ScrollTrigger 的视差滚动',
    href: '/gsap-animations/parallax',
    category: CATEGORIES[4],
    engine: 'GSAP',
    installName: 'parallax',
    importStatement: 'import { Parallax } from "@frontend-ui/ui";',
  },
  {
    name: 'TimelineSequence',
    description: '基于 Timeline 的序列动画编排',
    href: '/gsap-animations/timeline-sequence',
    category: CATEGORIES[4],
    engine: 'GSAP',
    installName: 'timeline-sequence',
    importStatement: 'import { TimelineSequence } from "@frontend-ui/ui";',
  },
  {
    name: 'ScrollProgress',
    description: '滚动进度条，固定在页面顶部/底部',
    href: '/gsap-animations/scroll-progress',
    category: CATEGORIES[4],
    engine: 'GSAP',
    installName: 'scroll-progress',
    importStatement: 'import { ScrollProgress } from "@frontend-ui/ui";',
  },
  {
    name: 'PinSection',
    description: '固定区域，滚动时内容保持锁定',
    href: '/gsap-animations/pin-section',
    category: CATEGORIES[4],
    engine: 'GSAP',
    installName: 'pin-section',
    importStatement: 'import { PinSection } from "@frontend-ui/ui";',
  },
  {
    name: 'HorizontalScroll',
    description: '水平滚动，垂直滚动转横向位移',
    href: '/gsap-animations/horizontal-scroll',
    category: CATEGORIES[4],
    engine: 'GSAP',
    installName: 'horizontal-scroll',
    importStatement: 'import { HorizontalScroll } from "@frontend-ui/ui";',
  },

  // ── 页面区块 (7) ─────────────────────────────────────────
  {
    name: 'HeroWithGradient',
    description: '赛博英雄区，渐变背景 + 入场动画',
    href: '/blocks/hero-section',
    category: CATEGORIES[5],
    engine: 'Motion',
    installName: 'hero-section',
    importStatement: 'import { HeroWithGradient } from "@frontend-ui/ui";',
  },
  {
    name: 'HeroWithParticles',
    description: '赛博英雄区，粒子背景 + 入场动画',
    href: '/blocks/hero-section',
    category: CATEGORIES[5],
    engine: 'Motion',
    installName: 'hero-section',
    importStatement: 'import { HeroWithParticles } from "@frontend-ui/ui";',
  },
  {
    name: 'BentoGrid',
    description: 'Bento 网格布局，自适应卡片布局 + 悬浮交互',
    href: '/blocks/bento-grid',
    category: CATEGORIES[5],
    engine: 'CSS',
    installName: 'bento-grid',
    importStatement: 'import { BentoGrid } from "@frontend-ui/ui";',
  },
  {
    name: 'BentoCard',
    description: 'Bento 网格中的单个卡片组件',
    href: '/blocks/bento-grid',
    category: CATEGORIES[5],
    engine: 'CSS',
    installName: 'bento-grid',
    importStatement: 'import { BentoCard } from "@frontend-ui/ui";',
  },
  {
    name: 'FeatureSection',
    description: '功能展示区块，支持左右交替布局与网格排列',
    href: '/blocks/feature-section',
    category: CATEGORIES[5],
    engine: 'Motion',
    installName: 'feature-section',
    importStatement: 'import { FeatureSection } from "@frontend-ui/ui";',
  },
  {
    name: 'PricingSection',
    description: '定价展示区块，支持多列卡片布局与高亮推荐',
    href: '/blocks/pricing-section',
    category: CATEGORIES[5],
    engine: 'Motion',
    installName: 'pricing-section',
    importStatement: 'import { PricingSection } from "@frontend-ui/ui";',
  },
  {
    name: 'CTASection',
    description: '行动号召区块，支持多种视觉风格变体',
    href: '/blocks/cta-section',
    category: CATEGORIES[5],
    engine: 'Motion',
    installName: 'cta-section',
    importStatement: 'import { CTASection } from "@frontend-ui/ui";',
  },
  // ── 新增组件 (4) ────────────────────────────────────────
  {
    name: 'GlassNavbar',
    description: '玻璃态导航栏，支持滚动响应式毛玻璃效果',
    href: '/components/glass-navbar',
    category: CATEGORIES[2],
    engine: 'Motion',
    installName: 'glass-navbar',
    importStatement: 'import { GlassNavbar } from "@frontend-ui/ui";',
  },
  {
    name: 'GlassModal',
    description: '玻璃态模态框，支持模糊背景与入场动画',
    href: '/components/glass-modal',
    category: CATEGORIES[2],
    engine: 'Motion',
    installName: 'glass-modal',
    importStatement: 'import { GlassModal } from "@frontend-ui/ui";',
  },
  {
    name: 'ThreeScene',
    description: 'CSS 3D 沉浸式场景，支持多层视差滚动与透视效果',
    href: '/backgrounds/three-scene',
    category: CATEGORIES[3],
    engine: 'Motion',
    installName: 'three-scene',
    importStatement: 'import { ThreeScene } from "@frontend-ui/ui";',
  },
  {
    name: 'HighPerfParticles',
    description: '高性能 Canvas 2D 粒子系统，支持万级粒子与鼠标交互',
    href: '/backgrounds/high-perf-particles',
    category: CATEGORIES[3],
    engine: 'CSS',
    installName: 'high-perf-particles',
    importStatement: 'import { HighPerfParticles } from "@frontend-ui/ui";',
  },
];

// ─── 辅助函数 ───────────────────────────────────────────────

/**
 * 根据分类 ID 获取该分类下的组件列表
 */
export function getComponentsByCategory(categoryId: string): ComponentEntry[] {
  return COMPONENT_REGISTRY.filter(
    (component) => component.category.id === categoryId
  );
}

/**
 * 根据组件名称获取组件元数据
 */
export function getComponentByName(name: string): ComponentEntry | undefined {
  return COMPONENT_REGISTRY.find(
    (component) => component.name.toLowerCase() === name.toLowerCase()
  );
}

/**
 * 获取所有唯一引擎标签
 */
export function getEngineTags(): string[] {
  const engines = new Set(
    COMPONENT_REGISTRY.map((c) => c.engine).filter(Boolean)
  );
  return Array.from(engines) as string[];
}

/**
 * 搜索组件（按名称和描述模糊匹配）
 */
export function searchComponents(query: string): ComponentEntry[] {
  const q = query.toLowerCase();
  return COMPONENT_REGISTRY.filter(
    (component) =>
      component.name.toLowerCase().includes(q) ||
      component.description.toLowerCase().includes(q) ||
      component.category.label.toLowerCase().includes(q)
  );
}

/**
 * 获取所有组件的总数
 */
export function getTotalComponentCount(): number {
  return COMPONENT_REGISTRY.length;
}

