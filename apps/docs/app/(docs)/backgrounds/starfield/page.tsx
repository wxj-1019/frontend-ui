"use client";

import { Starfield } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function StarfieldPage() {
  return (
    <ComponentDocPage
      category={{ label: "背景特效", href: "/backgrounds" }}
      name="Starfield"
      description="基于 Canvas 和 requestAnimationFrame 的 3D 星空飞行背景，通过透视投影让星点从远方向观察者飞来，营造星际穿梭感。"
      installName="starfield"
      importStatement={'import { Starfield } from "@frontend-ui/ui";'}
      defaultValues={{
        count: 200,
        speed: 0.5,
        depth: true,
        starColor: "#ffffff",
      }}
      propConfig={[
        { name: "count", type: "number", min: 10, max: 1000, step: 10 },
        { name: "speed", type: "number", min: 0.1, max: 10, step: 0.1 },
        { name: "depth", type: "boolean" },
        { name: "starColor", type: "color" },
      ]}
      propDocs={[
        { name: "className", type: "string", default: "-", description: "自定义类名" },
        { name: "count", type: "number", default: "200", description: "星星数量" },
        { name: "speed", type: "number", default: "0.5", description: "飞行速度" },
        { name: "depth", type: "boolean", default: "true", description: "是否启用深度（远小近大）" },
        { name: "starColor", type: "string", default: "#ffffff", description: "星星颜色" },
      ]}
      codeGenerator={(v) => `<div className="relative h-screen">
  <Starfield
    count={${v.count}}
    speed={${v.speed}}
    depth={${v.depth}}
    starColor="${String(v.starColor)}"
  />
</div>`}
      renderPreview={(v) => (
        <div className="relative h-64 w-full overflow-hidden rounded-xl bg-black">
          <Starfield
            count={Number(v.count)}
            speed={Number(v.speed)}
            depth={Boolean(v.depth)}
            starColor={String(v.starColor)}
          />
        </div>
      )}
      examples={[
        {
          title: "基本用法",
          description: "默认白色星空飞行效果",
          code: `<div className="relative h-screen">
  <Starfield />
</div>`,
          render: () => (
            <div className="relative h-64 w-full overflow-hidden rounded-xl bg-black">
              <Starfield />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm text-white/50">默认星空</p>
              </div>
            </div>
          ),
        },
        {
          title: "快速蓝色星空",
          description: "高速蓝色星星飞行效果",
          code: `<div className="relative h-screen">
  <Starfield speed={2} starColor="#60a5fa" count={300} />
</div>`,
          render: () => (
            <div className="relative h-64 w-full overflow-hidden rounded-xl bg-black">
              <Starfield speed={2} starColor="#60a5fa" count={300} />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm text-blue-400/50">高速蓝色星空</p>
              </div>
            </div>
          ),
        },
        {
          title: "无深度效果",
          description: "关闭深度效果，所有星星大小一致",
          code: `<div className="relative h-screen">
  <Starfield depth={false} count={100} speed={1} />
</div>`,
          render: () => (
            <div className="relative h-64 w-full overflow-hidden rounded-xl bg-black">
              <Starfield depth={false} count={100} speed={1} />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm text-white/50">无深度星空</p>
              </div>
            </div>
          ),
        },
      ]}
      accessibility="Starfield 使用 Canvas 元素和 requestAnimationFrame 绘制 3D 星空动画，纯装饰性背景。Canvas 标记为 aria-hidden='true'，不包含交互内容，对屏幕阅读器无影响。动画在视口外自动暂停（IntersectionObserver），减少不必要的资源消耗。对于设置了 prefers-reduced-motion 的用户，动画停止但 Canvas 仍渲染静态星点。由于不使用 DOM 元素绘制动画，不影响页面焦点管理。"
    />
  );
}
