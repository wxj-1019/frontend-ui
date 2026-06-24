"use client";

import { Card3D } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function Card3DPage() {
  return (
    <ComponentDocPage
      category={{ label: "复合组件", href: "/components" }}
      name="Card3D"
      description="3D 透视卡片，鼠标追踪产生透视倾斜和动态光晕，营造高级交互质感。"
      installName="card-3d"
      importStatement={'import { Card3D } from "@frontend-ui/ui";'}
      defaultValues={{ perspective: 1000, maxRotation: 15, glowIntensity: 0.3 }}
      propConfig={[
        { name: "perspective", type: "number", min: 500, max: 2000, step: 100 },
        { name: "maxRotation", type: "number", min: 5, max: 45, step: 1 },
        { name: "glowIntensity", type: "number", min: 0, max: 1, step: 0.1 },
      ]}
      propDocs={[
        { name: "children", type: "ReactNode", required: true, description: "卡片内容" },
        { name: "perspective", type: "number", default: "1000", description: "CSS 透视深度（px）" },
        { name: "maxRotation", type: "number", default: "15", description: "最大旋转角度（度）" },
        { name: "glowIntensity", type: "number", default: "0.3", description: "光晕强度（0-1）" },
        { name: "glowColor", type: "string", default: "var(--color-accent)", description: "光晕颜色" },
        { name: "className", type: "string", default: "-", description: "自定义 CSS 类名" },
      ]}
      codeGenerator={(v) => `<Card3D
  perspective={${v.perspective}}
  maxRotation={${v.maxRotation}}
  glowIntensity={${v.glowIntensity}}
>
  <div className="p-8">
    <h3>3D Card</h3>
    <p>Hover to see the effect</p>
  </div>
</Card3D>`}
      renderPreview={(v) => (
        <Card3D
          perspective={Number(v.perspective)}
          maxRotation={Number(v.maxRotation)}
          glowIntensity={Number(v.glowIntensity)}
          className="w-64"
        >
          <div className="p-8 text-center">
            <div className="text-2xl font-bold">3D Card</div>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              Hover to see the effect
            </p>
          </div>
        </Card3D>
      )}
      examples={[
        {
          title: "基本用法",
          description: "默认 3D 透视效果",
          code: `<Card3D className="w-64">
  <div className="p-8 text-center">
    <h3>3D Card</h3>
  </div>
</Card3D>`,
          render: () => (
            <Card3D className="w-64">
              <div className="p-8 text-center">
                <div className="text-2xl font-bold">3D Card</div>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                  Hover to see the effect
                </p>
              </div>
            </Card3D>
          ),
        },
        {
          title: "大幅旋转",
          description: "更强烈的倾斜效果",
          code: `<Card3D maxRotation={30} className="w-64">
  <div className="p-8 text-center">
    <h3>Extreme Tilt</h3>
  </div>
</Card3D>`,
          render: () => (
            <Card3D maxRotation={30} className="w-64">
              <div className="p-8 text-center">
                <div className="text-2xl font-bold">Extreme Tilt</div>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                  Stronger effect
                </p>
              </div>
            </Card3D>
          ),
        },
      ]}
      accessibility="Card3D 使用 CSS 3D transform 实现倾斜效果，动画仅影响 transform 和 background 属性。不添加额外的交互元素，建议配合语义化的子内容使用。"
    />
  );
}
