"use client";

import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function GenerativeBackgroundPage() {
  return (
    <ComponentDocPage
      category={{ label: "背景特效", href: "/backgrounds" }}
      name="GenerativeBackground"
      description="生成式动态背景，基于2D噪声算法实时生成流动的抽象艺术图案。每次刷新都不一样，支持自定义色调和动画速度。"
      installName="generative-background"
      importStatement="import { GenerativeBackground } from '@frontend-ui/ui';"
      defaultValues={{ baseHue: 200, saturation: 60, lightness: 20, speed: 0.3, density: 0.5 }}
      propConfig={[
        { name: "baseHue", type: "number", min: 0, max: 360, step: 10 },
        { name: "saturation", type: "number", min: 0, max: 100, step: 5 },
        { name: "lightness", type: "number", min: 5, max: 50, step: 5 },
        { name: "speed", type: "number", min: 0.1, max: 2, step: 0.1 },
      ]}
      propDocs={[
        { name: "baseHue", type: "number", default: "200", description: "基础色调 (0-360)" },
        { name: "saturation", type: "number", default: "60", description: "饱和度 (0-100)" },
        { name: "lightness", type: "number", default: "20", description: "亮度 (0-100)" },
        { name: "speed", type: "number", default: "0.3", description: "动画速度" },
        { name: "density", type: "number", default: "0.5", description: "噪声密度 (0-1)" },
      ]}
      codeGenerator={(values) => `<GenerativeBackground\n  baseHue={${values.baseHue}}\n  saturation={${values.saturation}}\n  lightness={${values.lightness}}\n  speed={${values.speed}}\n/>`}
      renderPreview={(values) => (
        <div className="relative h-40 w-full rounded-lg bg-[var(--color-bg-primary)] overflow-hidden">
          <p className="absolute inset-0 flex items-center justify-center text-sm text-[var(--color-text-muted)] z-10">
            实时生成的抽象艺术背景
          </p>
        </div>
      )}
    />
  );
}
