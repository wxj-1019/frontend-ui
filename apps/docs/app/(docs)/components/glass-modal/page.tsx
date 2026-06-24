"use client";

import { useState } from "react";
import { GlassModal } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function GlassModalPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ComponentDocPage
      category={{ label: "复合组件", href: "/components" }}
      name="GlassModal"
      description="玻璃态模态框，支持模糊背景与入场动画。使用 backdrop-filter 实现毛玻璃效果，配合 Motion 弹簧动画。"
      installName="glass-modal"
      importStatement={'import { GlassModal } from "@frontend-ui/ui";'}
      defaultValues={{ blur: 20, maxWidth: "28rem" }}
      propConfig={[
        { name: "blur", type: "number", min: 0, max: 50, step: 1 },
      ]}
      propDocs={[
        { name: "isOpen", type: "boolean", default: "false", description: "是否显示" },
        { name: "onClose", type: "() => void", default: "-", description: "关闭回调" },
        { name: "children", type: "ReactNode", default: "-", description: "模态框内容" },
        { name: "blur", type: "number", default: "20", description: "模糊程度 (px)" },
        { name: "maxWidth", type: "string", default: "'28rem'", description: "最大宽度" },
      ]}
      codeGenerator={(values) => `const [isOpen, setIsOpen] = useState(false);

<GlassModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  blur={${values.blur}}
>
  <div>Modal Content</div>
</GlassModal>`}
      renderPreview={(values) => (
        <div className="flex items-center justify-center p-6">
          <button
            onClick={() => setIsOpen(true)}
            className="rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white"
          >
            打开模态框
          </button>
          <GlassModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            blur={values.blur as number}
          >
            <div className="text-center">
              <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">玻璃态模态框</h3>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">这是一个带有毛玻璃效果的模态框</p>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-4 rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white"
              >
                关闭
              </button>
            </div>
          </GlassModal>
        </div>
      )}
      examples={[
        {
          title: "基本用法",
          description: "默认玻璃态模态框",
          code: `const [isOpen, setIsOpen] = useState(false);

<button onClick={() => setIsOpen(true)}>打开</button>

<GlassModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <div>内容</div>
</GlassModal>`,
          render: () => {
            const [open, setOpen] = useState(false);
            return (
              <div className="flex items-center justify-center p-6">
                <button
                  onClick={() => setOpen(true)}
                  className="rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white"
                >
                  打开模态框
                </button>
                <GlassModal isOpen={open} onClose={() => setOpen(false)}>
                  <div className="text-center">
                    <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">示例</h3>
                    <p className="mt-2 text-sm text-[var(--color-text-muted)]">玻璃态效果演示</p>
                    <button
                      onClick={() => setOpen(false)}
                      className="mt-4 rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white"
                    >
                      关闭
                    </button>
                  </div>
                </GlassModal>
              </div>
            );
          },
        },
      ]}
      accessibility="GlassModal 使用 role='dialog' 和 aria-modal='true'，支持 Escape 键关闭。打开时锁定 body 滚动，关闭后恢复。焦点管理由浏览器默认行为处理。对于 prefers-reduced-motion 用户，动画会自动减弱。"
    />
  );
}
