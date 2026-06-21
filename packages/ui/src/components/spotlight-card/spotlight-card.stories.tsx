import type { Meta, StoryObj } from "@storybook/react";
import { SpotlightCard } from "./spotlight-card";

const meta: Meta<typeof SpotlightCard> = {
  title: "Components/SpotlightCard",
  component: SpotlightCard,
  argTypes: {
    spotlightColor: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof SpotlightCard>;

export const Default: Story = {
  args: {
    spotlightColor: "rgba(255, 255, 255, 0.1)",
    children: (
      <div className="p-6">
        <h3 className="text-lg font-semibold">Card Title</h3>
        <p className="mt-2 text-sm text-white/60">Hover to see spotlight effect</p>
      </div>
    ),
  },
};
