"use client";

import { useState, useCallback } from "react";
import { Modal } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

function ModalPreview({
  size,
  closeOnOverlayClick,
  closeOnEsc,
}: {
  size: "sm" | "md" | "lg" | "xl";
  closeOnOverlayClick: boolean;
  closeOnEsc: boolean;
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg bg-[var(--color-accent)] px-5 py-2.5 font-medium text-[var(--color-bg-primary)] transition-opacity hover:opacity-90"
      >
        打开 Modal
      </button>
      <Modal
        open={open}
        onClose={close}
        size={size}
        closeOnOverlayClick={closeOnOverlayClick}
        closeOnEsc={closeOnEsc}
      >
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
          模态框标题
        </h2>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          这是一个使用 Motion 实现的模态框，带有背景模糊、缩放和透明度过渡。
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={close}
            className="rounded-md px-3 py-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
          >
            取消
          </button>
          <button
            type="button"
            onClick={close}
            className="rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-sm text-[var(--color-bg-primary)]"
          >
            确认
          </button>
        </div>
      </Modal>
    </>
  );
}

export default function ModalPage() {
  return (
    <ComponentDocPage
      category={{ label: "交互动画", href: "/animations" }}
      name="Modal"
      description="模态框组件，基于 Motion + Portal 实现，支持 Esc 关闭、背景模糊与缩放动画"
      installName="modal"
      importStatement={'import { Modal } from "@frontend-ui/ui";'}
      defaultValues={{ size: "md", closeOnOverlayClick: true, closeOnEsc: true }}
      propConfig={[
        { name: "size", type: "string", options: ["sm", "md", "lg", "xl"] },
        { name: "closeOnOverlayClick", type: "boolean" },
        { name: "closeOnEsc", type: "boolean" },
      ]}
      propDocs={[
        { name: "children", type: "ReactNode", description: "模态框内容" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
        { name: "open", type: "boolean", required: true, description: "是否打开" },
        { name: "onClose", type: "() => void", required: true, description: "关闭回调" },
        { name: "size", type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: "尺寸" },
        { name: "closeOnOverlayClick", type: "boolean", default: "true", description: "点击遮罩关闭" },
        { name: "closeOnEsc", type: "boolean", default: "true", description: "Esc 关闭" },
      ]}
      codeGenerator={(v) => `<Modal
  open={open}
  onClose={() => setOpen(false)}
  size="${v.size}"
  closeOnOverlayClick={${v.closeOnOverlayClick}}
  closeOnEsc={${v.closeOnEsc}}
>
  <h2>标题</h2>
  <p>内容</p>
</Modal>`}
      renderPreview={(v) => (
        <ModalPreview
          size={v.size as "sm" | "md" | "lg" | "xl"}
          closeOnOverlayClick={Boolean(v.closeOnOverlayClick)}
          closeOnEsc={Boolean(v.closeOnEsc)}
        />
      )}
    />
  );
}
