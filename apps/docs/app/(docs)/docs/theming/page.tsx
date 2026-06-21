"use client";

import Link from "next/link";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { ScrollReveal } from "@frontend-ui/ui";

const tokens = [
  {
    name: "--color-bg-primary",
    value: "#0a0a0a",
    description: "主背景色",
    category: "背景",
  },
  {
    name: "--color-bg-secondary",
    value: "#141414",
    description: "次背景色",
    category: "背景",
  },
  {
    name: "--color-bg-surface",
    value: "#1a1a1a",
    description: "表面背景色",
    category: "背景",
  },
  {
    name: "--color-text-primary",
    value: "#ffffff",
    description: "主文本色",
    category: "文本",
  },
  {
    name: "--color-text-muted",
    value: "#a3a3a3",
    description: "次要文本色",
    category: "文本",
  },
  {
    name: "--color-text-subtle",
    value: "#737373",
    description: "弱化文本色",
    category: "文本",
  },
  {
    name: "--color-accent",
    value: "#00f5ff",
    description: "品牌强调色",
    category: "强调",
  },
  {
    name: "--color-success",
    value: "#00ff88",
    description: "成功状态色",
    category: "强调",
  },
  {
    name: "--color-warning",
    value: "#ffb800",
    description: "警告状态色",
    category: "强调",
  },
  {
    name: "--color-border-default",
    value: "#262626",
    description: "默认边框色",
    category: "边框",
  },
  {
    name: "--color-border-subtle",
    value: "#1f1f1f",
    description: "弱化边框色",
    category: "边框",
  },
  {
    name: "--color-hover",
    value: "#1a1a1a",
    description: "悬停背景色",
    category: "交互",
  },
];

const themes = [
  {
    name: "Dark (默认)",
    description: "深色主题，适合夜间使用",
    className: "data-theme-dark",
  },
  {
    name: "Light",
    description: "浅色主题，适合日间使用",
    className: "data-theme-light",
  },
];

const colorGroups = ["背景", "文本", "强调", "边框", "交互"];

