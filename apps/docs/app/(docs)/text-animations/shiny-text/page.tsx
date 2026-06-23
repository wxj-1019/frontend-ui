"use client";

import { ShinyText } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function ShinyTextPage() {
  return (
    <ComponentDocPage
      category={{ label: "文字动画", href: "/text-animations" }}
      name="ShinyText"
      description="扫光/流光效果文字，白色光束从左到右扫过文字表面，营造金属光泽的精致质感。"
      installName="shiny-text"
      importStatement={'import { ShinyText } from "@frontend-ui/ui";'}
      defaultValues={{ text: "Shiny Sweep", speed: 3, shineColor: "rgba(255,255,255,0.8)" }}
      propConfig={[
        { name: "text", type: "string" },
        { name: "speed", type: "number", min: 1, max: 10, step: 0.5 },
        { name: "shineColor", type: "string" },
      ]}
      propDocs={[
        { name: "text", type: "string", required: true, description: "要显示的文本内容" },
        { name: "speed", type: "number", default: "3", description: "扫光速度（秒）" },
        { name: "shineColor", type: "string", default: "rgba(255,255,255,0.8)", description: "扫光颜色" },
        { name: "as", type: "'span' | 'div' | 'h1' | 'h2' | 'h3' | 'p'", default: "'span'", description: "渲染的 HTML 标签" },
        { name: "className", type: "string", default: "-", description: "自定义 CSS 类名" },
      ]}
      codeGenerator={(v) => `<ShinyText
  text="${v.text}"
  speed={${v.speed}}
  shineColor="${v.shineColor}"
/>`}
      renderPreview={(v) => (
        <ShinyText
          text={String(v.text)}
          speed={Number(v.speed)}
          shineColor={String(v.shineColor)}
          className="text-4xl font-bold"
        />
      )}
      examples={[
        {
          title: "基本用法",
          description: "默认白色扫光效果",
          code: `<ShinyText text="Shiny Sweep" className="text-4xl font-bold" />`,
          render: () => <ShinyText text="Shiny Sweep" className="text-4xl font-bold" />,
        },
        {
          title: "金色扫光",
          description: "自定义金色扫光颜色",
          code: `<ShinyText text="Golden" shineColor="rgba(255,215,0,0.9)" className="text-4xl" />`,
          render: () => <ShinyText text="Golden" shineColor="rgba(255,215,0,0.9)" className="text-4xl" />,
        },
        {
          title: "快速扫光",
          description: "1 秒完成一次扫光",
          code: `<ShinyText text="Fast" speed={1} className="text-4xl" />`,
          render: () => <ShinyText text="Fast" speed={1} className="text-4xl" />,
        },
      ]}
      accessibility="ShinyText 的扫光动画仅影响视觉效果，文本内容始终完整存在于 DOM 中，屏幕阅读器可正常读取。组件包含 aria-label 属性。"
    />
  );
}
