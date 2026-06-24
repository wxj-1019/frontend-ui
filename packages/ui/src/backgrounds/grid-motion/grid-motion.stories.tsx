import type { Meta, StoryObj } from '@storybook/react';
import { GridMotion } from './grid-motion';

const meta: Meta<typeof GridMotion> = {
  title: 'Backgrounds/GridMotion',
  component: GridMotion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '网格运动背景，方块按行列交错呼吸闪烁。',
      },
    },
  },
  argTypes: {
    columns: { control: { type: 'range', min: 2, max: 10, step: 1 } },
    rows: { control: { type: 'range', min: 2, max: 10, step: 1 } },
    size: { control: { type: 'range', min: 10, max: 80, step: 5 } },
    speed: { control: { type: 'range', min: 0.5, max: 5, step: 0.5 } },
    color: { control: 'color' },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof GridMotion>;

export const Default: Story = {
  args: {
    columns: 5,
    rows: 4,
    size: 40,
  },
};

export const SmallGrid: Story = {
  args: {
    columns: 8,
    rows: 6,
    size: 24,
    speed: 1.5,
  },
};

export const LargeGrid: Story = {
  args: {
    columns: 3,
    rows: 3,
    size: 80,
    speed: 3,
  },
};

export const MagentaColor: Story = {
  args: {
    columns: 6,
    rows: 5,
    size: 36,
    color: '#FF006E',
  },
};
