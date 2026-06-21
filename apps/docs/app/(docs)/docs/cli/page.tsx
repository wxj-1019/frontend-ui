"use client";

import Link from "next/link";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { ScrollReveal } from "@frontend-ui/ui";

const commands = [
  {
    name: "添加组件",
    description: "使用 CLI 快速添加单个组件到你的项目",
    code: "npx frontend-ui add <component-name>",
    example: "npx frontend-ui add blur-text",
  },
  {
    name: "添加多个组件",
    description: "一次添加多个组件",
    code: 'npx frontend-ui add <component1> <component2> <component3>',
    example: "npx frontend-ui add blur-text gradient-text split-text",
  },
  {
    name: "添加所有组件",
    description: "添加组件库中的所有组件",
    code: "npx frontend-ui add --all",
    example: null,
  },
  {
    name: "查看可用组件",
    description: "列出所有可用的组件",
    code: "npx frontend-ui list",
    example: null,
  },
];

const cliOptions = [
  {
    flag: "--all",
    description: "添加所有可用组件",
  },
  {
    flag: "--yes, -y",
    description: "跳过确认提示，自动安装",
  },
  {
    flag: "--overwrite",
    description: "覆盖已存在的组件文件",
  },
  {
    flag: "--dry-run",
    description: "模拟运行，不实际安装文件",
  },
];

const componentList = [
  { name: "blur-text", category: "文字动画" },
  { name: "gradient-text", category: "文字动画" },
  { name: "split-text", category: "文字动画" },
  { name: "magnet", category: "交互动画" },
  { name: "fade-content", category: "交互动画" },
  { name: "scroll-reveal", category: "交互动画" },
  { name: "dock", category: "复合组件" },
  { name: "spotlight-card", category: "复合组件" },
  { name: "aurora", category: "背景特效" },
  { name: "particles", category: "背景特效" },
];

export default function CLIPage() {
  return (
    <div className="space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--color-text-subtle)]">
        <Link href="/docs" className="hover:text-[var(--color-text-primary)]">
          文档
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text-primary)]">CLI 工具</span>
      </nav>

      {/* Header */}
      <ScrollReveal>
        <div>
          <h1 className="font-display text-4xl font-bold text-[var(--color-text-primary)]">
            CLI 工具
          </h1>
          <p className="mt-4 text-lg text-[var(--color-text-muted)]">
            使用命令行工具快速添加组件到你的项目中
          </p>
        </div>
      </ScrollReveal>

      {/* Quick Start */}
      <ScrollReveal>
        <div className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-6">
          <h2 className="font-display text-xl font-semibold text-[var(--color-text-primary)]">
            快速开始
          </h2>
          <p className="mt-2 text-[var(--color-text-muted)]">
            在你的项目根目录运行以下命令：
          </p>
          <div className="mt-4 space-y-3">
            <CodeBlock code="npx frontend-ui add blur-text" language="bash" />
            <CodeBlock
              code="npx frontend-ui add blur-text gradient-text"
              language="bash"
            />
          </div>
        </div>
      </ScrollReveal>

      {/* Commands */}
      <ScrollReveal>
        <div>
          <h2 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">
            命令列表
          </h2>
          <div className="mt-6 space-y-4">
            {commands.map((cmd) => (
              <div
                key={cmd.name}
                className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-6"
              >
                <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">
                  {cmd.name}
                </h3>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  {cmd.description}
                </p>
                <div className="mt-4">
                  <CodeBlock code={cmd.code} language="bash" />
                </div>
                {cmd.example && (
                  <div className="mt-3">
                    <span className="text-xs text-[var(--color-text-subtle)]">
                      示例：
                    </span>
                    <CodeBlock code={cmd.example} language="bash" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* CLI Options */}
      <ScrollReveal>
        <div className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-6">
          <h2 className="font-display text-xl font-semibold text-[var(--color-text-primary)]">
            命令行选项
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--color-border-subtle)]">
                  <th className="px-4 py-3 text-left text-sm font-medium text-[var(--color-text-muted)]">
                    选项
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[var(--color-text-muted)]">
                    说明
                  </th>
                </tr>
              </thead>
              <tbody>
                {cliOptions.map((opt) => (
                  <tr
                    key={opt.flag}
                    className="border-b border-[var(--color-border-subtle)] last:border-0"
                  >
                    <td className="px-4 py-3">
                      <code className="rounded bg-[var(--color-bg-primary)] px-2 py-1 font-mono text-sm text-[var(--color-accent)]">
                        {opt.flag}
                      </code>
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--color-text-muted)]">
                      {opt.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ScrollReveal>

      {/* Available Components */}
      <ScrollReveal>
        <div className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-6">
          <h2 className="font-display text-xl font-semibold text-[var(--color-text-primary)]">
            可用组件列表
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            使用 <code>npx frontend-ui list</code> 查看最新列表
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--color-border-subtle)]">
                  <th className="px-4 py-3 text-left text-sm font-medium text-[var(--color-text-muted)]">
                    组件名称
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[var(--color-text-muted)]">
                    分类
                  </th>
                </tr>
              </thead>
              <tbody>
                {componentList.map((comp) => (
                  <tr
                    key={comp.name}
                    className="border-b border-[var(--color-border-subtle)] last:border-0"
                  >
                    <td className="px-4 py-3">
                      <code className="font-mono text-sm text-[var(--color-text-primary)]">
                        {comp.name}
                      </code>
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--color-text-muted)]">
                      {comp.category}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
              href="/docs/theming"
              className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] transition-all hover:border-[var(--color-accent)]/50"
            >
              主题定制 →
            </Link>
            <Link
              href="/docs/engines"
              className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] transition-all hover:border-[var(--color-accent)]/50"
            >
              动画引擎 →
            </Link>
          </div>
        </div>
      </ScrollReveal>

      {/* Navigation */}
      <ScrollReveal>
        <div className="flex justify-between">
          <Link
            href="/docs/engines"
            className="flex items-center gap-2 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] px-4 py-2 text-sm text-[var(--color-text-muted)] transition-all hover:border-[var(--color-accent)]/50 hover:text-[var(--color-text-primary)]"
          >
            ← 动画引擎
          </Link>
          <Link
            href="/docs/theming"
            className="flex items-center gap-2 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] px-4 py-2 text-sm text-[var(--color-text-muted)] transition-all hover:border-[var(--color-accent)]/50 hover:text-[var(--color-text-primary)]"
          >
            主题定制 →
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}
