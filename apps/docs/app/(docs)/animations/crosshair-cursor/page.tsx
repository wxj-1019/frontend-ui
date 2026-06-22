"use client";

import { CrosshairCursor } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function CrosshairCursorPage() {
  return (
    <ComponentDocPage
      category={{ label: "交互动画", href: "/animations" }}
      name="CrosshairCursor"
      description="十字准星光标效果，显示坐标和跟随延迟"
      installName="crosshair-cursor"
      importStatement={'import { CrosshairCursor } from "@frontend-ui/ui";'}
      defaultValues={{ size: 40, strokeWidth: 1.5, showCenter: true, centerSize: 4, showCoordinates: false }}
      propConfig={[
        { name: "size", type: "number", min: 20, max: 100, step: 5 },
        { name: "strokeWidth", type: "number", min: 0.5, max: 3, step: 0.5 },
        { name: "showCenter", type: "boolean" },
        { name: "centerSize", type: "number", min: 2, max: 10, step: 1 },
        { name: "showCoordinates", type: "boolean" },
      ]}
      propDocs={[
        { name: "children", type: "ReactNode", required: true, description: "被包裹的元素" },
        { name: "size", type: "number", default: "40", description: "十字线大小 (px)" },
        { name: "color", type: "string", default: "var(--color-accent)", description: "线条颜色" },
        { name: "strokeWidth", type: "number", default: "1.5", description: "线条宽度 (px)" },
        { name: "showCenter", type: "boolean", default: "true", description: "是否显示中心点" },
        { name: "centerSize", type: "number", default: "4", description: "中心点大小 (px)" },
        { name: "showCoordinates", type: "boolean", default: "false", description: "是否显示坐标" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
      ]}
      codeGenerator={(v) => `<CrosshairCursor
  size={${v.size}}
  strokeWidth={${v.strokeWidth}}
  showCenter={${v.showCenter}}
  centerSize={${v.centerSize}}
  showCoordinates={${v.showCoordinates}}
>
  <div>Hover over me</div>
</CrosshairCursor>`}
      renderPreview={(v) => (
        <CrosshairCursor
          size={Number(v.size)}
          strokeWidth={Number(v.strokeWidth)}
          showCenter={Boolean(v.showCenter)}
          centerSize={Number(v.centerSize)}
          showCoordinates={Boolean(v.showCoordinates)}
          className="flex h-[300px] w-full items-center justify-center rounded-lg border border-dashed border-gray-600 bg-gray-900"
        >
          <p className="text-lg text-gray-400">Move your mouse here</p>
        </CrosshairCursor>
      )}
    />
  );
}
