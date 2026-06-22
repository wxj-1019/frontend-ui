"use client";

import { FloatAnimation } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function FloatAnimationPage() {
  return (
    <ComponentDocPage
      category={{ label: "交互动画", href: "/animations" }}
      name="FloatAnimation"
      description="浮动动画，元素上下/左右/环形浮动"
      installName="float-animation"
      importStatement={'import { FloatAnimation } from "@frontend-ui/ui";'}
      defaultValues={{ amplitude: 10, duration: 3, autoPlay: true, direction: "vertical", pauseOnHover: false }}
      propConfig={[
        { name: "amplitude", type: "number", min: 2, max: 50, step: 2 },
        { name: "duration", type: "number", min: 0.5, max: 10, step: 0.5 },
        { name: "autoPlay", type: "boolean" },
        { name: "direction", type: "select", options: ["vertical", "horizontal", "both"] },
        { name: "pauseOnHover", type: "boolean" },
      ]}
      propDocs={[
        { name: "children", type: "ReactNode", required: true, description: "被包裹的元素" },
        { name: "amplitude", type: "number", default: "10", description: "浮动幅度 (px)" },
        { name: "duration", type: "number", default: "3", description: "浮动周期 (秒)" },
        { name: "autoPlay", type: "boolean", default: "true", description: "是否自动播放" },
        { name: "direction", type: "string", default: "vertical", description: "浮动方向" },
        { name: "pauseOnHover", type: "boolean", default: "false", description: "鼠标悬停时暂停" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
      ]}
      codeGenerator={(v) => `<FloatAnimation
  amplitude={${v.amplitude}}
  duration={${v.duration}}
  autoPlay={${v.autoPlay}}
  direction="${v.direction}"
  pauseOnHover={${v.pauseOnHover}}
>
  <div>Floating Element</div>
</FloatAnimation>`}
      renderPreview={(v) => (
        <FloatAnimation
          amplitude={Number(v.amplitude)}
          duration={Number(v.duration)}
          autoPlay={Boolean(v.autoPlay)}
          direction={String(v.direction) as 'vertical' | 'horizontal' | 'both'}
          pauseOnHover={Boolean(v.pauseOnHover)}
        >
          <div className="rounded-lg bg-blue-500/20 px-8 py-6 text-lg text-blue-300">
            Floating Element
          </div>
        </FloatAnimation>
      )}
    />
  );
}
