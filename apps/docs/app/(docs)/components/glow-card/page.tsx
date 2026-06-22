"use client";

import { GlowCard } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function GlowCardPage() {
  return (
    <ComponentDocPage
      category={{ label: "复合组件", href: "/components" }}
      name="GlowCard"
      description="发光卡片组件，鼠标追踪光晕效果"
      installName="glow-card"
      importStatement={'import { GlowCard } from "@frontend-ui/ui";'}
      defaultValues={{ intensity: 1, enableTilt: true, tiltRange: 10, showGlow: true, glowSize: 200 }}
      propConfig={[
        { name: "intensity", type: "number", min: 0, max: 2, step: 0.1 },
        { name: "enableTilt", type: "boolean" },
        { name: "tiltRange", type: "number", min: 5, max: 30, step: 5 },
        { name: "showGlow", type: "boolean" },
        { name: "glowSize", type: "number", min: 50, max: 400, step: 50 },
      ]}
      propDocs={[
        { name: "children", type: "ReactNode", required: true, description: "卡片内容" },
        { name: "glowColor", type: "string", default: "var(--color-accent)", description: "发光颜色" },
        { name: "intensity", type: "number", default: "1", description: "发光强度" },
        { name: "borderColor", type: "string", default: "-", description: "边框颜色" },
        { name: "enableTilt", type: "boolean", default: "true", description: "是否启用 3D 倾斜" },
        { name: "tiltRange", type: "number", default: "10", description: "倾斜角度范围 (度)" },
        { name: "showGlow", type: "boolean", default: "true", description: "是否显示光晕动画" },
        { name: "glowSize", type: "number", default: "200", description: "光晕大小 (px)" },
        { name: "backgroundColor", type: "string", default: "rgba(17, 24, 39, 0.8)", description: "背景颜色" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
      ]}
      codeGenerator={(v) => `<GlowCard
  intensity={${v.intensity}}
  enableTilt={${v.enableTilt}}
  tiltRange={${v.tiltRange}}
  showGlow={${v.showGlow}}
  glowSize={${v.glowSize}}
>
  <h3>Glow Card</h3>
  <p>Hover to see the effect</p>
</GlowCard>`}
      renderPreview={(v) => (
        <GlowCard
          intensity={Number(v.intensity)}
          enableTilt={Boolean(v.enableTilt)}
          tiltRange={Number(v.tiltRange)}
          showGlow={Boolean(v.showGlow)}
          glowSize={Number(v.glowSize)}
          className="w-full max-w-md"
        >
          <h3 className="mb-2 text-lg font-semibold text-white">Glow Card</h3>
          <p className="text-gray-400">Hover over this card to see the glow effect follow your cursor.</p>
        </GlowCard>
      )}
    />
  );
}
