import type { Meta, StoryObj } from "@storybook/react";
import { Magnet } from "./magnet";

const meta: Meta<typeof Magnet> = {
  title: "Animations/Magnet",
  component: Magnet,
  argTypes: {
    strength: { control: { type: "number", min: 0, max: 1, step: 0.1 } },
  },
};

export default meta;
type Story = StoryObj<typeof Magnet>;

export const Default: Story = {
  args: {
    strength: 0.3,
    children: <div className="h-20 w-20 rounded-xl bg-blue-500" />,
  },
};
