"use client";

import { GlowCard } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function GlowCardPage() {
  return (
    <ComponentDocPage
      category={{ label: "复合组件", href: "/components" }}
      name="GlowCard"
      description="基于 Motion 的发光卡片组件，鼠标追踪光晕效果，支持 3D 倾斜和自定义发光参数。"
      installName="glow-card"
      importStatement={'import { GlowCard } from "@frontend-ui/ui";'}
      defaultValues={{
        intensity: 1,
        enableTilt: true,
        tiltRange: 10,
        showGlow: true,
        glowSize: 200,
        backgroundColor: "rgba(17, 24, 39, 0.8)",
      }}
      propConfig={[
        { name: "intensity", type: "number", min: 0, max: 2, step: 0.1 },
        { name: "enableTilt", type: "boolean" },
        { name: "tiltRange", type: "number", min: 5, max: 30, step: 5 },
        { name: "showGlow", type: "boolean" },
        { name: "glowSize", type: "number", min: 50, max: 400, step: 50 },
      ]}
      propDocs={[
        { name: "children", type: "ReactNode", required: true, description: "卡片内容" },
        { name: "className", type: "string", description: "自定义类名" },
        { name: "glowColor", type: "string", default: "var(--color-accent)", description: "发光颜色（CSS 颜色值）" },
        { name: "intensity", type: "number", default: "1", description: "发光强度（0~2）" },
        { name: "borderColor", type: "string", description: "边框颜色，设置后悬停时会添加边框发光效果" },
        { name: "enableTilt", type: "boolean", default: "true", description: "是否启用鼠标追踪 3D 倾斜效果" },
        { name: "tiltRange", type: "number", default: "10", description: "倾斜角度范围（度）" },
        { name: "showGlow", type: "boolean", default: "true", description: "是否显示鼠标追踪光晕" },
        { name: "glowSize", type: "number", default: "200", description: "光晕半径大小（px）" },
        { name: "backgroundColor", type: "string", default: "rgba(17, 24, 39, 0.8)", description: "卡片背景颜色（CSS 颜色值）" },
      ]}
      codeGenerator={(v) => `<GlowCard
  glowColor="var(--color-accent)"
  intensity={${v.intensity}}
  enableTilt={${v.enableTilt}}
  tiltRange={${v.tiltRange}}
  showGlow={${v.showGlow}}
  glowSize={${v.glowSize}}
>
  <h3>Glow Card</h3>
  <p>Hover to see the effect</p>
</GlowCard>`}
      renderPreview={(v) => (
        <GlowCard
          intensity={Number(v.intensity)}
          enableTilt={Boolean(v.enableTilt)}
          tiltRange={Number(v.tiltRange)}
          showGlow={Boolean(v.showGlow)}
          glowSize={Number(v.glowSize)}
          backgroundColor={String(v.backgroundColor)}
          className="w-full max-w-md"
        >
          <h3 className="mb-2 text-lg font-semibold text-white">Glow Card</h3>
          <p className="text-gray-400">Hover over this card to see the glow effect follow your cursor.</p>
        </GlowCard>
      )}
      examples={[
        {
          title: "基础发光卡片",
          description: "使用默认配置的鼠标追踪光晕效果",
          code: `<GlowCard>
  <h3>Glow Card</h3>
  <p>鼠标悬停查看光晕追踪效果</p>
</GlowCard>`,
          render: () => (
            <GlowCard className="w-full max-w-xs">
              <h3 className="mb-2 text-lg font-semibold text-white">基础发光</h3>
              <p className="text-gray-400 text-sm">鼠标悬停查看光晕效果</p>
            </GlowCard>
          ),
        },
        {
          title: "自定义发光颜色和边框",
          description: "自定义光晕颜色并启用边框发光",
          code: `<GlowCard
  glowColor="#ff6b6b"
  borderColor="#ff6b6b"
  intensity={1.5}
  glowSize={300}
  backgroundColor="rgba(30, 0, 0, 0.9)"
>
  <h3>红色光晕</h3>
  <p>带有红色边框发光效果</p>
</GlowCard>`,
          render: () => (
            <GlowCard
              glowColor="#ff6b6b"
              borderColor="#ff6b6b"
              intensity={1.5}
              glowSize={300}
              backgroundColor="rgba(30, 0, 0, 0.9)"
              className="w-full max-w-xs"
            >
              <h3 className="mb-2 text-lg font-semibold text-white">红色光晕</h3>
              <p className="text-gray-400 text-sm">带有红色边框发光效果</p>
            </GlowCard>
          ),
        },
        {
          title: "定价卡片",
          description: "带发光边框的定价方案卡片，包含功能列表和 CTA 按钮",
          code: `<GlowCard
  glowColor="#6366f1"
  borderColor="#6366f1"
  intensity={1.2}
  glowSize={250}
  backgroundColor="rgba(15, 10, 40, 0.95)"
>
  <div className="text-center">
    <span className="inline-block rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-300">Pro</span>
    <div className="mt-4">
      <span className="text-4xl font-bold text-white">¥99</span>
      <span className="text-gray-400">/月</span>
    </div>
  </div>
  <ul className="mt-6 space-y-2 text-sm text-gray-300">
    <li>✓ 无限项目</li>
    <li>✓ 优先支持</li>
    <li>✓ 高级分析</li>
    <li>✓ 自定义域名</li>
  </ul>
  <button className="mt-6 w-full rounded-lg bg-indigo-500 py-2.5 text-sm font-medium text-white hover:bg-indigo-600 transition-colors">
    立即升级
  </button>
</GlowCard>`,
          render: () => (
            <GlowCard
              glowColor="#6366f1"
              borderColor="#6366f1"
              intensity={1.2}
              glowSize={250}
              backgroundColor="rgba(15, 10, 40, 0.95)"
              className="w-full max-w-xs"
            >
              <div className="text-center">
                <span className="inline-block rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-300">
                  Pro
                </span>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">¥99</span>
                  <span className="text-gray-400">/月</span>
                </div>
              </div>
              <ul className="mt-6 space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="text-indigo-400">✓</span> 无限项目
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-400">✓</span> 优先支持
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-400">✓</span> 高级分析
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-400">✓</span> 自定义域名
                </li>
              </ul>
              <button className="mt-6 w-full rounded-lg bg-indigo-500 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-600">
                立即升级
              </button>
            </GlowCard>
          ),
        },
      ]}
      accessibility="GlowCard 是一个视觉增强组件，光晕和 3D 倾斜效果仅作为装饰性交互反馈。光晕层和边框发光层均通过 aria-hidden='true' 标记为装饰性元素，不干扰屏幕阅读器。卡片内容保持正常的 DOM 结构和语义。建议在卡片内使用 h2-h6、p 等语义化标签以确保可访问性。"
    />
  );
}
