"use client";

import { SpringMorph } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";
import { useState } from "react";

const contentItems = [
  { id: "hello", text: "Hello World", color: "bg-blue-500/20 text-blue-300" },
  { id: "morph", text: "Spring Morph!", color: "bg-purple-500/20 text-purple-300" },
  { id: "amazing", text: "Amazing ✨", color: "bg-green-500/20 text-green-300" },
];

function MorphPreview() {
  const [key, setKey] = useState(0);
  const item = contentItems[key % contentItems.length];
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <SpringMorph morphKey={item.id}>
        <div className={"rounded-lg px-8 py-6 text-lg " + item.color}>
          {item.text}
        </div>
      </SpringMorph>
      <button
        onClick={() => setKey((k) => k + 1)}
        className="rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm text-white"
      >
        切换内容
      </button>
    </div>
  );
}

function MorphCarouselPreview() {
  const [key, setKey] = useState(0);
  const colors = [
    { bg: "from-red-500 to-orange-500", label: "日落" },
    { bg: "from-blue-500 to-cyan-500", label: "海洋" },
    { bg: "from-green-500 to-emerald-500", label: "森林" },
  ];
  const current = colors[key % colors.length];
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <SpringMorph morphKey={current.label}>
        <div className={"flex h-32 w-48 items-center justify-center rounded-xl bg-gradient-to-br " + current.bg + " text-lg font-bold text-white shadow-xl"}>
          {current.label}
        </div>
      </SpringMorph>
      <button
        onClick={() => setKey((k) => k + 1)}
        className="rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm text-white"
      >
        下一个
      </button>
    </div>
  );
}

export default function SpringMorphPage() {
  return (
    <ComponentDocPage
      category={{ label: "交互动画", href: "/animations" }}
      name="SpringMorph"
      description="基于 Motion 弹簧物理的内容过渡动画，通过 AnimatePresence 实现视图切换和轮播等场景的平滑过渡。"
      installName="spring-morph"
      importStatement={'import { SpringMorph } from "@frontend-ui/ui";'}
      defaultValues={{ morphKey: 0 }}
      propConfig={[
        { name: "morphKey", type: "string" },
      ]}
      propDocs={[
        { name: "morphKey", type: "string | number", required: true, description: "切换键值，变化时触发动画" },
        { name: "children", type: "ReactNode", required: true, description: "渲染内容" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
      ]}
      codeGenerator={(v) => `<SpringMorph morphKey={${v.morphKey}}>
  <div>Your Content</div>
</SpringMorph>`}
      renderPreview={() => <MorphPreview />}
      examples={[
        {
          title: "内容切换",
          description: "通过改变 morphKey 触发弹簧过渡动画",
          code: `const [key, setKey] = useState(0);

<SpringMorph morphKey={key}>
  <div className="p-8 text-lg">
    {items[key % items.length]}
  </div>
</SpringMorph>

<button onClick={() => setKey(k => k + 1)}>切换</button>`,
          render: () => <MorphPreview />,
        },
        {
          title: "渐变卡片轮播",
          description: "在不同渐变卡片之间切换",
          code: `const [index, setIndex] = useState(0);
const cards = [
  { label: "日落", gradient: "from-red-500 to-orange-500" },
  { label: "海洋", gradient: "from-blue-500 to-cyan-500" },
  { label: "森林", gradient: "from-green-500 to-emerald-500" },
];

<SpringMorph morphKey={cards[index].label}>
  <div className={\`h-32 w-48 rounded-xl bg-gradient-to-br \${cards[index].gradient}\`}>
    {cards[index].label}
  </div>
</SpringMorph>`,
          render: () => <MorphCarouselPreview />,
        },
      ]}
      accessibility="SpringMorph 是纯视觉过渡组件，内容切换时使用弹簧物理动画（stiffness: 280, damping: 20）。动画仅影响 opacity 和 scale 属性，不影响内容的语义结构。对于使用减少动画偏好的用户，建议在全局层面尊重 prefers-reduced-motion 媒体查询。"
    />
  );
}
