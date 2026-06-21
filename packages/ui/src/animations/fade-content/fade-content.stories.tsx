import type { Meta, StoryObj } from "@storybook/react";
import { FadeContent } from "./fade-content";

const meta: Meta<typeof FadeContent> = {
  title: "Animations/FadeContent",
  component: FadeContent,
  argTypes: {
    delay: { control: { type: "number", min: 0, max: 2, step: 0.1 } },
    duration: { control: { type: "number", min: 0.1, max: 2, step: 0.1 } },
    direction: {
      control: "select",
      options: ["up", "down", "left", "right"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof FadeContent>;

export const Default: Story = {
  args: {
    delay: 0.2,
    duration: 0.5,
    direction: "up",
    children: <div className="h-20 w-20 rounded-xl bg-purple-500" />,
  },
};
