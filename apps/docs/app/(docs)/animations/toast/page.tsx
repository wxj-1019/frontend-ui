"use client";

import { useState, useCallback } from "react";
import { Toast } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

function ToastPreview({
  position,
  duration,
}: {
  position: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
  duration: number;
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg bg-[var(--color-accent)] px-5 py-2.5 font-medium text-white transition-opacity hover:opacity-90"
      >
        显示 Toast
      </button>
      <Toast open={open} onClose={close} position={position} duration={duration}>
        <div className="flex items-center gap-2">
          <span className="text-[var(--color-success)]">●</span>
          <span>操作已成功完成！</span>
        </div>
      </Toast>
    </>
  );
}

function ToastErrorPreview() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg bg-red-500 px-5 py-2.5 font-medium text-white transition-opacity hover:opacity-90"
      >
        显示错误 Toast
      </button>
      <Toast open={open} onClose={close} position="bottom-center" duration={5000}>
        <div className="flex items-center gap-2">
          <span className="text-red-500">✕</span>
          <span>操作失败，请重试。</span>
        </div>
      </Toast>
    </>
  );
}

export default function ToastPage() {
  return (
    <ComponentDocPage
      category={{ label: "交互动画", href: "/animations" }}
      name="Toast"
      description="轻量通知组件，基于 Motion + Portal，支持 6 种位置与自动关闭"
      installName="toast"
      importStatement={'import { Toast } from "@frontend-ui/ui";'}
      defaultValues={{ position: "top-right", duration: 3000 }}
      propConfig={[
        {
          name: "position",
          type: "string",
          options: [
            "top-right",
            "top-left",
            "bottom-right",
            "bottom-left",
            "top-center",
            "bottom-center",
          ],
        },
        { name: "duration", type: "number", min: 0, max: 10000, step: 500 },
      ]}
      propDocs={[
        { name: "open", type: "boolean", required: true, description: "是否显示" },
        { name: "onClose", type: "() => void", required: true, description: "关闭回调" },
        { name: "children", type: "ReactNode", default: "-", description: "通知内容" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
        { name: "position", type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'", default: "'top-right'", description: "显示位置" },
        { name: "duration", type: "number", default: "3000", description: "自动关闭时长 (ms)，0 表示不自动关闭" },
      ]}
      codeGenerator={(v) => `<Toast
  open={open}
  onClose={() => setOpen(false)}
  position="${v.position}"
  duration={${v.duration}}
>
  操作已成功完成！
</Toast>`}
      renderPreview={(v) => (
        <ToastPreview
          position={
            v.position as "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center"
          }
          duration={Number(v.duration)}
        />
      )}
      examples={[
        {
          title: "成功通知",
          description: "右上角显示成功提示，3秒后自动关闭",
          code: `const [open, setOpen] = useState(false);

<Toast open={open} onClose={() => setOpen(false)} position="top-right" duration={3000}>
  <div className="flex items-center gap-2">
    <span className="text-green-500">✓</span>
    <span>操作已成功完成！</span>
  </div>
</Toast>`,
          render: () => (
            <ToastPreview position="top-right" duration={3000} />
          ),
        },
        {
          title: "底部居中错误提示",
          description: "底部居中显示错误通知，持续时间更长",
          code: `const [open, setOpen] = useState(false);

<Toast open={open} onClose={() => setOpen(false)} position="bottom-center" duration={5000}>
  <div className="flex items-center gap-2">
    <span className="text-red-500">✕</span>
    <span>操作失败，请重试。</span>
  </div>
</Toast>`,
          render: () => <ToastErrorPreview />,
        },
      ]}
      accessibility="Toast 组件通过 React Portal 渲染到 document.body，使用 aria-live='polite' 和 aria-atomic='true' 确保屏幕阅读器能感知通知内容。通知容器设置了 role='status'。内置关闭按钮设置了 aria-label='关闭通知'。自动关闭功能基于 setTimeout，组件卸载时自动清理定时器。对于设置了 prefers-reduced-motion 的用户，建议在全局层面尊重 prefers-reduced-motion 媒体查询来控制入场/退场动画。"
    />
  );
}
