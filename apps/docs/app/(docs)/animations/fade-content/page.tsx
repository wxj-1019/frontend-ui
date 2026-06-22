"use client";

import { ComponentDocPage } from "@/components/ui/ComponentDocPage";
import { FadeContent } from "@frontend-ui/ui";

export default function FadeContentPage() {
  return (
    <ComponentDocPage
      category={{ label: "交互动画", href: "/animations" }}
      name="FadeContent"
      description="基于 Motion 的渐入内容动画，通过 whileInView 实现视口触发的淡入效果，支持多方向淡入。"
      installName="fade-content"
      importStatement={'import { FadeContent } from "@frontend-ui/ui";'}
      defaultValues={{ direction: "up", delay: 0, duration: 0.5 }}
      propConfig={[
        {
          name: "direction",
          type: "string",
          options: ["up", "down", "left", "right"],
        },
        { name: "delay", type: "number", min: 0, max: 3, step: 0.1 },
        { name: "duration", type: "number", min: 0.1, max: 3, step: 0.1 },
      ]}
      propDocs={[
        { name: "children", type: "ReactNode", required: true, description: "要动画的内容" },
        { name: "direction", type: "'up' | 'down' | 'left' | 'right'", default: "'up'", description: "淡入方向" },
        { name: "delay", type: "number", default: "0", description: "延迟时间 (s)" },
        { name: "duration", type: "number", default: "0.5", description: "动画时长 (s)" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
      ]}
      codeGenerator={(v) => `<FadeContent
  direction="${v.direction}"
  delay={${v.delay}}
  duration={${v.duration}}
>
  <p>渐入内容</p>
</FadeContent>`}
      renderPreview={(v) => (
        <div className="rounded-lg bg-[var(--color-bg-surface)] p-6 text-center">
          <p className="text-lg text-[var(--color-text-primary)]">
            方向: {String(v.direction)}
          </p>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            延迟: {String(v.delay)}s | 时长: {String(v.duration)}s
          </p>
        </div>
      )}
      examples={[
        {
          title: "从下方渐入",
          description: "内容进入视口时从下方淡入",
          code: `<FadeContent direction="up" delay={0} duration={0.6}>
  <div className="rounded-lg bg-white p-6 shadow-md">
    <h3>渐入标题</h3>
    <p>渐入内容文字</p>
  </div>
</FadeContent>`,
          render: () => (
            <FadeContent direction="up" delay={0} duration={0.6}>
              <div className="rounded-lg bg-[var(--color-bg-surface)] p-6 shadow-md">
                <h3 className="font-semibold text-[var(--color-text-primary)]">渐入标题</h3>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">渐入内容文字</p>
              </div>
            </FadeContent>
          ),
        },
        {
          title: "交错渐入",
          description: "多个元素通过不同延迟实现交错渐入效果",
          code: `<div className="space-y-4">
  <FadeContent direction="left" delay={0}>
    <div className="rounded-lg bg-blue-500/20 p-4 text-blue-300">第一项</div>
  </FadeContent>
  <FadeContent direction="left" delay={0.15}>
    <div className="rounded-lg bg-green-500/20 p-4 text-green-300">第二项</div>
  </FadeContent>
  <FadeContent direction="left" delay={0.3}>
    <div className="rounded-lg bg-purple-500/20 p-4 text-purple-300">第三项</div>
  </FadeContent>
</div>`,
          render: () => (
            <div className="w-full max-w-sm space-y-4">
              <FadeContent direction="left" delay={0}>
                <div className="rounded-lg bg-blue-500/20 p-4 text-sm text-blue-300">第一项</div>
              </FadeContent>
              <FadeContent direction="left" delay={0.15}>
                <div className="rounded-lg bg-green-500/20 p-4 text-sm text-green-300">第二项</div>
              </FadeContent>
              <FadeContent direction="left" delay={0.3}>
                <div className="rounded-lg bg-purple-500/20 p-4 text-sm text-purple-300">第三项</div>
              </FadeContent>
            </div>
          ),
        },
      ]}
      accessibility="FadeContent 使用 motion/react 的 whileInView 实现基于视口的触发，当元素进入视口时自动播放动画。动画仅播放一次（viewport.once = true），仅影响 opacity 视觉效果。内容始终存在于 DOM 中，对屏幕阅读器无影响。对于设置了 prefers-reduced-motion 的用户，建议在全局层面尊重 prefers-reduced-motion 媒体查询来控制动画播放。"
    />
  );
}
