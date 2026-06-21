import type { Meta, StoryObj } from "@storybook/react";
import { GlitchText } from "./glitch-text";

const meta: Meta<typeof GlitchText> = {
  title: "Text Animations/GlitchText",
  component: GlitchText,
  argTypes: {
    text: { control: "text" },
    intensity: {
      control: "select",
      options: ["low", "medium", "high"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof GlitchText>;

export const Default: Story = {
  args: {
    text: "GLITCH EFFECT",
    intensity: "medium",
  },
};

export const HighIntensity: Story = {
  args: {
    text: "CRITICAL ERROR",
    intensity: "high",
  },
};

export const LowIntensity: Story = {
  args: {
    text: "Subtle Glitch",
    intensity: "low",
  },
};
