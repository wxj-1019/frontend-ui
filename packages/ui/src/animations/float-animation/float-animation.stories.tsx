import type { Meta, StoryObj } from '@storybook/react';
import { FloatAnimation } from './float-animation';

const meta: Meta<typeof FloatAnimation> = {
  title: 'Animations/FloatAnimation',
  component: FloatAnimation,
  tags: ['autodocs'],
  argTypes: {
    amplitude: { control: { type: 'number', min: 2, max: 50, step: 2 } },
    duration: { control: { type: 'number', min: 0.5, max: 10, step: 0.5 } },
    autoPlay: { control: 'boolean' },
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal', 'both'],
    },
    pauseOnHover: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof FloatAnimation>;

export const Default: Story = {
  args: {
    children: (
      <div className="rounded-lg bg-blue-500/20 px-6 py-4 text-blue-300">
        Floating Element
      </div>
    ),
    amplitude: 10,
    duration: 3,
    autoPlay: true,
    direction: 'vertical',
    pauseOnHover: false,
  },
};

export const Horizontal: Story = {
  args: {
    children: (
      <div className="rounded-lg bg-purple-500/20 px-6 py-4 text-purple-300">
        Horizontal Float
      </div>
    ),
    direction: 'horizontal',
    amplitude: 15,
  },
};

export const BothDirections: Story = {
  args: {
    children: (
      <div className="rounded-lg bg-green-500/20 px-6 py-4 text-green-300">
        Circular Float
      </div>
    ),
    direction: 'both',
    amplitude: 8,
    duration: 4,
  },
};

export const SlowFloat: Story = {
  args: {
    children: (
      <div className="rounded-lg bg-amber-500/20 px-6 py-4 text-amber-300">
        Slow Float
      </div>
    ),
    duration: 6,
    amplitude: 15,
  },
};

export const PauseOnHover: Story = {
  args: {
    children: (
      <div className="rounded-lg bg-pink-500/20 px-6 py-4 text-pink-300">
        Hover to pause
      </div>
    ),
    pauseOnHover: true,
  },
};

export const LargeAmplitude: Story = {
  args: {
    children: (
      <div className="rounded-lg bg-red-500/20 px-6 py-4 text-red-300">
        Big Float
      </div>
    ),
    amplitude: 40,
    duration: 2,
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/20 text-3xl">
        🎈
      </div>
    ),
    amplitude: 12,
    duration: 2.5,
    direction: 'both',
  },
};
