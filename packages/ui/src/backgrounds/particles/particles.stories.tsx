import type { Meta, StoryObj } from "@storybook/react";
import { Particles } from "./particles";

const meta: Meta<typeof Particles> = {
  title: "Backgrounds/Particles",
  component: Particles,
  argTypes: {
    count: { control: { type: "number", min: 10, max: 200, step: 10 } },
    color: { control: "color" },
  },
};

export default meta;
type Story = StoryObj<typeof Particles>;

export const Default: Story = {
  args: {
    count: 50,
    color: "#ffffff",
  },
};
