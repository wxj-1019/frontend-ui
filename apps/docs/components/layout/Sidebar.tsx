'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

interface NavItem {
  label: string;
  href: string;
  items?: { label: string; href: string }[];
}

/* ── 文档导航 ── */
const docsNavigation: NavItem[] = [
  {
    label: '快速开始',
    href: '/docs/getting-started',
  },
  {
    label: 'CLI 工具',
    href: '/docs/cli',
  },
  {
    label: '动画引擎',
    href: '/docs/engines',
  },
  {
    label: '引擎对比',
    href: '/docs/engine-comparison',
  },
  {
    label: '主题定制',
    href: '/docs/theming',
  },
];

/* ── 组件导航（按分类） ── */
const componentNavigation: NavItem[] = [
  {
    label: '文字动画',
    href: '/text-animations',
    items: [
      { label: 'BlurText', href: '/text-animations/blur-text' },
      { label: 'GradientText', href: '/text-animations/gradient-text' },
      { label: 'SplitText', href: '/text-animations/split-text' },
      { label: 'Typewriter', href: '/text-animations/typewriter' },
      { label: 'ScrambleText', href: '/text-animations/scramble-text' },
      { label: 'WaveText', href: '/text-animations/wave-text' },
      { label: 'GlitchText', href: '/text-animations/glitch-text' },
      { label: 'CountUp', href: '/text-animations/count-up' },
    ],
  },
  {
    label: '交互动画',
    href: '/animations',
    items: [
      { label: 'Magnet', href: '/animations/magnet' },
      { label: 'FadeContent', href: '/animations/fade-content' },
      { label: 'ScrollReveal', href: '/animations/scroll-reveal' },
      { label: 'Draggable', href: '/animations/draggable' },
      { label: 'FlipCard', href: '/animations/flip-card' },
      { label: 'Accordion', href: '/animations/accordion' },
      { label: 'Tabs', href: '/animations/tabs' },
      { label: 'Modal', href: '/animations/modal' },
      { label: 'Toast', href: '/animations/toast' },
      { label: 'ClickSpark', href: '/animations/click-spark' },
    ],
  },
  {
    label: '复合组件',
    href: '/components',
    items: [
      { label: 'Dock', href: '/components/dock' },
      { label: 'SpotlightCard', href: '/components/spotlight-card' },
      { label: 'Masonry', href: '/components/masonry' },
      { label: 'Carousel', href: '/components/carousel' },
      { label: 'StackCards', href: '/components/stack-cards' },
      { label: 'TiltCard', href: '/components/tilt-card' },
    ],
  },
  {
    label: '背景特效',
    href: '/backgrounds',
    items: [
      { label: 'Aurora', href: '/backgrounds/aurora' },
      { label: 'Particles', href: '/backgrounds/particles' },
      { label: 'Starfield', href: '/backgrounds/starfield' },
      { label: 'MeshGradient', href: '/backgrounds/mesh-gradient' },
      { label: 'NoiseBackground', href: '/backgrounds/noise-background' },
      { label: 'Hyperspeed', href: '/backgrounds/hyperspeed' },
    ],
  },
  {
    label: 'GSAP 动画',
    href: '/gsap-animations',
    items: [
      { label: 'ScrollReveal', href: '/gsap-animations/scroll-reveal' },
      { label: 'TextReveal', href: '/gsap-animations/text-reveal' },
      { label: 'Parallax', href: '/gsap-animations/parallax' },
      { label: 'TimelineSequence', href: '/gsap-animations/timeline-sequence' },
      { label: 'ScrollProgress', href: '/gsap-animations/scroll-progress' },
      { label: 'PinSection', href: '/gsap-animations/pin-section' },
      { label: 'HorizontalScroll', href: '/gsap-animations/horizontal-scroll' },
    ],
  },
  {
    label: '页面区块',
    href: '/blocks',
    items: [
      { label: 'HeroSection', href: '/blocks/hero-section' },
      { label: 'BentoGrid', href: '/blocks/bento-grid' },
      { label: 'FeatureSection', href: '/blocks/feature-section' },
    ],
  },
];

