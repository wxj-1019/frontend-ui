"use client";

import { BlurText } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function BlurTextPage() {
  return (
    <ComponentDocPage
      category={{ label: "文字动画", href: "/text-animations" }}
      name="BlurText"
      description="模糊渐入的文字动画效果，逐字符从模糊到清晰"
      installName="blur-text"
      importStatement={'import { BlurText } from "@frontend-ui/ui";'}
      defaultValues={{ text: "Hello World", delay: 0.5, duration: 1.0 }}
      propConfig={[
        { name: "text", type: "string" },
        { name: "delay", type: "number", min: 0, max: 3, step: 0.1 },
        { name: "duration", type: "number", min: 0.1, max: 3, step: 0.1 },
      ]}
      propDocs={[
        { name: "text", type: "string", required: true, description: "文本内容" },
        { name: "delay", type: "number", default: "0", description: "延迟时间 (s)" },
        { name: "duration", type: "number", default: "0.5", description: "持续时间 (s)" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
      ]}
      codeGenerator={(v) => `<BlurText
  text="${v.text}"
  delay={${v.delay}}
  duration={${v.duration}}
/>`}
      renderPreview={(v) => (
        <BlurText
          text={String(v.text)}
          delay={Number(v.delay)}
          duration={Number(v.duration)}
          className="text-4xl font-bold"
        />
      )}
    />
  );
}
