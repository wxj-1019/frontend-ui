import type { Meta, StoryObj } from "@storybook/react";
import { Starfield } from "./starfield";

const meta: Meta<typeof Starfield> = {
  title: "Backgrounds/Starfield",
  component: Starfield,
  argTypes: {
    count: { control: { type: "number", min: 10, max: 1000, step: 10 } },
    speed: { control: { type: "number", min: 0.1, max: 10, step: 0.1 } },
    depth: { control: "boolean" },
    starColor: { control: "color" },
  },
};

export default meta;
type Story = StoryObj<typeof Starfield>;

export const Default: Story = {
  args: {
    count: 200,
    speed: 0.5,
    depth: true,
    starColor: "#ffffff",
  },
};
