"use client";

import { Hyperspeed } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function HyperspeedPage() {
  return (
    <ComponentDocPage
      category={{ label: "背景特效", href: "/backgrounds" }}
      name="Hyperspeed"
      description="超光速背景，星点从中心向外辐射并带有运动拖尾，营造星际穿越的视觉冲击"
      installName="hyperspeed"
      importStatement={'import { Hyperspeed } from "@frontend-ui/ui";'}
      defaultValues={{
        speed: 2,
        count: 300,
        color: "#00ffff",
        trailLength: 0.15,
      }}
      propConfig={[
        { name: "speed", type: "number", min: 0.5, max: 20, step: 0.5 },
        { name: "count", type: "number", min: 50, max: 1000, step: 10 },
        { name: "color", type: "string" },
        { name: "trailLength", type: "number", min: 0, max: 1, step: 0.05 },
      ]}
      propDocs={[
        { name: "className", type: "string", default: "-", description: "自定义类名" },
        { name: "speed", type: "number", default: "2", description: "飞行速度" },
        { name: "count", type: "number", default: "300", description: "星星数量" },
        { name: "color", type: "string", default: "#00ffff", description: "星轨颜色" },
        { name: "trailLength", type: "number", default: "0.15", description: "拖尾长度 (0-1)，越大轨迹越长" },
      ]}
      codeGenerator={(v) => `<Hyperspeed
  speed={${v.speed}}
  count={${v.count}}
  color="${String(v.color)}"
  trailLength={${v.trailLength}}
/>`}
      renderPreview={(v) => (
        <div className="relative h-64 w-full overflow-hidden rounded-xl bg-[var(--color-bg-primary)]">
          <Hyperspeed
            speed={Number(v.speed)}
            count={Number(v.count)}
            color={String(v.color)}
            trailLength={Number(v.trailLength)}
          />
        </div>
      )}
    />
  );
}
