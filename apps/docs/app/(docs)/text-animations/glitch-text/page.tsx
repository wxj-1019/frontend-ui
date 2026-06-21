"use client";

import { GlitchText } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function GlitchTextPage() {
  return (
    <ComponentDocPage
      category={{ label: "文字动画", href: "/text-animations" }}
      name="GlitchText"
      description="故障艺术文字效果，RGB 通道分离产生赛博朋克风格视觉错位"
      installName="glitch-text"
      importStatement={'import { GlitchText } from "@frontend-ui/ui";'}
      defaultValues={{ text: "GLITCH", intensity: "medium" }}
      propConfig={[
        { name: "text", type: "string" },
        { name: "intensity", type: "string", options: ["low", "medium", "high"] },
      ]}
      propDocs={[
        { name: "text", type: "string", required: true, description: "要显示的文本" },
        { name: "intensity", type: "'low' | 'medium' | 'high'", default: "medium", description: "故障强度" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
      ]}
      codeGenerator={(v) =>
        `<GlitchText\n  text="${v.text}"\n  intensity="${v.intensity}"\n/>`
      }
      renderPreview={(v) => (
        <GlitchText
          text={String(v.text)}
          intensity={String(v.intensity) as "low" | "medium" | "high"}
          className="font-display text-4xl font-black tracking-wider text-[var(--color-text-primary)]"
        />
      )}
    />
  );
}
