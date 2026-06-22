"use client";

import { BlobCursor } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function BlobCursorPage() {
  return (
    <ComponentDocPage
      category={{ label: "交互动画", href: "/animations" }}
      name="BlobCursor"
      description="液态光标跟随效果，Blob 元素跟随鼠标移动"
      installName="blob-cursor"
      importStatement={'import { BlobCursor } from "@frontend-ui/ui";'}
      defaultValues={{ size: 80, opacity: 0.5, blur: 40, stiffness: 0.15, hideCursor: false }}
      propConfig={[
        { name: "size", type: "number", min: 20, max: 200, step: 10 },
        { name: "opacity", type: "number", min: 0, max: 1, step: 0.1 },
        { name: "blur", type: "number", min: 0, max: 100, step: 5 },
        { name: "stiffness", type: "number", min: 0.01, max: 0.5, step: 0.01 },
        { name: "hideCursor", type: "boolean" },
      ]}
      propDocs={[
        { name: "children", type: "ReactNode", required: true, description: "被包裹的元素" },
        { name: "size", type: "number", default: "80", description: "Blob 大小 (px)" },
        { name: "color", type: "string", default: "var(--color-accent)", description: "Blob 颜色" },
        { name: "opacity", type: "number", default: "0.5", description: "不透明度" },
        { name: "blur", type: "number", default: "40", description: "模糊半径 (px)" },
        { name: "stiffness", type: "number", default: "0.15", description: "跟随弹簧刚度" },
        { name: "hideCursor", type: "boolean", default: "false", description: "是否隐藏默认光标" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
      ]}
      codeGenerator={(v) => `<BlobCursor
  size={${v.size}}
  opacity={${v.opacity}}
  blur={${v.blur}}
  stiffness={${v.stiffness}}
  hideCursor={${v.hideCursor}}
>
  <div>Hover over me</div>
</BlobCursor>`}
      renderPreview={(v) => (
        <BlobCursor
          size={Number(v.size)}
          opacity={Number(v.opacity)}
          blur={Number(v.blur)}
          stiffness={Number(v.stiffness)}
          hideCursor={Boolean(v.hideCursor)}
          className="flex h-[300px] w-full items-center justify-center rounded-lg border border-dashed border-gray-600 bg-gray-900"
        >
          <p className="text-lg text-gray-400">Move your mouse here</p>
        </BlobCursor>
      )}
    />
  );
}
