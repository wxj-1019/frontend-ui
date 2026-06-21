import type { Meta, StoryObj } from "@storybook/react";
import { Hyperspeed } from "./hyperspeed";

const meta: Meta<typeof Hyperspeed> = {
  title: "Backgrounds/Hyperspeed",
  component: Hyperspeed,
  argTypes: {
    speed: { control: { type: "number", min: 0.5, max: 20, step: 0.5 } },
    count: { control: { type: "number", min: 50, max: 1000, step: 10 } },
    color: { control: "color" },
    trailLength: { control: { type: "number", min: 0, max: 1, step: 0.05 } },
  },
};

export default meta;
type Story = StoryObj<typeof Hyperspeed>;

export const Default: Story = {
  args: {
    speed: 2,
    count: 300,
    color: "#00ffff",
    trailLength: 0.15,
  },
};
