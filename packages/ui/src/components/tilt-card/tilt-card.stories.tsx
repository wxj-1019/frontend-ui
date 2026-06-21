import type { Meta, StoryObj } from '@storybook/react';
import { TiltCard } from './tilt-card';

const meta: Meta<typeof TiltCard> = {
  title: 'Components/TiltCard',
  component: TiltCard,
  argTypes: {
    tiltDegree: { control: { type: 'range', min: 0, max: 45, step: 1 } },
    scale: { control: { type: 'range', min: 1, max: 1.2, step: 0.01 } },
    glare: { control: 'boolean' },
    glareOpacity: { control: { type: 'range', min: 0, max: 1, step: 0.05 } },
    speed: { control: { type: 'range', min: 0.1, max: 1, step: 0.1 } },
  },
};

export default meta;
type Story = StoryObj<typeof TiltCard>;

export const Default: Story = {
  args: {
    className: 'w-64',
    children: (
      <div className="p-6">
        <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">
          Tilt Card
        </h3>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          鼠标悬停查看 3D 倾斜效果
        </p>
      </div>
    ),
  },
};

export const WithImage: Story = {
  args: {
    className: 'w-80',
    tiltDegree: 15,
    scale: 1.05,
    children: (
      <div className="overflow-hidden rounded-xl">
        <div className="flex h-48 items-center justify-center bg-gradient-to-br from-[var(--color-accent)]/20 to-purple-500/20">
          <span className="text-4xl">🖼️</span>
        </div>
        <div className="p-4">
          <h3 className="font-display font-semibold text-[var(--color-text-primary)]">
            图片卡片
          </h3>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            更大倾斜角度
          </p>
        </div>
      </div>
    ),
  },
};

export const NoGlare: Story = {
  args: {
    className: 'w-64',
    glare: false,
    children: (
      <div className="p-6">
        <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">
          无炫光
        </h3>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          Glare 已禁用
        </p>
      </div>
    ),
  },
};
