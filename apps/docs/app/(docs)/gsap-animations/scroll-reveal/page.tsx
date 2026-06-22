"use client";

import { ScrollReveal } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function GsapScrollRevealPage() {
  return (
    <ComponentDocPage
      category={{ label: "GSAP 动画", href: "/gsap-animations" }}
      name="ScrollReveal"
      description="基于 GSAP ScrollTrigger 的高性能滚动触发动画，支持方向、距离、缓动等配置"
      installName="scroll-reveal"
      importStatement={'import { ScrollReveal } from "@frontend-ui/ui";'}
      defaultValues={{ direction: "up", duration: 1, distance: 60 }}
      propConfig={[
        { name: "direction", type: "string", options: ["up", "down", "left", "right"] },
        { name: "duration", type: "number", min: 0.2, max: 2, step: 0.1 },
        { name: "distance", type: "number", min: 10, max: 200, step: 10 },
        { name: "delay", type: "number", min: 0, max: 1, step: 0.1 },
      ]}
      propDocs={[
        { name: "children", type: "ReactNode", required: true, description: "要动画的内容" },
        { name: "direction", type: "'up' | 'down' | 'left' | 'right'", default: "up", description: "滚动进场方向" },
        { name: "duration", type: "number", default: "1", description: "动画时长 (s)" },
        { name: "delay", type: "number", default: "0", description: "延迟时间 (s)" },
        { name: "distance", type: "number", default: "60", description: "动画位移距离 (px)" },
        { name: "ease", type: "string", default: "power3.out", description: "缓动函数" },
        { name: "start", type: "string", default: "top 85%", description: "ScrollTrigger 触发位置" },
        { name: "scrub", type: "boolean | number", default: "false", description: "是否跟随滚动进度" },
        { name: "pin", type: "boolean", default: "false", description: "是否固定元素" },
        { name: "markers", type: "boolean", default: "false", description: "显示调试标记" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
      ]}
      codeGenerator={(v) => `<ScrollReveal direction="${v.direction}" duration={${v.duration}} distance={${v.distance}}>
  <p>滚动进场内容</p>
</ScrollReveal>`}
      renderPreview={(v) => (
        <div className="overflow-hidden rounded-lg bg-[var(--color-bg-surface)] p-6">
          <ScrollReveal
            direction={(v.direction as 'up' | 'down' | 'left' | 'right') || 'up'}
            duration={typeof v.duration === 'number' ? v.duration : 1}
            distance={typeof v.distance === 'number' ? v.distance : 60}
          >
            <div className="text-center">
              <p className="text-lg text-[var(--color-text-primary)]">
                方向: {String(v.direction)}
              </p>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                向下滚动查看效果
              </p>
            </div>
          </ScrollReveal>
        </div>
      )}
      examples={[
        {
          title: "从下方进场",
          description: "默认从下方滑入的滚动揭示效果",
          code: `<ScrollReveal direction="up">
  <h2>从下方滑入</h2>
</ScrollReveal>`,
          render: () => (
            <div className="h-40 overflow-hidden rounded-lg bg-[var(--color-bg-surface)] p-6">
              <ScrollReveal direction="up">
                <div className="text-center">
                  <p className="text-lg font-semibold text-[var(--color-text-primary)]">从下方滑入</p>
                  <p className="text-sm text-[var(--color-text-muted)]">默认效果</p>
                </div>
              </ScrollReveal>
            </div>
          ),
        },
        {
          title: "从左侧进场",
          description: "内容从左侧滑入视口",
          code: `<ScrollReveal direction="left" distance={80}>
  <p>从左侧滑入</p>
</ScrollReveal>`,
          render: () => (
            <div className="h-40 overflow-hidden rounded-lg bg-[var(--color-bg-surface)] p-6">
              <ScrollReveal direction="left" distance={80}>
                <div className="text-center">
                  <p className="text-lg font-semibold text-[var(--color-text-primary)]">从左侧滑入</p>
                  <p className="text-sm text-[var(--color-text-muted)]">distance: 80px</p>
                </div>
              </ScrollReveal>
            </div>
          ),
        },
        {
          title: "带延迟的进场",
          description: "延迟 0.5 秒后开始动画",
          code: `<ScrollReveal direction="down" delay={0.5}>
  <p>延迟进场</p>
</ScrollReveal>`,
          render: () => (
            <div className="h-40 overflow-hidden rounded-lg bg-[var(--color-bg-surface)] p-6">
              <ScrollReveal direction="down" delay={0.5}>
                <div className="text-center">
                  <p className="text-lg font-semibold text-[var(--color-text-primary)]">延迟进场</p>
                  <p className="text-sm text-[var(--color-text-muted)]">delay: 0.5s</p>
                </div>
              </ScrollReveal>
            </div>
          ),
        },
      ]}
      accessibility="ScrollReveal 使用 GSAP ScrollTrigger 驱动动画。对于设置了 prefers-reduced-motion 的用户，动画会被自动跳过，内容直接显示。内容始终存在于 DOM 中，仅通过 CSS transform 和 opacity 进行视觉变换。"
    />
  );
}
