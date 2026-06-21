import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from './carousel';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  argTypes: {
    autoPlay: { control: 'boolean' },
    interval: { control: { type: 'range', min: 1000, max: 8000, step: 500 } },
    loop: { control: 'boolean' },
    showArrows: { control: 'boolean' },
    showDots: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const slides = [
  {
    label: 'First',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    label: 'Second',
    gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  },
  {
    label: 'Third',
    gradient: 'linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)',
  },
  {
    label: 'Fourth',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
];

export const Default: Story = {
  args: {
    autoPlay: false,
    interval: 3000,
    loop: true,
    showArrows: true,
    showDots: true,
  },
  render: (args) => (
    <Carousel {...args} className="h-[280px] w-[480px]">
      {slides.map((s) => (
        <div
          key={s.label}
          style={{
            width: '100%',
            height: '100%',
            background: s.gradient,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          {s.label}
        </div>
      ))}
    </Carousel>
  ),
};

export const AutoPlay: Story = {
  args: {
    autoPlay: true,
    interval: 2000,
    loop: true,
    showArrows: false,
    showDots: true,
  },
  render: (args) => (
    <Carousel {...args} className="h-[280px] w-[480px]">
      {slides.map((s) => (
        <div
          key={s.label}
          style={{
            width: '100%',
            height: '100%',
            background: s.gradient,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          {s.label}
        </div>
      ))}
    </Carousel>
  ),
};
