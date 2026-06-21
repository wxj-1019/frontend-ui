"use client";

import { MeshGradient } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function MeshGradientPage() {
  return (
    <ComponentDocPage
      category={{ label: "背景特效", href: "/backgrounds" }}
      name="MeshGradient"
      description="网格渐变背景，多个径向渐变叠加并通过 CSS 关键帧动画流动"
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
      codeGenerator={(v) => `<MeshGradient
  colors={[${(v.colors as string[]).map((c) => `"${c}"`).join(', ')}]}
  animated={${v.animated}}
  duration={${v.duration}}
/>`}
      renderPreview={(v) => (
        <div className="relative h-64 w-full overflow-hidden rounded-xl">
          <MeshGradient
            colors={(v.colors as string[]) ?? ['#ff006e', '#8338ec', '#3a86ff']}
            animated={Boolean(v.animated)}
            duration={Number(v.duration)}
          />
        </div>
      )}
    />
  );
}
