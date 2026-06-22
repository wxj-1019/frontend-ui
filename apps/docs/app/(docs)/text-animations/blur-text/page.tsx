"use client";

import { BlurText } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function BlurTextPage() {
  return (
    <ComponentDocPage
      category={{ label: "文字动画", href: "/text-animations" }}
      name="BlurText"
      description="基于 motion/react 的模糊渐入文字动画，逐字符从模糊到清晰，适用于标题入场动画。"
      installName="blur-text"
      importStatement={'import { BlurText } from "@frontend-ui/ui";'}
      defaultValues={{ text: "Hello World", delay: 0.5, duration: 1.0 }}
      propConfig={[
        { name: "text", type: "string" },
        { name: "delay", type: "number", min: 0, max: 3, step: 0.1 },
        { name: "duration", type: "number", min: 0.1, max: 3, step: 0.1 },
      ]}
      propDocs={[
        { name: "text", type: "string", required: true, description: "要显示的文本内容" },
        { name: "delay", type: "number", default: "0", description: "动画开始前的延迟时间（秒）" },
        { name: "duration", type: "number", default: "0.5", description: "动画持续时间（秒）" },
        { name: "className", type: "string", default: "-", description: "自定义 CSS 类名，会合并到根元素" },
      ]}
      codeGenerator={(v) => `<BlurText
  text="${v.text}"
  delay={${v.delay}}
  duration={${v.duration}}
/>`}
      renderPreview={(v) => (
        <BlurText
          text={String(v.text)}
          delay={Number(v.delay)}
          duration={Number(v.duration)}
          className="text-4xl font-bold"
        />
      )}
      examples={[
        {
          title: "基本用法",
          description: "最简单的模糊渐入效果",
          code: `<BlurText text="Welcome" className="text-4xl font-bold" />`,
          render: () => (
            <BlurText text="Welcome" className="text-4xl font-bold" />
          ),
        },
        {
          title: "自定义延迟和持续时间",
          description: "设置延迟 1 秒后开始，动画持续 2 秒",
          code: `<BlurText
  text="Slow Fade In"
  delay={1}
  duration={2}
  className="text-3xl"
/>`,
          render: () => (
            <BlurText text="Slow Fade In" delay={0} duration={1.5} className="text-3xl" />
          ),
        },
      ]}
      accessibility="BlurText 使用 motion/react 的 span 元素渲染文本。文本内容始终存在于 DOM 中，动画仅影响视觉效果（opacity 和 blur 滤镜），屏幕阅读器可以正常读取完整文本内容。对于设置了 prefers-reduced-motion 的用户，建议在全局层面尊重 prefers-reduced-motion 媒体查询来控制动画播放。"
    />
  );
}
