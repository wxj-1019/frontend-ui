import type { Meta, StoryObj } from '@storybook/react';
import { StaggerAnimation } from './stagger-animation';

const meta: Meta<typeof StaggerAnimation> = {
  title: 'Animations/StaggerAnimation',
  component: StaggerAnimation,
  tags: ['autodocs'],
  argTypes: {
    staggerDelay: { control: { type: 'number', min: 50, max: 500, step: 50 } },
    duration: { control: { type: 'number', min: 200, max: 2000, step: 100 } },
    animationType: {
      control: 'select',
      options: ['fadeIn', 'slideUp', 'slideLeft', 'scaleUp', 'rotateIn'],
    },
    autoPlay: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof StaggerAnimation>;

const SampleItems = () => (
  <>
    {['🎨', '🚀', '⚡', '🎯', '🔥', '✨'].map((emoji, i) => (
      <div
        key={i}
        className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-800 text-3xl"
      >
        {emoji}
      </div>
    ))}
  </>
);

export const Default: Story = {
  args: {
    children: <SampleItems />,
    staggerDelay: 100,
    duration: 600,
    animationType: 'fadeIn',
    className: 'gap-4',
  },
};

export const SlideUp: Story = {
  args: {
    children: <SampleItems />,
    animationType: 'slideUp',
    staggerDelay: 80,
    className: 'gap-4',
  },
};

export const SlideLeft: Story = {
  args: {
    children: <SampleItems />,
    animationType: 'slideLeft',
    className: 'gap-4',
  },
};

export const ScaleUp: Story = {
  args: {
    children: <SampleItems />,
    animationType: 'scaleUp',
    staggerDelay: 120,
    className: 'gap-4',
  },
};

export const RotateIn: Story = {
  args: {
    children: <SampleItems />,
    animationType: 'rotateIn',
    staggerDelay: 150,
    className: 'gap-4',
  },
};

export const FastStagger: Story = {
  args: {
    children: <SampleItems />,
    staggerDelay: 50,
    duration: 400,
    className: 'gap-3',
  },
};

export const SlowStagger: Story = {
  args: {
    children: <SampleItems />,
    staggerDelay: 300,
    duration: 1000,
    className: 'gap-4',
  },
};

export const WithCards: Story = {
  args: {
    children: (
      <>
        {[
          { title: 'Design', desc: 'Create beautiful interfaces' },
          { title: 'Develop', desc: 'Build robust applications' },
          { title: 'Deploy', desc: 'Ship with confidence' },
        ].map((item, i) => (
          <div key={i} className="w-48 rounded-xl bg-gray-800 p-4">
            <h3 className="font-semibold text-white">{item.title}</h3>
            <p className="text-sm text-gray-400">{item.desc}</p>
          </div>
        ))}
      </>
    ),
    animationType: 'slideUp',
    staggerDelay: 150,
    className: 'gap-4',
  },
};
