"use client";

import { StaggerAnimation } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function StaggerAnimationPage() {
  return (
    <ComponentDocPage
      category={{ label: "交互动画", href: "/animations" }}
      name="StaggerAnimation"
      description="交错动画，元素依次出现支持多种动画类型"
      installName="stagger-animation"
      importStatement={'import { StaggerAnimation } from "@frontend-ui/ui";'}
      defaultValues={{ staggerDelay: 100, duration: 600, animationType: "fadeIn", autoPlay: true }}
      propConfig={[
        { name: "staggerDelay", type: "number", min: 50, max: 500, step: 50 },
        { name: "duration", type: "number", min: 200, max: 2000, step: 100 },
        { name: "animationType", type: "select", options: ["fadeIn", "slideUp", "slideLeft", "scaleUp", "rotateIn"] },
        { name: "autoPlay", type: "boolean" },
      ]}
      propDocs={[
        { name: "children", type: "ReactNode", required: true, description: "子元素列表" },
        { name: "staggerDelay", type: "number", default: "100", description: "交错延迟 (ms)" },
        { name: "duration", type: "number", default: "600", description: "动画持续时间 (ms)" },
        { name: "animationType", type: "string", default: "fadeIn", description: "动画类型" },
        { name: "autoPlay", type: "boolean", default: "true", description: "是否自动播放" },
        { name: "easing", type: "string", default: "easeOutElastic(1, .5)", description: "缓动函数" },
        { name: "direction", type: "string", default: "normal", description: "动画方向" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
        { name: "itemClassName", type: "string", default: "-", description: "子元素类名" },
      ]}
      codeGenerator={(v) => `<StaggerAnimation
  staggerDelay={${v.staggerDelay}}
  duration={${v.duration}}
  animationType="${v.animationType}"
  autoPlay={${v.autoPlay}}
>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</StaggerAnimation>`}
      renderPreview={(v) => (
        <StaggerAnimation
          staggerDelay={Number(v.staggerDelay)}
          duration={Number(v.duration)}
          animationType={String(v.animationType) as 'fadeIn' | 'slideUp' | 'slideLeft' | 'scaleUp' | 'rotateIn'}
          autoPlay={Boolean(v.autoPlay)}
          className="gap-4"
        >
          {['🎨', '🚀', '⚡', '🎯', '🔥', '✨'].map((emoji, i) => (
            <div
              key={i}
              className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-800 text-2xl"
            >
              {emoji}
            </div>
          ))}
        </StaggerAnimation>
      )}
    />
  );
}
