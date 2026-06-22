"use client";

import { NoiseBackground } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function NoiseBackgroundPage() {
  return (
    <ComponentDocPage
      category={{ label: "背景特效", href: "/backgrounds" }}
      name="NoiseBackground"
      description="基于 Canvas 和 requestAnimationFrame 的像素噪声背景，逐帧绘制随机噪点，营造电影胶片颗粒质感。"
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
        { name: "color", type: "color" },
        { name: "animated", type: "boolean" },
      ]}
      propDocs={[
        { name: "className", type: "string", default: "-", description: "自定义类名" },
        { name: "opacity", type: "number", default: "0.05", description: "噪点不透明度 (0-1)" },
        { name: "frequency", type: "number", default: "0.8", description: "噪点密度/频率，越大颗粒越细" },
        { name: "color", type: "string", default: "#ffffff", description: "噪点颜色" },
        { name: "animated", type: "boolean", default: "true", description: "是否启用动画" },
      ]}
      codeGenerator={(v) => `<div className="relative h-screen">
  <NoiseBackground
    opacity={${v.opacity}}
    frequency={${v.frequency}}
    color="${String(v.color)}"
    animated={${v.animated}}
  />
</div>`}
      renderPreview={(v) => (
        <div className="relative h-64 w-full overflow-hidden rounded-xl bg-[var(--color-bg-primary)]">
          <NoiseBackground
            opacity={Number(v.opacity)}
            frequency={Number(v.frequency)}
            color={String(v.color)}
            animated={Boolean(v.animated)}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-sm text-[var(--color-text-muted)]">噪点效果预览</p>
          </div>
        </div>
      )}
      examples={[
        {
          title: "基本用法",
          description: "默认低透明度噪点效果",
          code: `<div className="relative h-screen">
  <NoiseBackground />
</div>`,
          render: () => (
            <div className="relative h-64 w-full overflow-hidden rounded-xl bg-slate-900">
              <NoiseBackground />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm text-white/50">默认噪点</p>
              </div>
            </div>
          ),
        },
        {
          title: "高密度噪点",
          description: "提高频率，产生更细密的颗粒效果",
          code: `<div className="relative h-screen">
  <NoiseBackground opacity={0.15} frequency={1} />
</div>`,
          render: () => (
            <div className="relative h-64 w-full overflow-hidden rounded-xl bg-slate-900">
              <NoiseBackground opacity={0.15} frequency={1} />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm text-white/50">高密度噪点</p>
              </div>
            </div>
          ),
        },
        {
          title: "静态噪点",
          description: "禁用动画，显示静态噪点纹理",
          code: `<div className="relative h-screen">
  <NoiseBackground animated={false} opacity={0.1} />
</div>`,
          render: () => (
            <div className="relative h-64 w-full overflow-hidden rounded-xl bg-slate-900">
              <NoiseBackground animated={false} opacity={0.1} />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm text-white/50">静态噪点</p>
              </div>
            </div>
          ),
        },
      ]}
      accessibility="NoiseBackground 使用 Canvas 元素和 requestAnimationFrame 绘制像素噪声，纯装饰性背景。Canvas 标记为 aria-hidden='true'，不包含交互内容，对屏幕阅读器无影响。动画在视口外自动暂停（IntersectionObserver），减少不必要的资源消耗。对于设置了 prefers-reduced-motion 的用户，动画停止但 Canvas 仍渲染静态噪点。由于不使用 DOM 元素绘制动画，不影响页面焦点管理。"
    />
  );
}
