"use client";

import { RotatingText } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function RotatingTextPage() {
  return (
    <ComponentDocPage
      category={{ label: "文字动画", href: "/text-animations" }}
      name="RotatingText"
      description="旋转文字，字符依次围绕中心旋转摆动，营造活泼的动态效果。"
      installName="rotating-text"
      importStatement={'import { RotatingText } from "@frontend-ui/ui";'}
      defaultValues={{ text: "ROTATE", speed: 4, direction: "clockwise" }}
      propConfig={[
        { name: "text", type: "string" },
        { name: "speed", type: "number", min: 1, max: 10, step: 0.5 },
        { name: "direction", type: "string", options: ["clockwise", "counter-clockwise"] },
      ]}
      propDocs={[
        { name: "text", type: "string", required: true, description: "要显示的文本内容" },
        { name: "speed", type: "number", default: "4", description: "旋转速度（秒）" },
        { name: "direction", type: "'clockwise' | 'counter-clockwise'", default: "'clockwise'", description: "旋转方向" },
        { name: "charSpacing", type: "string", default: "'0.5em'", description: "字符间距" },
        { name: "as", type: "'span' | 'div' | 'h1' | 'h2' | 'h3' | 'p'", default: "'span'", description: "渲染标签" },
        { name: "className", type: "string", default: "-", description: "自定义 CSS 类名" },
      ]}
      codeGenerator={(v) => `<RotatingText
  text="${v.text}"
  speed={${v.speed}}
  direction="${v.direction}"
/>`}
      renderPreview={(v) => (
        <RotatingText
          text={String(v.text)}
          speed={Number(v.speed)}
          direction={v.direction as "clockwise" | "counter-clockwise"}
          className="text-4xl font-bold"
        />
      )}
      examples={[
        {
          title: "基本用法",
          description: "默认顺时针旋转",
          code: `<RotatingText text="ROTATE" className="text-4xl" />`,
          render: () => <RotatingText text="ROTATE" className="text-4xl" />,
        },
        {
          title: "逆时针旋转",
          description: "反转旋转方向",
          code: `<RotatingText text="COUNTER" direction="counter-clockwise" className="text-4xl" />`,
          render: () => <RotatingText text="COUNTER" direction="counter-clockwise" className="text-4xl" />,
        },
        {
          title: "快速旋转",
          description: "1秒完成一次旋转",
          code: `<RotatingText text="FAST" speed={1} className="text-4xl" />`,
          render: () => <RotatingText text="FAST" speed={1} className="text-4xl" />,
        },
      ]}
      accessibility="RotatingText 使用 CSS 动画实现字符旋转，动画仅影响 transform 属性。组件支持 prefers-reduced-motion 媒体查询，在减弱动效模式下会静态显示完整文本。"
    />
  );
}
