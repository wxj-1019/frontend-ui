"use client";

import { useState } from "react";

// Design Token 定义
const tokenGroups = [
  {
    title: "字体 (Typography)",
    tokens: [
      { name: "--font-display", value: "'Space Grotesk'", description: "标题字体" },
      { name: "--font-sans", value: "'Outfit'", description: "正文字体" },
      { name: "--font-mono", value: "'JetBrains Mono'", description: "代码字体" },
    ],
  },
  {
    title: "背景色 (Background)",
    tokens: [
      { name: "--color-bg-primary", value: "#0A0A0F", description: "主背景色" },
      { name: "--color-bg-secondary", value: "#12121A", description: "次级背景" },
      { name: "--color-bg-surface", value: "#1A1A2E", description: "表面背景" },
      { name: "--color-bg-elevated", value: "#222236", description: "提升背景" },
    ],
  },
  {
    title: "文字色 (Text)",
    tokens: [
      { name: "--color-text-primary", value: "#FFFFFF", description: "主文字色" },
      { name: "--color-text-muted", value: "#A8A8BC", description: "弱化文字" },
      { name: "--color-text-subtle", value: "#8A8A9E", description: "次要文字" },
      { name: "--color-text-disabled", value: "#5A5A6E", description: "禁用文字" },
    ],
  },
  {
    title: "品牌色 (Brand)",
    tokens: [
      { name: "--color-accent", value: "#00F5FF", description: "主强调色" },
      { name: "--color-success", value: "#00FF88", description: "成功状态" },
      { name: "--color-warning", value: "#FFB800", description: "警告状态" },
    ],
  },
  {
    title: "边框 (Border)",
    tokens: [
      { name: "--color-border-default", value: "#2A2A3E", description: "默认边框" },
      { name: "--color-border-subtle", value: "rgba(255,255,255,0.06)", description: "轻微边框" },
      { name: "--color-border-strong", value: "rgba(255,255,255,0.12)", description: "强调边框" },
    ],
  },
  {
    title: "圆角 (Radius)",
    tokens: [
      { name: "--radius-sm", value: "4px", description: "小圆角" },
      { name: "--radius-md", value: "8px", description: "中圆角" },
      { name: "--radius-lg", value: "12px", description: "大圆角" },
      { name: "--radius-xl", value: "16px", description: "特大圆角" },
      { name: "--radius-full", value: "9999px", description: "全圆角" },
    ],
  },
  {
    title: "阴影 (Shadow)",
    tokens: [
      { name: "--shadow-sm", value: "0 1px 2px rgba(0,0,0,0.3)", description: "小阴影" },
      { name: "--shadow-md", value: "0 4px 12px rgba(0,0,0,0.4)", description: "中阴影" },
      { name: "--shadow-lg", value: "0 8px 24px rgba(0,0,0,0.5)", description: "大阴影" },
      { name: "--glow-accent", value: "0 0 20px rgba(0,245,255,0.3)", description: "强调发光" },
    ],
  },
  {
    title: "动画 (Animation)",
    tokens: [
      { name: "--duration-fast", value: "100ms", description: "快速动画" },
      { name: "--duration-normal", value: "200ms", description: "常规动画" },
      { name: "--duration-slow", value: "300ms", description: "慢速动画" },
      { name: "--duration-slower", value: "500ms", description: "更慢动画" },
      { name: "--ease-out", value: "cubic-bezier(0.16,1,0.3,1)", description: "缓出" },
      { name: "--ease-in", value: "cubic-bezier(0.4,0,1,1)", description: "缓入" },
      { name: "--ease-in-out", value: "cubic-bezier(0.4,0,0.2,1)", description: "缓入缓出" },
      { name: "--ease-spring", value: "cubic-bezier(0.34,1.56,0.64,1)", description: "弹簧" },
    ],
  },
];

function TokenCard({ name, value, description }: { name: string; value: string; description: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`var(${name})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isColor = value.startsWith("#") || value.startsWith("rgba") || value.startsWith("rgb");

  return (
    <div
      className="flex items-center gap-4 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-4 transition-colors hover:border-[var(--color-accent)]"
      onClick={handleCopy}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleCopy()}
    >
      {isColor && (
        <div
          className="h-10 w-10 rounded-md border border-[var(--color-border-subtle)]"
          style={{ backgroundColor: value }}
        />
      )}
      <div className="flex-1">
        <code className="text-sm text-[var(--color-accent)]">{name}</code>
        <p className="mt-1 text-xs text-[var(--color-text-muted)]">{description}</p>
      </div>
      <div className="text-right">
        <code className="text-xs text-[var(--color-text-subtle)]">{value}</code>
        <p className="mt-1 text-xs text-[var(--color-text-disabled)]">
          {copied ? "已复制!" : "点击复制"}
        </p>
      </div>
    </div>
  );
}

export default function DesignTokensPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 py-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">
          Design Tokens
        </h1>
        <p className="mt-2 text-[var(--color-text-muted)]">
          Frontend UI 的设计令牌系统，基于 CSS 自定义属性实现，支持暗色/亮色主题切换。
        </p>
      </div>

      <div className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-6">
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
          三层架构
        </h2>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="rounded-md bg-[var(--color-bg-elevated)] p-4">
            <h3 className="font-medium text-[var(--color-accent)]">Primitive</h3>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              基础值，如颜色代码、像素值
            </p>
          </div>
          <div className="rounded-md bg-[var(--color-bg-elevated)] p-4">
            <h3 className="font-medium text-[var(--color-accent)]">Semantic</h3>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              语义映射，如主色、背景色
            </p>
          </div>
          <div className="rounded-md bg-[var(--color-bg-elevated)] p-4">
            <h3 className="font-medium text-[var(--color-accent)]">Component</h3>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              组件级，如按钮背景、卡片边框
            </p>
          </div>
        </div>
      </div>

      {tokenGroups.map((group) => (
        <div key={group.title}>
          <h2 className="mb-4 text-xl font-semibold text-[var(--color-text-primary)]">
            {group.title}
          </h2>
          <div className="space-y-2">
            {group.tokens.map((token) => (
              <TokenCard key={token.name} {...token} />
            ))}
          </div>
        </div>
      ))}

      <div className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-6">
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
          使用示例
        </h2>
        <pre className="mt-4 overflow-x-auto rounded-md bg-[var(--color-bg-elevated)] p-4">
          <code className="text-sm text-[var(--color-text-muted)]">{`/* 在组件中使用 Token */
.my-component {
  background-color: var(--color-bg-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  transition: all var(--duration-normal) var(--ease-out);
}

.my-component:hover {
  border-color: var(--color-accent);
  box-shadow: var(--glow-accent);
}`}</code>
        </pre>
      </div>
    </div>
  );
}
