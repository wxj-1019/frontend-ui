import Link from 'next/link';

const blocks = [
  {
    name: 'HeroSection',
    description: '赛博英雄区，大标题 + 粒子背景 + 入场动画',
    href: '/blocks/hero-section',
    variants: 'Gradient / Particles',
  },
  {
    name: 'BentoGrid',
    description: 'Bento 网格布局，自适应卡片布局 + 悬浮交互',
    href: '/blocks/bento-grid',
    variants: 'Grid / Card',
  },
  {
    name: 'FeatureSection',
    description: '功能展示区，左右交替 + 网格排列 + 滚动揭示动画',
    href: '/blocks/feature-section',
    variants: 'Alternating / Center',
  },
  {
    name: 'PricingSection',
    description: '定价展示区，多列卡片 + 高亮推荐方案',
    href: '/blocks/pricing-section',
    variants: '2 / 3 / 4 Columns',
  },
  {
    name: 'CTASection',
    description: '行动号召区，多种视觉风格变体 + 按钮操作',
    href: '/blocks/cta-section',
    variants: 'Gradient / Minimal / Accent',
  },
];

export default function BlocksPage() {
  return (
    <div>
      <div className="mb-12">
        <h1 className="font-display text-4xl font-bold text-[var(--color-text-primary)]">
          页面区块
        </h1>
        <p className="mt-3 text-lg text-[var(--color-text-muted)]">
          开箱即用的完整页面组件，复制粘贴即可使用
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blocks.map((block) => (
          <Link
            key={block.href}
            href={block.href}
            className="group rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-6 transition-all hover:border-[var(--color-accent)]/50 hover:shadow-lg hover:shadow-[var(--color-accent)]/5"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)]">
                {block.name}
              </h2>
              <span className="rounded bg-[var(--color-accent)]/10 px-2 py-0.5 text-xs text-[var(--color-accent)]">
                {block.variants}
              </span>
            </div>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              {block.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
