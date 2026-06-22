"use client";

import { ComponentDocPage } from "@/components/ui/ComponentDocPage";
import { SpotlightCard } from "@frontend-ui/ui";

export default function SpotlightCardPage() {
  return (
    <ComponentDocPage
      category={{ label: "复合组件", href: "/components" }}
      name="SpotlightCard"
      description="基于 CSS 和 requestAnimationFrame 的聚光灯追踪卡片，鼠标悬停时产生跟随光效。"
      installName="spotlight-card"
      importStatement={'import { SpotlightCard } from "@frontend-ui/ui";'}
      defaultValues={{}}
      propConfig={[]}
      propDocs={[
        { name: "children", type: "ReactNode", required: true, description: "卡片内容" },
        { name: "className", type: "string", description: "自定义类名" },
        { name: "spotlightColor", type: "string", default: "rgba(0, 245, 255, 0.1)", description: "聚光灯颜色（CSS 颜色值）" },
        { name: "ref", type: "Ref<HTMLDivElement>", description: "转发的 DOM ref 引用" },
      ]}
      codeGenerator={() => `<SpotlightCard spotlightColor="rgba(0, 245, 255, 0.15)">
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
      examples={[
        {
          title: "基础用法",
          description: "包裹任意内容即可获得聚光灯追踪效果",
          code: `<SpotlightCard>
  <h3>卡片标题</h3>
  <p>鼠标在卡片上移动查看聚光灯效果</p>
</SpotlightCard>`,
          render: () => (
            <SpotlightCard className="w-64">
              <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">
                基础示例
              </h3>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                鼠标在卡片上移动查看效果
              </p>
            </SpotlightCard>
          ),
        },
        {
          title: "自定义聚光灯颜色",
          description: "通过 spotlightColor 属性自定义光效颜色",
          code: `<SpotlightCard spotlightColor="rgba(255, 100, 200, 0.2)">
  <h3>自定义颜色</h3>
  <p>使用粉色聚光灯效果</p>
</SpotlightCard>`,
          render: () => (
            <SpotlightCard spotlightColor="rgba(255, 100, 200, 0.2)" className="w-64">
              <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">
                自定义颜色
              </h3>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                使用粉色聚光灯效果
              </p>
            </SpotlightCard>
          ),
        },
      ]}
      accessibility="SpotlightCard 是一个装饰性视觉增强组件，光效仅为装饰性反馈。光效层使用 CSS pointer-events: none 确保不干扰底层交互，不影响子元素的无障碍语义。对于设置了 prefers-reduced-motion 的用户，建议在全局层面禁用该装饰性效果。建议在卡片内使用具有适当语义的 HTML 元素（如 h2、p 等）以确保屏幕阅读器可正确解析内容。"
    />
  );
}
