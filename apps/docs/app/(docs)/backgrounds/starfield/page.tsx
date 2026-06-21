"use client";

import { Starfield } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function StarfieldPage() {
  return (
    <ComponentDocPage
      category={{ label: "背景特效", href: "/backgrounds" }}
      name="Starfield"
      description="星空飞行背景，3D 透视的星点向观察者飞来，营造星际穿梭感"
      installName="starfield"
      importStatement={'import { Starfield } from "@frontend-ui/ui";'}
      defaultValues={{
        count: 200,
        speed: 0.5,
        depth: true,
        starColor: "#ffffff",
      }}
      propConfig={[
        { name: "count", type: "number", min: 10, max: 1000, step: 10 },
        { name: "speed", type: "number", min: 0.1, max: 10, step: 0.1 },
        { name: "depth", type: "boolean" },
        { name: "starColor", type: "string" },
      ]}
      propDocs={[
        { name: "className", type: "string", default: "-", description: "自定义类名" },
        { name: "count", type: "number", default: "200", description: "星星数量" },
        { name: "speed", type: "number", default: "0.5", description: "飞行速度" },
        { name: "depth", type: "boolean", default: "true", description: "是否启用深度（远小近大）" },
        { name: "starColor", type: "string", default: "#ffffff", description: "星星颜色" },
      ]}
      codeGenerator={(v) => `<Starfield
  count={${v.count}}
  speed={${v.speed}}
  depth={${v.depth}}
  starColor="${String(v.starColor)}"
/>`}
      renderPreview={(v) => (
        <div className="relative h-64 w-full overflow-hidden rounded-xl bg-[var(--color-bg-secondary)]">
          <Starfield
            count={Number(v.count)}
            speed={Number(v.speed)}
            depth={Boolean(v.depth)}
            starColor={String(v.starColor)}
          />
        </div>
      )}
    />
  );
}
