"use client";

import { MeshGradient } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function MeshGradientPage() {
  return (
    <ComponentDocPage
      category={{ label: "背景特效", href: "/backgrounds" }}
      name="MeshGradient"
      description="基于 CSS 径向渐变和 @keyframes 动画的网格渐变背景，多个渐变层叠加流动，营造有机柔和的色彩过渡效果。"
      installName="mesh-gradient"
      importStatement={'import { MeshGradient } from "@frontend-ui/ui";'}
      defaultValues={{
        colors: ["#ff006e", "#8338ec", "#3a86ff"],
        animated: true,
        duration: 10,
      }}
      propConfig={[
        { name: "animated", type: "boolean" },
        { name: "duration", type: "number", min: 1, max: 60, step: 1 },
      ]}
      propDocs={[
        { name: "className", type: "string", default: "-", description: "自定义类名" },
        { name: "colors", type: "string[]", default: '["#ff006e", "#8338ec", "#3a86ff"]', description: "渐变颜色数组" },
        { name: "animated", type: "boolean", default: "true", description: "是否启用动画" },
        { name: "duration", type: "number", default: "10", description: "动画周期（秒）" },
      ]}
      codeGenerator={(v) => `<div className="relative h-screen">
  <MeshGradient
    colors={[${(v.colors as string[] || []).map((c) => `"${c}"`).join(', ')}]}
    animated={${v.animated}}
    duration={${v.duration}}
  />
</div>`}
      renderPreview={(v) => (
        <div className="relative h-64 w-full overflow-hidden rounded-xl">
          <MeshGradient
            colors={(v.colors as string[]) ?? ['#ff006e', '#8338ec', '#3a86ff']}
            animated={Boolean(v.animated)}
            duration={Number(v.duration)}
          />
        </div>
      )}
      examples={[
        {
          title: "基本用法",
          description: "默认三色网格渐变动画",
          code: `<div className="relative h-screen">
  <MeshGradient />
</div>`,
          render: () => (
            <div className="relative h-64 w-full overflow-hidden rounded-xl">
              <MeshGradient />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm text-white/70">默认网格渐变</p>
              </div>
            </div>
          ),
        },
        {
          title: "自定义颜色",
          description: "使用暖色调渐变",
          code: `<div className="relative h-screen">
  <MeshGradient colors={["#f97316", "#ef4444", "#ec4899"]} />
</div>`,
          render: () => (
            <div className="relative h-64 w-full overflow-hidden rounded-xl">
              <MeshGradient colors={["#f97316", "#ef4444", "#ec4899"]} />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm text-white/70">暖色调渐变</p>
              </div>
            </div>
          ),
        },
        {
          title: "静态渐变",
          description: "禁用动画，显示静态网格渐变",
          code: `<div className="relative h-screen">
  <MeshGradient animated={false} />
</div>`,
          render: () => (
            <div className="relative h-64 w-full overflow-hidden rounded-xl">
              <MeshGradient animated={false} />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm text-white/70">静态渐变</p>
              </div>
            </div>
          ),
        },
      ]}
      accessibility="MeshGradient 使用 CSS 径向渐变和 @keyframes 动画实现视觉效果，纯装饰性背景。组件元素标记为 aria-hidden='true'，不包含交互内容，对屏幕阅读器无影响。对于设置了 prefers-reduced-motion 的用户，CSS 动画自动停止，渐变保持静态显示。由于是纯 CSS 实现，无额外性能开销，也不影响页面焦点管理。"
    />
  );
}
