import type { Meta, StoryObj } from '@storybook/react';
import { ScrollParallax } from './scroll-parallax';

const meta: Meta<typeof ScrollParallax> = {
  title: 'Animations/ScrollParallax',
  component: ScrollParallax,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '滚动驱动的多层视差动画组件，支持位移、缩放、旋转和模糊。',
      },
    },
  },
  argTypes: {
    speed: { control: { type: 'range', min: -2, max: 2, step: 0.1 } },
    blur: { control: 'boolean' },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ScrollParallax>;

export const Default: Story = {
  args: {
    speed: 0.5,
    className: 'w-64',
    children: (
      <div className="rounded-xl bg-gradient-to-br from-[var(--color-accent)]/20 to-purple-500/20 p-8 text-center">
        <span className="text-4xl">🌊</span>
        <h3 className="mt-2 font-display font-semibold text-[var(--color-text-primary)]">
          视差滚动
        </h3>
      </div>
    ),
  },
};

export const WithScaleAndBlur: Story = {
  args: {
    speed: 0.3,
    scale: [0.8, 1.2],
    blur: true,
    className: 'w-64',
    children: (
      <div className="rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 p-8 text-center">
        <span className="text-4xl">✨</span>
        <h3 className="mt-2 font-display font-semibold text-[var(--color-text-primary)]">
          缩放+模糊
        </h3>
      </div>
    ),
  },
};
