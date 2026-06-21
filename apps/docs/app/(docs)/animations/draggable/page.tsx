"use client";

import { Draggable } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function DraggablePage() {
  return (
    <ComponentDocPage
      category={{ label: "交互动画", href: "/animations" }}
      name="Draggable"
      description="基于 Motion 的可拖拽元素组件，支持边界约束与边缘阻力"
      installName="draggable"
      importStatement={'import { Draggable } from "@frontend-ui/ui";'}
      defaultValues={{ edgeResistance: 0.65, bounds: { top: 0, left: 0, right: 0, bottom: 0 } }}
      propConfig={[
        { name: "edgeResistance", type: "number", min: 0, max: 1, step: 0.05 },
      ]}
      propDocs={[
        { name: "children", type: "ReactNode", required: true, description: "可拖拽的内容" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
        { name: "bounds", type: "{ top, left, right, bottom }", default: "undefined", description: "拖拽边界" },
        { name: "edgeResistance", type: "number", default: "0.65", description: "边缘阻力 (0-1)" },
      ]}
      codeGenerator={(v) => `<Draggable
  bounds={{ top: 0, left: 0, right: 0, bottom: 0 }}
  edgeResistance={${v.edgeResistance}}
>
  <div className="h-24 w-24 rounded-xl bg-cyan-500">Drag me</div>
</Draggable>`}
      renderPreview={(v) => (
        <div className="relative w-full max-w-md rounded-xl border border-dashed border-[var(--color-border-strong)] p-4">
          <Draggable
            bounds={typeof v.bounds === "string" ? undefined : (v.bounds as { top: number; left: number; right: number; bottom: number })}
            edgeResistance={Number(v.edgeResistance)}
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent)] font-semibold text-[var(--color-bg-primary)] shadow-lg">
              拖我
            </div>
          </Draggable>
        </div>
      )}
    />
  );
}
