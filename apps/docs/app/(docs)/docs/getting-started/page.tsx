"use client";

import Link from "next/link";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { ScrollReveal } from "@frontend-ui/ui";

const steps = [
  {
    number: "01",
    title: "安装",
    description: "使用包管理器安装 @frontend-ui/ui",
    code: "npm install @frontend-ui/ui",
  },
  {
    number: "02",
    title: "配置 Tailwind CSS",
    description: "在你的项目中配置 Tailwind CSS v4",
    code: `// app/layout.tsx 或根组件
import "@frontend-ui/ui/styles";`,
  },
  {
    number: "03",
    title: "导入组件",
    description: "在你的页面中导入并使用组件",
    code: `import { BlurText, Magnet, Particles } from "@frontend-ui/ui";

export default function Page() {
  return (
    <div>
      <BlurText text="Hello World" />
      <Magnet><button>悬停我</button></Magnet>
      <Particles count={50} />
    </div>
  );
}`,
  },
];

const features = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "零配置",
    description: "安装即用，无需额外配置",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    title: "Tree Shaking",
    description: "自动按需导入，只打包使用的组件",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "TypeScript",
    description: "完整的类型定义，出色的 IDE 支持",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: "主题定制",
    description: "支持 Design Token 和 CSS 变量定制",
  },
];

export default function GettingStartedPage() {
  return (
    <div className="space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--color-text-subtle)]">
        <Link href="/docs" className="hover:text-[var(--color-text-primary)]">
          文档
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text-primary)]">快速开始</span>
      </nav>

      {/* Header */}
      <ScrollReveal>
        <div>
          <h1 className="font-display text-4xl font-bold text-[var(--color-text-primary)]">
            快速开始
          </h1>
          <p className="mt-4 text-lg text-[var(--color-text-muted)]">
            三步开始使用 Frontend UI，构建令人印象深刻的动画界面
          </p>
        </div>
      </ScrollReveal>

      {/* Steps */}
      <div className="space-y-8">
        {steps.map((step, index) => (
          <ScrollReveal key={step.number} delay={index * 0.1}>
            <div className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-6">
              <div className="mb-4 flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-accent)]/10 font-display text-sm font-bold text-[var(--color-accent)]">
                  {step.number}
                </span>
                <div>
                  <h2 className="font-display text-xl font-semibold text-[var(--color-text-primary)]">
                    {step.title}
                  </h2>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {step.description}
                  </p>
                </div>
              </div>
              <CodeBlock code={step.code} language="tsx" />
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Features */}
      <ScrollReveal>
        <div>
          <h2 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">
            为什么选择 Frontend UI？
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-6"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                  {feature.icon}
                </div>
                <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* CLI Section */}
      <ScrollReveal>
        <div className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-6">
          <h2 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">
            使用 CLI 添加组件
          </h2>
          <p className="mt-2 text-[var(--color-text-muted)]">
            我们提供 CLI 工具，帮助你快速添加单个组件到项目中
          </p>
          <div className="mt-6 space-y-4">
            <CodeBlock
              code="npx frontend-ui add blur-text"
              language="bash"
              filename="添加单个组件"
            />
            <CodeBlock
              code="npx frontend-ui add --all"
              language="bash"
              filename="添加所有组件"
            />
          </div>
        </div>
      </ScrollReveal>

      {/* Next Steps */}
      <ScrollReveal>
        <div className="rounded-xl border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 p-6">
          <h2 className="font-display text-xl font-semibold text-[var(--color-text-primary)]">
            下一步
          </h2>
          <div className="mt-4 flex flex-wrap gap-4">
            <Link
              href="/docs/engines"
              className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] transition-all hover:border-[var(--color-accent)]/50"
            >
              了解动画引擎 →
            </Link>
            <Link
              href="/text-animations"
              className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] transition-all hover:border-[var(--color-accent)]/50"
            >
              浏览组件 →
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
