'use client';

import { useState, useCallback } from 'react';
import { PropsPanel } from './PropsPanel';
import type { PropConfig } from './types';

interface LivePreviewProps {
  propConfig: PropConfig[];
  defaultValues: Record<string, unknown>;
  renderPreview: (values: Record<string, unknown>) => React.ReactNode;
}

export function LivePreview({
  propConfig,
  defaultValues,
  renderPreview,
}: LivePreviewProps) {
  const [props, setProps] = useState<Record<string, unknown>>(defaultValues);

  const handlePropsChange = useCallback((propName: string, value: unknown) => {
    setProps((prev) => ({ ...prev, [propName]: value }));
  }, []);

  const handleReset = useCallback(() => {
    setProps(defaultValues);
  }, [defaultValues]);

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-[1fr,300px]">
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

        <PropsPanel
          props={propConfig}
          values={props}
          onChange={handlePropsChange}
          onReset={handleReset}
        />
      </div>
    </>
  );
}
