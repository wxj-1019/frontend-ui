"use client";

import { Magnet } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function MagnetPage() {
  return (
    <ComponentDocPage
      category={{ label: "交互动画", href: "/animations" }}
      name="Magnet"
      description="磁吸效果组件，元素跟随鼠标产生弹簧式位移"
      installName="magnet"
      importStatement={'import { Magnet } from "@frontend-ui/ui";'}
      defaultValues={{ strength: 0.3, label: "UI" }}
      propConfig={[
        { name: "strength", type: "number", min: 0, max: 1, step: 0.05 },
        { name: "label", type: "string" },
      ]}
      propDocs={[
        { name: "children", type: "ReactNode", required: true, description: "子元素内容" },
        { name: "strength", type: "number", default: "0.3", description: "磁吸强度 (0-1)" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
      ]}
      codeGenerator={(v) => `<Magnet strength={${v.strength}}>
  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-400 text-2xl">
    ${v.label}
  </div>
</Magnet>`}
      renderPreview={(v) => (
        <Magnet strength={Number(v.strength)}>
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-accent)] text-3xl font-bold text-[var(--color-bg-primary)] shadow-lg shadow-[var(--color-accent)]/30 transition-shadow hover:shadow-xl hover:shadow-[var(--color-accent)]/40">
            {String(v.label)}
          </div>
        </Magnet>
      )}
    />
  );
}
