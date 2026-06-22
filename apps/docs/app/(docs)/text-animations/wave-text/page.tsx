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
        `<WaveText text="${v.text}" amplitude={${v.amplitude}} stagger={${v.stagger}} duration={${v.duration}} />`
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
      examples={[
        {
          title: "基本波浪",
          description: "默认幅度的波浪文字效果",
          code: `<WaveText text="Hello Wave" />`,
          render: () => (
            <WaveText
              text="Hello Wave"
              className="font-display text-2xl font-bold text-[var(--color-text-primary)]"
            />
          ),
        },
        {
          title: "大幅波浪",
          description: "增大幅度产生更明显的波浪效果",
          code: `<WaveText text="Big Wave" amplitude={40} />`,
          render: () => (
            <WaveText
              text="Big Wave"
              amplitude={40}
              className="font-display text-2xl font-bold text-[var(--color-accent)]"
            />
          ),
        },
        {
          title: "快速波浪",
          description: "减小 stagger 使波浪更紧凑",
          code: `<WaveText text="Fast Wave" stagger={0.02} duration={0.3} />`,
          render: () => (
            <WaveText
              text="Fast Wave"
              stagger={0.02}
              duration={0.3}
              className="font-display text-2xl font-bold text-[var(--color-text-primary)]"
            />
          ),
        },
      ]}
      accessibility="WaveText 使用 motion/react 将文本拆分为独立 span 元素。文本内容始终完整存在于 DOM 中，动画仅影响 Y 轴位移（transform: translateY）。屏幕阅读器可正常读取完整文本内容，不受动画影响。对于设置了 prefers-reduced-motion 的用户，建议在全局层面尊重 prefers-reduced-motion 媒体查询来控制动画播放。"
    />
  );
}
