"use client";

import { useState, useRef, useEffect } from "react";

interface InstallTabsProps {
  componentName: string;
}

const installMethods = [
  { id: "cli", label: "CLI", prefix: "$ " },
  { id: "npm", label: "npm", prefix: "" },
  { id: "shadcn", label: "shadcn", prefix: "$ " },
  { id: "copy", label: "复制代码", prefix: "" },
];

export function InstallTabs({ componentName }: InstallTabsProps) {
  const [activeTab, setActiveTab] = useState("cli");
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const getCommand = (method: string) => {
    switch (method) {
      case "cli":
        return `npx frontend-ui add ${componentName}`;
      case "npm":
        return `npm install @frontend-ui/ui`;
      case "shadcn":
        return `npx shadcn@latest add @frontend-ui/${componentName}`;
      case "copy":
        return "从文档站复制代码";
      default:
        return "";
    }
  };

  const handleCopy = async () => {
    const command = getCommand(activeTab);
    await navigator.clipboard.writeText(command);
    setCopied(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]">
      {/* Tabs */}
      <div
        role="tablist"
        aria-label="安装方式"
        className="flex border-b border-[var(--color-border-subtle)]"
      >
        {installMethods.map((method) => (
          <button
            key={method.id}
            role="tab"
            aria-selected={activeTab === method.id}
            aria-controls={`panel-${method.id}`}
            id={`tab-${method.id}`}
            onClick={() => setActiveTab(method.id)}
            className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === method.id
                ? "border-b-2 border-[var(--color-accent)] text-[var(--color-accent)]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            {method.label}
          </button>
        ))}
      </div>
      {/* Command */}
      <div
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className="flex items-center justify-between px-4 py-3"
      >
        <code className="font-mono text-sm text-[var(--color-text-primary)]">
          {getCommand(activeTab)}
        </code>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-[var(--color-text-subtle)] transition-colors hover:bg-[var(--color-hover)] hover:text-[var(--color-text-primary)]"
        >
          {copied ? (
            <>
              <svg className="h-3.5 w-3.5 text-[var(--color-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              已复制
            </>
          ) : (
            <>
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              复制
            </>
          )}
        </button>
      </div>
    </div>
  );
}
