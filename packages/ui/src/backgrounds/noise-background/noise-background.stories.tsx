import type { Meta, StoryObj } from "@storybook/react";
import { NoiseBackground } from "./noise-background";

const meta: Meta<typeof NoiseBackground> = {
  title: "Backgrounds/NoiseBackground",
  component: NoiseBackground,
  argTypes: {
    opacity: { control: { type: "number", min: 0, max: 1, step: 0.01 } },
    frequency: { control: { type: "number", min: 0, max: 1, step: 0.05 } },
    color: { control: "color" },
    animated: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof NoiseBackground>;

export const Default: Story = {
  args: {
    opacity: 0.05,
    frequency: 0.8,
    color: "#ffffff",
    animated: true,
  },
};
