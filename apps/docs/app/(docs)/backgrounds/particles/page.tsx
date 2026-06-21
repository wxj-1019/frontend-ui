"use client";

import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function ParticlesPage() {
  return (
    <ComponentDocPage
      category={{ label: "背景特效", href: "/backgrounds" }}
      name="Particles"
      description="粒子背景效果，创建动态粒子动画"
      installName="particles"
      importStatement={'import { Particles } from "@frontend-ui/ui";'}
      defaultValues={{ count: 50, color: "#00F5FF" }}
      propConfig={[
        { name: "count", type: "number", min: 10, max: 200, step: 10 },
      ]}
      propDocs={[
        { name: "className", type: "string", default: "-", description: "自定义类名" },
        { name: "count", type: "number", default: "50", description: "粒子数量" },
        { name: "color", type: "string", default: "#ffffff", description: "粒子颜色" },
      ]}
      codeGenerator={(v) => `<Particles
  count={${v.count}}
  color="${String(v.color)}"
/>`}
      renderPreview={(v) => (
        <div className="relative h-48 w-full overflow-hidden rounded-lg bg-[var(--color-bg-primary)]">
          {[...Array(20)].map((_, i) => (
            <span
              key={i}
              className="absolute h-1 w-1 rounded-full"
              style={{
                left: `${(i * 5) % 100}%`,
                top: `${(i * 7) % 100}%`,
                backgroundColor: String(v.color),
                animation: `pulse 2s ease-in-out ${i * 0.1}s infinite`,
              }}
            />
          ))}
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-sm text-[var(--color-text-muted)]">
              {String(v.count)} 个粒子
            </p>
          </div>
        </div>
      )}
    />
  );
}
