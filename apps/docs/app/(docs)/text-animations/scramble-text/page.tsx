"use client";

import { ScrambleText } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function ScrambleTextPage() {
  return (
    <ComponentDocPage
      category={{ label: "文字动画", href: "/text-animations" }}
      name="ScrambleText"
      description="乱码解密文字效果，字符从随机乱码逐渐解密为目标文本"
      installName="scramble-text"
      importStatement={'import { ScrambleText } from "@frontend-ui/ui";'}
      defaultValues={{ text: "DECRYPTED", duration: 1, trigger: "auto" }}
      propConfig={[
        { name: "text", type: "string" },
        { name: "duration", type: "number", min: 0.5, max: 3, step: 0.1 },
        { name: "trigger", type: "string", options: ["auto", "scroll", "hover"] },
      ]}
      propDocs={[
        { name: "text", type: "string", required: true, description: "目标文本" },
        { name: "chars", type: "string", default: "!@#$%^&*()...", description: "乱码字符集" },
        { name: "duration", type: "number", default: "1", description: "解密持续时间（秒）" },
        { name: "delay", type: "number", default: "0", description: "开始延迟（秒）" },
        { name: "trigger", type: "'auto' | 'scroll' | 'hover'", default: "auto", description: "触发方式" },
        { name: "onComplete", type: "() => void", default: "-", description: "解密完成回调" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
      ]}
      codeGenerator={(v) =>
        `<ScrambleText\n  text="${v.text}"\n  duration={${v.duration}}\n  trigger="${v.trigger}"\n/>`
      }
      renderPreview={(v) => (
        <ScrambleText
          text={String(v.text)}
          duration={Number(v.duration)}
          trigger={String(v.trigger) as "auto" | "scroll" | "hover"}
          className="font-mono text-3xl font-bold text-[var(--color-accent)]"
        />
      )}
    />
  );
}
