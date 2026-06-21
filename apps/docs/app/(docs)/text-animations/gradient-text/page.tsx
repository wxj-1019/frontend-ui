"use client";

import { GradientText } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function GradientTextPage() {
  return (
    <ComponentDocPage
      category={{ label: "文字动画", href: "/text-animations" }}
      name="GradientText"
      description="渐变色彩的文字效果，支持自定义渐变色起止"
      installName="gradient-text"
      importStatement={'import { GradientText } from "@frontend-ui/ui";'}
      defaultValues={{
        text: "Gradient Magic",
        from: "from-cyan-400",
        to: "to-fuchsia-500",
        size: "text-3xl",
      }}
      propConfig={[
        { name: "text", type: "string" },
        {
          name: "from",
          type: "string",
          options: ["from-cyan-400", "from-violet-500", "from-emerald-400", "from-rose-500"],
        },
        {
          name: "to",
          type: "string",
          options: ["to-fuchsia-500", "to-blue-500", "to-yellow-400", "to-orange-500"],
        },
        {
          name: "size",
          type: "string",
          options: ["text-xl", "text-2xl", "text-3xl", "text-4xl", "text-5xl"],
        },
      ]}
      propDocs={[
        { name: "text", type: "string", required: true, description: "文本内容" },
        { name: "from", type: "string", default: "from-blue-500", description: "渐变起始色（Tailwind 类名）" },
        { name: "to", type: "string", default: "to-purple-500", description: "渐变终止色（Tailwind 类名）" },
        { name: "className", type: "string", default: "-", description: "自定义类名（如字号、粗细）" },
      ]}
      codeGenerator={(v) => `<GradientText
  text="${v.text}"
  from="${v.from}"
  to="${v.to}"
  className="${v.size} font-bold"
/>`}
      renderPreview={(v) => (
        <GradientText
          text={String(v.text)}
          from={String(v.from)}
          to={String(v.to)}
          className={`${String(v.size)} font-bold`}
        />
      )}
    />
  );
}
