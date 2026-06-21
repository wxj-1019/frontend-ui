"use client";

import { ComponentDocPage } from "@/components/ui/ComponentDocPage";
import { SpotlightCard } from "@frontend-ui/ui";

export default function SpotlightCardPage() {
  return (
    <ComponentDocPage
      category={{ label: "复合组件", href: "/components" }}
      name="SpotlightCard"
      description="聚光灯追踪卡片，鼠标悬停时产生光效追踪"
      installName="spotlight-card"
      importStatement={'import { SpotlightCard } from "@frontend-ui/ui";'}
      defaultValues={{}}
      propConfig={[]}
      propDocs={[
        { name: "children", type: "ReactNode", required: true, description: "卡片内容" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
        { name: "spotlightColor", type: "string", default: "rgba(0, 245, 255, 0.1)", description: "聚光灯颜色" },
      ]}
      codeGenerator={() => `<SpotlightCard>
  <h3>卡片标题</h3>
  <p>卡片内容</p>
</SpotlightCard>`}
      renderPreview={() => (
        <SpotlightCard className="w-64">
          <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">
            悬停查看效果
          </h3>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            鼠标在卡片上移动查看聚光灯效果
          </p>
        </SpotlightCard>
      )}
    />
  );
}
