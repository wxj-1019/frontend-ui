"use client";

import { StaggerAnimation } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function StaggerAnimationPage() {
  return (
    <ComponentDocPage
      category={{ label: "交互动画", href: "/animations" }}
      name="StaggerAnimation"
      description="基于 Anime.js 的交错动画组件，元素依次出现，支持多种动画类型和交错延迟配置。"
      installName="stagger-animation"
      importStatement={'import { StaggerAnimation } from "@frontend-ui/ui";'}
      defaultValues={{ staggerDelay: 100, duration: 600, animationType: "fadeIn", autoPlay: true }}
      propConfig={[
        { name: "staggerDelay", type: "number", min: 50, max: 500, step: 50 },
        { name: "duration", type: "number", min: 200, max: 2000, step: 100 },
        { name: "animationType", type: "string", options: ["fadeIn", "slideUp", "slideLeft", "scaleUp", "rotateIn"] },
        { name: "autoPlay", type: "boolean" },
      ]}
      propDocs={[
        { name: "children", type: "ReactNode", required: true, description: "子元素列表" },
        { name: "className", type: "string", default: "-", description: "容器自定义类名" },
        { name: "itemClassName", type: "string", default: "-", description: "每个子元素的自定义类名" },
        { name: "staggerDelay", type: "number", default: "100", description: "交错延迟（ms）" },
        { name: "duration", type: "number", default: "600", description: "动画持续时间（ms）" },
        { name: "animationType", type: "'fadeIn' | 'slideUp' | 'slideLeft' | 'scaleUp' | 'rotateIn'", default: "'fadeIn'", description: "动画类型" },
        { name: "autoPlay", type: "boolean", default: "true", description: "是否自动播放" },
        { name: "easing", type: "string", default: "'easeOutElastic(1, .5)'", description: "缓动函数（animejs 格式）" },
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
      examples={[
        {
          title: "上滑交错",
          description: "子元素依次从下方滑入",
          code: `<StaggerAnimation
  staggerDelay={100}
  duration={500}
  animationType="slideUp"
  className="gap-4"
>
  <div className="rounded-lg bg-blue-500/20 p-4 text-blue-300">第一项</div>
  <div className="rounded-lg bg-green-500/20 p-4 text-green-300">第二项</div>
  <div className="rounded-lg bg-purple-500/20 p-4 text-purple-300">第三项</div>
  <div className="rounded-lg bg-amber-500/20 p-4 text-amber-300">第四项</div>
</StaggerAnimation>`,
          render: () => (
            <StaggerAnimation staggerDelay={100} duration={500} animationType="slideUp" className="gap-3">
              {['第一项', '第二项', '第三项', '第四项'].map((text, i) => (
                <div key={i} className="rounded-lg bg-blue-500/20 px-6 py-3 text-sm text-blue-300">{text}</div>
              ))}
            </StaggerAnimation>
          ),
        },
        {
          title: "缩放弹入",
          description: "子元素依次缩放弹入",
          code: `<StaggerAnimation
  staggerDelay={120}
  duration={600}
  animationType="scaleUp"
  className="gap-4"
>
  <div className="h-20 w-20 rounded-full bg-pink-500/20 flex items-center justify-center">A</div>
  <div className="h-20 w-20 rounded-full bg-cyan-500/20 flex items-center justify-center">B</div>
  <div className="h-20 w-20 rounded-full bg-amber-500/20 flex items-center justify-center">C</div>
</StaggerAnimation>`,
          render: () => (
            <StaggerAnimation staggerDelay={120} duration={600} animationType="scaleUp" className="gap-4">
              {['A', 'B', 'C'].map((letter, i) => (
                <div key={i} className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-500/20 text-lg font-bold text-pink-300">{letter}</div>
              ))}
            </StaggerAnimation>
          ),
        },
      ]}
      accessibility="StaggerAnimation 容器设置了 role='list'，每个子元素设置了 role='listitem'，提供语义化的列表结构。动画使用 animejs 的 animate 函数和 stagger 工具实现交错延迟。autoPlay 为 true 时，子元素初始 opacity 为 0，动画播放后变为可见。文本内容始终存在于 DOM 中，屏幕阅读器可正常读取。对于设置了 prefers-reduced-motion 的用户，建议在全局层面尊重 prefers-reduced-motion 媒体查询来控制 autoPlay 属性。"
    />
  );
}
