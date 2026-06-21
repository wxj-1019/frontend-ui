import type { Meta, StoryObj } from '@storybook/react';
import { TextReveal } from './text-reveal';

const meta: Meta<typeof TextReveal> = {
  title: 'GSAP Animations/TextReveal',
  component: TextReveal,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['chars', 'words'],
    },
    duration: { control: { type: 'range', min: 0.2, max: 2, step: 0.1 } },
    stagger: { control: { type: 'range', min: 0.01, max: 0.1, step: 0.01 } },
  },
};

export default meta;
type Story = StoryObj<typeof TextReveal>;

export const CharacterReveal: Story = {
  args: {
    text: 'GSAP Animation Magic',
    mode: 'chars',
    duration: 0.8,
    stagger: 0.03,
  },
  render: (args) => (
    <div style={{ minHeight: '200vh', padding: '40px' }}>
      <div style={{ marginTop: '80vh' }}>
        <h1 style={{ fontSize: '48px', color: '#fff' }}>
          <TextReveal {...args} />
        </h1>
      </div>
    </div>
  ),
};

export const WordReveal: Story = {
  args: {
    text: 'Each word appears one by one',
    mode: 'words',
    duration: 0.6,
    stagger: 0.1,
    from: { opacity: 0, y: 30 },
  },
  render: (args) => (
    <div style={{ minHeight: '200vh', padding: '40px' }}>
      <div style={{ marginTop: '80vh' }}>
        <p style={{ fontSize: '32px', color: '#fff' }}>
          <TextReveal {...args} />
        </p>
      </div>
    </div>
  ),
};

export const DramaticReveal: Story = {
  args: {
    text: 'DRAMATIC',
    mode: 'chars',
    duration: 1,
    stagger: 0.05,
    from: { opacity: 0, rotationX: -90, y: 50 },
  },
  render: (args) => (
    <div style={{ minHeight: '200vh', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ marginTop: '80vh' }}>
        <h1 style={{ fontSize: '72px', fontWeight: 'bold', color: '#fff' }}>
          <TextReveal {...args} />
        </h1>
      </div>
    </div>
  ),
};
