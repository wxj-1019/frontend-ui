"use client";

import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function ParticleOceanPage() {
  return (
    <ComponentDocPage
      category={{ label: "背景特效", href: "/backgrounds" }}
      name="ParticleOcean"
      description="粒子海洋效果，粒子以正弦波方式流动，鼠标移动时产生排斥力场，粒子像海洋一样流动。"
      installName="particle-ocean"
      importStatement="import { ParticleOcean } from '@frontend-ui/ui';"
      defaultValues={{ count: 150, color: "#00F5FF", speed: 0.5, interactive: true }}
      propConfig={[
        { name: "count", type: "number", min: 50, max: 500, step: 10 },
        { name: "color", type: "color", options: ["#00F5FF", "#A855F7", "#FFD700", "#FF3366"] },
        { name: "speed", type: "number", min: 0.1, max: 2, step: 0.1 },
        { name: "interactive", type: "boolean" },
      ]}
      propDocs={[
        { name: "count", type: "number", default: "150", description: "粒子数量" },
        { name: "color", type: "string", default: "'#00F5FF'", description: "粒子基础颜色" },
        { name: "speed", type: "number", default: "0.5", description: "流动速度" },
        { name: "interactive", type: "boolean", default: "true", description: "是否响应鼠标" },
        { name: "sizeRange", type: "[number, number]", default: "[1, 3]", description: "粒子大小范围" },
      ]}
      codeGenerator={(values) => `<ParticleOcean\n  count={${values.count}}\n  color="${values.color}"\n  speed={${values.speed}}\n  ${values.interactive ? "" : "interactive={false} "}\n/>`}
      renderPreview={(_values) => (
        <div className="relative h-40 w-full rounded-lg bg-[var(--color-bg-primary)] overflow-hidden">
          <p className="absolute inset-0 flex items-center justify-center text-sm text-[var(--color-text-muted)]">
            移动鼠标查看粒子排斥效果
          </p>
        </div>
      )}
    />
  );
}
