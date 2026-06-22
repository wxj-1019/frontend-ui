import type { Meta, StoryObj } from '@storybook/react';
import { MorphingSVG } from './morphing-svg';

const meta: Meta<typeof MorphingSVG> = {
  title: 'Animations/MorphingSVG',
  component: MorphingSVG,
  tags: ['autodocs'],
  argTypes: {
    strokeColor: { control: 'color' },
    fillColor: { control: 'color' },
    duration: { control: { type: 'number', min: 200, max: 5000, step: 100 } },
    autoPlayInterval: { control: { type: 'number', min: 500, max: 10000, step: 500 } },
  },
};

export default meta;
type Story = StoryObj<typeof MorphingSVG>;

const shapes = [
  "M100 20 A80 80 0 1 0 100 180 A80 80 0 1 0 100 20",
  "M100 10 L120 70 L180 70 L130 110 L150 170 L100 140 L50 170 L70 110 L20 70 L80 70 Z",
  "M100 40 L160 100 L100 160 L40 100 Z",
  "M50 100 Q50 50 100 50 Q150 50 150 100 Q150 150 100 150 Q50 150 50 100 Z",
];

export const Default: Story = {
  args: {
    paths: shapes,
    strokeColor: "#00F5FF",
    autoPlayInterval: 2500,
    viewBoxWidth: 200,
    viewBoxHeight: 200,
  },
};

export const ColorMorph: Story = {
  args: {
    paths: shapes.slice(0, 2),
    strokeColor: "#FF6B6B",
    fillColor: "#FF6B6B20",
    autoPlayInterval: 2000,
    viewBoxWidth: 200,
    viewBoxHeight: 200,
  },
};

export const SlowMorph: Story = {
  args: {
    paths: shapes,
    strokeColor: "#8B5CF6",
    duration: 2000,
    autoPlayInterval: 4000,
    viewBoxWidth: 200,
    viewBoxHeight: 200,
  },
};

export const TwoShapes: Story = {
  args: {
    paths: shapes.slice(0, 2),
    strokeColor: "#88CE02",
    autoPlayInterval: 3000,
    viewBoxWidth: 200,
    viewBoxHeight: 200,
  },
};
