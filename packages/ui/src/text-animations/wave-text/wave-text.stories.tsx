import type { Meta, StoryObj } from '@storybook/react';
import { WaveText } from './wave-text';

const meta: Meta<typeof WaveText> = {
  title: 'Text Animations/WaveText',
  component: WaveText,
  tags: ['autodocs'],
  argTypes: {
    amplitude: { control: { type: 'range', min: 5, max: 50, step: 5 } },
    stagger: { control: { type: 'range', min: 0.01, max: 0.1, step: 0.01 } },
    duration: { control: { type: 'range', min: 0.3, max: 1, step: 0.1 } },
  },
};

export default meta;
type Story = StoryObj<typeof WaveText>;

export const Default: Story = {
  args: {
    text: 'Wave Animation',
  },
};

export const SlowWave: Story = {
  args: {
    text: 'Slow Wave Effect',
    duration: 0.8,
    stagger: 0.08,
  },
};

export const HighAmplitude: Story = {
  args: {
    text: 'Big Waves',
    amplitude: 40,
  },
};

export const CustomStyle: Story = {
  args: {
    text: 'Styled Wave',
    className: 'text-3xl font-bold text-[var(--color-accent)]',
  },
};
