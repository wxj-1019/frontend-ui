import type { Meta, StoryObj } from "@storybook/react";
import { FlipCard } from "./flip-card";

const meta: Meta<typeof FlipCard> = {
  title: "Animations/FlipCard",
  component: FlipCard,
  argTypes: {
    trigger: { control: "select", options: ["hover", "click"] },
    flipDirection: { control: "select", options: ["horizontal", "vertical"] },
  },
};

export default meta;
type Story = StoryObj<typeof FlipCard>;

export const Default: Story = {
  args: {
    trigger: "hover",
    flipDirection: "horizontal",
    frontContent: (
      <div className="flex h-40 w-64 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg">
        Front
      </div>
    ),
    backContent: (
      <div className="flex h-40 w-64 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white shadow-lg">
        Back
      </div>
    ),
  },
};
