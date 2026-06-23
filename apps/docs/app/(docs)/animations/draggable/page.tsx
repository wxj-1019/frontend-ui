"use client";

import { Draggable } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";
import { GripVertical, User, Clock } from "lucide-react";

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
        { name: "bounds", type: "DraggableBounds", default: "undefined", description: "拖拽边界 { top, left, right, bottom }" },
        { name: "edgeResistance", type: "number", default: "0.65", description: "边缘阻力 (0-1)，值越大拖拽到边界时阻力越强" },
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
            className="inline-block"
            bounds={typeof v.bounds === "string" ? undefined : (v.bounds as { top: number; left: number; right: number; bottom: number })}
            edgeResistance={Number(v.edgeResistance)}
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent)] font-semibold text-[var(--color-bg-primary)] shadow-lg">
              拖我
            </div>
          </Draggable>
        </div>
      )}
      examples={[
        {
          title: "基础拖拽",
          description: "自由拖拽，无边界限制",
          code: `<Draggable>
  <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-cyan-500 text-white">
    Drag me
  </div>
</Draggable>`,
          render: () => (
            <Draggable>
              <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 text-sm font-semibold text-white shadow-lg">
                Drag me
              </div>
            </Draggable>
          ),
        },
        {
          title: "带边界约束",
          description: "拖拽被限制在指定区域内",
          code: `<div className="relative h-64 w-full rounded-xl border-2 border-dashed border-gray-500">
  <Draggable
    bounds={{ top: 0, left: 0, right: 0, bottom: 0 }}
    edgeResistance={0.8}
  >
    <div className="m-4 h-16 w-16 rounded-lg bg-purple-500 text-white">
      Constrained
    </div>
  </Draggable>
</div>`,
          render: () => (
            <div className="relative h-48 w-full max-w-sm rounded-xl border-2 border-dashed border-[var(--color-border-strong)]">
              <Draggable
                bounds={{ top: 0, left: 0, right: 0, bottom: 0 }}
                edgeResistance={0.8}
              >
                <div className="m-4 flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-xs font-semibold text-white shadow-lg">
                  Constrained
                </div>
              </Draggable>
            </div>
          ),
        },
        {
          title: "看板卡片",
          description: "模拟 Kanban 卡片，拖拽时显示提升阴影效果",
          code: `<Draggable edgeResistance={0.65}>
  <div className="w-64 rounded-lg border border-gray-200 bg-white p-3 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing">
    <div className="flex items-center justify-between">
      <span className="px-2 py-0.5 text-xs font-medium rounded bg-blue-100 text-blue-700">进行中</span>
      <GripVertical className="h-4 w-4 text-gray-400" />
    </div>
    <h4 className="mt-2 font-medium text-gray-800">完成首页设计</h4>
    <p className="mt-1 text-sm text-gray-500">设计新版首页的 UI 布局</p>
    <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
      <span className="flex items-center gap-1"><User className="h-3 w-3" />张三</span>
      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />6月25日</span>
    </div>
  </div>
</Draggable>`,
          render: () => (
            <Draggable edgeResistance={0.65}>
              <div className="w-64 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] p-3 shadow-sm transition-shadow hover:shadow-md active:cursor-grabbing">
                <div className="flex items-center justify-between">
                  <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                    进行中
                  </span>
                  <GripVertical className="h-4 w-4 text-[var(--color-text-muted)]" />
                </div>
                <h4 className="mt-2 font-medium text-[var(--color-text-primary)]">完成首页设计</h4>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">设计新版首页的 UI 布局和交互原型</p>
                <div className="mt-3 flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" /> 张三
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> 6月25日
                  </span>
                </div>
              </div>
            </Draggable>
          ),
        },
      ]}
      accessibility="Draggable 组件设置了 role='button' 和 tabIndex={0}，支持键盘聚焦。使用 useReducedMotion 检测用户的动画偏好，当用户启用了减少动画设置时，拖拽功能自动禁用（drag={false}）。拖拽中的视觉反馈通过 whileDrag 状态实现 scale 缩放效果。"
    />
  );
}
