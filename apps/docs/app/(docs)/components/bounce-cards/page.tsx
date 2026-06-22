"use client";

import { BounceCards } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function BounceCardsPage() {
  return (
    <ComponentDocPage
      category={{ label: "复合组件", href: "/components" }}
      name="BounceCards"
      description="弹跳卡片堆叠组件，支持拖拽和循环"
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
        { name: "cards", type: "Array", required: true, description: "卡片列表" },
        { name: "intensity", type: "number", default: "1", description: "弹跳强度" },
        { name: "duration", type: "number", default: "0.6", description: "动画持续时间 (秒)" },
        { name: "gap", type: "number", default: "16", description: "卡片间距 (px)" },
        { name: "maxStack", type: "number", default: "5", description: "最大堆叠数量" },
        { name: "loop", type: "boolean", default: "false", description: "是否循环" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
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
    />
  );
}
