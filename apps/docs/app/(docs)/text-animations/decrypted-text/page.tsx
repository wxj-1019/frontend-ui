"use client";

import { DecryptedText } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function DecryptedTextPage() {
  return (
    <ComponentDocPage
      category={{ label: "文字动画", href: "/text-animations" }}
      name="DecryptedText"
      description="基于 requestAnimationFrame 的文字解密动画效果，字符在解密过程中随机变换，最终显示目标文本。"
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
        { name: "onComplete", type: "() => void", default: "-", description: "动画完成回调" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
      ]}
      codeGenerator={(v) =>
        `<DecryptedText text="${v.text}" duration={${v.duration}} speed={${v.speed}} autoPlay={${v.autoPlay}} />`
      }
      renderPreview={(v) => (
        <DecryptedText
          text={String(v.text)}
          duration={Number(v.duration)}
          speed={Number(v.speed)}
          autoPlay={Boolean(v.autoPlay)}
          className="text-4xl font-bold text-emerald-400"
        />
      )}
      examples={[
        {
          title: "基本解密",
          description: "默认解密效果",
          code: `<DecryptedText text="SECRET" />`,
          render: () => (
            <DecryptedText
              text="SECRET"
              className="text-3xl font-bold text-emerald-400"
            />
          ),
        },
        {
          title: "慢速解密",
          description: "使用更长的持续时间",
          code: `<DecryptedText text="SLOW DECRYPT" duration={3000} speed={50} />`,
          render: () => (
            <DecryptedText
              text="SLOW DECRYPT"
              duration={3000}
              speed={50}
              className="text-3xl font-bold text-cyan-400"
            />
          ),
        },
        {
          title: "自定义字符集",
          description: "使用仅数字作为解密字符",
          code: `<DecryptedText text="12345" characters="0123456789" />`,
          render: () => (
            <DecryptedText
              text="12345"
              characters="0123456789"
              className="text-3xl font-bold font-mono text-amber-400"
            />
          ),
        },
      ]}
      accessibility="DecryptedText 使用 span 元素渲染文本，使用 font-mono 和 tabular-nums 确保等宽显示。文本通过 aria-label 标注完整内容，屏幕阅读器可以直接读取目标文本而无需等待动画完成。对于设置了 prefers-reduced-motion 的用户，建议在全局层面尊重 prefers-reduced-motion 媒体查询来控制动画播放。"
    />
  );
}
