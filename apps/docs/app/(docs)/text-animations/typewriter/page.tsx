"use client";

import { Typewriter } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function TypewriterPage() {
  return (
    <ComponentDocPage
      category={{ label: "文字动画", href: "/text-animations" }}
      name="Typewriter"
      description="打字机效果，逐字符显示文本，支持光标闪烁和循环播放"
      installName="typewriter"
      importStatement={'import { Typewriter } from "@frontend-ui/ui";'}
      defaultValues={{ text: "Hello World", speed: 50, cursor: true, loop: false }}
      propConfig={[
        { name: "text", type: "string" },
        { name: "speed", type: "number", min: 10, max: 200, step: 10 },
        { name: "cursor", type: "boolean" },
        { name: "loop", type: "boolean" },
      ]}
      propDocs={[
        { name: "text", type: "string", required: true, description: "要显示的文本内容" },
        { name: "speed", type: "number", default: "50", description: "打字速度（毫秒/字符）" },
        { name: "delay", type: "number", default: "0", description: "开始延迟（毫秒）" },
        { name: "cursor", type: "boolean", default: "true", description: "是否显示光标" },
        { name: "cursorClassName", type: "string", default: "-", description: "光标自定义类名" },
        { name: "loop", type: "boolean", default: "false", description: "是否循环播放" },
        { name: "onComplete", type: "() => void", default: "-", description: "打字完成回调" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
      ]}
      codeGenerator={(v) =>
        `<Typewriter\n  text="${v.text}"\n  speed={${v.speed}}\n  cursor={${v.cursor}}\n  loop={${v.loop}}\n/>`
      }
      renderPreview={(v) => (
        <Typewriter
          text={String(v.text)}
          speed={Number(v.speed)}
          cursor={Boolean(v.cursor)}
          loop={Boolean(v.loop)}
          className="font-display text-3xl font-bold text-[var(--color-text-primary)]"
        />
      )}
    />
  );
}
