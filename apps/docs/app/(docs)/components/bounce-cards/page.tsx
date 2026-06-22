"use client";

import { BounceCards } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function BounceCardsPage() {
  return (
    <ComponentDocPage
      category={{ label: "复合组件", href: "/components" }}
      name="BounceCards"
      description="基于 Motion 弹簧动画的卡片堆叠组件，支持拖拽和循环切换，通过弹簧物理实现自然的弹性反馈。"
      installName="bounce-cards"
      importStatement={'import { BounceCards } from "@frontend-ui/ui";'}
      defaultValues={{ intensity: 1, duration: 0.6, gap: 16, maxStack: 5, loop: false }}
      propConfig={[
        { name: "intensity", type: "number", min: 0.5, max: 2, step: 0.1 },
        { name: "duration", type: "number", min: 0.3, max: 1, step: 0.1 },
        { name: "gap", type: "number", min: 8, max: 32, step: 4 },
        { name: "maxStack", type: "number", min: 2, max: 8, step: 1 },
        { name: "loop", type: "boolean" },
      ]}
      propDocs={[
        { name: "cards", type: "Array<{ id: string; content: ReactNode; image?: string }>", required: true, description: "卡片列表，每项包含唯一 id、content 内容和可选 image 图片地址" },
        { name: "className", type: "string", description: "自定义类名" },
        { name: "intensity", type: "number", default: "1", description: "弹跳强度，影响弹簧动画刚度" },
        { name: "duration", type: "number", default: "0.6", description: "动画持续时间（秒）" },
        { name: "gap", type: "number", default: "16", description: "卡片间距（px）" },
        { name: "maxStack", type: "number", default: "5", description: "最大可见堆叠数量" },
        { name: "loop", type: "boolean", default: "false", description: "是否循环，启用后到达末尾可继续切换" },
      ]}
      codeGenerator={(v) => `const cards = [
  { id: '1', content: <div>Card 1</div> },
  { id: '2', content: <div>Card 2</div> },
  { id: '3', content: <div>Card 3</div> },
];

<BounceCards
  cards={cards}
  intensity={${v.intensity}}
  duration={${v.duration}}
  gap={${v.gap}}
  maxStack={${v.maxStack}}
  loop={${v.loop}}
/>`}
      renderPreview={(v) => (
        <BounceCards
          cards={[
            { id: '1', content: <div className="text-2xl font-bold text-white">Card 1</div> },
            { id: '2', content: <div className="text-2xl font-bold text-white">Card 2</div> },
            { id: '3', content: <div className="text-2xl font-bold text-white">Card 3</div> },
            { id: '4', content: <div className="text-2xl font-bold text-white">Card 4</div> },
            { id: '5', content: <div className="text-2xl font-bold text-white">Card 5</div> },
          ]}
          intensity={Number(v.intensity)}
          duration={Number(v.duration)}
          gap={Number(v.gap)}
          maxStack={Number(v.maxStack)}
          loop={Boolean(v.loop)}
        />
      )}
      examples={[
        {
          title: "基础弹跳卡片",
          description: "使用默认配置，通过按钮或拖拽切换卡片",
          code: `const cards = [
  { id: '1', content: <div>第一张</div> },
  { id: '2', content: <div>第二张</div> },
  { id: '3', content: <div>第三张</div> },
];

<BounceCards cards={cards} />`,
          render: () => (
            <BounceCards
              cards={[
                { id: '1', content: <div className="text-xl font-bold text-white">卡片 1</div> },
                { id: '2', content: <div className="text-xl font-bold text-white">卡片 2</div> },
                { id: '3', content: <div className="text-xl font-bold text-white">卡片 3</div> },
              ]}
            />
          ),
        },
        {
          title: "循环模式 + 强弹跳",
          description: "启用循环切换并增大弹跳强度",
          code: `<BounceCards
  cards={cards}
  loop
  intensity={1.5}
  maxStack={3}
  gap={12}
/>`,
          render: () => (
            <BounceCards
              cards={[
                { id: 'a', content: <div className="text-xl font-bold text-white">A</div> },
                { id: 'b', content: <div className="text-xl font-bold text-white">B</div> },
                { id: 'c', content: <div className="text-xl font-bold text-white">C</div> },
                { id: 'd', content: <div className="text-xl font-bold text-white">D</div> },
              ]}
              loop
              intensity={1.5}
              maxStack={3}
              gap={12}
            />
          ),
        },
      ]}
      accessibility="BounceCards 使用 role='region' 和 aria-roledescription='carousel' 标记为轮播区域。仅顶部活跃卡片可交互（aria-hidden 标记隐藏非活跃卡片）。底部导航按钮分别带有 'Previous card' 和 'Next card' 的 aria-label。禁用状态下按钮自动设置 disabled 属性。支持键盘操作和拖拽手势切换。"
    />
  );
}
