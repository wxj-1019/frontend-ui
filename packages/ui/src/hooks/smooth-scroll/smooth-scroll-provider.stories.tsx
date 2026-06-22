import type { Meta, StoryObj } from '@storybook/react';
import { SmoothScrollProvider } from './smooth-scroll-provider';

const meta: Meta<typeof SmoothScrollProvider> = {
  title: 'Hooks/SmoothScrollProvider',
  component: SmoothScrollProvider,
  tags: ['autodocs'],
  argTypes: {
    options: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof SmoothScrollProvider>;

export const Default: Story = {
  args: {
    options: { lerp: 0.1, smoothWheel: true },
    children: (
      <div className="space-y-8 p-8">
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            className="rounded-lg bg-blue-500/10 p-6 text-blue-300"
          >
            Section {i + 1}
          </div>
        ))}
      </div>
    ),
  },
};

export const FastScroll: Story = {
  args: {
    options: { lerp: 0.05, duration: 0.8, smoothWheel: true },
    children: (
      <div className="space-y-4 p-8">
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className="rounded-lg bg-purple-500/10 p-4 text-purple-300"
          >
            Fast Section {i + 1}
          </div>
        ))}
      </div>
    ),
  },
};
