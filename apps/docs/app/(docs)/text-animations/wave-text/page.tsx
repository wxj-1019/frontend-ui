"use client";

import { WaveText } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function WaveTextPage() {
  return (
    <ComponentDocPage
      category={{ label: "文字动画", href: "/text-animations" }}
      name="WaveText"
      description="波浪文字效果，每个字符依次上下浮动，形成波浪动画"
      installName="wave-text"
      importStatement={'import { WaveText } from "@frontend-ui/ui";'}
      defaultValues={{ text: "Wave Animation", amplitude: 20, stagger: 0.05, duration: 0.5 }}
      propConfig={[
        { name: "text", type: "string" },
        { name: "amplitude", type: "number", min: 5, max: 50, step: 1 },
        { name: "stagger", type: "number", min: 0.01, max: 0.2, step: 0.01 },
        { name: "duration", type: "number", min: 0.2, max: 2, step: 0.1 },
      ]}
      propDocs={[
        { name: "text", type: "string", required: true, description: "要显示的文本" },
        { name: "delay", type: "number", default: "0", description: "动画开始延迟（秒）" },
        { name: "stagger", type: "number", default: "0.05", description: "字符间错开时间（秒）" },
        { name: "duration", type: "number", default: "0.5", description: "单个字符动画时长（秒）" },
        { name: "amplitude", type: "number", default: "20", description: "波浪幅度（像素）" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
      ]}
      codeGenerator={(v) =>
        `<WaveText\n  text="${v.text}"\n  amplitude={${v.amplitude}}\n  stagger={${v.stagger}}\n  duration={${v.duration}}\n/>`
      }
      renderPreview={(v) => (
        <WaveText
          text={String(v.text)}
          amplitude={Number(v.amplitude)}
          stagger={Number(v.stagger)}
          duration={Number(v.duration)}
          className="font-display text-3xl font-bold text-[var(--color-text-primary)]"
        />
      )}
    />
  );
}
