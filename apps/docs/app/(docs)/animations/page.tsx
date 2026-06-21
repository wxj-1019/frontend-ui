import Link from "next/link";

const animations = [
  {
    name: "Magnet",
    description: "磁性跟随效果",
    href: "/animations/magnet",
  },
  {
    name: "FadeContent",
    description: "渐入内容动画",
    href: "/animations/fade-content",
  },
  {
    name: "ScrollReveal",
    description: "滚动触发动画",
    href: "/animations/scroll-reveal",
  },
  {
    name: "Draggable",
    description: "可拖拽元素，支持边界约束",
    href: "/animations/draggable",
  },
  {
    name: "FlipCard",
    description: "翻转卡片，悬停或点击触发",
    href: "/animations/flip-card",
  },
  {
    name: "Accordion",
    description: "手风琴展开折叠面板",
    href: "/animations/accordion",
  },
  {
    name: "Tabs",
    description: "标签页切换，带滑动指示器",
    href: "/animations/tabs",
  },
  {
    name: "Modal",
    description: "模态框动画，背景模糊+缩放",
    href: "/animations/modal",
  },
  {
    name: "Toast",
    description: "通知提示，自动消失",
    href: "/animations/toast",
  },
];

export default function AnimationsPage() {
  return (
    <div>
      <div className="mb-12">
        <h1 className="font-display text-4xl font-bold text-[var(--color-text-primary)]">
          交互动画
        </h1>
        <p className="mt-3 text-lg text-[var(--color-text-muted)]">
          为用户交互添加流畅的动画反馈
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {animations.map((animation) => (
          <Link
            key={animation.href}
            href={animation.href}
            className="group rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-6 transition-all hover:border-[var(--color-accent)]/50 hover:shadow-lg hover:shadow-[var(--color-accent)]/5"
          >
            <h2 className="font-display text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)]">
              {animation.name}
            </h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              {animation.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
