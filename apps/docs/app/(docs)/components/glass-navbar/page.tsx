"use client";

import { GlassNavbar } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function GlassNavbarPage() {
  return (
    <ComponentDocPage
      category={{ label: "复合组件", href: "/components" }}
      name="GlassNavbar"
      description="玻璃态导航栏，支持滚动响应式毛玻璃效果。滚动时自动增强背景模糊，营造高端质感。"
      installName="glass-navbar"
      importStatement={'import { GlassNavbar } from "@frontend-ui/ui";'}
      defaultValues={{ blur: 12, opacity: 0.15, sticky: true }}
      propConfig={[
        { name: "blur", type: "number", min: 0, max: 40, step: 1 },
        { name: "opacity", type: "number", min: 0, max: 0.5, step: 0.05 },
        { name: "sticky", type: "boolean" },
      ]}
      propDocs={[
        { name: "className", type: "string", default: "-", description: "自定义类名" },
        { name: "children", type: "ReactNode", default: "-", description: "导航栏内容" },
        { name: "sticky", type: "boolean", default: "true", description: "是否粘性定位" },
        { name: "blur", type: "number", default: "12", description: "模糊程度 (px)" },
        { name: "opacity", type: "number", default: "0.15", description: "背景透明度" },
      ]}
      codeGenerator={(values) => `<GlassNavbar
  blur={${values.blur}}
  opacity={${values.opacity}}
  ${values.sticky ? "" : "sticky={false} "}
>
  <div>Logo</div>
  <div>Nav Links</div>
</GlassNavbar>`}
      renderPreview={(values) => (
        <div className="w-full overflow-hidden rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]">
          <GlassNavbar
            blur={values.blur as number}
            opacity={values.opacity as number}
            sticky={values.sticky as boolean}
            className="rounded-t-lg"
          >
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-lg bg-[var(--color-accent)]/20 flex items-center justify-center text-[var(--color-accent)] text-sm font-bold">F</div>
              <span className="font-semibold text-[var(--color-text-primary)]">Frontend UI</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)]">
              <span>Docs</span>
              <span>Components</span>
              <span className="rounded-md bg-[var(--color-accent)]/10 px-3 py-1 text-[var(--color-accent)]">Get Started</span>
            </div>
          </GlassNavbar>
          <div className="h-32 p-6">
            <p className="text-sm text-[var(--color-text-muted)]">滚动页面查看导航栏的玻璃态效果</p>
          </div>
        </div>
      )}
      examples={[
        {
          title: "基本用法",
          description: "默认玻璃态导航栏",
          code: `<GlassNavbar>
  <div>Logo</div>
  <div>Nav Links</div>
</GlassNavbar>`,
          render: () => (
            <div className="w-full overflow-hidden rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]">
              <GlassNavbar className="rounded-t-lg">
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-lg bg-[var(--color-accent)]/20 flex items-center justify-center text-[var(--color-accent)] text-sm font-bold">F</div>
                  <span className="font-semibold text-[var(--color-text-primary)]">Frontend UI</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)]">
                  <span>Docs</span>
                  <span>Components</span>
                </div>
              </GlassNavbar>
              <div className="h-20 p-6">
                <p className="text-sm text-[var(--color-text-muted)]">页面内容区域</p>
              </div>
            </div>
          ),
        },
      ]}
      accessibility="GlassNavbar 使用语义化 nav 标签，包含正确的 ARIA 角色。玻璃态效果基于 CSS backdrop-filter 实现，不影响屏幕阅读器。对于高对比度模式用户，背景透明度确保内容可读性。"
    />
  );
}
