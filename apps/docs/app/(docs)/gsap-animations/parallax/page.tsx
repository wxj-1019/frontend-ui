"use client";

import { ComponentDocPage } from "@/components/ui/ComponentDocPage";
import { Parallax } from "@frontend-ui/ui";

export default function GsapParallaxPage() {
  return (
    <ComponentDocPage
      category={{ label: "GSAP 动画", href: "/gsap-animations" }}
      name="Parallax"
      description="基于 ScrollTrigger 的视差滚动效果，支持水平和垂直方向"
      installName="parallax"
      importStatement={'import { Parallax } from "@frontend-ui/ui";'}
      defaultValues={{ speed: 0.5, axis: "y" }}
      propConfig={[
        { name: "speed", type: "number", min: 0.1, max: 2, step: 0.1 },
        {
          name: "axis",
          type: "string",
          options: ["y", "x"],
        },
      ]}
      propDocs={[
        { name: "children", type: "ReactNode", required: true, description: "要应用视差的内容" },
        { name: "speed", type: "number", default: "0.5", description: "视差速度 (越大越快)" },
        { name: "axis", type: "string", default: "y", description: "滚动方向: x 或 y" },
        { name: "start", type: "string", default: "top bottom", description: "ScrollTrigger 开始位置" },
        { name: "end", type: "string", default: "bottom top", description: "ScrollTrigger 结束位置" },
        { name: "scrub", type: "boolean | number", default: "true", description: "是否跟随滚动" },
        { name: "markers", type: "boolean", default: "false", description: "显示调试标记" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
      ]}
      codeGenerator={(v) => `<Parallax speed={${v.speed}} axis="${v.axis}">
  <div>视差内容</div>
</Parallax>`}
      renderPreview={(v) => (
        <div className="overflow-hidden rounded-lg bg-[var(--color-bg-surface)] p-6">
          <Parallax
            speed={typeof v.speed === 'number' ? v.speed : 0.5}
            axis={(v.axis as 'x' | 'y') || 'y'}
          >
            <div className="text-center">
              <div className="mx-auto h-32 w-32 rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2]" />
              <p className="mt-4 text-sm text-[var(--color-text-muted)]">
                速度: {String(v.speed)} | 方向: {String(v.axis)}
              </p>
            </div>
          </Parallax>
        </div>
      )}
    />
  );
}
