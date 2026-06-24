import type { Meta, StoryObj } from '@storybook/react';
import { HighPerfParticles } from './high-perf-particles';

const meta: Meta<typeof HighPerfParticles> = {
  title: 'Backgrounds/HighPerfParticles',
  component: HighPerfParticles,
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<typeof HighPerfParticles>;

export const Default: Story = {
  args: {
    particleCount: 500,
    className: 'h-64 w-96',
  },
};

export const Interactive: Story = {
  args: {
    particleCount: 1000,
    interactive: true,
    glow: true,
    trail: true,
    className: 'h-64 w-96',
  },
};
