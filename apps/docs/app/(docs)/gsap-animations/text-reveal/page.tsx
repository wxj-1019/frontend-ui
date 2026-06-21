"use client";

import { ComponentDocPage } from "@/components/ui/ComponentDocPage";
import { TextReveal } from "@frontend-ui/ui";

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
        {
          name: "mode",
          type: "string",
          options: ["chars", "words"],
        },
        { name: "stagger", type: "number", min: 0.01, max: 0.1, step: 0.01 },
        { name: "duration", type: "number", min: 0.2, max: 2, step: 0.1 },
      ]}
      propDocs={[
        { name: "text", type: "string", required: true, description: "文本内容" },
        { name: "mode", type: "string", default: "chars", description: "分割方式: chars 或 words" },
        { name: "stagger", type: "number", default: "0.03", description: "每个字符的延迟间隔 (s)" },
        { name: "duration", type: "number", default: "0.8", description: "单个字符动画时长 (s)" },
        { name: "delay", type: "number", default: "0", description: "整体延迟 (s)" },
        { name: "ease", type: "string", default: "power3.out", description: "缓动函数" },
        { name: "start", type: "string", default: "top 85%", description: "ScrollTrigger 触发位置" },
        { name: "from", type: "object", default: "{ opacity: 0, y: 20, rotationX: -90 }", description: "初始状态" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
      ]}
      codeGenerator={(v) => `<TextReveal
  text="${v.text}"
  mode="${v.mode}"
  stagger={${v.stagger}}
/>`}
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
    />
  );
}
