import type { Meta, StoryObj } from '@storybook/react';
import { Typewriter } from './typewriter';

const meta: Meta<typeof Typewriter> = {
  title: 'Text Animations/Typewriter',
  component: Typewriter,
  tags: ['autodocs'],
  argTypes: {
    speed: { control: { type: 'range', min: 10, max: 200, step: 10 } },
    delay: { control: { type: 'range', min: 0, max: 2000, step: 100 } },
    cursor: { control: 'boolean' },
    loop: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Typewriter>;

export const Default: Story = {
  args: {
    text: 'Hello, Frontend UI!',
    speed: 80,
  },
};

export const SlowTyping: Story = {
  args: {
    text: 'This is a slow typewriter effect',
    speed: 150,
  },
};

export const WithDelay: Story = {
  args: {
    text: 'Delayed start...',
    delay: 1000,
    speed: 80,
  },
};

export const Looping: Story = {
  args: {
    text: 'Looping animation',
    speed: 100,
    loop: true,
  },
};

export const NoCursor: Story = {
  args: {
    text: 'No cursor shown',
    speed: 80,
    cursor: false,
  },
};

export const CustomStyle: Story = {
  args: {
    text: 'Styled typewriter',
    speed: 80,
    className: 'text-2xl font-bold text-[var(--color-accent)]',
    cursorClassName: 'bg-[var(--color-accent)]',
  },
};
