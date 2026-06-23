import type { Meta, StoryObj } from '@storybook/react';
import { HoverScale } from './hover-scale';

const meta: Meta<typeof HoverScale> = {
  title: 'Animations/HoverScale',
  component: HoverScale,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '悬停缩放容器，鼠标悬停时平滑缩放并可选阴影效果。',
      },
    },
  },
  argTypes: {
    scale: { control: { type: 'range', min: 1, max: 1.5, step: 0.05 } },
    duration: { control: { type: 'range', min: 0.05, max: 1, step: 0.05 } },
    shadow: { control: 'boolean' },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof HoverScale>;

export const Default: Story = {
  args: {
    scale: 1.05,
    duration: 0.2,
    shadow: true,
    children: (
      <div className="rounded-xl bg-[var(--color-bg-surface)] p-8 text-center">
        <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">
          Hover Me
        </h3>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          悬停查看缩放效果
        </p>
      </div>
    ),
  },
};

export const LargeScale: Story = {
  args: {
    scale: 1.2,
    duration: 0.4,
    shadow: true,
    children: (
      <div className="rounded-xl bg-gradient-to-br from-[var(--color-accent)]/20 to-purple-500/20 p-8 text-center">
        <span className="text-4xl">🚀</span>
        <h3 className="mt-2 font-display font-semibold text-[var(--color-text-primary)]">
          大缩放
        </h3>
      </div>
    ),
  },
};

export const NoShadow: Story = {
  args: {
    scale: 1.05,
    duration: 0.2,
    shadow: false,
    children: (
      <div className="rounded-xl border border-[var(--color-border-default)] p-6 text-center">
        <h3 className="font-display text-sm font-semibold text-[var(--color-text-primary)]">
          无阴影
        </h3>
      </div>
    ),
  },
};

export const SlowTransition: Story = {
  args: {
    scale: 1.1,
    duration: 0.8,
    shadow: true,
    children: (
      <div className="rounded-xl bg-[var(--color-bg-elevated)] p-8 text-center">
        <h3 className="font-display font-semibold text-[var(--color-text-primary)]">
          慢速过渡
        </h3>
        <p className="mt-2 text-xs text-[var(--color-text-muted)]">
          duration: 0.8s
        </p>
      </div>
    ),
  },
};
