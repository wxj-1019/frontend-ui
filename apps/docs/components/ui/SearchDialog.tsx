"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

interface SearchResult {
  title: string;
  description: string;
  href: string;
  category: string;
}

const searchData: SearchResult[] = [
  // 文字动画
  { title: "BlurText", description: "模糊渐入的文字动画效果，逐字符从模糊到清晰", href: "/text-animations/blur-text", category: "文字动画" },
  { title: "GradientText", description: "渐变色彩的文字效果", href: "/text-animations/gradient-text", category: "文字动画" },
  { title: "SplitText", description: "文字分割动画效果", href: "/text-animations/split-text", category: "文字动画" },
  { title: "Typewriter", description: "打字机效果，逐字符显示文本", href: "/text-animations/typewriter", category: "文字动画" },
  { title: "ScrambleText", description: "乱码解密文字效果", href: "/text-animations/scramble-text", category: "文字动画" },
  { title: "WaveText", description: "波浪文字，字符依次浮动", href: "/text-animations/wave-text", category: "文字动画" },
  { title: "GlitchText", description: "故障艺术文字，RGB 通道错位", href: "/text-animations/glitch-text", category: "文字动画" },
  { title: "CountUp", description: "数字递增动画", href: "/text-animations/count-up", category: "文字动画" },
  { title: "DecryptedText", description: "文字解密动画效果，字符在解密过程中随机变换", href: "/text-animations/decrypted-text", category: "文字动画" },
  { title: "SpringNumber", description: "弹簧物理数字动画，流畅的数字过渡效果", href: "/text-animations/spring-number", category: "文字动画" },
  // 交互动画
  { title: "Magnet", description: "磁吸效果组件，元素跟随鼠标产生弹簧式位移", href: "/animations/magnet", category: "交互动画" },
  { title: "FadeContent", description: "渐入内容动画", href: "/animations/fade-content", category: "交互动画" },
  { title: "ScrollReveal", description: "基于 GSAP ScrollTrigger 的滚动触发动画", href: "/animations/scroll-reveal", category: "交互动画" },
  { title: "Draggable", description: "可拖拽元素，支持边界约束", href: "/animations/draggable", category: "交互动画" },
  { title: "FlipCard", description: "翻转卡片，悬停或点击触发", href: "/animations/flip-card", category: "交互动画" },
  { title: "Accordion", description: "手风琴展开折叠面板", href: "/animations/accordion", category: "交互动画" },
  { title: "Tabs", description: "标签页切换，带滑动指示器", href: "/animations/tabs", category: "交互动画" },
  { title: "Modal", description: "模态框动画，背景模糊+缩放", href: "/animations/modal", category: "交互动画" },
  { title: "Toast", description: "通知提示，自动消失", href: "/animations/toast", category: "交互动画" },
  { title: "ClickSpark", description: "点击粒子爆炸特效，点击时在鼠标位置产生扩散粒子", href: "/animations/click-spark", category: "交互动画" },
  { title: "BlobCursor", description: "液态光标跟随效果，Blob 元素跟随鼠标移动", href: "/animations/blob-cursor", category: "交互动画" },
  { title: "CrosshairCursor", description: "十字准星光标效果，显示坐标和跟随延迟", href: "/animations/crosshair-cursor", category: "交互动画" },
  { title: "FloatAnimation", description: "浮动动画，元素上下/左右/环形浮动", href: "/animations/float-animation", category: "交互动画" },
  { title: "StaggerAnimation", description: "交错动画，元素依次出现支持多种动画类型", href: "/animations/stagger-animation", category: "交互动画" },
  { title: "SpringMorph", description: "弹簧物理内容过渡动画，切换视图时的流畅形变效果", href: "/animations/spring-morph", category: "交互动画" },
  { title: "SvgPathDraw", description: "SVG 路径描边动画，支持循环绘制、反向绘制等效果", href: "/animations/svg-path-draw", category: "交互动画" },
  { title: "MorphingSVG", description: "SVG 路径平滑变形动画，自动轮播多种形状", href: "/animations/morphing-svg", category: "交互动画" },
  // 复合组件
  { title: "Dock", description: "macOS 风格的停靠栏", href: "/components/dock", category: "复合组件" },
  { title: "SpotlightCard", description: "聚光灯追踪卡片", href: "/components/spotlight-card", category: "复合组件" },
  { title: "Masonry", description: "瀑布流布局，CSS columns 实现", href: "/components/masonry", category: "复合组件" },
  { title: "Carousel", description: "轮播图组件，支持自动播放和拖拽", href: "/components/carousel", category: "复合组件" },
  { title: "StackCards", description: "堆叠卡片，滚动时依次覆盖", href: "/components/stack-cards", category: "复合组件" },
  { title: "TiltCard", description: "3D 倾斜卡片，鼠标追踪透视倾斜效果", href: "/components/tilt-card", category: "复合组件" },
  { title: "BounceCards", description: "弹跳卡片堆叠组件，支持拖拽和循环", href: "/components/bounce-cards", category: "复合组件" },
  { title: "GlowCard", description: "发光卡片组件，鼠标追踪光晕效果", href: "/components/glow-card", category: "复合组件" },
  { title: "SmoothScrollProvider", description: "基于 Lenis 的平滑滚动提供者", href: "/components/smooth-scroll", category: "复合组件" },
  // 背景特效
  { title: "Aurora", description: "极光背景效果", href: "/backgrounds/aurora", category: "背景特效" },
  { title: "Particles", description: "粒子背景效果", href: "/backgrounds/particles", category: "背景特效" },
  { title: "Starfield", description: "3D 星空背景，星点向观察者飞来", href: "/backgrounds/starfield", category: "背景特效" },
  { title: "MeshGradient", description: "动态网格渐变背景", href: "/backgrounds/mesh-gradient", category: "背景特效" },
  { title: "NoiseBackground", description: "噪点纹理背景，胶片颗粒感", href: "/backgrounds/noise-background", category: "背景特效" },
  { title: "Hyperspeed", description: "超光速效果，星轨辐射", href: "/backgrounds/hyperspeed", category: "背景特效" },
  // GSAP 动画
  { title: "ScrollReveal (GSAP)", description: "基于 ScrollTrigger 的滚动触发动画", href: "/gsap-animations/scroll-reveal", category: "GSAP 动画" },
  { title: "TextReveal", description: "基于 ScrollTrigger 的文字逐字显现", href: "/gsap-animations/text-reveal", category: "GSAP 动画" },
  { title: "Parallax", description: "基于 ScrollTrigger 的视差滚动", href: "/gsap-animations/parallax", category: "GSAP 动画" },
  { title: "TimelineSequence", description: "基于 Timeline 的序列动画编排", href: "/gsap-animations/timeline-sequence", category: "GSAP 动画" },
  { title: "ScrollProgress", description: "滚动进度条，固定在页面顶部/底部", href: "/gsap-animations/scroll-progress", category: "GSAP 动画" },
  { title: "PinSection", description: "固定区域，滚动时内容保持锁定", href: "/gsap-animations/pin-section", category: "GSAP 动画" },
  { title: "HorizontalScroll", description: "水平滚动，垂直滚动转横向位移", href: "/gsap-animations/horizontal-scroll", category: "GSAP 动画" },
  // 页面区块
  { title: "HeroWithGradient", description: "赛博英雄区，渐变背景 + 入场动画", href: "/blocks/hero-section", category: "页面区块" },
  { title: "HeroWithParticles", description: "赛博英雄区，粒子背景 + 入场动画", href: "/blocks/hero-section", category: "页面区块" },
  { title: "BentoGrid", description: "Bento 网格布局，自适应卡片布局 + 悬浮交互", href: "/blocks/bento-grid", category: "页面区块" },
  { title: "BentoCard", description: "Bento 网格中的单个卡片组件", href: "/blocks/bento-grid", category: "页面区块" },
  { title: "FeatureSection", description: "功能展示区块，支持左右交替布局与网格排列", href: "/blocks/feature-section", category: "页面区块" },
  { title: "PricingSection", description: "定价展示区块，支持多列卡片布局与高亮推荐", href: "/blocks/pricing-section", category: "页面区块" },
  { title: "CTASection", description: "行动号召区块，支持多种视觉风格变体", href: "/blocks/cta-section", category: "页面区块" },
  // 文档
  { title: "快速开始", description: "安装、配置和第一个组件", href: "/docs/getting-started", category: "文档" },
  { title: "CLI 工具", description: "命令行添加组件", href: "/docs/cli", category: "文档" },
  { title: "动画引擎", description: "多引擎架构详解", href: "/docs/engines", category: "文档" },
  { title: "引擎对比", description: "同一效果不同引擎实现对比", href: "/docs/engine-comparison", category: "文档" },
  { title: "主题定制", description: "CSS 变量和主题切换", href: "/docs/theming", category: "文档" },
  { title: "设计令牌", description: "Design Token 体系与使用指南", href: "/docs/design-tokens", category: "文档" },
  { title: "贡献指南", description: "如何参与项目开发与提交 PR", href: "/docs/contributing", category: "文档" },
  { title: "常见问题", description: "使用过程中的常见问题解答", href: "/docs/faq", category: "文档" },
  // 特色功能
  { title: "组件宇宙", description: "可视化探索 130+ 组件关系网络", href: "/showcase", category: "特色功能" },
  { title: "更新日志", description: "版本变更记录", href: "/changelog", category: "关于" },
];

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filteredResults = searchData.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const dialogRef = useRef<HTMLDivElement>(null);

  // Focus trap: 当对话框打开时，将焦点锁定在内部
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'input, button, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, handleKeyDown]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDownGlobal = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDownGlobal);
    return () => window.removeEventListener("keydown", handleKeyDownGlobal);
  }, [open, onClose]);

  const handleSelect = (href: string) => {
    router.push(href);
    onClose();
  };

  const handleKeyDownInput = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filteredResults.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case "Enter":
        if (filteredResults[selectedIndex]) {
          handleSelect(filteredResults[selectedIndex].href);
        }
        break;
      case "Escape":
        onClose();
        break;
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[20vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[var(--color-bg-primary)]/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="搜索组件"
        className="relative w-full max-w-xl rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] shadow-2xl"
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 border-b border-[var(--color-border-subtle)] px-4">
          <svg className="h-5 w-5 text-[var(--color-text-subtle)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="搜索组件..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDownInput}
            className="flex-1 bg-transparent py-4 text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-subtle)]"
            aria-label="搜索组件"
            aria-autocomplete="list"
            aria-controls="search-results"
          />
          <kbd className="rounded border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] px-2 py-1 text-xs text-[var(--color-text-subtle)]">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div
          id="search-results"
          role="listbox"
          aria-label="搜索结果"
          aria-live="polite"
          className="max-h-80 overflow-y-auto p-2"
        >
          {filteredResults.length === 0 ? (
            <div className="py-8 text-center text-sm text-[var(--color-text-subtle)]">
              没有找到匹配的组件
            </div>
          ) : (
            <div className="space-y-1">
              {filteredResults.map((result, index) => (
                <button
                  key={`${result.title}-${result.href}`}
                  ref={index === selectedIndex ? (el) => el?.scrollIntoView({ block: 'nearest' }) : undefined}
                  onClick={() => handleSelect(result.href)}
                  role="option"
                  aria-selected={index === selectedIndex}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                    index === selectedIndex
                      ? "bg-[var(--color-hover)] text-[var(--color-text-primary)]"
                      : "text-[var(--color-text-muted)] hover:bg-[var(--color-hover)]"
                  }`}
                >
                  <div className="flex-1">
                    <div className="font-medium">{result.title}</div>
                    <div className="text-xs text-[var(--color-text-subtle)]">
                      {result.description}
                    </div>
                  </div>
                  <span className="rounded-full bg-[var(--color-bg-primary)] px-2 py-0.5 text-xs text-[var(--color-text-subtle)]">
                    {result.category}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[var(--color-border-subtle)] px-4 py-2">
          <div className="flex items-center gap-4 text-xs text-[var(--color-text-subtle)]">
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] px-1.5 py-0.5">↑</kbd>
              <kbd className="rounded border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] px-1.5 py-0.5">↓</kbd>
              导航
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] px-1.5 py-0.5">↵</kbd>
              选择
            </span>
          </div>
          <span className="text-xs text-[var(--color-text-subtle)]">
            {filteredResults.length} 个结果
          </span>
        </div>
      </div>
    </div>
  );
}
