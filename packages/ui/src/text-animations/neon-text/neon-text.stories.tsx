import type { Meta, StoryObj } from '@storybook/react';
import { NeonText } from './neon-text';

const meta: Meta<typeof NeonText> = {
  title: 'Text Animations/NeonText',
  component: NeonText,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '霓虹发光文字效果，带有 CSS 闪烁动画。支持自定义颜色和开关闪烁。',
      },
    },
  },
  argTypes: {
    text: { control: 'text' },
    color: { control: 'color' },
    flicker: { control: 'boolean' },
    as: {
      control: 'select',
      options: ['span', 'div', 'h1', 'h2', 'h3', 'p'],
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof NeonText>;

export const Default: Story = {
  args: {
    text: 'NEON GLOW',
    className: 'text-4xl',
  },
};

export const NoFlicker: Story = {
  args: {
    text: 'Static Neon',
    flicker: false,
    className: 'text-3xl',
  },
};

export const MagentaColor: Story = {
  args: {
    text: 'MAGENTA GLOW',
    color: '#FF006E',
    className: 'text-4xl',
  },
};

export const AsHeading: Story = {
  args: {
    text: 'Neon Heading',
    as: 'h1',
    className: 'text-5xl',
  },
};
