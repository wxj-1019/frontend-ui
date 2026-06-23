import type { Meta, StoryObj } from '@storybook/react';
import { ThreeScene } from './three-scene';

const meta: Meta<typeof ThreeScene> = {
  title: 'Backgrounds/ThreeScene',
  component: ThreeScene,
  parameters: { layout: 'centered' },
};

export default meta;

type Story = StoryObj<typeof ThreeScene>;

export const Default: Story = {
  args: {
    className: 'h-64 w-96',
    layers: [
      { depth: 0.2, content: <div className="absolute inset-0 bg-blue-500/10 rounded-lg" />, opacity: 0.3 },
      { depth: 0.5, content: <div className="absolute inset-0 bg-purple-500/10 rounded-lg" />, opacity: 0.5 },
    ],
    children: <div className="flex h-64 items-center justify-center"><span className="text-lg font-bold">3D Scene</span></div>,
  },
};
