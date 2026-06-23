"use client";

import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function ScrollParallaxPage() {
  return (
    <ComponentDocPage
      category={{ label: "交互动画", href: "/animations" }}
      name="ScrollParallax"
      description="滚动驱动的多层视差动画组件，支持位移、缩放、旋转和模糊。基于 Framer Motion 的 useScroll 和 useTransform 实现。"
      installName="scroll-parallax"
      importStatement="import { ScrollParallax } from '@frontend-ui/ui';"
      defaultValues={{ speed: 0.5, scale: [0.8, 1.2], blur: false }}
      propConfig={[
        { name: "speed", type: "number", min: -2, max: 2, step: 0.1 },
        { name: "blur", type: "boolean" },
      ]}
      propDocs={[
        { name: "speed", type: "number", default: "0.5", description: "视差速度倍数，负数为反向" },
        { name: "scale", type: "[number, number]", description: "缩放范围 [min, max]" },
        { name: "rotate", type: "[number, number]", description: "旋转范围 [min, max]" },
        { name: "opacity", type: "[number, number]", description: "透明度范围 [min, max]" },
        { name: "blur", type: "boolean", default: "false", description: "是否启用模糊" },
      ]}
      codeGenerator={(values) => `<ScrollParallax\n  speed={${values.speed}}\n  scale={[0.8, 1.2]}\n  ${values.blur ? "blur" : ""}\n>\n  <div>Your content</div>\n</ScrollParallax>`}
      renderPreview={(_values) => (
        <div className="h-40 w-full rounded-lg bg-[var(--color-bg-surface)] flex items-center justify-center">
          <div className="text-center">
            <span className="text-3xl">🌊</span>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">滚动查看视差效果</p>
          </div>
        </div>
      )}
    />
  );
}
