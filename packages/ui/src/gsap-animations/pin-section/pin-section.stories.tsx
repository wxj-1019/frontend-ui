import type { Meta, StoryObj } from '@storybook/react';
import { PinSection } from './pin-section';

const meta: Meta<typeof PinSection> = {
  title: 'GSAP Animations/PinSection',
  component: PinSection,
  argTypes: {
    pinSpacing: { control: 'boolean' },
    scrub: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof PinSection>;

export const Default: Story = {
  args: {
    pinSpacing: true,
    scrub: true,
  },
  render: (args) => (
    <div style={{ minHeight: '300vh' }}>
      <div style={{ height: '50vh', padding: 24, background: '#0f172a', color: 'white' }}>
        <p>向下滚动触发 PinSection</p>
      </div>
      <PinSection {...args}>
        <div
          style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            fontSize: 48,
            fontWeight: 800,
          }}
        >
          我被固定了
        </div>
      </PinSection>
      <div style={{ height: '50vh', padding: 24, background: '#0f172a', color: 'white' }}>
        <p>PinSection 之后的内容</p>
      </div>
    </div>
  ),
};
