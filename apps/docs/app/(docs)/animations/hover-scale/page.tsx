"use client";

import { HoverScale } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function HoverScalePage() {
  return (
    <ComponentDocPage
      category={{ label: "交互动画", href: "/animations" }}
      name="HoverScale"
      description="悬停缩放容器，鼠标悬停时平滑放大并可选阴影，适用于卡片、按钮等交互元素。"
      installName="hover-scale"
      importStatement={'import { HoverScale } from "@frontend-ui/ui";'}
      defaultValues={{ scale: 1.05, duration: 0.2, shadow: true }}
      propConfig={[
        { name: "scale", type: "number", min: 1, max: 1.5, step: 0.05 },
        { name: "duration", type: "number", min: 0.1, max: 1, step: 0.1 },
        { name: "shadow", type: "boolean" },
      ]}
      propDocs={[
        { name: "children", type: "ReactNode", required: true, description: "子元素" },
        { name: "scale", type: "number", default: "1.05", description: "悬停缩放比例" },
        { name: "duration", type: "number", default: "0.2", description: "动画持续时间（秒）" },
        { name: "shadow", type: "boolean", default: "true", description: "是否启用阴影效果" },
        { name: "className", type: "string", default: "-", description: "自定义 CSS 类名" },
      ]}
      codeGenerator={(v) => `<HoverScale
  scale={${v.scale}}
  duration={${v.duration}}
  shadow={${v.shadow}}
>
  <div>Hover Me</div>
</HoverScale>`}
      renderPreview={(v) => (
        <HoverScale
          scale={Number(v.scale)}
          duration={Number(v.duration)}
          shadow={v.shadow === true}
        >
          <div className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] px-8 py-6 text-center">
            <div className="text-lg font-semibold">Hover Me</div>
          </div>
        </HoverScale>
      )}
      examples={[
        {
          title: "基本用法",
          description: "默认 1.05 倍缩放",
          code: `<HoverScale>
  <div className="rounded-xl bg-[var(--color-bg-secondary)] px-8 py-6">
    Hover Me
  </div>
</HoverScale>`,
          render: () => (
            <HoverScale>
              <div className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] px-8 py-6">
                Hover Me
              </div>
            </HoverScale>
          ),
        },
        {
          title: "大幅缩放",
          description: "更大的缩放效果",
          code: `<HoverScale scale={1.2}>
  <div className="rounded-xl bg-[var(--color-bg-secondary)] px-8 py-6">
    Big Scale
  </div>
</HoverScale>`,
          render: () => (
            <HoverScale scale={1.2}>
              <div className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] px-8 py-6">
                Big Scale
              </div>
            </HoverScale>
          ),
        },
      ]}
      accessibility="HoverScale 使用 motion/react 的 whileHover 实现，动画仅影响 transform 和 box-shadow。组件本身不添加交互语义，建议配合按钮或链接使用。"
    />
  );
}
