import type { Meta, StoryObj } from '@storybook/react';
import { ClickSpark } from './click-spark';

const meta: Meta<typeof ClickSpark> = {
  title: 'Animations/ClickSpark',
  component: ClickSpark,
  argTypes: {
    particleCount: {
      control: { type: 'range', min: 10, max: 100, step: 5 },
    },
    radius: { control: { type: 'range', min: 50, max: 300, step: 10 } },
    duration: { control: { type: 'range', min: 200, max: 1500, step: 100 } },
    colors: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof ClickSpark>;

export const Default: Story = {
  args: {
    children: (
      <div className="flex h-40 w-64 items-center justify-center rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]">
        <span className="font-display text-sm font-medium text-[var(--color-text-primary)]">
          点击任意位置
        </span>
      </div>
    ),
  },
};

export const ManyParticles: Story = {
  args: {
    particleCount: 60,
    radius: 200,
    children: (
      <div className="flex h-40 w-64 items-center justify-center rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]">
        <span className="font-display text-sm font-medium text-[var(--color-text-primary)]">
          60 粒子 · 大范围
        </span>
      </div>
    ),
  },
};

export const CustomColors: Story = {
  args: {
    colors: ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff'],
    children: (
      <div className="flex h-40 w-64 items-center justify-center rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]">
        <span className="font-display text-sm font-medium text-[var(--color-text-primary)]">
          自定义颜色
        </span>
      </div>
    ),
  },
};
