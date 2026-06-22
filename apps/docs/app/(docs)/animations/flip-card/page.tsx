"use client";

import { FlipCard } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function FlipCardPage() {
  return (
    <ComponentDocPage
      category={{ label: "交互动画", href: "/animations" }}
      name="FlipCard"
      description="基于 Motion 的翻转卡片组件，通过 CSS 3D 变换实现水平/垂直翻转，支持 hover 和 click 触发。"
      installName="flip-card"
      importStatement={'import { FlipCard } from "@frontend-ui/ui";'}
      defaultValues={{ trigger: "hover", flipDirection: "horizontal" }}
      propConfig={[
        { name: "trigger", type: "string", options: ["hover", "click"] },
        { name: "flipDirection", type: "string", options: ["horizontal", "vertical"] },
      ]}
      propDocs={[
        { name: "frontContent", type: "ReactNode", required: true, description: "正面内容" },
        { name: "backContent", type: "ReactNode", required: true, description: "背面内容" },
        { name: "children", type: "ReactNode", default: "-", description: "附加在正面的内容（可选）" },
        { name: "trigger", type: "'hover' | 'click'", default: "'hover'", description: "翻转触发方式" },
        { name: "flipDirection", type: "'horizontal' | 'vertical'", default: "'horizontal'", description: "翻转方向" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
      ]}
      codeGenerator={(v) => `<FlipCard
  trigger="${v.trigger}"
  flipDirection="${v.flipDirection}"
  frontContent={<div className="h-40 w-64 rounded-xl bg-cyan-500">正面</div>}
  backContent={<div className="h-40 w-64 rounded-xl bg-violet-500">背面</div>}
/>`}
      renderPreview={(v) => (
        <FlipCard
          className="w-full"
          trigger={v.trigger as "hover" | "click"}
          flipDirection={v.flipDirection as "horizontal" | "vertical"}
          frontContent={
            <div className="flex h-40 w-64 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent)] text-xl font-bold text-[var(--color-bg-primary)] shadow-lg">
              正面
            </div>
          }
          backContent={
            <div className="flex h-40 w-64 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent)] text-xl font-bold text-white shadow-lg">
              背面
            </div>
          }
        />
      )}
      examples={[
        {
          title: "悬停翻转",
          description: "鼠标悬停时水平翻转显示背面",
          code: `<FlipCard
  trigger="hover"
  flipDirection="horizontal"
  frontContent={
    <div className="h-48 w-72 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 p-6 text-white">
      <h3 className="text-xl font-bold">正面</h3>
      <p className="mt-2 text-sm opacity-80">悬停翻转查看</p>
    </div>
  }
  backContent={
    <div className="h-48 w-72 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-6 text-white">
      <h3 className="text-xl font-bold">背面</h3>
      <p className="mt-2 text-sm opacity-80">这是背面内容</p>
    </div>
  }
/>`,
          render: () => (
            <FlipCard
              trigger="hover"
              flipDirection="horizontal"
              frontContent={
                <div className="flex h-48 w-72 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 p-6 text-white shadow-xl">
                  <h3 className="text-xl font-bold">正面</h3>
                  <p className="mt-2 text-sm opacity-80">悬停翻转查看</p>
                </div>
              }
              backContent={
                <div className="flex h-48 w-72 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-6 text-white shadow-xl">
                  <h3 className="text-xl font-bold">背面</h3>
                  <p className="mt-2 text-sm opacity-80">这是背面内容</p>
                </div>
              }
            />
          ),
        },
        {
          title: "点击垂直翻转",
          description: "点击触发垂直翻转效果",
          code: `<FlipCard
  trigger="click"
  flipDirection="vertical"
  frontContent={
    <div className="h-40 w-56 rounded-xl bg-emerald-500 p-4 text-white text-center">
      <p className="text-lg font-bold">点击翻转</p>
    </div>
  }
  backContent={
    <div className="h-40 w-56 rounded-xl bg-amber-500 p-4 text-white text-center">
      <p className="text-lg font-bold">背面内容</p>
    </div>
  }
/>`,
          render: () => (
            <FlipCard
              trigger="click"
              flipDirection="vertical"
              frontContent={
                <div className="flex h-40 w-56 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-xl">
                  <p className="text-lg font-bold">点击翻转</p>
                </div>
              }
              backContent={
                <div className="flex h-40 w-56 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-xl">
                  <p className="text-lg font-bold">背面内容</p>
                </div>
              }
            />
          ),
        },
      ]}
      accessibility="FlipCard 设置了 role='button'、tabIndex={0} 和 aria-label 描述翻转行为，支持键盘操作：按 Enter 或空格键可触发翻转。组件使用 CSS 3D 变换（perspective + transform-style: preserve-3d）实现翻转效果，正面和背面通过 backface-visibility: hidden 分别显示。文本内容始终存在于 DOM 中，屏幕阅读器可正常读取。对于设置了 prefers-reduced-motion 的用户，建议在全局层面尊重 prefers-reduced-motion 媒体查询来禁用翻转动画。"
    />
  );
}
