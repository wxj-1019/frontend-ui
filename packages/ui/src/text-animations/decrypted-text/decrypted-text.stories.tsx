import type { Meta, StoryObj } from '@storybook/react';
import { DecryptedText } from './decrypted-text';

const meta: Meta<typeof DecryptedText> = {
  title: 'Text Animations/DecryptedText',
  component: DecryptedText,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    duration: { control: { type: 'number', min: 500, max: 5000, step: 100 } },
    speed: { control: { type: 'number', min: 10, max: 200, step: 10 } },
    autoPlay: { control: 'boolean' },
    characters: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof DecryptedText>;

export const Default: Story = {
  args: {
    text: 'Hello World',
    duration: 1500,
    speed: 30,
    autoPlay: true,
  },
};

export const SlowDecryption: Story = {
  args: {
    text: 'DECRYPTING...',
    duration: 3000,
    speed: 100,
    autoPlay: true,
  },
};

export const FastDecryption: Story = {
  args: {
    text: 'UNLOCKED',
    duration: 500,
    speed: 20,
    autoPlay: true,
  },
};

export const CustomCharacters: Story = {
  args: {
    text: 'SECRET',
    duration: 1500,
    speed: 50,
    characters: '01',
    autoPlay: true,
  },
};

export const LongText: Story = {
  args: {
    text: 'This is a longer text that demonstrates the decryption effect',
    duration: 3000,
    speed: 40,
    autoPlay: true,
  },
};

export const ManualPlay: Story = {
  args: {
    text: 'CLICK TO DECRYPT',
    autoPlay: false,
  },
};

export const WithCustomStyling: Story = {
  args: {
    text: 'CLASSIFIED',
    duration: 2000,
    speed: 40,
    className: 'text-2xl font-bold text-green-500',
    autoPlay: true,
  },
};
