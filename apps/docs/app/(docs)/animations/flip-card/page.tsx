"use client";

import { FlipCard } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function FlipCardPage() {
  return (
    <ComponentDocPage
      category={{ label: "交互动画", href: "/animations" }}
      name="FlipCard"
      description="翻转卡片组件，支持水平/垂直翻转和 hover/click 触发"
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
    />
  );
}
