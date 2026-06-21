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
        { name: "children", type: "ReactNode", description: "通知内容" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
        { name: "open", type: "boolean", required: true, description: "是否显示" },
        { name: "onClose", type: "() => void", required: true, description: "关闭回调" },
        { name: "position", type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'", default: "'top-right'", description: "显示位置" },
        { name: "duration", type: "number", default: "3000", description: "自动关闭时长 (ms)，0 不自动关闭" },
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
    />
  );
}
