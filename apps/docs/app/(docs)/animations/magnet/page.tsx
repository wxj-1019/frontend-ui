"use client";

import { Magnet } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function MagnetPage() {
  return (
    <ComponentDocPage
      category={{ label: "交互动画", href: "/animations" }}
      name="Magnet"
      description="基于 Motion 弹簧动画的磁吸效果组件，元素跟随鼠标产生弹性位移反馈。"
      installName="magnet"
      importStatement={'import { Magnet } from "@frontend-ui/ui";'}
      defaultValues={{ strength: 0.3, label: "UI" }}
      propConfig={[
        { name: "strength", type: "number", min: 0, max: 1, step: 0.05 },
        { name: "label", type: "string" },
      ]}
      propDocs={[
        { name: "children", type: "ReactNode", required: true, description: "子元素内容" },
        { name: "strength", type: "number", default: "0.3", description: "磁吸强度 (0-1)，值越大跟随幅度越大" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
      ]}
      codeGenerator={(v) => `<Magnet strength={${v.strength}}>
  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-400 text-2xl">
    ${v.label}
  </div>
</Magnet>`}
      renderPreview={(v) => (
        <Magnet strength={Number(v.strength)}>
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-accent)] text-3xl font-bold text-[var(--color-bg-primary)] shadow-lg shadow-[var(--color-accent)]/30 transition-shadow hover:shadow-xl hover:shadow-[var(--color-accent)]/40">
            {String(v.label)}
          </div>
        </Magnet>
      )}
      examples={[
        {
          title: "基础磁吸效果",
          description: "低强度磁吸，适合按钮或图标",
          code: `<Magnet strength={0.2}>
  <button className="rounded-lg bg-cyan-500 px-6 py-3 text-white">
    Hover me
  </button>
</Magnet>`,
          render: () => (
            <Magnet strength={0.2}>
              <button className="rounded-lg bg-[var(--color-accent)] px-6 py-3 font-medium text-[var(--color-bg-primary)]">
                Hover me
              </button>
            </Magnet>
          ),
        },
        {
          title: "强磁吸效果",
          description: "高强度磁吸，适合装饰性元素或大卡片",
          code: `<Magnet strength={0.8}>
  <div className="h-32 w-32 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 p-4 text-white shadow-xl">
    Strong magnet
  </div>
</Magnet>`,
          render: () => (
            <Magnet strength={0.8}>
              <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 p-4 text-sm font-bold text-white shadow-xl">
                Strong magnet
              </div>
            </Magnet>
          ),
        },
      ]}
      accessibility="磁吸效果是纯装饰性的视觉反馈，不依赖 ARIA 属性。组件使用 spring 弹簧动画实现平滑跟随，底层通过 useMousePosition hook 监听鼠标位置。对于使用减少动画偏好的用户，建议在全局层面尊重 prefers-reduced-motion 媒体查询。"
    />
  );
}
