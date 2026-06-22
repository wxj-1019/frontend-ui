"use client";

import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function SmoothScrollPage() {
  return (
    <ComponentDocPage
      category={{ label: "复合组件", href: "/components" }}
      name="SmoothScrollProvider"
      description="基于 Lenis 的平滑滚动提供者，包裹后全局启用平滑滚动效果，通过 ReactLenis 实现丝滑的滚动体验。"
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
          description: "子元素，包裹后内容将获得平滑滚动效果",
        },
        {
          name: "root",
          type: "string",
          default: "undefined",
          description: "Lenis 根元素 CSS 选择器，默认监听整个文档",
        },
        {
          name: "options",
          type: "object",
          description: "Lenis 平滑滚动配置对象",
        },
        {
          name: "options.lerp",
          type: "number",
          default: "0.1",
          description: "滚动惯性系数（0~1），值越大滚动越灵敏",
        },
        {
          name: "options.orientation",
          type: "'vertical' | 'horizontal'",
          default: "vertical",
          description: "滚动方向",
        },
        {
          name: "options.smoothWheel",
          type: "boolean",
          default: "true",
          description: "是否对鼠标滚轮事件启用平滑滚动",
        },
        {
          name: "options.duration",
          type: "number",
          default: "1.2",
          description: "滚动动画持续时间（秒）",
        },
        {
          name: "options.infinite",
          type: "boolean",
          default: "false",
          description: "是否启用无限滚动模式",
        },
        {
          name: "className",
          type: "string",
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
      examples={[
        {
          title: "基础用法",
          description: "包裹应用根组件即可启用全局平滑滚动",
          code: `import { SmoothScrollProvider } from "@frontend-ui/ui";

export default function App() {
  return (
    <SmoothScrollProvider>
      <main>
        <YourContent />
      </main>
    </SmoothScrollProvider>
  );
}`,
          render: () => (
            <div className="flex items-center justify-center py-8 text-center">
              <div className="max-w-xs space-y-3">
                <p className="text-sm text-[var(--color-text-muted)]">
                  包裹组件后，页面滚动自动平滑过渡
                </p>
                <div className="inline-block rounded-lg bg-[var(--color-bg-elevated)] px-4 py-2 text-xs text-[var(--color-text-subtle)]">
                  SmoothScrollProvider → YourApp
                </div>
              </div>
            </div>
          ),
        },
        {
          title: "水平滚动",
          description: "配置 orientation 为 horizontal 实现水平平滑滚动",
          code: `<SmoothScrollProvider
  options={{
    orientation: "horizontal",
    lerp: 0.05,
    duration: 1.5,
  }}
>
  <HorizontalLayout />
</SmoothScrollProvider>`,
          render: () => (
            <div className="flex items-center justify-center py-8 text-center">
              <div className="max-w-xs space-y-3">
                <p className="text-sm text-[var(--color-text-muted)]">
                  设置 orientation: 'horizontal' 实现水平滚动
                </p>
                <div className="inline-block rounded-lg bg-[var(--color-bg-elevated)] px-4 py-2 text-xs text-[var(--color-text-subtle)]">
                  orientation: horizontal
                </div>
              </div>
            </div>
          ),
        },
      ]}
      accessibility="SmoothScrollProvider 包裹的内容不改变页面的无障碍结构。Lenis 平滑滚动仅影响视觉滚动行为，滚动事件和焦点管理仍遵循浏览器原生行为。组件通过 ReactLenis 实现，确保所有交互元素（链接、按钮、表单）在平滑滚动期间仍可正常访问和操作。建议在 SmoothScrollProvider 内部使用语义化的 HTML 结构（main、nav、section 等）以保持良好的可访问性。"
    />
  );
}
