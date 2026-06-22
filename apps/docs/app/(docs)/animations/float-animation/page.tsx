"use client";

import { FloatAnimation } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function FloatAnimationPage() {
  return (
    <ComponentDocPage
      category={{ label: "交互动画", href: "/animations" }}
      name="FloatAnimation"
      description="基于 react-spring 的浮动动画组件，通过弹簧物理实现元素上下、左右或环形浮动。"
      installName="float-animation"
      importStatement={'import { FloatAnimation } from "@frontend-ui/ui";'}
      defaultValues={{ amplitude: 10, duration: 3, autoPlay: true, direction: "vertical", pauseOnHover: false }}
      propConfig={[
        { name: "amplitude", type: "number", min: 2, max: 50, step: 2 },
        { name: "duration", type: "number", min: 0.5, max: 10, step: 0.5 },
        { name: "autoPlay", type: "boolean" },
        { name: "direction", type: "string", options: ["vertical", "horizontal", "both"] },
        { name: "pauseOnHover", type: "boolean" },
      ]}
      propDocs={[
        { name: "children", type: "ReactNode", required: true, description: "被包裹的元素" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
        { name: "amplitude", type: "number", default: "10", description: "浮动幅度（px）" },
        { name: "duration", type: "number", default: "3", description: "浮动周期（秒）" },
        { name: "autoPlay", type: "boolean", default: "true", description: "是否自动播放" },
        { name: "direction", type: "'vertical' | 'horizontal' | 'both'", default: "'vertical'", description: "浮动方向" },
        { name: "pauseOnHover", type: "boolean", default: "false", description: "鼠标悬停时暂停动画" },
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
      examples={[
        {
          title: "垂直浮动",
          description: "默认的上下浮动效果",
          code: `<FloatAnimation amplitude={15} duration={2.5} direction="vertical">
  <div className="rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 p-6 text-white shadow-lg">
    上下浮动
  </div>
</FloatAnimation>`,
          render: () => (
            <FloatAnimation amplitude={15} duration={2.5} direction="vertical">
              <div className="flex h-24 w-48 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-sm font-bold text-white shadow-lg">
                上下浮动
              </div>
            </FloatAnimation>
          ),
        },
        {
          title: "双向浮动 + 悬停暂停",
          description: "同时在水平和垂直方向浮动，鼠标悬停时暂停",
          code: `<FloatAnimation
  amplitude={20}
  duration={3}
  direction="both"
  pauseOnHover={true}
>
  <div className="rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-6 text-white shadow-lg">
    悬停暂停
  </div>
</FloatAnimation>`,
          render: () => (
            <FloatAnimation amplitude={20} duration={3} direction="both" pauseOnHover={true}>
              <div className="flex h-24 w-48 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-sm font-bold text-white shadow-lg">
                悬停暂停
              </div>
            </FloatAnimation>
          ),
        },
      ]}
      accessibility="FloatAnimation 是纯装饰性的视觉动画，不影响内容的可读性和交互性。组件基于 @react-spring/web 实现，autoPlay 控制是否自动播放，pauseOnHover 允许用户悬停时暂停动画。建议在全局层面尊重 prefers-reduced-motion 媒体查询来控制 autoPlay 属性。"
    />
  );
}
