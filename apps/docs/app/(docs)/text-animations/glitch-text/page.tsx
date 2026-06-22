"use client";

import { GlitchText } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function GlitchTextPage() {
  return (
    <ComponentDocPage
      category={{ label: "文字动画", href: "/text-animations" }}
      name="GlitchText"
      description="基于 CSS 的故障艺术文字效果，通过 RGB 通道分离产生赛博朋克风格视觉错位。"
      installName="glitch-text"
      importStatement={'import { GlitchText } from "@frontend-ui/ui";'}
      defaultValues={{ text: "GLITCH", intensity: "medium" }}
      propConfig={[
        { name: "text", type: "string" },
        { name: "intensity", type: "string", options: ["low", "medium", "high"] },
      ]}
      propDocs={[
        { name: "text", type: "string", required: true, description: "要显示的文本" },
        { name: "intensity", type: "'low' | 'medium' | 'high'", default: "medium", description: "故障强度，影响偏移距离" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
      ]}
      codeGenerator={(v) =>
        `<GlitchText text="${v.text}" intensity="${v.intensity}" />`
      }
      renderPreview={(v) => (
        <GlitchText
          text={String(v.text)}
          intensity={String(v.intensity) as "low" | "medium" | "high"}
          className="font-display text-4xl font-black tracking-wider text-[var(--color-text-primary)]"
        />
      )}
      examples={[
        {
          title: "低强度故障",
          description: "轻微的 RGB 偏移效果",
          code: `<GlitchText text="LOW" intensity="low" />`,
          render: () => (
            <GlitchText
              text="LOW"
              intensity="low"
              className="font-display text-3xl font-black text-[var(--color-text-primary)]"
            />
          ),
        },
        {
          title: "中等强度故障",
          description: "默认中等偏移效果",
          code: `<GlitchText text="MEDIUM" intensity="medium" />`,
          render: () => (
            <GlitchText
              text="MEDIUM"
              intensity="medium"
              className="font-display text-3xl font-black text-[var(--color-text-primary)]"
            />
          ),
        },
        {
          title: "高强度故障",
          description: "强烈的 RGB 偏移效果",
          code: `<GlitchText text="HIGH" intensity="high" />`,
          render: () => (
            <GlitchText
              text="HIGH"
              intensity="high"
              className="font-display text-3xl font-black text-[var(--color-text-primary)]"
            />
          ),
        },
      ]}
      accessibility="GlitchText 使用三个重叠的 span 元素实现故障效果，其中两个装饰性 span 标记为 aria-hidden='true'。主文本使用 aria-label 提供无障碍访问。文本内容始终完整存在于 DOM 中，故障效果仅影响视觉呈现。对于设置了 prefers-reduced-motion 的用户，CSS 动画自动停止，仅显示主文本，无视觉错位效果。"
    />
  );
}
