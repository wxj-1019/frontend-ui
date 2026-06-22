import type { Meta, StoryObj } from '@storybook/react';
import { CrosshairCursor } from './crosshair-cursor';

const meta: Meta<typeof CrosshairCursor> = {
  title: 'Animations/CrosshairCursor',
  component: CrosshairCursor,
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'number', min: 20, max: 100, step: 5 } },
    color: { control: 'color' },
    strokeWidth: { control: { type: 'number', min: 0.5, max: 3, step: 0.5 } },
    showCenter: { control: 'boolean' },
    centerSize: { control: { type: 'number', min: 2, max: 10, step: 1 } },
    showCoordinates: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof CrosshairCursor>;

export const Default: Story = {
  args: {
    children: (
      <div className="flex h-[400px] w-[600px] items-center justify-center rounded-lg border border-dashed border-gray-600 bg-gray-900">
        <p className="text-lg text-gray-400">Move your mouse here</p>
      </div>
    ),
    size: 40,
    strokeWidth: 1.5,
    showCenter: true,
    centerSize: 4,
    showCoordinates: false,
  },
};

export const LargeCrosshair: Story = {
  args: {
    children: (
      <div className="flex h-[400px] w-[600px] items-center justify-center rounded-lg border border-dashed border-gray-600 bg-gray-900">
        <p className="text-lg text-gray-400">Large crosshair</p>
      </div>
    ),
    size: 80,
    strokeWidth: 2,
  },
};

export const WithCoordinates: Story = {
  args: {
    children: (
      <div className="flex h-[400px] w-[600px] items-center justify-center rounded-lg border border-dashed border-gray-600 bg-gray-900">
        <p className="text-lg text-gray-400">Coordinates displayed</p>
      </div>
    ),
    showCoordinates: true,
  },
};

export const CustomColor: Story = {
  args: {
    children: (
      <div className="flex h-[400px] w-[600px] items-center justify-center rounded-lg border border-dashed border-gray-600 bg-gray-900">
        <p className="text-lg text-gray-400">Red crosshair</p>
      </div>
    ),
    color: '#ef4444',
  },
};

export const NoCenter: Story = {
  args: {
    children: (
      <div className="flex h-[400px] w-[600px] items-center justify-center rounded-lg border border-dashed border-gray-600 bg-gray-900">
        <p className="text-lg text-gray-400">No center dot</p>
      </div>
    ),
    showCenter: false,
  },
};

export const ThinLines: Story = {
  args: {
    children: (
      <div className="flex h-[400px] w-[600px] items-center justify-center rounded-lg border border-dashed border-gray-600 bg-gray-900">
        <p className="text-lg text-gray-400">Thin lines</p>
      </div>
    ),
    strokeWidth: 0.5,
    size: 30,
  },
};

export const GameStyle: Story = {
  args: {
    children: (
      <div className="flex h-[400px] w-[600px] items-center justify-center rounded-lg border border-dashed border-gray-600 bg-gray-900">
        <p className="text-lg text-gray-400">Game style crosshair</p>
      </div>
    ),
    color: '#22c55e',
    size: 24,
    strokeWidth: 2,
    showCenter: false,
  },
};
