import type { Meta, StoryObj } from '@storybook/react';
import { ScrollProgress } from './scroll-progress';

const meta: Meta<typeof ScrollProgress> = {
  title: 'GSAP Animations/ScrollProgress',
  component: ScrollProgress,
  argTypes: {
    color: { control: 'color' },
    height: { control: { type: 'range', min: 1, max: 12, step: 1 } },
    position: {
      control: 'select',
      options: ['top', 'bottom'],
    },
    smooth: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof ScrollProgress>;

export const Default: Story = {
  args: {
    color: '#00f5ff',
    height: 3,
    position: 'top',
    smooth: true,
  },
  render: (args) => (
    <div style={{ minHeight: '200vh' }}>
      <ScrollProgress {...args} />
      <div
        style={{
          padding: '40vh 24px',
          textAlign: 'center',
          color: 'white',
          background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
          minHeight: '100vh',
        }}
      >
        <h2 style={{ fontSize: 32, fontWeight: 700 }}>向下滚动查看进度条</h2>
        <p style={{ marginTop: 16, opacity: 0.7 }}>
          顶部蓝青色条会随滚动同步增长
        </p>
      </div>
      <div style={{ height: '100vh', padding: 24 }}>
        <p>继续滚动...</p>
      </div>
    </div>
  ),
};

export const BottomBar: Story = {
  args: {
    color: '#ff6a00',
    height: 6,
    position: 'bottom',
    smooth: false,
  },
  render: (args) => (
    <div style={{ minHeight: '200vh' }}>
      <ScrollProgress {...args} />
      <div style={{ padding: '40vh 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 28, fontWeight: 700 }}>底部进度条</h2>
        <p style={{ marginTop: 12, opacity: 0.7 }}>无平滑过渡，实时跟随滚动</p>
      </div>
      <div style={{ height: '100vh' }} />
    </div>
  ),
};
