"use client";

import { TextReveal } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function GsapTextRevealPage() {
  return (
    <ComponentDocPage
      category={{ label: "GSAP 动画", href: "/gsap-animations" }}
      name="TextReveal"
      description="基于 ScrollTrigger 的文字逐字/逐词显现动画，支持 3D 翻转效果"
      installName="text-reveal"
      importStatement={'import { TextReveal } from "@frontend-ui/ui";'}
      defaultValues={{ text: "GSAP Text Reveal", mode: "chars", stagger: 0.03 }}
      propConfig={[
        { name: "text", type: "string" },
        { name: "mode", type: "string", options: ["chars", "words"] },
        { name: "stagger", type: "number", min: 0.01, max: 0.1, step: 0.01 },
        { name: "duration", type: "number", min: 0.2, max: 2, step: 0.1 },
      ]}
      propDocs={[
        { name: "text", type: "string", required: true, description: "文本内容" },
        { name: "mode", type: "'chars' | 'words'", default: "chars", description: "分割方式: chars 或 words" },
        { name: "stagger", type: "number", default: "0.03", description: "每个字符的延迟间隔 (s)" },
        { name: "duration", type: "number", default: "0.8", description: "单个字符动画时长 (s)" },
        { name: "delay", type: "number", default: "0", description: "整体延迟 (s)" },
        { name: "ease", type: "string", default: "power3.out", description: "缓动函数" },
        { name: "start", type: "string", default: "top 85%", description: "ScrollTrigger 触发位置" },
        { name: "from", type: "object", default: "{ y: 20, rotationX: -90, scale: 0.9 }", description: "初始状态（y、rotationX、scale、opacity）" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
      ]}
      codeGenerator={(v) => `<TextReveal text="${v.text}" mode="${v.mode}" stagger={${v.stagger}} />`}
      renderPreview={(v) => (
        <div className="overflow-hidden rounded-lg bg-[var(--color-bg-surface)] p-6">
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">
            <TextReveal
              text={String(v.text || "GSAP Text Reveal")}
              mode={(v.mode as 'chars' | 'words') || 'chars'}
              stagger={typeof v.stagger === 'number' ? v.stagger : 0.03}
            />
          </h2>
          <p className="mt-4 text-sm text-[var(--color-text-muted)]">
            向下滚动查看效果
          </p>
        </div>
      )}
      examples={[
        {
          title: "逐字显现",
          description: "默认逐字 3D 翻转效果",
          code: `<TextReveal text="Hello World" mode="chars" />`,
          render: () => (
            <div className="h-24 overflow-hidden rounded-lg bg-[var(--color-bg-surface)] p-6">
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
                <TextReveal text="Hello World" mode="chars" />
              </h2>
            </div>
          ),
        },
        {
          title: "逐词显现",
          description: "按单词分割并逐词动画",
          code: `<TextReveal text="GSAP Animation" mode="words" stagger={0.08} />`,
          render: () => (
            <div className="h-24 overflow-hidden rounded-lg bg-[var(--color-bg-surface)] p-6">
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
                <TextReveal text="GSAP Animation" mode="words" stagger={0.08} />
              </h2>
            </div>
          ),
        },
        {
          title: "自定义起始状态",
          description: "从缩放和旋转状态进入",
          code: `<TextReveal
  text="Scale In"
  from={{ y: 30, rotationX: -45, scale: 1.2 }}
/>`,
          render: () => (
            <div className="h-24 overflow-hidden rounded-lg bg-[var(--color-bg-surface)] p-6">
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
                <TextReveal text="Scale In" from={{ y: 30, rotationX: -45, scale: 1.2 }} />
              </h2>
            </div>
          ),
        },
      ]}
      accessibility="TextReveal 使用 GSAP ScrollTrigger 驱动文字动画。文本内容始终存在于 DOM 中，动画仅影响视觉效果（opacity 和 transform）。对于设置了 prefers-reduced-motion 的用户，动画被跳过，文本直接显示完整内容。"
    />
  );
}
