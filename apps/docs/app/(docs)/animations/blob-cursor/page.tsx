"use client";

import { BlobCursor } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function BlobCursorPage() {
  return (
    <ComponentDocPage
      category={{ label: "交互动画", href: "/animations" }}
      name="BlobCursor"
      description="基于 requestAnimationFrame 的液态光标跟随效果，Blob 元素通过逐帧计算平滑跟随鼠标移动。"
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
        { name: "className", type: "string", default: "-", description: "自定义类名" },
        { name: "size", type: "number", default: "80", description: "Blob 大小（px）" },
        { name: "color", type: "string", default: "'var(--color-accent)'", description: "Blob 颜色，支持 CSS 变量" },
        { name: "opacity", type: "number", default: "0.5", description: "不透明度 (0-1)" },
        { name: "blur", type: "number", default: "40", description: "模糊半径（px）" },
        { name: "stiffness", type: "number", default: "0.15", description: "跟随弹簧刚度，值越大跟随越紧" },
        { name: "hideCursor", type: "boolean", default: "false", description: "是否隐藏默认光标" },
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
      examples={[
        {
          title: "基础 Blob 光标",
          description: "默认样式的液态光标跟随效果",
          code: `<BlobCursor size={80} opacity={0.5} blur={40}>
  <div className="h-96 w-full rounded-lg bg-gray-900 flex items-center justify-center">
    <p className="text-gray-400">移动鼠标查看效果</p>
  </div>
</BlobCursor>`,
          render: () => (
            <BlobCursor size={80} opacity={0.5} blur={40}>
              <div className="flex h-[250px] w-full items-center justify-center rounded-lg bg-gray-900">
                <p className="text-gray-400">移动鼠标查看效果</p>
              </div>
            </BlobCursor>
          ),
        },
        {
          title: "隐藏光标 + 大尺寸",
          description: "隐藏默认光标，使用大尺寸 Blob 替代",
          code: `<BlobCursor
  size={120}
  color="#8b5cf6"
  opacity={0.3}
  blur={60}
  stiffness={0.08}
  hideCursor={true}
>
  <div className="h-96 w-full rounded-lg bg-gray-900 flex items-center justify-center">
    <p className="text-gray-400">自定义 Blob 光标</p>
  </div>
</BlobCursor>`,
          render: () => (
            <BlobCursor
              size={120}
              color="#8b5cf6"
              opacity={0.3}
              blur={60}
              stiffness={0.08}
              hideCursor={true}
            >
              <div className="flex h-[250px] w-full items-center justify-center rounded-lg bg-gray-900">
                <p className="text-gray-400">自定义 Blob 光标</p>
              </div>
            </BlobCursor>
          ),
        },
      ]}
      accessibility="BlobCursor 容器设置了 role='presentation'，Blob 元素设置了 aria-hidden='true' 和 pointer-events: none，为纯装饰性元素。当 hideCursor 为 true 时，容器应用 cursor-none 隐藏默认光标。动画通过 requestAnimationFrame 逐帧计算实现，鼠标离开容器时自动停止动画并隐藏 Blob。对于设置了 prefers-reduced-motion 的用户，建议在全局层面禁用该装饰性效果。所有光标元素不影响页面焦点管理。"
    />
  );
}
