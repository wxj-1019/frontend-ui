import type { Meta, StoryObj } from "@storybook/react";
import { useState, useCallback } from "react";
import { Modal } from "./modal";

function ModalDemo({
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
        className="rounded-md bg-cyan-500 px-4 py-2 text-white"
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
        <h2 className="text-xl font-semibold">Modal Title</h2>
        <p className="mt-2 text-sm text-slate-600">
          这是一个可关闭的模态框示例内容。
        </p>
      </Modal>
    </>
  );
}

const meta: Meta<typeof Modal> = {
  title: "Animations/Modal",
  component: Modal,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
    closeOnOverlayClick: { control: "boolean" },
    closeOnEsc: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: (args) => (
    <ModalDemo
      size={args.size ?? "md"}
      closeOnOverlayClick={args.closeOnOverlayClick ?? true}
      closeOnEsc={args.closeOnEsc ?? true}
    />
  ),
  args: {
    size: "md",
    closeOnOverlayClick: true,
    closeOnEsc: true,
  },
};
