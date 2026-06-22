import type { Meta, StoryObj } from '@storybook/react';
import { BlobCursor } from './blob-cursor';

const meta: Meta<typeof BlobCursor> = {
  title: 'Animations/BlobCursor',
  component: BlobCursor,
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'number', min: 20, max: 200, step: 10 } },
    color: { control: 'color' },
    opacity: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
    blur: { control: { type: 'number', min: 0, max: 100, step: 5 } },
    stiffness: { control: { type: 'range', min: 0.01, max: 0.5, step: 0.01 } },
    hideCursor: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof BlobCursor>;

export const Default: Story = {
  args: {
    children: (
      <div className="flex h-[400px] w-[600px] items-center justify-center rounded-lg border border-dashed border-gray-600 bg-gray-900">
        <p className="text-lg text-gray-400">Move your mouse here</p>
      </div>
    ),
    size: 80,
    opacity: 0.5,
    blur: 40,
    stiffness: 0.15,
    hideCursor: false,
  },
};

export const LargeBlob: Story = {
  args: {
    children: (
      <div className="flex h-[400px] w-[600px] items-center justify-center rounded-lg border border-dashed border-gray-600 bg-gray-900">
        <p className="text-lg text-gray-400">Large blob effect</p>
      </div>
    ),
    size: 150,
    opacity: 0.3,
    blur: 60,
  },
};

export const CustomColor: Story = {
  args: {
    children: (
      <div className="flex h-[400px] w-[600px] items-center justify-center rounded-lg border border-dashed border-gray-600 bg-gray-900">
        <p className="text-lg text-gray-400">Pink blob</p>
      </div>
    ),
    color: '#f472b6',
    opacity: 0.4,
  },
};

export const HiddenCursor: Story = {
  args: {
    children: (
      <div className="flex h-[400px] w-[600px] items-center justify-center rounded-lg border border-dashed border-gray-600 bg-gray-900">
        <p className="text-lg text-gray-400">Cursor is hidden</p>
      </div>
    ),
    hideCursor: true,
  },
};

export const FastFollow: Story = {
  args: {
    children: (
      <div className="flex h-[400px] w-[600px] items-center justify-center rounded-lg border border-dashed border-gray-600 bg-gray-900">
        <p className="text-lg text-gray-400">Fast spring follow</p>
      </div>
    ),
    stiffness: 0.4,
    size: 60,
  },
};

export const WithCards: Story = {
  args: {
    children: (
      <div className="grid grid-cols-3 gap-4 p-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-32 rounded-lg bg-gray-800 p-4">
            <p className="text-gray-300">Card {i}</p>
          </div>
        ))}
      </div>
    ),
    size: 100,
    blur: 50,
  },
};
