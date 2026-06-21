import { Meta, StoryObj } from '@storybook/react';
import { FeatureSection } from './feature-section';
import { Zap, Shield, Palette, Code, Layers, Globe } from 'lucide-react';

const meta: Meta<typeof FeatureSection> = {
  title: 'Blocks/FeatureSection',
  component: FeatureSection,
};

export default meta;

const features = [
  {
    title: 'Lightning Fast',
    description: 'GPU-accelerated animations that run at 60fps.',
    icon: <Zap className="h-5 w-5" />,
  },
  {
    title: 'Type Safe',
    description: 'Full TypeScript support with strict type checking.',
    icon: <Shield className="h-5 w-5" />,
  },
  {
    title: 'Customizable',
    description: 'Every component accepts custom styling and classes.',
    icon: <Palette className="h-5 w-5" />,
  },
  {
    title: 'Clean Code',
    description: 'Readable, maintainable code with consistent patterns.',
    icon: <Code className="h-5 w-5" />,
  },
  {
    title: 'Multi-Engine',
    description: 'GSAP, Motion, CSS — use the best tool for each job.',
    icon: <Layers className="h-5 w-5" />,
  },
  {
    title: 'i18n Ready',
    description: 'Built with internationalization in mind from day one.',
    icon: <Globe className="h-5 w-5" />,
  },
];

export const GridLayout: StoryObj<typeof FeatureSection> = {
  args: {
    title: 'Why Choose Frontend UI',
    subtitle:
      'A modern animation library built for developers who care about quality.',
    features,
    layout: 'center',
    columns: 3,
  },
};

const alternatingFeatures = [
  {
    title: 'Powerful Animation Engine',
    description:
      'Leverage GSAP for complex timeline animations and ScrollTrigger for scroll-based effects. Our components automatically choose the right engine for each use case.',
  },
  {
    title: 'Developer Experience First',
    description:
      'Clean API design, comprehensive TypeScript types, and thorough documentation make integration a breeze. Every component is fully tree-shakeable.',
  },
  {
    title: 'Production Ready',
    description:
      'Thoroughly tested across browsers and devices. Accessible by default with proper ARIA attributes and reduced-motion support built in.',
  },
];

export const AlternatingLayout: StoryObj<typeof FeatureSection> = {
  args: {
    title: 'Built for Scale',
    subtitle: 'Features designed to grow with your project.',
    features: alternatingFeatures,
    layout: 'alternating',
  },
};
