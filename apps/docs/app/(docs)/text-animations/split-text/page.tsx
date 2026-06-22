"use client";

import { SplitText } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function SplitTextPage() {
  return (
    <ComponentDocPage
      category={{ label: "文字动画", href: "/text-animations" }}
      name="SplitText"
      description="文字分割动画效果，每个字符或单词独立从下方弹入"
      installName="split-text"
      importStatement={'import { SplitText } from "@frontend-ui/ui";'}
      defaultValues={{ text: "Hello World", stagger: 0.03, duration: 0.5, splitBy: "chars" }}
      propConfig={[
        { name: "text", type: "string" },
        { name: "stagger", type: "number", min: 0.01, max: 0.1, step: 0.01 },
        { name: "duration", type: "number", min: 0.1, max: 2, step: 0.1 },
        { name: "splitBy", type: "string", options: ["chars", "words"] },
      ]}
      propDocs={[
        { name: "text", type: "string", required: true, description: "文本内容" },
        { name: "stagger", type: "number", default: "0.03", description: "每个字符/单词的延迟间隔 (s)" },
        { name: "duration", type: "number", default: "0.5", description: "单个字符/单词动画时长 (s)" },
        { name: "delay", type: "number", default: "0", description: "整体延迟 (s)" },
        { name: "splitBy", type: "'chars' | 'words'", default: "chars", description: "分割方式: chars 或 words" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
      ]}
      codeGenerator={(v) => `<SplitText
  text="${v.text}"
  stagger={${v.stagger}}
  duration={${v.duration}}
  splitBy="${v.splitBy}"
/>`}
      renderPreview={(v) => (
        <div className="text-4xl font-bold text-[var(--color-text-primary)]">
          <SplitText
            text={String(v.text || "Hello World")}
            stagger={typeof v.stagger === 'number' ? v.stagger : 0.03}
            duration={typeof v.duration === 'number' ? v.duration : 0.5}
            splitBy={(v.splitBy as 'chars' | 'words') || 'chars'}
          />
        </div>
      )}
      examples={[
        {
          title: "逐字动画",
          description: "每个字符独立从下方弹入",
          code: `<SplitText text="Hello World" splitBy="chars" />`,
          render: () => (
            <div className="text-3xl font-bold text-[var(--color-text-primary)]">
              <SplitText text="Hello World" splitBy="chars" />
            </div>
          ),
        },
        {
          title: "逐词动画",
          description: "按单词分割，逐词弹入",
          code: `<SplitText text="Split By Words" splitBy="words" stagger={0.08} />`,
          render: () => (
            <div className="text-3xl font-bold text-[var(--color-text-primary)]">
              <SplitText text="Split By Words" splitBy="words" stagger={0.08} />
            </div>
          ),
        },
        {
          title: "慢速动画",
          description: "增大 stagger 和 duration 使动画更慢",
          code: `<SplitText text="Slow" stagger={0.1} duration={0.8} />`,
          render: () => (
            <div className="text-3xl font-bold text-[var(--color-accent)]">
              <SplitText text="Slow Animation" stagger={0.1} duration={0.8} />
            </div>
          ),
        },
      ]}
      accessibility="SplitText 使用 motion/react 将文本拆分为独立 span 元素。文本内容始终完整存在于 DOM 中（每个字符/单词一个 span），动画仅影响视觉效果（opacity 和 transform）。屏幕阅读器可正常读取完整文本内容。对于设置了 prefers-reduced-motion 的用户，建议在全局层面尊重 prefers-reduced-motion 媒体查询来控制动画播放。"
    />
  );
}
