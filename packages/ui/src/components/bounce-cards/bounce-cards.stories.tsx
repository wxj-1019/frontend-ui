import type { Meta, StoryObj } from '@storybook/react';
import { BounceCards } from './bounce-cards';

const meta: Meta<typeof BounceCards> = {
  title: 'Components/BounceCards',
  component: BounceCards,
  tags: ['autodocs'],
  argTypes: {
    intensity: { control: { type: 'range', min: 0.5, max: 2, step: 0.1 } },
    duration: { control: { type: 'range', min: 0.3, max: 1, step: 0.1 } },
    gap: { control: { type: 'number', min: 8, max: 32, step: 4 } },
    maxStack: { control: { type: 'number', min: 2, max: 8, step: 1 } },
    loop: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof BounceCards>;

const sampleCards = [
  { id: '1', content: <div className="text-2xl font-bold text-white">Card 1</div> },
  { id: '2', content: <div className="text-2xl font-bold text-white">Card 2</div> },
  { id: '3', content: <div className="text-2xl font-bold text-white">Card 3</div> },
  { id: '4', content: <div className="text-2xl font-bold text-white">Card 4</div> },
  { id: '5', content: <div className="text-2xl font-bold text-white">Card 5</div> },
];

export const Default: Story = {
  args: {
    cards: sampleCards,
    intensity: 1,
    duration: 0.6,
    gap: 16,
    maxStack: 5,
    loop: false,
  },
};

export const WithImages: Story = {
  args: {
    cards: [
      { id: '1', content: <div className="text-white font-bold">Mountain</div>, image: 'https://picsum.photos/300/200?random=1' },
      { id: '2', content: <div className="text-white font-bold">Ocean</div>, image: 'https://picsum.photos/300/200?random=2' },
      { id: '3', content: <div className="text-white font-bold">Forest</div>, image: 'https://picsum.photos/300/200?random=3' },
      { id: '4', content: <div className="text-white font-bold">City</div>, image: 'https://picsum.photos/300/200?random=4' },
    ],
    maxStack: 3,
  },
};

export const TightStack: Story = {
  args: {
    cards: sampleCards,
    gap: 8,
    maxStack: 3,
    intensity: 1.5,
  },
};

export const WideSpread: Story = {
  args: {
    cards: sampleCards,
    gap: 32,
    maxStack: 4,
  },
};

export const Bouncy: Story = {
  args: {
    cards: sampleCards,
    intensity: 2,
    duration: 0.8,
  },
};

export const WithLoop: Story = {
  args: {
    cards: sampleCards,
    loop: true,
    maxStack: 3,
  },
};

export const MinimalStack: Story = {
  args: {
    cards: sampleCards,
    maxStack: 2,
    gap: 12,
  },
};
