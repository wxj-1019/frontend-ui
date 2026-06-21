import type { Meta, StoryObj } from '@storybook/react';
import { Parallax } from './parallax';

const meta: Meta<typeof Parallax> = {
  title: 'GSAP Animations/Parallax',
  component: Parallax,
  tags: ['autodocs'],
  argTypes: {
    speed: { control: { type: 'range', min: 0.1, max: 2, step: 0.1 } },
    axis: {
      control: 'select',
      options: ['y', 'x'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Parallax>;

export const Vertical: Story = {
  args: {
    speed: 0.5,
    axis: 'y',
  },
  render: (args) => (
    <div style={{ minHeight: '200vh', padding: '40px' }}>
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Parallax {...args}>
          <div
            style={{
              width: '300px',
              height: '300px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '20px',
            }}
          >
            Parallax Effect
          </div>
        </Parallax>
      </div>
      <div style={{ height: '100vh' }} />
    </div>
  ),
};

export const Horizontal: Story = {
  args: {
    speed: 0.8,
    axis: 'x',
  },
  render: (args) => (
    <div style={{ minHeight: '200vh', padding: '40px', overflow: 'hidden' }}>
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Parallax {...args}>
          <div
            style={{
              width: '300px',
              height: '300px',
              background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '20px',
            }}
          >
            Horizontal Parallax
          </div>
        </Parallax>
      </div>
      <div style={{ height: '100vh' }} />
    </div>
  ),
};

export const FastParallax: Story = {
  render: () => (
    <div style={{ minHeight: '300vh', padding: '40px' }}>
      <div style={{ position: 'relative', height: '200vh' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Parallax speed={0.2}>
            <div
              style={{
                width: '200px',
                height: '200px',
                background: 'linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '16px',
              }}
            >
              Slow (0.2)
            </div>
          </Parallax>
        </div>
        <div style={{ position: 'absolute', top: '50%', left: '25%', transform: 'translate(-50%, -50%)' }}>
          <Parallax speed={0.5}>
            <div
              style={{
                width: '200px',
                height: '200px',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '16px',
              }}
            >
              Medium (0.5)
            </div>
          </Parallax>
        </div>
        <div style={{ position: 'absolute', top: '50%', left: '75%', transform: 'translate(-50%, -50%)' }}>
          <Parallax speed={1.0}>
            <div
              style={{
                width: '200px',
                height: '200px',
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '16px',
              }}
            >
              Fast (1.0)
            </div>
          </Parallax>
        </div>
      </div>
    </div>
  ),
};
