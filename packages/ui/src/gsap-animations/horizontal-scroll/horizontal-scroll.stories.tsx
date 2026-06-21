import type { Meta, StoryObj } from '@storybook/react';
import { HorizontalScroll } from './horizontal-scroll';

const meta: Meta<typeof HorizontalScroll> = {
  title: 'GSAP Animations/HorizontalScroll',
  component: HorizontalScroll,
  argTypes: {
    sectionWidth: { control: { type: 'range', min: 320, max: 1600, step: 20 } },
    speed: { control: { type: 'range', min: 0.25, max: 3, step: 0.25 } },
  },
};

export default meta;
type Story = StoryObj<typeof HorizontalScroll>;

const panels = [
  { label: '01', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { label: '02', gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
  { label: '03', gradient: 'linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)' },
  { label: '04', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { label: '05', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
];

export const Default: Story = {
  args: {
    sectionWidth: 600,
    speed: 1,
  },
  render: (args) => (
    <div style={{ minHeight: '400vh' }}>
      <HorizontalScroll {...args}>
        {panels.map((p) => (
          <div
            key={p.label}
            style={{
              width: '100%',
              height: '100vh',
              background: p.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 96,
              fontWeight: 800,
            }}
          >
            {p.label}
          </div>
        ))}
      </HorizontalScroll>
    </div>
  ),
};
