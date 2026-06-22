"use client";

import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function SmoothScrollPage() {
  return (
    <ComponentDocPage
      category={{ label: "复合组件", href: "/components" }}
      name="SmoothScrollProvider"
      description="基于 Lenis 的平滑滚动提供者，包裹后全局启用平滑滚动效果"
      installName="smooth-scroll"
      importStatement={
        'import { SmoothScrollProvider } from "@frontend-ui/ui";'
      }
      defaultValues={{
        lerp: 0.1,
        orientation: "vertical",
        smoothWheel: true,
        duration: 1.2,
        infinite: false,
      }}
      propConfig={[
        { name: "lerp", type: "number", min: 0.01, max: 1, step: 0.01 },
        {
          name: "orientation",
          type: "string",
          options: ["vertical", "horizontal"],
        },
        { name: "smoothWheel", type: "boolean" },
        { name: "duration", type: "number", min: 0.1, max: 5, step: 0.1 },
        { name: "infinite", type: "boolean" },
      ]}
      propDocs={[
        {
          name: "children",
          type: "ReactNode",
          required: true,
          description: "子元素",
        },
        {
          name: "root",
          type: "string",
          default: "undefined",
          description: "根元素选择器",
        },
        {
          name: "options.lerp",
          type: "number",
          default: "0.1",
          description: "滚动惯性 (0~1)",
        },
        {
          name: "options.orientation",
          type: "string",
          default: "vertical",
          description: "滚动方向",
        },
        {
          name: "options.smoothWheel",
          type: "boolean",
          default: "true",
          description: "平滑滚轮",
        },
        {
          name: "options.duration",
          type: "number",
          default: "1.2",
          description: "持续时间 (秒)",
        },
        {
          name: "options.infinite",
          type: "boolean",
          default: "false",
          description: "无限滚动",
        },
        {
          name: "className",
          type: "string",
          default: "-",
          description: "自定义类名",
        },
      ]}
      codeGenerator={() => `<SmoothScrollProvider>
  <YourApp />
</SmoothScrollProvider>`}
      renderPreview={() => (
        <div className="flex items-center justify-center py-12 text-center">
          <div className="max-w-sm space-y-4">
            <div className="text-4xl">🔄</div>
            <p className="text-[var(--color-text-muted)]">
              SmoothScrollProvider 包裹后，全局滚动自动变为平滑滚动效果。
            </p>
          </div>
        </div>
      )}
    />
  );
}
