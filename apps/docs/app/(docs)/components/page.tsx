import Link from "next/link";

const components = [
  {
    name: "Dock",
    description: "macOS 风格的停靠栏",
    href: "/components/dock",
  },
  {
    name: "SpotlightCard",
    description: "聚光灯追踪卡片",
    href: "/components/spotlight-card",
  },
  {
    name: "Masonry",
    description: "瀑布流布局，CSS columns 实现",
    href: "/components/masonry",
  },
  {
    name: "Carousel",
    description: "轮播图组件，支持自动播放和拖拽",
    href: "/components/carousel",
  },
  {
    name: "StackCards",
    description: "堆叠卡片，滚动时依次覆盖",
    href: "/components/stack-cards",
  },
];

export default function ComponentsPage() {
  return (
    <div>
      <div className="mb-12">
        <h1 className="font-display text-4xl font-bold text-[var(--color-text-primary)]">
          复合组件
        </h1>
        <p className="mt-3 text-lg text-[var(--color-text-muted)]">
          可直接使用的高级交互组件
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {components.map((component) => (
          <Link
            key={component.href}
            href={component.href}
            className="group rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-6 transition-all hover:border-[var(--color-accent)]/50 hover:shadow-lg hover:shadow-[var(--color-accent)]/5"
          >
            <h2 className="font-display text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)]">
              {component.name}
            </h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              {component.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
