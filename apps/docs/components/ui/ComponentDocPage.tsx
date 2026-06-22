'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { InstallTabs } from '@/components/ui/InstallTabs';
import { PropsTable } from '@/components/ui/PropsTable';
import { PropsPanel } from '@/components/ui/PropsPanel';

export interface PropConfig {
  name: string;
  type: 'number' | 'string' | 'boolean' | 'color';
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
}

export interface PropDoc {
  name: string;
  type: string;
  required?: boolean;
  default?: string;
  description: string;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface ComponentDocPageProps {
  /** 面包屑路径（如 [{ label: "文字动画", href: "/text-animations" }]） */
  category: BreadcrumbItem;
  /** 组件名称（如 "BlurText"） */
  name: string;
  /** 组件描述 */
  description: string;
  /** 安装用的短名称（如 "blur-text"） */
  installName: string;
  /** 导入语句（如 'import { BlurText } from "@frontend-ui/ui"'） */
  importStatement: string;
  /** 默认属性值 */
  defaultValues: Record<string, unknown>;
  /** 属性面板配置 */
  propConfig: PropConfig[];
  /** Props API 文档 */
  propDocs: PropDoc[];
  /** 动态生成使用代码（接收当前 props 值） */
  codeGenerator: (values: Record<string, unknown>) => string;
  /** 渲染实时预览内容 */
  renderPreview: (values: Record<string, unknown>) => React.ReactNode;
}

export function ComponentDocPage({
  category,
  name,
  description,
  installName,
  importStatement,
  defaultValues,
  propConfig,
  propDocs,
  codeGenerator,
  renderPreview,
}: ComponentDocPageProps) {
  const [props, setProps] = useState<Record<string, unknown>>(defaultValues);

  const handlePropsChange = useCallback((propName: string, value: unknown) => {
    setProps((prev) => ({ ...prev, [propName]: value }));
  }, []);

  const handleReset = useCallback(() => {
    setProps(defaultValues);
  }, [defaultValues]);

  const code = codeGenerator(props);

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--color-text-subtle)]">
        <Link
          href={category.href}
          className="transition-colors hover:text-[var(--color-text-primary)]"
        >
          {category.label}
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text-primary)]">{name}</span>
      </nav>

      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-[var(--color-text-primary)]">
          {name}
        </h1>
        <p className="mt-2 text-lg text-[var(--color-text-muted)]">
          {description}
        </p>
      </div>

      {/* Preview + Props Panel */}
      <div className="grid gap-6 lg:grid-cols-[1fr,300px]">
        {/* Live Preview */}
        <div className="overflow-hidden rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]">
          <div className="border-b border-[var(--color-border-subtle)] px-4 py-2">
            <span className="text-xs text-[var(--color-text-subtle)]">
              实时预览
            </span>
          </div>
          <div className="flex min-h-[200px] items-center justify-center py-16">
            {renderPreview(props)}
          </div>
        </div>

        {/* Props Panel */}
        <PropsPanel
          props={propConfig}
          values={props}
          onChange={handlePropsChange}
          onReset={handleReset}
        />
      </div>

      {/* Import + Code */}
      <div>
        <h2 className="font-display mb-4 text-xl font-semibold text-[var(--color-text-primary)]">
          代码
        </h2>
        <div className="space-y-3">
          <CodeBlock code={importStatement} language="tsx" filename="import" />
          <CodeBlock code={code} language="tsx" filename="usage" />
        </div>
      </div>

      {/* Installation */}
      <div>
        <h2 className="font-display mb-4 text-xl font-semibold text-[var(--color-text-primary)]">
          安装
        </h2>
        <InstallTabs componentName={installName} />
      </div>

      {/* Props API */}
      <div>
        <h2 className="font-display mb-4 text-xl font-semibold text-[var(--color-text-primary)]">
          Props API
        </h2>
        <PropsTable props={propDocs} />
      </div>
    </div>
  );
}
