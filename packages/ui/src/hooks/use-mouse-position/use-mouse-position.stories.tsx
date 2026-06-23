import type { Meta, StoryObj } from '@storybook/react';
import { useMousePosition } from './index';

// 包装组件用于 Storybook 展示
function MousePositionDemo() {
  const { x, y } = useMousePosition();
  return (
    <div className="w-80 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-6">
      <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">
        useMousePosition
      </h3>
      <p className="mt-2 text-sm text-[var(--color-text-muted)]">
        移动鼠标查看实时坐标
      </p>
      <div className="mt-4 space-y-2 font-mono text-sm">
        <div className="flex justify-between rounded-lg bg-[var(--color-bg-primary)] px-4 py-2">
          <span className="text-[var(--color-text-muted)]">X</span>
          <span className="text-[var(--color-accent)]">{x}</span>
        </div>
        <div className="flex justify-between rounded-lg bg-[var(--color-bg-primary)] px-4 py-2">
          <span className="text-[var(--color-text-muted)]">Y</span>
          <span className="text-[var(--color-accent)]">{y}</span>
        </div>
      </div>
    </div>
  );
}

const meta: Meta<typeof MousePositionDemo> = {
  title: 'Hooks/useMousePosition',
  component: MousePositionDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '鼠标位置追踪 Hook，使用 requestAnimationFrame 节流，性能友好。',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof MousePositionDemo>;

export const Default: Story = {};
