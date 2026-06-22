"use client";

import { useState, useCallback } from "react";
import { Modal } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";
import { AlertTriangle, Trash2 } from "lucide-react";

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

function ModalFormPreview() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg bg-[var(--color-accent)] px-5 py-2.5 font-medium text-[var(--color-bg-primary)] transition-opacity hover:opacity-90"
      >
        打开表单 Modal
      </button>
      <Modal open={open} onClose={close} size="lg" closeOnOverlayClick={false}>
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
          创建新项目
        </h2>
        <div className="mt-4 space-y-3">
          <input
            type="text"
            placeholder="项目名称"
            className="w-full rounded-md border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
          <textarea
            placeholder="项目描述"
            rows={3}
            className="w-full rounded-md border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>
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
            创建
          </button>
        </div>
      </Modal>
    </>
  );
}

function ConfirmDialogPreview() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white transition-opacity hover:opacity-90"
      >
        删除项目
      </button>
      <Modal open={open} onClose={() => setOpen(false)} size="sm">
        <div className="flex flex-col items-center text-center">
          <AlertTriangle className="h-12 w-12 text-red-500" />
          <h2 className="mt-3 text-lg font-semibold text-[var(--color-text-primary)]">确认删除</h2>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            此操作不可恢复，所有关联数据将被永久删除。
          </p>
        </div>
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => { setStatus("已取消"); setOpen(false); }}
            className="rounded-md px-4 py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
          >
            取消
          </button>
          <button
            type="button"
            onClick={() => { setStatus("已确认删除"); setOpen(false); }}
            className="flex items-center gap-1.5 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            <Trash2 className="h-3.5 w-3.5" />
            确认删除
          </button>
        </div>
        {status && (
          <p className="mt-3 text-center text-sm text-[var(--color-accent)]">当前状态: {status}</p>
        )}
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
        { name: "open", type: "boolean", required: true, description: "是否打开" },
        { name: "onClose", type: "() => void", required: true, description: "关闭回调" },
        { name: "children", type: "ReactNode", default: "-", description: "模态框内容" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
        { name: "size", type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: "尺寸" },
        { name: "closeOnOverlayClick", type: "boolean", default: "true", description: "点击遮罩层是否关闭" },
        { name: "closeOnEsc", type: "boolean", default: "true", description: "按 Esc 键是否关闭" },
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
      examples={[
        {
          title: "基础模态框",
          description: "带标题、内容和操作按钮的标准模态框",
          code: `const [open, setOpen] = useState(false);

<Modal open={open} onClose={() => setOpen(false)} size="md">
  <h2 className="text-lg font-semibold">确认操作</h2>
  <p className="mt-2 text-sm text-gray-500">
    确定要执行此操作吗？此操作不可撤销。
  </p>
  <div className="mt-4 flex justify-end gap-2">
    <button onClick={() => setOpen(false)}>取消</button>
    <button onClick={() => setOpen(false)}>确认</button>
  </div>
</Modal>`,
        },
        {
          title: "表单模态框",
          description: "禁用遮罩点击关闭，确保用户完成表单",
          code: `<Modal
  open={open}
  onClose={() => setOpen(false)}
  size="lg"
  closeOnOverlayClick={false}
>
  <h2 className="text-lg font-semibold">创建新项目</h2>
  <input type="text" placeholder="项目名称" className="w-full mt-4 p-2 border rounded" />
  <textarea placeholder="项目描述" className="w-full mt-2 p-2 border rounded" />
  <div className="mt-4 flex justify-end gap-2">
    <button onClick={() => setOpen(false)}>取消</button>
    <button onClick={() => setOpen(false)}>创建</button>
  </div>
</Modal>`,
          render: () => <ModalFormPreview />,
        },
        {
          title: "确认删除对话框",
          description: "带警告图标的危险操作确认对话框，支持 onConfirm / onCancel 回调",
          code: `function ConfirmDialog() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(null);
  return (
    <>
      <button onClick={() => setOpen(true)}>删除项目</button>
      <Modal open={open} onClose={() => setOpen(false)} size="sm">
        <div className="flex flex-col items-center text-center">
          <AlertTriangle className="h-12 w-12 text-red-500" />
          <h2 className="mt-3 text-lg font-semibold">确认删除</h2>
          <p className="mt-2 text-sm text-gray-500">
            此操作不可恢复，所有关联数据将被永久删除。
          </p>
        </div>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={() => { setStatus("已取消"); setOpen(false); }}>
            取消
          </button>
          <button
            className="bg-red-600 text-white"
            onClick={() => { setStatus("已确认"); setOpen(false); }}
          >
            确认删除
          </button>
        </div>
        {status && <p className="mt-3 text-center text-sm">状态: {status}</p>}
      </Modal>
    </>
  );
}`,
          render: () => <ConfirmDialogPreview />,
        },
      ]}
      accessibility="Modal 组件通过 React Portal 渲染到 document.body，设置了 role='dialog' 和 aria-modal='true' 标识模态对话框。打开时自动锁定 body 滚动并管理焦点到对话框内，关闭时恢复焦点。支持 Esc 键关闭（closeOnEsc）。内置关闭按钮设置了 aria-label='关闭'。背景遮罩层点击可配置关闭（closeOnOverlayClick）。进入/退出动画使用 motion/react 的缩放和透明度过渡。对于设置了 prefers-reduced-motion 的用户，建议在全局层面尊重 prefers-reduced-motion 媒体查询来禁用过渡动画。"
    />
  );
}
