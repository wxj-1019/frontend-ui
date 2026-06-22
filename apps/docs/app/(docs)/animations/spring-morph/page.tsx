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

export default function SpringMorphPage() {
  return (
    <ComponentDocPage
      category={{ label: "交互动画", href: "/animations" }}
      name="SpringMorph"
      description="基于弹簧物理的内容过渡动画，适用于切换视图、轮播等场景"
      installName="spring-morph"
      importStatement={'import { SpringMorph } from "@frontend-ui/ui";'}
      defaultValues={{ morphKey: 0 }}
      propConfig={[
        { name: "morphKey", type: "string" },
      ]}
      propDocs={[
        { name: "morphKey", type: "string | number", required: true, description: "切换键值，变化时触发动画" },
        { name: "children", type: "ReactNode", required: true, description: "渲染内容" },
        { name: "config", type: "SpringConfig", default: "{ tension: 280, friction: 20 }", description: "弹簧物理配置" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
      ]}
      codeGenerator={(v) => `<SpringMorph morphKey={${v.morphKey}}>
  <div>Your Content</div>
</SpringMorph>`}
      renderPreview={() => <MorphPreview />}
    />
  );
}
