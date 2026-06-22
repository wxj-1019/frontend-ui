import type { Meta, StoryObj } from '@storybook/react';
import { ScrambleText } from './scramble-text';

const meta: Meta<typeof ScrambleText> = {
  title: 'Text Animations/ScrambleText',
  component: ScrambleText,
  tags: ['autodocs'],
  argTypes: {
    delay: { control: { type: 'range', min: 0, max: 2, step: 0.1 } },
    trigger: {
      control: 'select',
      options: ['auto', 'scroll', 'hover'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ScrambleText>;

export const Default: Story = {
  args: {
    text: 'Scramble Effect',
  },
};

export const WithDelay: Story = {
  args: {
    text: 'Delayed Scramble',
    delay: 1,
  },
};

export const HoverTrigger: Story = {
  args: {
    text: 'Hover Me!',
    trigger: 'hover',
  },
};

export const CustomChars: Story = {
  args: {
    text: 'Custom Characters',
    chars: '01',
  },
};

export const CustomStyle: Story = {
  args: {
    text: 'Styled Scramble',
    className: 'text-2xl font-bold text-[var(--color-accent)]',
  },
};
