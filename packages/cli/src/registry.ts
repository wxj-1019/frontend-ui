/**
 * 共享组件注册表 — CLI 和文档站共用此数据源
 *
 * CLI 通过直接 import 此文件获取组件列表，
 * 确保与文档站的 component-registry.ts 保持同步。
 */

export interface SharedComponentEntry {
  name: string;
  category: string;
  description: string;
  engine: string;
  installName: string;
  files: string[];
}

export const SHARED_COMPONENTS: SharedComponentEntry[] = [
  // ── 文字动画 ────────────────────────────────────────────
  { name: 'BlurText', category: 'text-animations', description: '模糊渐入的文字动画效果', engine: 'Motion', installName: 'blur-text', files: ['blur-text.tsx', 'index.ts'] },
  { name: 'GradientText', category: 'text-animations', description: '渐变色彩的文字效果', engine: 'CSS', installName: 'gradient-text', files: ['gradient-text.tsx', 'index.ts'] },
  { name: 'SplitText', category: 'text-animations', description: '文字分割动画效果', engine: 'Motion', installName: 'split-text', files: ['split-text.tsx', 'index.ts'] },
  { name: 'Typewriter', category: 'text-animations', description: '打字机效果', engine: 'CSS', installName: 'typewriter', files: ['typewriter.tsx', 'index.ts'] },
  { name: 'ScrambleText', category: 'text-animations', description: '乱码解密文字效果', engine: 'Motion', installName: 'scramble-text', files: ['scramble-text.tsx', 'index.ts'] },
  { name: 'WaveText', category: 'text-animations', description: '波浪文字，字符依次浮动', engine: 'CSS', installName: 'wave-text', files: ['wave-text.tsx', 'index.ts'] },
  { name: 'GlitchText', category: 'text-animations', description: '故障艺术文字', engine: 'CSS', installName: 'glitch-text', files: ['glitch-text.tsx', 'index.ts'] },
  { name: 'CountUp', category: 'text-animations', description: '数字递增动画', engine: 'Motion', installName: 'count-up', files: ['count-up.tsx', 'index.ts'] },
  { name: 'DecryptedText', category: 'text-animations', description: '文字解密动画效果', engine: 'CSS', installName: 'decrypted-text', files: ['decrypted-text.tsx', 'index.ts'] },
  { name: 'SpringNumber', category: 'text-animations', description: '弹簧物理数字动画', engine: 'react-spring', installName: 'spring-number', files: ['spring-number.tsx', 'index.ts'] },
  { name: 'NeonText', category: 'text-animations', description: '霓虹发光文字效果，带 CSS 闪烁', engine: 'CSS', installName: 'neon-text', files: ['neon-text.tsx', 'index.ts'] },
  { name: 'ShinyText', category: 'text-animations', description: '扫光/流光效果文字', engine: 'CSS', installName: 'shiny-text', files: ['shiny-text.tsx', 'index.ts'] },
  { name: 'RotatingText', category: 'text-animations', description: '旋转文字，字符依次围绕中心旋转', engine: 'CSS', installName: 'rotating-text', files: ['rotating-text.tsx', 'index.ts'] },

  // ── 交互动画 ────────────────────────────────────────────
  { name: 'Magnet', category: 'animations', description: '磁吸效果组件', engine: 'Motion', installName: 'magnet', files: ['magnet.tsx', 'index.ts'] },
  { name: 'FadeContent', category: 'animations', description: '渐入内容动画', engine: 'Motion', installName: 'fade-content', files: ['fade-content.tsx', 'index.ts'] },
  { name: 'ScrollReveal', category: 'animations', description: '滚动触发动画', engine: 'Motion', installName: 'scroll-reveal', files: ['scroll-reveal.tsx', 'index.ts'] },
  { name: 'Draggable', category: 'animations', description: '可拖拽元素', engine: 'Motion', installName: 'draggable', files: ['draggable.tsx', 'index.ts'] },
  { name: 'FlipCard', category: 'animations', description: '翻转卡片', engine: 'CSS', installName: 'flip-card', files: ['flip-card.tsx', 'index.ts'] },
  { name: 'Accordion', category: 'animations', description: '手风琴展开折叠面板', engine: 'Motion', installName: 'accordion', files: ['accordion.tsx', 'index.ts'] },
  { name: 'Tabs', category: 'animations', description: '标签页切换', engine: 'Motion', installName: 'tabs', files: ['tabs.tsx', 'index.ts'] },
  { name: 'Modal', category: 'animations', description: '模态框动画', engine: 'Motion', installName: 'modal', files: ['modal.tsx', 'index.ts'] },
  { name: 'Toast', category: 'animations', description: '通知提示', engine: 'Motion', installName: 'toast', files: ['toast.tsx', 'index.ts'] },
  { name: 'ClickSpark', category: 'animations', description: '点击粒子爆炸特效', engine: 'Motion', installName: 'click-spark', files: ['click-spark.tsx', 'index.ts'] },
  { name: 'BlobCursor', category: 'animations', description: '液态光标跟随效果', engine: 'CSS', installName: 'blob-cursor', files: ['blob-cursor.tsx', 'index.ts'] },
  { name: 'CrosshairCursor', category: 'animations', description: '十字准星光标效果', engine: 'CSS', installName: 'crosshair-cursor', files: ['crosshair-cursor.tsx', 'index.ts'] },
  { name: 'FloatAnimation', category: 'animations', description: '浮动动画', engine: 'react-spring', installName: 'float-animation', files: ['float-animation.tsx', 'index.ts'] },
  { name: 'StaggerAnimation', category: 'animations', description: '交错动画', engine: 'Motion', installName: 'stagger-animation', files: ['stagger-animation.tsx', 'index.ts'] },
  { name: 'SpringMorph', category: 'animations', description: '弹簧物理内容过渡动画', engine: 'react-spring', installName: 'spring-morph', files: ['spring-morph.tsx', 'index.ts'] },
  { name: 'SvgPathDraw', category: 'animations', description: 'SVG 路径描边动画', engine: 'Anime.js', installName: 'svg-path-draw', files: ['svg-path-draw.tsx', 'index.ts'] },
  { name: 'MorphingSVG', category: 'animations', description: 'SVG 路径平滑变形动画', engine: 'Anime.js', installName: 'morphing-svg', files: ['morphing-svg.tsx', 'index.ts'] },
  { name: 'MagneticButton', category: 'animations', description: '磁吸按钮，鼠标跟随弹性位移', engine: 'Motion', installName: 'magnetic-button', files: ['magnetic-button.tsx', 'index.ts'] },
  { name: 'HoverScale', category: 'animations', description: '悬停缩放容器', engine: 'Motion', installName: 'hover-scale', files: ['hover-scale.tsx', 'index.ts'] },

  // ── 复合组件 ────────────────────────────────────────────
  { name: 'Dock', category: 'components', description: 'macOS 风格的停靠栏', engine: 'Motion', installName: 'dock', files: ['dock.tsx', 'index.ts'] },
  { name: 'SpotlightCard', category: 'components', description: '聚光灯追踪卡片', engine: 'CSS', installName: 'spotlight-card', files: ['spotlight-card.tsx', 'index.ts'] },
  { name: 'Masonry', category: 'components', description: '瀑布流布局', engine: 'CSS', installName: 'masonry', files: ['masonry.tsx', 'index.ts'] },
  { name: 'Carousel', category: 'components', description: '轮播图组件', engine: 'Motion', installName: 'carousel', files: ['carousel.tsx', 'index.ts'] },
  { name: 'StackCards', category: 'components', description: '堆叠卡片', engine: 'Motion', installName: 'stack-cards', files: ['stack-cards.tsx', 'index.ts'] },
  { name: 'TiltCard', category: 'components', description: '3D 倾斜卡片', engine: 'Motion', installName: 'tilt-card', files: ['tilt-card.tsx', 'index.ts'] },
  { name: 'BounceCards', category: 'components', description: '弹跳卡片堆叠组件', engine: 'Motion', installName: 'bounce-cards', files: ['bounce-cards.tsx', 'index.ts'] },
  { name: 'GlowCard', category: 'components', description: '发光卡片组件', engine: 'Motion', installName: 'glow-card', files: ['glow-card.tsx', 'index.ts'] },
  { name: 'Card3D', category: 'components', description: '3D 透视卡片', engine: 'CSS', installName: 'card-3d', files: ['card-3d.tsx', 'index.ts'] },
  { name: 'GlassCard', category: 'components', description: '玻璃态卡片，3D倾斜+光晕效果', engine: 'CSS', installName: 'glass-card', files: ['glass-card.tsx', 'index.ts'] },
  { name: 'GlassNavbar', category: 'components', description: '玻璃态导航栏，滚动响应式毛玻璃', engine: 'Motion', installName: 'glass-navbar', files: ['glass-navbar.tsx', 'index.ts'] },
  { name: 'GlassModal', category: 'components', description: '玻璃态模态框，模糊背景+入场动画', engine: 'Motion', installName: 'glass-modal', files: ['glass-modal.tsx', 'index.ts'] },
  { name: 'SmoothScrollProvider', category: 'components', description: '基于 Lenis 的平滑滚动提供者', engine: 'Lenis', installName: 'smooth-scroll', files: ['smooth-scroll-provider.tsx', 'index.ts'] },

  // ── 背景特效 ────────────────────────────────────────────
  { name: 'Aurora', category: 'backgrounds', description: '极光背景效果', engine: 'Motion', installName: 'aurora', files: ['aurora.tsx', 'index.ts'] },
  { name: 'Particles', category: 'backgrounds', description: '粒子背景效果', engine: 'Motion', installName: 'particles', files: ['particles.tsx', 'index.ts'] },
  { name: 'Starfield', category: 'backgrounds', description: '3D 星空背景', engine: 'Motion', installName: 'starfield', files: ['starfield.tsx', 'index.ts'] },
  { name: 'MeshGradient', category: 'backgrounds', description: '动态网格渐变背景', engine: 'Motion', installName: 'mesh-gradient', files: ['mesh-gradient.tsx', 'index.ts'] },
  { name: 'NoiseBackground', category: 'backgrounds', description: '噪点纹理背景', engine: 'CSS', installName: 'noise-background', files: ['noise-background.tsx', 'index.ts'] },
  { name: 'Hyperspeed', category: 'backgrounds', description: '超光速效果', engine: 'Motion', installName: 'hyperspeed', files: ['hyperspeed.tsx', 'index.ts'] },
  { name: 'GridMotion', category: 'backgrounds', description: '网格运动背景，方块交错呼吸', engine: 'Motion', installName: 'grid-motion', files: ['grid-motion.tsx', 'index.ts'] },
  { name: 'ParticleOcean', category: 'backgrounds', description: '粒子海洋效果，流体动力学', engine: 'Motion', installName: 'particle-ocean', files: ['particle-ocean.tsx', 'index.ts'] },
  { name: 'GenerativeBackground', category: 'backgrounds', description: '生成式艺术背景', engine: 'CSS', installName: 'generative-background', files: ['generative-background.tsx', 'index.ts'] },
  { name: 'ThreeScene', category: 'backgrounds', description: 'CSS 3D 沉浸式场景，多层视差', engine: 'Motion', installName: 'three-scene', files: ['three-scene.tsx', 'index.ts'] },
  { name: 'HighPerfParticles', category: 'backgrounds', description: '高性能 Canvas 2D 粒子系统', engine: 'CSS', installName: 'high-perf-particles', files: ['high-perf-particles.tsx', 'index.ts'] },

  // ── GSAP 动画 ───────────────────────────────────────────
  { name: 'ScrollReveal', category: 'gsap-animations', description: '基于 ScrollTrigger 的滚动触发动画', engine: 'GSAP', installName: 'scroll-reveal', files: ['scroll-reveal.tsx', 'index.ts'] },
  { name: 'TextReveal', category: 'gsap-animations', description: '基于 ScrollTrigger 的文字逐字显现', engine: 'GSAP', installName: 'text-reveal', files: ['text-reveal.tsx', 'index.ts'] },
  { name: 'Parallax', category: 'gsap-animations', description: '基于 ScrollTrigger 的视差滚动', engine: 'GSAP', installName: 'parallax', files: ['parallax.tsx', 'index.ts'] },
  { name: 'TimelineSequence', category: 'gsap-animations', description: '基于 Timeline 的序列动画编排', engine: 'GSAP', installName: 'timeline-sequence', files: ['timeline-sequence.tsx', 'index.ts'] },
  { name: 'ScrollProgress', category: 'gsap-animations', description: '滚动进度条', engine: 'GSAP', installName: 'scroll-progress', files: ['scroll-progress.tsx', 'index.ts'] },
  { name: 'PinSection', category: 'gsap-animations', description: '固定区域，滚动时内容保持锁定', engine: 'GSAP', installName: 'pin-section', files: ['pin-section.tsx', 'index.ts'] },
  { name: 'HorizontalScroll', category: 'gsap-animations', description: '水平滚动', engine: 'GSAP', installName: 'horizontal-scroll', files: ['horizontal-scroll.tsx', 'index.ts'] },

  // ── 页面区块 ────────────────────────────────────────────
  { name: 'HeroWithGradient', category: 'blocks', description: '赛博英雄区，渐变背景 + 入场动画', engine: 'Motion', installName: 'hero-section', files: ['hero-with-gradient.tsx', 'index.ts'] },
  { name: 'HeroWithParticles', category: 'blocks', description: '赛博英雄区，粒子背景 + 入场动画', engine: 'Motion', installName: 'hero-section', files: ['hero-with-particles.tsx', 'index.ts'] },
  { name: 'BentoGrid', category: 'blocks', description: 'Bento 网格布局', engine: 'CSS', installName: 'bento-grid', files: ['bento-grid.tsx', 'index.ts'] },
  { name: 'FeatureSection', category: 'blocks', description: '功能展示区块', engine: 'Motion', installName: 'feature-section', files: ['feature-section.tsx', 'index.ts'] },
  { name: 'PricingSection', category: 'blocks', description: '定价展示区块', engine: 'Motion', installName: 'pricing-section', files: ['pricing-section.tsx', 'index.ts'] },
  { name: 'CTASection', category: 'blocks', description: '行动号召区块', engine: 'Motion', installName: 'cta-section', files: ['cta-section.tsx', 'index.ts'] },
];

export const SHARED_CATEGORIES: Record<string, string> = {
  'text-animations': '文字动画',
  'animations': '交互动画',
  'components': '复合组件',
  'backgrounds': '背景特效',
  'gsap-animations': 'GSAP 动画',
  'blocks': '页面区块',
};
