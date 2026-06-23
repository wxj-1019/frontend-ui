import type { Meta, StoryObj } from '@storybook/react';
import { GlassCard } from './glass-card';

const meta: Meta<typeof GlassCard> = {
  title: 'Components/GlassCard',
  component: GlassCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '玻璃态卡片组件，支持3D倾斜、动态光晕和毛玻璃效果。',
      },
    },
  },
  argTypes: {
    borderRadius: { control: { type: 'range', min: 0, max: 40, step: 1 } },
    glowIntensity: { control: { type: 'range', min: 0, max: 1, step: 0.05 } },
    blur: { control: { type: 'range', min: 0, max: 50, step: 1 } },
    backgroundOpacity: { control: { type: 'range', min: 0, max: 1, step: 0.05 } },
    tilt: { control: 'boolean' },
    tiltDegree: { control: { type: 'range', min: 0, max: 30, step: 1 } },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof GlassCard>;

export const Default: Story = {
  args: {
    className: 'w-80 p-6',
    children: (
      <div className="space-y-3">
        <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">
          玻璃态卡片
        </h3>
        <p className="text-sm text-[var(--color-text-muted)]">
          鼠标悬停查看3D倾斜和光晕效果。支持毛玻璃背景和动态边框发光。
        </p>
      </div>
    ),
  },
};

export const HighGlow: Story = {
  args: {
    className: 'w-80 p-6',
    glowIntensity: 0.6,
    glowColor: '#00F5FF',
    blur: 30,
    children: (
      <div className="space-y-3">
        <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">
          高发光效果
        </h3>
        <p className="text-sm text-[var(--color-text-muted)]">
          glowIntensity: 0.6, blur: 30px
        </p>
      </div>
    ),
  },
};

export const NoTilt: Story = {
  args: {
    className: 'w-80 p-6',
    tilt: false,
    children: (
      <div className="space-y-3">
        <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">
          无3D倾斜
        </h3>
        <p className="text-sm text-[var(--color-text-muted)]">
          tilt: false，仅保留玻璃态效果
        </p>
      </div>
    ),
  },
};
