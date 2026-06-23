import type { Meta, StoryObj } from '@storybook/react';
import { ShinyText } from './shiny-text';

const meta: Meta<typeof ShinyText> = {
  title: 'Text Animations/ShinyText',
  component: ShinyText,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '扫光/流光效果文字，白色光束从左到右扫过文字。',
      },
    },
  },
  argTypes: {
    text: { control: 'text' },
    speed: { control: { type: 'range', min: 1, max: 10, step: 0.5 } },
    shineColor: { control: 'color' },
    as: {
      control: 'select',
      options: ['span', 'div', 'h1', 'h2', 'h3', 'p'],
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ShinyText>;

export const Default: Story = {
  args: {
    text: 'Shiny Sweep',
    className: 'text-4xl font-bold',
  },
};

export const Fast: Story = {
  args: {
    text: 'Fast Sweep',
    speed: 1,
    className: 'text-4xl font-bold',
  },
};

export const Slow: Story = {
  args: {
    text: 'Slow Sweep',
    speed: 6,
    className: 'text-4xl font-bold',
  },
};

export const Golden: Story = {
  args: {
    text: 'Golden Shine',
    shineColor: 'rgba(255, 215, 0, 0.9)',
    className: 'text-4xl font-bold',
  },
};
