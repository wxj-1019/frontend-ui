"use client";

import { Aurora } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function AuroraPage() {
  return (
    <ComponentDocPage
      category={{ label: "背景特效", href: "/backgrounds" }}
      name="Aurora"
      description="基于 CSS 径向渐变的极光背景效果，通过 CSS 动画实现多色渐变的流动与融合，营造梦幻般的极光视觉。"
      installName="aurora"
      importStatement={'import { Aurora } from "@frontend-ui/ui";'}
      defaultValues={{ colors: ["#3b82f6", "#8b5cf6", "#ec4899"] }}
      propConfig={[
        { name: "colors", type: "string" },
      ]}
      propDocs={[
        { name: "className", type: "string", default: "-", description: "自定义类名" },
        { name: "colors", type: "string[]", default: '["#3b82f6", "#8b5cf6", "#ec4899"]', description: "极光颜色数组" },
      ]}
      codeGenerator={(v) => `<div className="relative h-screen">
  <Aurora colors={${JSON.stringify(v.colors)}} />
</div>`}
      renderPreview={(v) => (
        <div className="relative h-48 w-full overflow-hidden rounded-lg">
          <Aurora colors={Array.isArray(v.colors) ? v.colors : ["#3b82f6", "#8b5cf6", "#ec4899"]} />
          <div className="relative z-10 flex h-full items-center justify-center">
            <p className="text-sm text-[var(--color-text-muted)]">极光效果预览</p>
          </div>
        </div>
      )}
      examples={[
        {
          title: "基本用法",
          description: "默认三色极光效果",
          code: `<div className="relative h-screen">
  <Aurora />
</div>`,
          render: () => (
            <div className="relative h-48 w-full overflow-hidden rounded-lg">
              <Aurora />
              <div className="relative z-10 flex h-full items-center justify-center">
                <p className="text-sm text-white">默认极光</p>
              </div>
            </div>
          ),
        },
        {
          title: "自定义颜色",
          description: "使用自定义颜色组合",
          code: `<div className="relative h-screen">
  <Aurora colors={["#06b6d4", "#8b5cf6", "#f43f5e"]} />
</div>`,
          render: () => (
            <div className="relative h-48 w-full overflow-hidden rounded-lg">
              <Aurora colors={["#06b6d4", "#8b5cf6", "#f43f5e"]} />
              <div className="relative z-10 flex h-full items-center justify-center">
                <p className="text-sm text-white">自定义极光</p>
              </div>
            </div>
          ),
        },
        {
          title: "双色极光",
          description: "仅使用两种颜色的极光效果",
          code: `<div className="relative h-screen">
  <Aurora colors={["#22c55e", "#3b82f6"]} />
</div>`,
          render: () => (
            <div className="relative h-48 w-full overflow-hidden rounded-lg">
              <Aurora colors={["#22c55e", "#3b82f6"]} />
              <div className="relative z-10 flex h-full items-center justify-center">
                <p className="text-sm text-white">双色极光</p>
              </div>
            </div>
          ),
        },
      ]}
      accessibility="Aurora 使用 CSS 径向渐变和 @keyframes 动画实现视觉效果，纯装饰性背景。组件元素标记为 aria-hidden='true'，不包含交互内容，对屏幕阅读器无影响。对于设置了 prefers-reduced-motion 的用户，CSS 动画自动停止，渐变保持静态显示。由于是纯 CSS 实现，无额外性能开销，也不影响页面焦点管理。"
    />
  );
}
