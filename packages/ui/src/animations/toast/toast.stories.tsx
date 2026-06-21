import type { Meta, StoryObj } from "@storybook/react";
import { useState, useCallback } from "react";
import { Toast } from "./toast";

function ToastDemo({
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
        className="rounded-md bg-violet-500 px-4 py-2 text-white"
      >
        显示 Toast
      </button>
      <Toast open={open} onClose={close} position={position} duration={duration}>
        操作已成功完成！
      </Toast>
    </>
  );
}

const meta: Meta<typeof Toast> = {
  title: "Animations/Toast",
  component: Toast,
  argTypes: {
    position: {
      control: "select",
      options: [
        "top-right",
        "top-left",
        "bottom-right",
        "bottom-left",
        "top-center",
        "bottom-center",
      ],
    },
    duration: { control: { type: "number", min: 0, max: 10000, step: 500 } },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  render: (args) => (
    <ToastDemo
      position={args.position ?? "top-right"}
      duration={args.duration ?? 3000}
    />
  ),
  args: {
    position: "top-right",
    duration: 3000,
  },
};
