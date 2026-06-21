"use client";

import { ComponentDocPage } from "@/components/ui/ComponentDocPage";
import { SplitText } from "@frontend-ui/ui";

export default function SplitTextPage() {
  return (
    <ComponentDocPage
      category={{ label: "文字动画", href: "/text-animations" }}
      name="SplitText"
      description="文字分割动画效果，每个字符独立动画"
      installName="split-text"
      importStatement={'import { SplitText } from "@frontend-ui/ui";'}
      defaultValues={{ text: "Hello World", stagger: 0.03, duration: 0.5 }}
      propConfig={[
        { name: "text", type: "string" },
        { name: "stagger", type: "number", min: 0.01, max: 0.1, step: 0.01 },
        { name: "duration", type: "number", min: 0.1, max: 2, step: 0.1 },
        {
          name: "splitBy",
          type: "string",
          options: ["chars", "words"],
        },
      ]}
      propDocs={[
        { name: "text", type: "string", required: true, description: "文本内容" },
        { name: "stagger", type: "number", default: "0.03", description: "每个字符的延迟间隔 (s)" },
        { name: "duration", type: "number", default: "0.5", description: "单个字符动画时长 (s)" },
        { name: "delay", type: "number", default: "0", description: "整体延迟 (s)" },
        { name: "splitBy", type: "string", default: "chars", description: "分割方式: chars 或 words" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
      ]}
      codeGenerator={(v) => `<SplitText
  text="${v.text}"
  stagger={${v.stagger}}
  duration={${v.duration}}
/>`}
      renderPreview={(v) => (
        <div className="text-4xl font-bold text-[var(--color-text-primary)]">
          <SplitText
            text={String(v.text || "Hello World")}
            stagger={typeof v.stagger === 'number' ? v.stagger : 0.03}
            duration={typeof v.duration === 'number' ? v.duration : 0.5}
          />
        </div>
      )}
    />
  );
}
