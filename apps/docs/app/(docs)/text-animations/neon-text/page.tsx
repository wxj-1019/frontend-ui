"use client";

import { NeonText } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function NeonTextPage() {
  return (
    <ComponentDocPage
      category={{ label: "文字动画", href: "/text-animations" }}
      name="NeonText"
      description="霓虹发光文字效果，多层发光叠加带 CSS 闪烁动画，营造赛博朋克风格的视觉冲击力。"
      installName="neon-text"
      importStatement={'import { NeonText } from "@frontend-ui/ui";'}
      defaultValues={{ text: "NEON GLOW", color: "#00F5FF", flicker: true }}
      propConfig={[
        { name: "text", type: "string" },
        { name: "color", type: "string" },
        { name: "flicker", type: "boolean" },
      ]}
      propDocs={[
        { name: "text", type: "string", required: true, description: "要显示的文本内容" },
        { name: "color", type: "string", default: "var(--color-accent)", description: "发光颜色" },
        { name: "flicker", type: "boolean", default: "true", description: "是否启用闪烁动画" },
        { name: "as", type: "'span' | 'div' | 'h1' | 'h2' | 'h3' | 'p'", default: "'span'", description: "渲染的 HTML 标签" },
        { name: "className", type: "string", default: "-", description: "自定义 CSS 类名" },
      ]}
      codeGenerator={(v) => `<NeonText
  text="${v.text}"
  color="${v.color}"
  flicker={${v.flicker}}
/>`}
      renderPreview={(v) => (
        <NeonText
          text={String(v.text)}
          color={String(v.color)}
          flicker={v.flicker === true}
          className="text-5xl font-bold"
        />
      )}
      examples={[
        {
          title: "基本用法",
          description: "默认青色霓虹发光效果",
          code: `<NeonText text="NEON GLOW" className="text-5xl" />`,
          render: () => <NeonText text="NEON GLOW" className="text-5xl" />,
        },
        {
          title: "品红发光",
          description: "自定义发光颜色",
          code: `<NeonText text="MAGENTA" color="#FF006E" className="text-4xl" />`,
          render: () => <NeonText text="MAGENTA" color="#FF006E" className="text-4xl" />,
        },
        {
          title: "静态发光（无闪烁）",
          description: "关闭闪烁动画，保持静态发光",
          code: `<NeonText text="Static Glow" flicker={false} className="text-4xl" />`,
          render: () => <NeonText text="Static Glow" flicker={false} className="text-4xl" />,
        },
      ]}
      accessibility="NeonText 使用多层 text-shadow 实现发光效果，不影响文本的屏幕阅读器读取。组件设置 aria-label 属性确保辅助技术可访问。对于设置 prefers-reduced-motion 的用户，建议关闭 flicker 属性。"
    />
  );
}
