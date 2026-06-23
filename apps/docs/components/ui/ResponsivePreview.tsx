"use client";

import { useState, ReactNode } from 'react';

interface ResponsivePreviewProps {
  render: () => ReactNode;
  title?: string;
}

type Viewport = 'desktop' | 'tablet' | 'mobile';

const viewportWidths: Record<Viewport, string> = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
};

export function ResponsivePreview({ render, title = '实时预览' }: ResponsivePreviewProps) {
  const [viewport, setViewport] = useState<Viewport>('desktop');

  const viewportIcons: Record<Viewport, ReactNode> = {
    desktop: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    tablet: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    mobile: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  };

  const viewportLabels: Record<Viewport, string> = {
    desktop: '桌面',
    tablet: '平板',
    mobile: '手机',
  };

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]">
      {/* Header with viewport toggle */}
      <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] px-4 py-2">
        <span className="text-xs text-[var(--color-text-subtle)]">{title}</span>
        <div className="flex items-center gap-1">
          {(['desktop', 'tablet', 'mobile'] as Viewport[]).map((v) => (
            <button
              key={v}
              onClick={() => setViewport(v)}
              className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-colors ${
                viewport === v
                  ? 'bg-[var(--color-hover)] text-[var(--color-accent)]'
                  : 'text-[var(--color-text-subtle)] hover:text-[var(--color-text-primary)]'
              }`}
              aria-label={`切换到${viewportLabels[v]}视图`}
              aria-pressed={viewport === v}
              title={viewportLabels[v]}
            >
              {viewportIcons[v]}
            </button>
          ))}
        </div>
      </div>
      {/* Preview Area with transition */}
      <div className="flex justify-center overflow-auto p-4">
        <div
          className="transition-all duration-300 ease-in-out"
          style={{
            width: viewportWidths[viewport],
            maxWidth: '100%',
          }}
        >
          <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] p-8">
            {render()}
          </div>
        </div>
      </div>
      {/* Viewport label */}
      <div className="border-t border-[var(--color-border-subtle)] px-4 py-1.5 text-center">
        <span className="text-xs text-[var(--color-text-subtle)]">
          {viewportLabels[viewport]} · {viewportWidths[viewport]}
        </span>
      </div>
    </div>
  );
}
