import type { Meta, StoryObj } from "@storybook/react";
import { Aurora } from "./aurora";

const meta: Meta<typeof Aurora> = {
  title: "Backgrounds/Aurora",
  component: Aurora,
  argTypes: {
    colors: { control: "object" },
  },
};

export default meta;
type Story = StoryObj<typeof Aurora>;

export const Default: Story = {
  args: {
    colors: ["#3b82f6", "#8b5cf6", "#ec4899"],
  },
};
