import type { Meta, StoryObj } from "@storybook/react";
import { BlurText } from "./blur-text";

const meta: Meta<typeof BlurText> = {
  title: "Text Animations/BlurText",
  component: BlurText,
  argTypes: {
    text: { control: "text" },
    delay: { control: { type: "number", min: 0, max: 2, step: 0.1 } },
    duration: { control: { type: "number", min: 0.1, max: 2, step: 0.1 } },
  },
};

export default meta;
type Story = StoryObj<typeof BlurText>;

export const Default: Story = {
  args: {
    text: "Hello, World!",
    delay: 0.2,
    duration: 0.5,
  },
};
