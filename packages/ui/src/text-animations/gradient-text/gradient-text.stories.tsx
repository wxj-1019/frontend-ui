import type { Meta, StoryObj } from "@storybook/react";
import { GradientText } from "./gradient-text";

const meta: Meta<typeof GradientText> = {
  title: "Text Animations/GradientText",
  component: GradientText,
  argTypes: {
    text: { control: "text" },
    from: { control: "text" },
    to: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof GradientText>;

export const Default: Story = {
  args: {
    text: "Gradient Text",
    from: "from-blue-500",
    to: "to-purple-500",
  },
};
