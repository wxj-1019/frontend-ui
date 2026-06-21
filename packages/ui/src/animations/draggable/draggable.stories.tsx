import type { Meta, StoryObj } from "@storybook/react";
import { Draggable } from "./draggable";

const meta: Meta<typeof Draggable> = {
  title: "Animations/Draggable",
  component: Draggable,
  argTypes: {
    edgeResistance: { control: { type: "number", min: 0, max: 1, step: 0.05 } },
  },
};

export default meta;
type Story = StoryObj<typeof Draggable>;

export const Default: Story = {
  args: {
    edgeResistance: 0.65,
    bounds: { top: 0, left: 0, right: 0, bottom: 0 },
    children: (
      <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 text-white shadow-lg">
        Drag me
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div className="relative h-64 w-full rounded-xl border border-dashed border-slate-500 p-4">
        <Story />
      </div>
    ),
  ],
};
