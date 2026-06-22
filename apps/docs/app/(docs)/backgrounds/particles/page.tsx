"use client";

import { Particles } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function ParticlesPage() {
  return (
    <ComponentDocPage
      category={{ label: "背景特效", href: "/backgrounds" }}
      name="Particles"
      description="基于 Canvas 和 requestAnimationFrame 的粒子背景效果，通过逐帧绘制实现动态浮动粒子动画，支持自定义粒子数量和颜色。"
      installName="particles"
      importStatement={'import { Particles } from "@frontend-ui/ui";'}
      defaultValues={{ count: 50, color: "#ffffff" }}
      propConfig={[
        { name: "count", type: "number", min: 10, max: 200, step: 10 },
        { name: "color", type: "color" },
      ]}
      propDocs={[
        { name: "className", type: "string", default: "-", description: "自定义类名" },
        { name: "count", type: "number", default: "50", description: "粒子数量" },
        { name: "color", type: "string", default: "#ffffff", description: "粒子颜色" },
      ]}
      codeGenerator={(v) => `<div className="relative h-screen">
  <Particles count={${v.count}} color="${String(v.color)}" />
</div>`}
      renderPreview={(v) => (
        <div className="relative h-48 w-full overflow-hidden rounded-lg bg-[var(--color-bg-primary)]">
          <Particles
            count={Number(v.count) || 30}
            color={String(v.color)}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-sm text-[var(--color-text-muted)]">粒子效果预览</p>
          </div>
        </div>
      )}
      examples={[
        {
          title: "基本用法",
          description: "默认白色粒子效果",
          code: `<div className="relative h-screen">
  <Particles />
</div>`,
          render: () => (
            <div className="relative h-48 w-full overflow-hidden rounded-lg bg-black">
              <Particles />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm text-white/70">默认粒子</p>
              </div>
            </div>
          ),
        },
        {
          title: "自定义颜色和数量",
          description: "使用青色粒子，较少数量",
          code: `<div className="relative h-screen">
  <Particles count={30} color="#00ffff" />
</div>`,
          render: () => (
            <div className="relative h-48 w-full overflow-hidden rounded-lg bg-black">
              <Particles count={30} color="#00ffff" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm text-cyan-400/70">30 个青色粒子</p>
              </div>
            </div>
          ),
        },
        {
          title: "密集粒子",
          description: "大量粒子创造星空效果",
          code: `<div className="relative h-screen">
  <Particles count={150} color="#a78bfa" />
</div>`,
          render: () => (
            <div className="relative h-48 w-full overflow-hidden rounded-lg bg-slate-900">
              <Particles count={150} color="#a78bfa" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm text-purple-400/70">150 个紫色粒子</p>
              </div>
            </div>
          ),
        },
      ]}
      accessibility="Particles 使用 Canvas 元素和 requestAnimationFrame 逐帧绘制粒子动画，纯装饰性背景。Canvas 标记为 aria-hidden='true'，不包含交互内容，对屏幕阅读器无影响。动画在视口外自动暂停（IntersectionObserver），减少不必要的资源消耗。对于设置了 prefers-reduced-motion 的用户，动画停止但 Canvas 仍渲染静态粒子。由于不使用 DOM 元素绘制动画，不影响页面焦点管理。"
    />
  );
}
