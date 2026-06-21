import type { Meta, StoryObj } from "@storybook/react";
import { CountUp } from "./count-up";

const meta: Meta<typeof CountUp> = {
  title: "Text Animations/CountUp",
  component: CountUp,
  argTypes: {
    end: { control: { type: "number", min: 1, max: 99999 } },
    duration: { control: { type: "number", min: 0.5, max: 5, step: 0.5 } },
    decimals: { control: { type: "number", min: 0, max: 4 } },
    separator: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof CountUp>;

export const Default: Story = {
  args: {
    end: 9999,
    duration: 2,
    prefix: "$",
    separator: true,
  },
};

export const WithoutSeparator: Story = {
  args: {
    end: 123456789,
    duration: 2,
    separator: false,
  },
};

export const WithDecimals: Story = {
  args: {
    end: 99.99,
    duration: 2,
    decimals: 2,
    suffix: "%",
  },
};
