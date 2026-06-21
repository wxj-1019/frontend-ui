"use client";

import { NoiseBackground } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function NoiseBackgroundPage() {
  return (
    <ComponentDocPage
      category={{ label: "背景特效", href: "/backgrounds" }}
      name="NoiseBackground"
      description="噪点背景，基于 Canvas 的像素噪声动画，营造电影胶片颗粒质感"
      installName="noise-background"
      importStatement={'import { NoiseBackground } from "@frontend-ui/ui";'}
      defaultValues={{
        opacity: 0.05,
        frequency: 0.8,
        color: "#ffffff",
        animated: true,
      }}
      propConfig={[
        { name: "opacity", type: "number", min: 0, max: 1, step: 0.01 },
        { name: "frequency", type: "number", min: 0, max: 1, step: 0.05 },
        { name: "color", type: "string" },
        { name: "animated", type: "boolean" },
      ]}
      propDocs={[
        { name: "className", type: "string", default: "-", description: "自定义类名" },
        { name: "opacity", type: "number", default: "0.05", description: "噪点不透明度 (0-1)" },
        { name: "frequency", type: "number", default: "0.8", description: "噪点密度/频率，越大颗粒越细" },
        { name: "color", type: "string", default: "#ffffff", description: "噪点颜色" },
        { name: "animated", type: "boolean", default: "true", description: "是否启用动画" },
      ]}
      codeGenerator={(v) => `<NoiseBackground
  opacity={${v.opacity}}
  frequency={${v.frequency}}
  color="${String(v.color)}"
  animated={${v.animated}}
/>`}
      renderPreview={(v) => (
        <div className="relative h-64 w-full overflow-hidden rounded-xl bg-[var(--color-bg-primary)]">
          <NoiseBackground
            opacity={Number(v.opacity)}
            frequency={Number(v.frequency)}
            color={String(v.color)}
            animated={Boolean(v.animated)}
          />
        </div>
      )}
    />
  );
}
