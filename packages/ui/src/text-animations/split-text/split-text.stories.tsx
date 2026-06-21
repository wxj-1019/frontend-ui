import type { Meta, StoryObj } from "@storybook/react";
import { SplitText } from "./split-text";

const meta: Meta<typeof SplitText> = {
  title: "Text Animations/SplitText",
  component: SplitText,
  argTypes: {
    text: { control: "text" },
    delay: { control: { type: "number", min: 0, max: 2, step: 0.1 } },
    duration: { control: { type: "number", min: 0.1, max: 2, step: 0.1 } },
    stagger: { control: { type: "number", min: 0.01, max: 0.2, step: 0.01 } },
    splitBy: { control: "select", options: ["chars", "words"] },
  },
};

export default meta;
type Story = StoryObj<typeof SplitText>;

export const Default: Story = {
  args: {
    text: "Split Text Animation",
    delay: 0.2,
    stagger: 0.04,
    splitBy: "chars",
  },
};

export const ByWords: Story = {
  args: {
    text: "Word by Word Reveal",
    delay: 0.1,
    stagger: 0.15,
    splitBy: "words",
  },
};
