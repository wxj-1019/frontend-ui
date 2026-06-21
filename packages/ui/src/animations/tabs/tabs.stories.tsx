import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./tabs";

const meta: Meta<typeof Tabs> = {
  title: "Animations/Tabs",
  component: Tabs,
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    defaultIndex: { control: { type: "number", min: 0, max: 5, step: 1 } },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    orientation: "horizontal",
    defaultIndex: 0,
    tabs: [
      { label: "概览", content: <p>这是概览面板的内容。</p> },
      { label: "活动", content: <p>这是活动面板的内容。</p> },
      { label: "设置", content: <p>这是设置面板的内容。</p> },
    ],
  },
};
