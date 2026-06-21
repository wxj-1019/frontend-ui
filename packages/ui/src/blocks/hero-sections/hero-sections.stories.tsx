import { Meta, StoryObj } from '@storybook/react';
import { HeroWithGradient } from './hero-with-gradient';
import { HeroWithParticles } from './hero-with-particles';

const meta: Meta<typeof HeroWithGradient> = {
  title: 'Blocks/HeroSections',
  component: HeroWithGradient,
  parameters: { layout: 'fullscreen' },
};

export default meta;

export const Gradient: StoryObj<typeof HeroWithGradient> = {
  args: {
    title: 'Build Stunning Interfaces',
    subtitle:
      'Enterprise-grade animation components for modern React applications. Copy, paste, customize.',
    actions: [
      { label: 'Get Started', variant: 'primary' },
      { label: 'View on GitHub', variant: 'secondary' },
    ],
  },
};

export const GradientWithGrid: StoryObj<typeof HeroWithGradient> = {
  args: {
    title: 'Developer-First Animation Library',
    subtitle:
      'Create beautiful animations with minimal code. Supports GSAP, Motion, and CSS.',
    showGrid: true,
    actions: [
      { label: 'Browse Components', variant: 'primary' },
      { label: 'Documentation', variant: 'secondary' },
    ],
  },
};

export const Particles: StoryObj<typeof HeroWithParticles> = {
  args: {
    title: 'Interactive Hero Section',
    subtitle:
      'A particle-based hero section with real-time animation and connection effects.',
    actions: [
      { label: 'Explore', variant: 'primary' },
      { label: 'Learn More', variant: 'secondary' },
    ],
  },
};
