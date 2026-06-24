import type { Meta, StoryObj } from '@storybook/react';
import { FluidCursor } from './fluid-cursor';

const meta: Meta<typeof FluidCursor> = {
  title: 'Animations/FluidCursor',
  component: FluidCursor,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '液态金属流体光标跟随效果，鼠标移动时产生粒子拖尾和发光轨迹。',
      },
    },
  },
  argTypes: {
    color: { control: 'color' },
    particleCount: { control: { type: 'range', min: 10, max: 100, step: 5 } },
    viscosity: { control: { type: 'range', min: 0.5, max: 0.99, step: 0.01 } },
    glowIntensity: { control: { type: 'range', min: 0.1, max: 1, step: 0.1 } },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof FluidCursor>;

export const Default: Story = {
  args: {
    color: '#00F5FF',
    particleCount: 40,
    viscosity: 0.92,
    glowIntensity: 0.6,
  },
};

export const Gold: Story = {
  args: {
    color: '#FFD700',
    particleCount: 50,
    viscosity: 0.88,
    glowIntensity: 0.8,
  },
};

export const Purple: Story = {
  args: {
    color: '#A855F7',
    particleCount: 30,
    viscosity: 0.95,
    glowIntensity: 0.7,
  },
};