/** 判断当前路径属于文档区还是组件区 */
function useSection() {
  const pathname = usePathname();
  if (!pathname) return 'components';

  const componentPrefixes = [
    '/text-animations',
    '/animations',
    '/components',
    '/backgrounds',
    '/gsap-animations',
    '/blocks',
  ];

  if (pathname.startsWith('/docs')) return 'docs';
  if (componentPrefixes.some((p) => pathname.startsWith(p)))
    return 'components';

  // 默认（首页等）显示组件导航
  return 'components';
}

/* ══════════ 单组导航渲染 ══════════ */
function NavGroup({
  title,
  items,
  onMobileClose,
}: {
  title: string;
  items: NavItem[];
  onMobileClose?: () => void;
}) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<string[]>([]);

  const toggleSection = (label: string) => {
    setExpanded((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
  };

  const isActive = (href: string) => pathname === href;
  const isSectionActive = (item: NavItem) =>
    pathname?.startsWith(item.href) ||
    item.items?.some((i) => isActive(i.href));

  // 自动展开当前激活的分类
  const prevPathname = useRef<string | null>(null);
  useEffect(() => {
    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname || null;
    const active = items.find(isSectionActive);
    if (active && !expanded.includes(active.label)) {
      setExpanded((prev) => [...prev, active.label]);
    }
  }, [pathname, items, expanded, isSectionActive]);

  return (
    <div>
      {/* 分组标题 */}
      <div className="mb-2 px-3 pt-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-subtle)]">
          {title}
        </span>
      </div>

      <div className="space-y-0.5">
        {items.map((item) => (
          <div key={item.label}>
            {item.items ? (
              <>
                <button
                  onClick={() => toggleSection(item.label)}
                  aria-expanded={expanded.includes(item.label)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isSectionActive(item)
                      ? 'text-[var(--color-accent)]'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  <span>{item.label}</span>
                  <svg
                    className={`h-4 w-4 shrink-0 transition-transform ${
                      expanded.includes(item.label) ? 'rotate-90' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
                {expanded.includes(item.label) && (
                  <div className="ml-4 mt-0.5 space-y-0.5">
                    {item.items.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={onMobileClose}
                        className={`block rounded-lg px-3 py-1.5 text-sm transition-colors ${
                          isActive(sub.href)
                            ? 'bg-[var(--color-active)] text-[var(--color-accent)]'
                            : 'text-[var(--color-text-subtle)] hover:bg-[var(--color-hover)] hover:text-[var(--color-text-primary)]'
                        }`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                href={item.href}
                onClick={onMobileClose}
                className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-[var(--color-active)] text-[var(--color-accent)]'
                    : 'text-[var(--color-text-muted)] hover:bg-[var(--color-hover)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════ Sidebar 主组件 ══════════ */
interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
  const section = useSection();

  const renderNav = () => {
    if (section === 'docs') {
      return (
        <NavGroup
          title="文档"
          items={docsNavigation}
          onMobileClose={onMobileClose}
        />
      );
    }
    return (
      <div className="space-y-6">
        <NavGroup
          title="组件"
          items={componentNavigation}
          onMobileClose={onMobileClose}
        />
      </div>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-16 bottom-0 hidden w-64 overflow-y-auto border-r border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)] p-4 lg:block">
        {renderNav()}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60] lg:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onMobileClose}
          />
          <div className="absolute left-0 top-0 flex h-full w-72 max-w-[80vw] flex-col border-r border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] shadow-2xl">
            <div className="flex h-16 items-center justify-between border-b border-[var(--color-border-subtle)] px-4">
              <span className="text-sm font-semibold text-[var(--color-text-muted)]">
                {section === 'docs' ? '文档导航' : '组件导航'}
              </span>
              <button
                onClick={onMobileClose}
                className="rounded-lg p-2 text-[var(--color-text-muted)] hover:bg-[var(--color-hover)]"
                aria-label="关闭"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">{renderNav()}</div>
          </div>
        </div>
      )}
    </>
  );
}
