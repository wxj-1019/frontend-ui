"use client";

import { ThreeScene } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function ThreeScenePage() {
  return (
    <ComponentDocPage
      category={{ label: "背景特效", href: "/backgrounds" }}
      name="ThreeScene"
      description="CSS 3D 沉浸式场景，支持多层视差滚动与透视效果。基于 CSS transform-style: preserve-3d 和 Motion 滚动驱动动画。"
      installName="three-scene"
      importStatement={'import { ThreeScene } from "@frontend-ui/ui";'}
      defaultValues={{ perspective: 1200 }}
      propConfig={[
        { name: "perspective", type: "number", min: 500, max: 2000, step: 100 },
      ]}
      propDocs={[
        { name: "className", type: "string", default: "-", description: "自定义类名" },
        { name: "layers", type: "{ depth: number; content: ReactNode; opacity?: number }[]", default: "[]", description: "3D 深度层" },
        { name: "children", type: "ReactNode", default: "-", description: "主内容" },
        { name: "perspective", type: "number", default: "1200", description: "透视距离 (px)" },
      ]}
      codeGenerator={(values) => `<ThreeScene
  perspective={${values.perspective}}
  layers={[
    { depth: 0.2, content: <div className="bg-blue-500/20" />, opacity: 0.3 },
    { depth: 0.5, content: <div className="bg-purple-500/20" />, opacity: 0.5 },
  ]}
>
  <div>主内容</div>
</ThreeScene>`}
      renderPreview={() => (
        <div className="relative h-48 w-full overflow-hidden rounded-lg border border-[var(--color-border-default)]">
          <ThreeScene
            className="h-full w-full"
            layers={[
              { depth: 0.2, content: <div className="absolute inset-0 bg-[var(--color-accent)]/10 rounded-lg" />, opacity: 0.3 },
              { depth: 0.5, content: <div className="absolute inset-0 bg-[var(--color-accent)]/5 rounded-lg" />, opacity: 0.5 },
            ]}
          >
            <div className="flex h-48 items-center justify-center">
              <div className="text-center">
                <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">3D 场景</h3>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">滚动查看视差效果</p>
              </div>
            </div>
          </ThreeScene>
        </div>
      )}
      examples={[
        {
          title: "基本用法",
          description: "多层 3D 视差场景",
          code: `<ThreeScene
  layers={[
    { depth: 0.2, content: <div className="bg-blue-500/20" /> },
    { depth: 0.5, content: <div className="bg-purple-500/20" /> },
  ]}
>
  <div>主内容</div>
</ThreeScene>`,
          render: () => (
            <div className="relative h-48 w-full overflow-hidden rounded-lg border border-[var(--color-border-default)]">
              <ThreeScene
                className="h-full w-full"
                layers={[
                  { depth: 0.2, content: <div className="absolute inset-0 bg-[var(--color-accent)]/10 rounded-lg" />, opacity: 0.3 },
                ]}
              >
                <div className="flex h-48 items-center justify-center">
                  <div className="text-center">
                    <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">3D 视差</h3>
                  </div>
                </div>
              </ThreeScene>
            </div>
          ),
        },
      ]}
      accessibility="ThreeScene 使用 CSS 3D 变换实现视差效果，纯视觉装饰。对于 prefers-reduced-motion 用户，Motion 的 useReducedMotion 会自动禁用视差滚动。组件内的内容保持可访问性。"
    />
  );
}
