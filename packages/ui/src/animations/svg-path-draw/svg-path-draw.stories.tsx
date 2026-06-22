import type { Meta, StoryObj } from '@storybook/react';
import { SvgPathDraw } from './svg-path-draw';

const meta: Meta<typeof SvgPathDraw> = {
  title: 'Animations/SvgPathDraw',
  component: SvgPathDraw,
  tags: ['autodocs'],
  argTypes: {
    strokeColor: { control: 'color' },
    strokeWidth: { control: { type: 'number', min: 1, max: 10 } },
    duration: { control: { type: 'number', min: 500, max: 10000, step: 500 } },
    loop: { control: 'boolean' },
    reverse: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof SvgPathDraw>;

const starPath = "M100 10 L120 70 L180 70 L130 110 L150 170 L100 140 L50 170 L70 110 L20 70 L80 70 Z";
const circlePath = "M100 20 A80 80 0 1 0 100 180 A80 80 0 1 0 100 20";
const wavePath = "M10 100 Q50 20 90 100 T170 100";

export const Star: Story = {
  args: { path: starPath, strokeColor: "#FFD700", duration: 3000, viewBoxWidth: 200, viewBoxHeight: 200 },
};

export const Circle: Story = {
  args: { path: circlePath, strokeColor: "#00F5FF", duration: 2000, viewBoxWidth: 200, viewBoxHeight: 200 },
};

export const Wave: Story = {
  args: { path: wavePath, strokeColor: "#FF6B6B", duration: 1500, strokeWidth: 3, viewBoxWidth: 180, viewBoxHeight: 120 },
};

export const Loop: Story = {
  args: { path: circlePath, strokeColor: "#88CE02", duration: 3000, loop: true, viewBoxWidth: 200, viewBoxHeight: 200 },
};

export const Reverse: Story = {
  args: { path: starPath, strokeColor: "#8B5CF6", duration: 2500, reverse: true, viewBoxWidth: 200, viewBoxHeight: 200 },
};