export default function ThemingPage() {
  return (
    <div className="space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--color-text-subtle)]">
        <Link href="/docs" className="hover:text-[var(--color-text-primary)]">
          文档
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text-primary)]">主题定制</span>
      </nav>

      {/* Header */}
      <ScrollReveal>
        <div>
          <h1 className="font-display text-4xl font-bold text-[var(--color-text-primary)]">
            主题定制
          </h1>
          <p className="mt-4 text-lg text-[var(--color-text-muted)]">
            通过 CSS 变量轻松定制组件库的主题颜色和样式
          </p>
        </div>
      </ScrollReveal>

      {/* Quick Customization */}
      <ScrollReveal>
        <div className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-6">
          <h2 className="font-display text-xl font-semibold text-[var(--color-text-primary)]">
            快速定制
          </h2>
          <p className="mt-2 text-[var(--color-text-muted)]">
            在你的全局 CSS 文件中覆盖 CSS 变量即可定制主题：
          </p>
          <CodeBlock
            code={`/* app/globals.css */
@layer base {
  :root {
    --color-accent: #00f5ff;
    --color-success: #00ff88;
    --color-bg-primary: #0a0a0a;
    --color-text-primary: #ffffff;
  }
}`}
            language="css"
          />
        </div>
      </ScrollReveal>

      {/* Theme Switching */}
      <ScrollReveal>
        <div className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-6">
          <h2 className="font-display text-xl font-semibold text-[var(--color-text-primary)]">
            主题切换
          </h2>
          <p className="mt-2 text-[var(--color-text-muted)]">
            使用 <code>data-theme</code> 属性切换主题：
          </p>
          <CodeBlock
            code={`// 使用 next-themes
import { ThemeProvider } from "next-themes";

<ThemeProvider attribute="data-theme" defaultTheme="dark">
  <App />
</ThemeProvider>

// 手动切换
document.documentElement.setAttribute("data-theme", "light");`}
            language="tsx"
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {themes.map((theme) => (
              <div
                key={theme.name}
                className="rounded-lg border border-[var(--color-border-default)] p-4"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`h-4 w-4 rounded-full ${
                      theme.name.includes("Dark")
                        ? "bg-gray-800"
                        : "bg-gray-200"
                    }`}
                  />
                  <span className="font-medium text-[var(--color-text-primary)]">
                    {theme.name}
                  </span>
                </div>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  {theme.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Design Tokens */}
      <ScrollReveal>
        <div className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-6">
          <h2 className="font-display text-xl font-semibold text-[var(--color-text-primary)]">
            Design Tokens
          </h2>
          <p className="mt-2 text-[var(--color-text-muted)]">
            组件库使用以下 CSS 变量作为设计令牌：
          </p>

          {colorGroups.map((group) => (
            <div key={group} className="mt-6">
              <h3 className="mb-3 font-display font-medium text-[var(--color-text-primary)]">
                {group}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--color-border-subtle)]">
                      <th className="px-4 py-2 text-left text-sm font-medium text-[var(--color-text-muted)]">
                        变量名
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-[var(--color-text-muted)]">
                        预览
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-[var(--color-text-muted)]">
                        默认值
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-[var(--color-text-muted)]">
                        说明
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tokens
                      .filter((t) => t.category === group)
                      .map((token) => (
                        <tr
                          key={token.name}
                          className="border-b border-[var(--color-border-subtle)] last:border-0"
                        >
                          <td className="px-4 py-2">
                            <code className="font-mono text-xs text-[var(--color-accent)]">
                              {token.name}
                            </code>
                          </td>
                          <td className="px-4 py-2">
                            <div
                              className="h-6 w-6 rounded border border-[var(--color-border-default)]"
                              style={{ backgroundColor: token.value }}
                            />
                          </td>
                          <td className="px-4 py-2">
                            <code className="font-mono text-xs text-[var(--color-text-muted)]">
                              {token.value}
                            </code>
                          </td>
                          <td className="px-4 py-2 text-sm text-[var(--color-text-muted)]">
                            {token.description}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Custom Component Styling */}
      <ScrollReveal>
        <div className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-6">
          <h2 className="font-display text-xl font-semibold text-[var(--color-text-primary)]">
            自定义组件样式
          </h2>
          <p className="mt-2 text-[var(--color-text-muted)]">
            每个组件都支持通过 className 和 CSS 变量进行样式定制：
          </p>
          <CodeBlock
            code={`// 使用 className 定制
<BlurText 
  text="Hello" 
  className="text-red-500 text-2xl font-bold"
/>

// 使用 CSS 变量定制
<div style={{ "--color-accent": "#ff0000" }}>
  <Magnet>
    <button>自定义颜色按钮</button>
  </Magnet>
</div>`}
            language="tsx"
          />
        </div>
      </ScrollReveal>

      {/* Dark Mode Tips */}
      <ScrollReveal>
        <div className="rounded-xl border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 p-6">
          <h2 className="font-display text-xl font-semibold text-[var(--color-text-primary)]">
            暗色模式最佳实践
          </h2>
          <ul className="mt-4 space-y-2 text-[var(--color-text-muted)]">
            <li className="flex items-start gap-2">
              <span className="text-[var(--color-accent)]">•</span>
              始终使用 CSS 变量而非硬编码颜色
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--color-accent)]">•</span>
              使用 <code>next-themes</code> 实现主题切换
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--color-accent)]">•</span>
              测试两种主题下的可访问性对比度
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--color-accent)]">•</span>
              使用 <code>prefers-color-scheme</code> 媒体查询检测系统偏好
            </li>
          </ul>
        </div>
      </ScrollReveal>

      {/* Navigation */}
      <ScrollReveal>
        <div className="flex justify-between">
          <Link
            href="/docs/cli"
            className="flex items-center gap-2 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] px-4 py-2 text-sm text-[var(--color-text-muted)] transition-all hover:border-[var(--color-accent)]/50 hover:text-[var(--color-text-primary)]"
          >
            ← CLI 工具
          </Link>
          <Link
            href="/text-animations"
            className="flex items-center gap-2 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] px-4 py-2 text-sm text-[var(--color-text-muted)] transition-all hover:border-[var(--color-accent)]/50 hover:text-[var(--color-text-primary)]"
          >
            浏览组件 →
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}
