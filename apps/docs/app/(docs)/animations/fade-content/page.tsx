"use client";

import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function FadeContentPage() {
  return (
    <ComponentDocPage
      category={{ label: "交互动画", href: "/animations" }}
      name="FadeContent"
      description="渐入内容动画，支持多方向淡入"
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
        { name: "direction", type: "string", default: "up", description: "淡入方向" },
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
    />
  );
}
