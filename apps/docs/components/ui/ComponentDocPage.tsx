"use client";

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { InstallTabs } from '@/components/ui/InstallTabs';
import { PropsTable } from '@/components/ui/PropsTable';
import { PropsPanel } from '@/components/ui/PropsPanel';
import { ResponsivePreview } from '@/components/ui/ResponsivePreview';

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

export interface ExampleItem {
  title: string;
  description?: string;
  code: string;
  language?: string;
  render?: () => React.ReactNode;
}

export interface ComponentDocPageProps {
  /** 面包屑路径 */
  category: BreadcrumbItem;
  /** 组件名称 */
  name: string;
  /** 组件描述 */
  description: string;
  /** 安装用的短名称 */
  installName: string;
  /** 导入语句 */
  importStatement: string;
  /** 默认属性值 */
  defaultValues: Record<string, unknown>;
  /** 属性面板配置 */
  propConfig: PropConfig[];
  /** Props API 文档 */
  propDocs: PropDoc[];
  /** 动态生成使用代码 */
  codeGenerator: (values: Record<string, unknown>) => string;
  /** 渲染实时预览内容 */
  renderPreview: (values: Record<string, unknown>) => React.ReactNode;
  /** 使用示例列表 */
  examples?: ExampleItem[];
  /** 无障碍说明 */
  accessibility?: string;
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
  examples = [],
  accessibility,
}: ComponentDocPageProps) {
  const [props, setProps] = useState<Record<string, unknown>>(defaultValues);
  const [previewKey, setPreviewKey] = useState(0);

  const handlePropsChange = useCallback((propName: string, value: unknown) => {
    setProps((prev) => ({ ...prev, [propName]: value }));
    setPreviewKey((k) => k + 1);
  }, []);

  const handleReset = useCallback(() => {
    setProps(defaultValues);
    setPreviewKey((k) => k + 1);
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
        {/* Live Preview with Responsive Toggle */}
        <ResponsivePreview
          render={() => renderPreview(props)}
          title="实时预览"
        />

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

      {/* Examples */}
      {examples.length > 0 && (
        <div>
          <h2 className="font-display mb-4 text-xl font-semibold text-[var(--color-text-primary)]">
            使用示例
          </h2>
          <div className="space-y-6">
            {examples.map((example) => (
              <div
                key={example.title}
                className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] overflow-hidden"
              >
                <div className="border-b border-[var(--color-border-subtle)] px-4 py-3">
                  <h3 className="font-display text-sm font-semibold text-[var(--color-text-primary)]">
                    {example.title}
                  </h3>
                  {example.description && (
                    <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                      {example.description}
                    </p>
                  )}
                </div>
                {example.render && (
                  <div className="flex min-h-[120px] items-center justify-center border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] py-8">
                    {example.render()}
                  </div>
                )}
                <div className="p-0">
                  <CodeBlock
                    code={example.code}
                    language={example.language || 'tsx'}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Accessibility */}
      {accessibility && (
        <div className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-6">
          <h2 className="font-display mb-3 text-xl font-semibold text-[var(--color-text-primary)]">
            无障碍
          </h2>
          <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
            {accessibility}
          </p>
        </div>
      )}
    </div>
  );
}
