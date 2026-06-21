import type { Meta, StoryObj } from "@storybook/react";
import { MeshGradient } from "./mesh-gradient";

const meta: Meta<typeof MeshGradient> = {
  title: "Backgrounds/MeshGradient",
  component: MeshGradient,
  argTypes: {
    colors: { control: "object" },
    animated: { control: "boolean" },
    duration: { control: { type: "number", min: 1, max: 60, step: 1 } },
  },
};

export default meta;
type Story = StoryObj<typeof MeshGradient>;

export const Default: Story = {
  args: {
    colors: ["#ff006e", "#8338ec", "#3a86ff"],
    animated: true,
    duration: 10,
  },
};
