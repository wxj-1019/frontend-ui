/**
 * 组件注册表 — 集中管理所有 34 个组件的元数据
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
  category: ComponentCategory;
  /** 动画引擎标识 */
  engine?: 'GSAP' | 'Motion' | 'CSS';
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
    count: 8,
  },
  {
    id: 'animations',
    label: '交互动画',
    description: '为用户交互添加流畅的动画反馈',
    href: '/animations',
    count: 9,
  },
  {
    id: 'components',
    label: '复合组件',
    description: '可直接使用的高级交互组件',
    href: '/components',
    count: 5,
  },
  {
    id: 'backgrounds',
    label: '背景特效',
    description: '为页面添加动态背景效果',
    href: '/backgrounds',
    count: 6,
  },
  {
    id: 'gsap-animations',
    label: 'GSAP 动画',
    description:
      '基于 GSAP 的高性能动画组件，支持 ScrollTrigger、Timeline 等强大功能',
    href: '/gsap-animations',
    count: 7,
  },
];

// ─── 组件注册表 ───────────────────────────────────────────────

/**
 * 所有 34 个组件的完整注册表
 */
export const COMPONENT_REGISTRY: ComponentEntry[] = [
  // ── 文字动画 (8) ────────────────────────────────────────
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

  // ── 交互动画 (9) ────────────────────────────────────────
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
    description: '滚动触发动画',
    href: '/animations/scroll-reveal',
    category: CATEGORIES[1],
    engine: 'Motion',
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

  // ── 复合组件 (5) ────────────────────────────────────────
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

  // ── 背景特效 (6) ────────────────────────────────────────
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
 * 获取指定分类 ID 的分类信息
 */
export function getCategoryById(
  categoryId: string
): ComponentCategory | undefined {
  return CATEGORIES.find((cat) => cat.id === categoryId);
}
