"use client";

import { GradientText } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function GradientTextPage() {
  return (
    <ComponentDocPage
      category={{ label: "文字动画", href: "/text-animations" }}
      name="GradientText"
      description="纯 CSS 渐变色彩文字效果，通过 background-clip: text 实现，支持自定义渐变方向和颜色。"
      installName="gradient-text"
      importStatement={'import { GradientText } from "@frontend-ui/ui";'}
      defaultValues={{ text: "Gradient Text", from: "from-blue-500", to: "to-purple-500" }}
      propConfig={[
        { name: "text", type: "string" },
        { name: "from", type: "string", options: ["from-blue-500", "from-cyan-400", "from-pink-500", "from-green-400", "from-orange-400"] },
        { name: "to", type: "string", options: ["to-purple-500", "to-pink-500", "to-red-500", "to-blue-500", "to-yellow-400"] },
      ]}
      propDocs={[
        { name: "text", type: "string", required: true, description: "要显示的文本内容" },
        { name: "from", type: "string", default: "from-blue-500", description: "渐变起始颜色，使用 Tailwind 渐变类名" },
        { name: "to", type: "string", default: "to-purple-500", description: "渐变结束颜色，使用 Tailwind 渐变类名" },
        { name: "className", type: "string", default: "-", description: "自定义 CSS 类名，会合并到根元素" },
      ]}
      codeGenerator={(v) => `<GradientText
  text="${v.text}"
  from="${v.from}"
  to="${v.to}"
/>`}
      renderPreview={(v) => (
        <GradientText
          text={String(v.text)}
          from={String(v.from)}
          to={String(v.to)}
          className="text-4xl font-bold"
        />
      )}
      examples={[
        {
          title: "基本用法",
          description: "默认蓝紫渐变",
          code: `<GradientText text="Hello World" className="text-4xl font-bold" />`,
          render: () => (
            <GradientText text="Hello World" className="text-4xl font-bold" />
          ),
        },
        {
          title: "自定义渐变色",
          description: "使用青色到粉色的渐变",
          code: `<GradientText
  text="Cyan to Pink"
  from="from-cyan-400"
  to="to-pink-500"
  className="text-3xl font-bold"
/>`,
          render: () => (
            <GradientText
              text="Cyan to Pink"
              from="from-cyan-400"
              to="to-pink-500"
              className="text-3xl font-bold"
            />
          ),
        },
      ]}
      accessibility="GradientText 使用纯 CSS 实现渐变效果（background-clip: text），文本内容始终完整存在于 DOM 中，屏幕阅读器可正常读取。由于是纯 CSS 静态效果，不涉及动画，无需额外的 reduced motion 处理。不包含交互元素，无需键盘导航或焦点管理支持。"
    />
  );
}
