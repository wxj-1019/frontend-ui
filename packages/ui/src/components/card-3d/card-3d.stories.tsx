import type { Meta, StoryObj } from '@storybook/react';
import { Card3D } from './card-3d';

const meta: Meta<typeof Card3D> = {
  title: 'Components/Card3D',
  component: Card3D,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '3D 透视卡片，鼠标移动时产生 3D 旋转和动态光晕效果。',
      },
    },
  },
  argTypes: {
    perspective: { control: { type: 'range', min: 200, max: 2000, step: 100 } },
    maxRotation: { control: { type: 'range', min: 5, max: 45, step: 1 } },
    glowIntensity: { control: { type: 'range', min: 0, max: 1, step: 0.05 } },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Card3D>;

export const Default: Story = {
  args: {
    className: 'w-72',
    children: (
      <div className="p-6">
        <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">
          3D 卡片
        </h3>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          移动鼠标体验 3D 透视效果
        </p>
      </div>
    ),
  },
};

export const HighRotation: Story = {
  args: {
    className: 'w-72',
    maxRotation: 30,
    glowIntensity: 0.5,
    children: (
      <div className="p-6">
        <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">
          高旋转角度
        </h3>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          maxRotation: 30°
        </p>
      </div>
    ),
  },
};

export const LowPerspective: Story = {
  args: {
    className: 'w-72',
    perspective: 400,
    glowIntensity: 0.6,
    children: (
      <div className="p-6">
        <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">
          低透视
        </h3>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          perspective: 400px
        </p>
      </div>
    ),
  },
};

export const ImageCard: Story = {
  args: {
    className: 'w-80',
    maxRotation: 20,
    glowIntensity: 0.4,
    children: (
      <div className="overflow-hidden rounded-xl">
        <div className="flex h-48 items-center justify-center bg-gradient-to-br from-[var(--color-accent)]/20 to-purple-500/20">
          <span className="text-5xl">🎨</span>
        </div>
        <div className="p-5">
          <h3 className="font-display font-semibold text-[var(--color-text-primary)]">
            图片卡片
          </h3>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            带图片的 3D 卡片效果
          </p>
        </div>
      </div>
    ),
  },
};
