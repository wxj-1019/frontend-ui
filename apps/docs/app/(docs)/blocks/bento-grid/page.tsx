"use client";

import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function BentoGridPage() {
  return (
    <ComponentDocPage
      category={{ label: "页面区块", href: "/blocks" }}
      name="BentoGrid"
      description="Bento 网格布局，自适应卡片布局 + 悬浮交互"
      installName="bento-grid"
      importStatement={'import { BentoGrid } from "@frontend-ui/ui";'}
      defaultValues={{ columns: 3 }}
      propConfig={[
        { name: "columns", type: "number", min: 2, max: 4, step: 1 },
      ]}
      propDocs={[
        { name: "children", type: "ReactNode", required: true, description: "网格内容" },
        { name: "columns", type: "number", default: "3", description: "列数" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
      ]}
      codeGenerator={(v) => `<BentoGrid columns={${v.columns}}>
  <BentoCard>卡片 1</BentoCard>
  <BentoCard>卡片 2</BentoCard>
  <BentoCard>卡片 3</BentoCard>
</BentoGrid>`}
      renderPreview={(v) => (
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: `repeat(${String(v.columns)}, 1fr)` }}
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex h-24 items-center justify-center rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] text-sm text-[var(--color-text-muted)]"
            >
              卡片 {i}
            </div>
          ))}
        </div>
      )}
    />
  );
}
