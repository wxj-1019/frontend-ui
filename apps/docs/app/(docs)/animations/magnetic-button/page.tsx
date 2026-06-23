"use client";

import { MagneticButton } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function MagneticButtonPage() {
  return (
    <ComponentDocPage
      category={{ label: "交互动画", href: "/animations" }}
      name="MagneticButton"
      description="磁吸按钮组件，鼠标悬停时按钮跟随鼠标产生弹性位移，带有点击缩放反馈，营造高级交互质感。"
      installName="magnetic-button"
      importStatement={'import { MagneticButton } from "@frontend-ui/ui";'}
      defaultValues={{ strength: 0.5, activeScale: 0.95 }}
      propConfig={[
        { name: "strength", type: "number", min: 0, max: 2, step: 0.1 },
        { name: "activeScale", type: "number", min: 0.8, max: 1, step: 0.05 },
      ]}
      propDocs={[
        { name: "children", type: "ReactNode", required: true, description: "按钮内容" },
        { name: "strength", type: "number", default: "0.5", description: "磁吸强度（0-2）" },
        { name: "activeScale", type: "number", default: "0.95", description: "点击时的缩放比例" },
        { name: "onClick", type: "() => void", default: "-", description: "点击回调" },
        { name: "className", type: "string", default: "-", description: "自定义 CSS 类名" },
      ]}
      codeGenerator={(v) => `<MagneticButton
  strength={${v.strength}}
  activeScale={${v.activeScale}}
  onClick={() => console.log("clicked")}
>
  Hover Me
</MagneticButton>`}
      renderPreview={(v) => (
        <MagneticButton
          strength={Number(v.strength)}
          activeScale={Number(v.activeScale)}
          className="px-8 py-4"
        >
          Hover Me
        </MagneticButton>
      )}
      examples={[
        {
          title: "基本用法",
          description: "默认磁吸效果",
          code: `<MagneticButton>Hover Me</MagneticButton>`,
          render: () => <MagneticButton>Hover Me</MagneticButton>,
        },
        {
          title: "强磁吸",
          description: "更大的位移幅度",
          code: `<MagneticButton strength={1.5}>Strong Magnet</MagneticButton>`,
          render: () => <MagneticButton strength={1.5}>Strong Magnet</MagneticButton>,
        },
        {
          title: "弱磁吸",
          description: "微妙的位移效果",
          code: `<MagneticButton strength={0.2}>Weak Magnet</MagneticButton>`,
          render: () => <MagneticButton strength={0.2}>Weak Magnet</MagneticButton>,
        },
      ]}
      accessibility="MagneticButton 是标准 button 元素，完全支持键盘导航。按 Enter 或 Space 可触发点击效果。组件使用 motion/react 的弹簧动画，位移量较小，不会影响焦点位置。"
    />
  );
}
