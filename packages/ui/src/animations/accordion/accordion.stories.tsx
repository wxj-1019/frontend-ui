import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./accordion";

const meta: Meta<typeof Accordion> = {
  title: "Animations/Accordion",
  component: Accordion,
  argTypes: {
    allowMultiple: { control: "boolean" },
    duration: { control: { type: "number", min: 0.1, max: 2, step: 0.1 } },
    defaultOpen: { control: { type: "number", min: -1, max: 5, step: 1 } },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    defaultOpen: 0,
    allowMultiple: false,
    duration: 0.3,
    items: [
      { title: "什么是 React？", content: "一个用于构建用户界面的 JavaScript 库。" },
      { title: "什么是 Motion？", content: "React 动画库，提供声明式动画 API。" },
      { title: "什么是 GSAP？", content: "GreenSock 动画平台，高性能 JavaScript 动画引擎。" },
    ],
  },
};
