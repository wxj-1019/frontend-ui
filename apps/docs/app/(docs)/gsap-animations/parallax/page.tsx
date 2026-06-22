"use client";

import { Parallax } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

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
        { name: "axis", type: "string", options: ["y", "x"] },
      ]}
      propDocs={[
        { name: "children", type: "ReactNode", required: true, description: "要应用视差的内容" },
        { name: "speed", type: "number", default: "0.5", description: "视差速度 (越大越快)" },
        { name: "axis", type: "'y' | 'x'", default: "y", description: "滚动方向: x 或 y" },
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
      examples={[
        {
          title: "垂直视差",
          description: "默认垂直方向视差滚动",
          code: `<Parallax speed={0.5}>
  <img src="hero.jpg" alt="Hero" />
</Parallax>`,
          render: () => (
            <div className="h-48 overflow-hidden rounded-lg bg-[var(--color-bg-surface)] p-6">
              <Parallax speed={0.5}>
                <div className="mx-auto h-24 w-48 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600" />
              </Parallax>
              <p className="mt-4 text-center text-sm text-[var(--color-text-muted)]">垂直视差 speed=0.5</p>
            </div>
          ),
        },
        {
          title: "快速视差",
          description: "更大的速度值产生更强的视差效果",
          code: `<Parallax speed={1.5}>
  <div>快速视差内容</div>
</Parallax>`,
          render: () => (
            <div className="h-48 overflow-hidden rounded-lg bg-[var(--color-bg-surface)] p-6">
              <Parallax speed={1.5}>
                <div className="mx-auto h-24 w-48 rounded-xl bg-gradient-to-br from-rose-500 to-orange-400" />
              </Parallax>
              <p className="mt-4 text-center text-sm text-[var(--color-text-muted)]">快速视差 speed=1.5</p>
            </div>
          ),
        },
        {
          title: "水平视差",
          description: "沿水平方向产生视差位移",
          code: `<Parallax speed={0.8} axis="x">
  <div>水平视差内容</div>
</Parallax>`,
          render: () => (
            <div className="h-48 overflow-hidden rounded-lg bg-[var(--color-bg-surface)] p-6">
              <Parallax speed={0.8} axis="x">
                <div className="mx-auto h-24 w-48 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400" />
              </Parallax>
              <p className="mt-4 text-center text-sm text-[var(--color-text-muted)]">水平视差 axis="x"</p>
            </div>
          ),
        },
      ]}
      accessibility="Parallax 使用 GSAP ScrollTrigger 驱动视差动画。内容始终存在于 DOM 中，仅通过 CSS transform 产生位移。对于设置了 prefers-reduced-motion 的用户，视差效果被禁用，内容保持静止。"
    />
  );
}
