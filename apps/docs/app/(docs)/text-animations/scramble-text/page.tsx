"use client";

import { ScrambleText } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function ScrambleTextPage() {
  return (
    <ComponentDocPage
      category={{ label: "文字动画", href: "/text-animations" }}
      name="ScrambleText"
      description="基于 GSAP 的乱码解密文字效果，字符从随机乱码逐渐解密为目标文本。"
      installName="scramble-text"
      importStatement={'import { ScrambleText } from "@frontend-ui/ui";'}
      defaultValues={{ text: "DECRYPTED", trigger: "auto", delay: 0 }}
      propConfig={[
        { name: "text", type: "string" },
        { name: "trigger", type: "string", options: ["auto", "scroll", "hover"] },
        { name: "delay", type: "number", min: 0, max: 3, step: 0.5 },
      ]}
      propDocs={[
        { name: "text", type: "string", required: true, description: "目标文本" },
        { name: "chars", type: "string", default: "!@#$%^&*()_+-=[]{}|;:,.<>?", description: "乱码字符集" },
        { name: "delay", type: "number", default: "0", description: "开始延迟（秒）" },
        { name: "trigger", type: "'auto' | 'scroll' | 'hover'", default: "auto", description: "触发方式" },
        { name: "onComplete", type: "() => void", default: "-", description: "解密完成回调" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
      ]}
      codeGenerator={(v) =>
        `<ScrambleText text="${v.text}" trigger="${v.trigger}" delay={${v.delay}} />`
      }
      renderPreview={(v) => (
        <ScrambleText
          text={String(v.text)}
          trigger={String(v.trigger) as "auto" | "scroll" | "hover"}
          delay={typeof v.delay === 'number' ? v.delay : 0}
          className="font-mono text-3xl font-bold text-[var(--color-accent)]"
        />
      )}
      examples={[
        {
          title: "自动解密",
          description: "页面加载后自动播放解密动画",
          code: `<ScrambleText text="SCRAMBLE" trigger="auto" />`,
          render: () => (
            <ScrambleText
              text="SCRAMBLE"
              trigger="auto"
              className="font-mono text-2xl font-bold text-[var(--color-accent)]"
            />
          ),
        },
        {
          title: "悬停触发",
          description: "鼠标悬停时触发解密动画",
          code: `<ScrambleText text="HOVER ME" trigger="hover" />`,
          render: () => (
            <div className="flex flex-col items-center gap-2">
              <ScrambleText
                text="HOVER ME"
                trigger="hover"
                className="font-mono text-2xl font-bold text-[var(--color-accent)] cursor-pointer"
              />
              <p className="text-xs text-[var(--color-text-muted)]">鼠标悬停触发</p>
            </div>
          ),
        },
        {
          title: "自定义字符集",
          description: "使用数字作为乱码字符",
          code: `<ScrambleText
  text="NUMBERS"
  chars="0123456789"
  trigger="auto"
/>`,
          render: () => (
            <ScrambleText
              text="NUMBERS"
              chars="0123456789"
              trigger="auto"
              className="font-mono text-2xl font-bold text-[var(--color-accent)]"
            />
          ),
        },
      ]}
      accessibility="ScrambleText 使用 GSAP（@gsap/react）驱动字符变换动画。文本通过 aria-label 标注完整内容，屏幕阅读器可以直接读取目标文本而无需等待动画完成。对于设置了 prefers-reduced-motion 的用户，GSAP 动画被跳过，文本直接显示完整内容。"
    />
  );
}
