import type { Meta, StoryObj } from '@storybook/react';
import { MagneticButton } from './magnetic-button';

const meta: Meta<typeof MagneticButton> = {
  title: 'Animations/MagneticButton',
  component: MagneticButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '磁吸按钮组件，鼠标悬停时按钮跟随鼠标产生弹性位移。',
      },
    },
  },
  argTypes: {
    strength: { control: { type: 'range', min: 0, max: 2, step: 0.1 } },
    activeScale: { control: { type: 'range', min: 0.8, max: 1, step: 0.05 } },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof MagneticButton>;

export const Default: Story = {
  args: {
    children: 'Hover Me',
    strength: 0.5,
  },
};

export const StrongMagnet: Story = {
  args: {
    children: 'Strong Magnet',
    strength: 1.5,
  },
};

export const WeakMagnet: Story = {
  args: {
    children: 'Weak Magnet',
    strength: 0.2,
  },
};
