import Link from "next/link";

const sections = [
  {
    title: "快速开始",
    description: "安装、配置和第一个组件",
    href: "/docs/getting-started",
  },
  {
    title: "多引擎架构",
    description: "GSAP、Motion、react-spring 等 6+ 动画引擎",
    href: "/docs/engines",
  },
  {
    title: "CLI 工具",
    description: "npx frontend-ui add 一键添加组件",
    href: "/docs/cli",
  },
  {
    title: "主题定制",
    description: "Design Token、暗色模式、自定义颜色",
    href: "/docs/theming",
  },
];

export default function DocsPage() {
  return (
    <div>
      <div className="mb-12">
        <h1 className="font-display text-4xl font-bold text-[var(--color-text-primary)]">
          文档
        </h1>
        <p className="mt-3 text-lg text-[var(--color-text-muted)]">
          开始使用 Frontend UI 构建令人印象深刻的动画界面
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="group rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-6 transition-all hover:border-[var(--color-accent)]/50 hover:shadow-lg hover:shadow-[var(--color-accent)]/5"
          >
            <h2 className="font-display text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)]">
              {section.title}
            </h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              {section.description}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-12 overflow-hidden rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]">
        <div className="border-b border-[var(--color-border-subtle)] px-4 py-2">
          <span className="text-xs text-[var(--color-text-subtle)]">终端</span>
        </div>
        <pre className="overflow-x-auto p-4 font-mono text-sm text-[var(--color-text-primary)]">
          <code>npm install @frontend-ui/ui</code>
        </pre>
      </div>
    </div>
  );
}
