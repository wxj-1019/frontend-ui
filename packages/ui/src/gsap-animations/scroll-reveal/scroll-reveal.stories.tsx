import type { Meta, StoryObj } from '@storybook/react';
import { ScrollReveal } from './scroll-reveal';

const meta: Meta<typeof ScrollReveal> = {
  title: 'GSAP Animations/ScrollReveal',
  component: ScrollReveal,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['up', 'down', 'left', 'right'],
    },
    duration: { control: { type: 'range', min: 0.2, max: 2, step: 0.1 } },
    delay: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
    distance: { control: { type: 'range', min: 10, max: 200, step: 10 } },
    scrub: {
      control: 'select',
      options: [false, true, 0.5, 1],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ScrollReveal>;

export const Default: Story = {
  args: {
    direction: 'up',
    duration: 1,
    distance: 60,
  },
  render: (args) => (
    <div style={{ minHeight: '200vh', padding: '40px' }}>
      <div style={{ marginTop: '80vh' }}>
        <ScrollReveal {...args}>
          <div
            style={{
              padding: '40px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              color: 'white',
              fontSize: '24px',
              textAlign: 'center',
            }}
          >
            Scroll down to reveal this element
          </div>
        </ScrollReveal>
      </div>
    </div>
  ),
};

export const FromLeft: Story = {
  args: {
    direction: 'left',
    duration: 0.8,
  },
  render: (args) => (
    <div style={{ minHeight: '200vh', padding: '40px' }}>
      <div style={{ marginTop: '80vh' }}>
        <ScrollReveal {...args}>
          <div
            style={{
              padding: '40px',
              background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
              borderRadius: '12px',
              color: 'white',
              fontSize: '24px',
              textAlign: 'center',
            }}
          >
            Slides in from left
          </div>
        </ScrollReveal>
      </div>
    </div>
  ),
};

export const WithScrub: Story = {
  args: {
    direction: 'up',
    scrub: 0.5,
    distance: 100,
  },
  render: (args) => (
    <div style={{ minHeight: '200vh', padding: '40px' }}>
      <div style={{ marginTop: '80vh' }}>
        <ScrollReveal {...args}>
          <div
            style={{
              padding: '40px',
              background: 'linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)',
              borderRadius: '12px',
              color: 'white',
              fontSize: '24px',
              textAlign: 'center',
            }}
          >
            Tied to scroll position (scrub)
          </div>
        </ScrollReveal>
      </div>
    </div>
  ),
};
