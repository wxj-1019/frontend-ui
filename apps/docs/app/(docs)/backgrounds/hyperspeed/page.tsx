"use client";

import { Hyperspeed } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function HyperspeedPage() {
  return (
    <ComponentDocPage
      category={{ label: "背景特效", href: "/backgrounds" }}
      name="Hyperspeed"
      description="基于 Canvas 和 requestAnimationFrame 的超光速星轨背景，星点从中心向外辐射并带有运动拖尾，营造星际穿越的视觉冲击。"
      installName="hyperspeed"
      importStatement={'import { Hyperspeed } from "@frontend-ui/ui";'}
      defaultValues={{
        speed: 2,
        count: 300,
        color: "#00ffff",
        trailLength: 0.15,
      }}
      propConfig={[
        { name: "speed", type: "number", min: 0.5, max: 20, step: 0.5 },
        { name: "count", type: "number", min: 50, max: 1000, step: 10 },
        { name: "color", type: "color" },
        { name: "trailLength", type: "number", min: 0, max: 1, step: 0.05 },
      ]}
      propDocs={[
        { name: "className", type: "string", default: "-", description: "自定义类名" },
        { name: "speed", type: "number", default: "2", description: "飞行速度" },
        { name: "count", type: "number", default: "300", description: "星星数量" },
        { name: "color", type: "string", default: "#00ffff", description: "星轨颜色" },
        { name: "trailLength", type: "number", default: "0.15", description: "拖尾长度 (0-1)，越大轨迹越长" },
      ]}
      codeGenerator={(v) => `<div className="relative h-screen">
  <Hyperspeed
    speed={${v.speed}}
    count={${v.count}}
    color="${String(v.color)}"
    trailLength={${v.trailLength}}
  />
</div>`}
      renderPreview={(v) => (
        <div className="relative h-64 w-full overflow-hidden rounded-xl bg-black">
          <Hyperspeed
            speed={Number(v.speed)}
            count={Number(v.count)}
            color={String(v.color)}
            trailLength={Number(v.trailLength)}
          />
        </div>
      )}
      examples={[
        {
          title: "基本用法",
          description: "默认青色超光速效果",
          code: `<div className="relative h-screen">
  <Hyperspeed />
</div>`,
          render: () => (
            <div className="relative h-64 w-full overflow-hidden rounded-xl bg-black">
              <Hyperspeed />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm text-cyan-400/50">默认超光速</p>
              </div>
            </div>
          ),
        },
        {
          title: "高速长拖尾",
          description: "增加速度和拖尾长度，创造更强烈的穿越感",
          code: `<div className="relative h-screen">
  <Hyperspeed speed={5} trailLength={0.3} color="#f43f5e" />
</div>`,
          render: () => (
            <div className="relative h-64 w-full overflow-hidden rounded-xl bg-black">
              <Hyperspeed speed={5} trailLength={0.3} color="#f43f5e" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm text-rose-400/50">高速红色超光速</p>
              </div>
            </div>
          ),
        },
        {
          title: "低速密集",
          description: "低速但密集的星轨效果",
          code: `<div className="relative h-screen">
  <Hyperspeed speed={1} count={500} trailLength={0.4} />
</div>`,
          render: () => (
            <div className="relative h-64 w-full overflow-hidden rounded-xl bg-black">
              <Hyperspeed speed={1} count={500} trailLength={0.4} />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm text-white/50">密集低速星轨</p>
              </div>
            </div>
          ),
        },
      ]}
      accessibility="Hyperspeed 使用 Canvas 元素和 requestAnimationFrame 绘制超光速星轨动画，纯装饰性背景。Canvas 标记为 aria-hidden='true'，不包含交互内容，对屏幕阅读器无影响。动画在视口外自动暂停（IntersectionObserver），减少不必要的资源消耗。对于设置了 prefers-reduced-motion 的用户，动画停止但 Canvas 仍渲染静态星点。由于不使用 DOM 元素绘制动画，不影响页面焦点管理。"
    />
  );
}
