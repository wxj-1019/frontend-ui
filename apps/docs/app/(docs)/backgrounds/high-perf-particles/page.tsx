"use client";

import { HighPerfParticles } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function HighPerfParticlesPage() {
  return (
    <ComponentDocPage
      category={{ label: "背景特效", href: "/backgrounds" }}
      name="HighPerfParticles"
      description="高性能 Canvas 2D 粒子系统，支持万级粒子与鼠标交互。使用对象池、批量渲染和 IntersectionObserver 优化性能。"
      installName="high-perf-particles"
      importStatement={'import { HighPerfParticles } from "@frontend-ui/ui";'}
      defaultValues={{ particleCount: 2000, speed: 1, trail: true, glow: true, turbulence: 0.5, gravity: 0, interactive: true }}
      propConfig={[
        { name: "particleCount", type: "number", min: 100, max: 10000, step: 100 },
        { name: "speed", type: "number", min: 0.1, max: 5, step: 0.1 },
        { name: "trail", type: "boolean" },
        { name: "glow", type: "boolean" },
        { name: "turbulence", type: "number", min: 0, max: 2, step: 0.1 },
        { name: "gravity", type: "number", min: -1, max: 1, step: 0.1 },
        { name: "interactive", type: "boolean" },
      ]}
      propDocs={[
        { name: "className", type: "string", default: "-", description: "自定义类名" },
        { name: "particleCount", type: "number", default: "2000", description: "粒子数量" },
        { name: "interactive", type: "boolean", default: "true", description: "鼠标交互" },
        { name: "speed", type: "number", default: "1", description: "粒子速度" },
        { name: "trail", type: "boolean", default: "true", description: "拖尾效果" },
        { name: "glow", type: "boolean", default: "true", description: "发光效果" },
        { name: "turbulence", type: "number", default: "0.5", description: "湍流强度" },
        { name: "gravity", type: "number", default: "0", description: "重力 (-1 到 1)" },
      ]}
      codeGenerator={(values) => `<HighPerfParticles
  particleCount={${values.particleCount}}
  speed={${values.speed}}
  ${values.trail ? "" : "trail={false} "}
  ${values.glow ? "" : "glow={false} "}
  turbulence={${values.turbulence}}
  gravity={${values.gravity}}
  ${values.interactive ? "" : "interactive={false} "}
/>`}
      renderPreview={(values) => (
        <div className="relative h-48 w-full overflow-hidden rounded-lg border border-[var(--color-border-default)] bg-black">
          <HighPerfParticles
            particleCount={Math.min(values.particleCount as number, 1000)}
            speed={values.speed as number}
            trail={values.trail as boolean}
            glow={values.glow as boolean}
            turbulence={values.turbulence as number}
            gravity={values.gravity as number}
            interactive={values.interactive as boolean}
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <p className="text-sm text-white/60">高性能粒子系统</p>
          </div>
        </div>
      )}
      examples={[
        {
          title: "基本用法",
          description: "默认 2000 粒子效果",
          code: `<div className="h-screen bg-black">
  <HighPerfParticles />
</div>`,
          render: () => (
            <div className="relative h-48 w-full overflow-hidden rounded-lg border border-[var(--color-border-default)] bg-black">
              <HighPerfParticles particleCount={500} />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <p className="text-sm text-white/60">粒子效果</p>
              </div>
            </div>
          ),
        },
        {
          title: "重力场",
          description: "添加重力效果",
          code: `<HighPerfParticles gravity={0.5} particleCount={3000} />`,
          render: () => (
            <div className="relative h-48 w-full overflow-hidden rounded-lg border border-[var(--color-border-default)] bg-black">
              <HighPerfParticles gravity={0.5} particleCount={500} />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <p className="text-sm text-white/60">重力粒子</p>
              </div>
            </div>
          ),
        },
      ]}
      accessibility="HighPerfParticles 使用 Canvas 渲染，纯视觉装饰。组件使用 IntersectionObserver 在不可见时暂停渲染，避免不必要的性能开销。对于 prefers-reduced-motion 用户，建议减少粒子数量或禁用动画。"
    />
  );
}
