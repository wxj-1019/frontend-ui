"use client";

import { CrosshairCursor } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function CrosshairCursorPage() {
  return (
    <ComponentDocPage
      category={{ label: "交互动画", href: "/animations" }}
      name="CrosshairCursor"
      description="基于 requestAnimationFrame 的十字准星光标效果，通过逐帧计算平滑跟随鼠标并显示坐标信息。"
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
        { name: "className", type: "string", default: "-", description: "自定义类名" },
        { name: "size", type: "number", default: "40", description: "十字线大小（px）" },
        { name: "color", type: "string", default: "'var(--color-accent)'", description: "线条颜色，支持 CSS 变量" },
        { name: "strokeWidth", type: "number", default: "1.5", description: "线条宽度（px）" },
        { name: "showCenter", type: "boolean", default: "true", description: "是否显示中心点" },
        { name: "centerSize", type: "number", default: "4", description: "中心点大小（px）" },
        { name: "showCoordinates", type: "boolean", default: "false", description: "是否在光标旁显示坐标" },
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
      examples={[
        {
          title: "基础十字准星",
          description: "带中心点的十字准星光标",
          code: `<CrosshairCursor size={40} showCenter={true}>
  <div className="h-96 w-full rounded-lg bg-gray-900 flex items-center justify-center">
    <p className="text-gray-400">移动鼠标查看效果</p>
  </div>
</CrosshairCursor>`,
          render: () => (
            <CrosshairCursor size={40} showCenter={true}>
              <div className="flex h-[250px] w-full items-center justify-center rounded-lg bg-gray-900">
                <p className="text-gray-400">移动鼠标查看效果</p>
              </div>
            </CrosshairCursor>
          ),
        },
        {
          title: "显示坐标",
          description: "十字准星旁实时显示鼠标坐标",
          code: `<CrosshairCursor
  size={60}
  strokeWidth={1}
  showCenter={true}
  centerSize={6}
  showCoordinates={true}
  color="#22d3ee"
>
  <div className="h-96 w-full rounded-lg bg-gray-900 flex items-center justify-center">
    <p className="text-gray-400">坐标显示模式</p>
  </div>
</CrosshairCursor>`,
          render: () => (
            <CrosshairCursor
              size={60}
              strokeWidth={1}
              showCenter={true}
              centerSize={6}
              showCoordinates={true}
              color="#22d3ee"
            >
              <div className="flex h-[250px] w-full items-center justify-center rounded-lg bg-gray-900">
                <p className="text-gray-400">坐标显示模式</p>
              </div>
            </CrosshairCursor>
          ),
        },
      ]}
      accessibility="CrosshairCursor 容器设置了 role='presentation' 和 cursor-none 隐藏默认光标。十字线元素和坐标显示均设置了 aria-hidden='true'，为纯视觉装饰。动画通过 requestAnimationFrame 逐帧计算实现，鼠标离开容器时自动停止。所有光标元素使用 pointer-events: none 确保不干扰底层交互和屏幕阅读器。对于设置了 prefers-reduced-motion 的用户，建议在全局层面禁用该装饰性效果。"
    />
  );
}
