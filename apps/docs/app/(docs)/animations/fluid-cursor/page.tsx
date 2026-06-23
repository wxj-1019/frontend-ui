"use client";

import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function FluidCursorPage() {
  return (
    <ComponentDocPage
      category={{ label: "交互动画", href: "/animations" }}
      name="FluidCursor"
      description="液态金属流体光标跟随效果，鼠标移动时产生粒子拖尾和发光轨迹。粒子之间通过连线产生流体连接感。"
      installName="fluid-cursor"
      importStatement="import { FluidCursor } from '@frontend-ui/ui';"
      defaultValues={{ color: "#00F5FF", particleCount: 40, viscosity: 0.92, glowIntensity: 0.6 }}
      propConfig={[
        { name: "color", type: "string", options: ["#00F5FF", "#FFD700", "#A855F7", "#FF3366"] },
        { name: "particleCount", type: "number", min: 10, max: 100, step: 5 },
        { name: "viscosity", type: "number", min: 0.5, max: 0.99, step: 0.01 },
        { name: "glowIntensity", type: "number", min: 0.1, max: 1, step: 0.1 },
      ]}
      propDocs={[
        { name: "color", type: "string", default: "'#00F5FF'", description: "流体颜色" },
        { name: "particleCount", type: "number", default: "40", description: "粒子数量上限" },
        { name: "viscosity", type: "number", default: "0.92", description: "流体粘稠度 (0-1)" },
        { name: "glowIntensity", type: "number", default: "0.6", description: "发光强度" },
        { name: "blendMode", type: "string", default: "'screen'", description: "Canvas 混合模式" },
      ]}
      codeGenerator={(values) => `<FluidCursor\n  color="${values.color}"\n  particleCount={${values.particleCount}}\n  viscosity={${values.viscosity}}\n  glowIntensity={${values.glowIntensity}}\n/>`}
      renderPreview={(values) => (
        <div className="relative h-40 w-full rounded-lg bg-[var(--color-bg-primary)] overflow-hidden">
          <p className="absolute inset-0 flex items-center justify-center text-sm text-[var(--color-text-muted)]">
            在此区域移动鼠标查看效果
          </p>
        </div>
      )}
    />
  );
}
