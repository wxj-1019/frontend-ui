"use client";

import { DecryptedText } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function DecryptedTextPage() {
  return (
    <ComponentDocPage
      category={{ label: "文字动画", href: "/text-animations" }}
      name="DecryptedText"
      description="文字解密动画效果，字符在解密过程中随机变换，最终显示目标文本"
      installName="decrypted-text"
      importStatement={'import { DecryptedText } from "@frontend-ui/ui";'}
      defaultValues={{ text: "HELLO WORLD", duration: 1500, speed: 30, autoPlay: true }}
      propConfig={[
        { name: "text", type: "string" },
        { name: "duration", type: "number", min: 500, max: 5000, step: 100 },
        { name: "speed", type: "number", min: 10, max: 200, step: 10 },
        { name: "autoPlay", type: "boolean" },
        { name: "characters", type: "string" },
      ]}
      propDocs={[
        { name: "text", type: "string", required: true, description: "目标文本" },
        { name: "duration", type: "number", default: "1500", description: "动画持续时间 (ms)" },
        { name: "speed", type: "number", default: "30", description: "解密速度 (ms)" },
        { name: "characters", type: "string", default: "A-Za-z0-9!@#$%^&*", description: "解密字符集" },
        { name: "autoPlay", type: "boolean", default: "true", description: "是否自动播放" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
        { name: "onComplete", type: "() => void", default: "-", description: "动画完成回调" },
      ]}
      codeGenerator={(v) => `<DecryptedText
  text="${v.text}"
  duration={${v.duration}}
  speed={${v.speed}}
  autoPlay={${v.autoPlay}}
/>`}
      renderPreview={(v) => (
        <DecryptedText
          text={String(v.text)}
          duration={Number(v.duration)}
          speed={Number(v.speed)}
          autoPlay={Boolean(v.autoPlay)}
          className="text-4xl font-bold text-emerald-400"
        />
      )}
    />
  );
}
