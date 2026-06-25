import { Meta, StoryObj } from '@storybook/react';
import { FullscreenNav } from './fullscreen-nav';

const meta: Meta<typeof FullscreenNav> = {
  title: 'Blocks/FullscreenNav',
  component: FullscreenNav,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof FullscreenNav>;

const mockLinks = [
  { label: '首页', href: '/' },
  { label: '组件', href: '/components' },
  {
    label: '文档',
    href: '/docs',
    children: [
      { label: '快速开始', href: '/docs/quickstart' },
      { label: 'API 参考', href: '/docs/api' },
    ],
  },
  { label: '关于', href: '/about' },
];

export const Slide: Story = {
  args: { links: mockLinks, variant: 'slide' },
};

export const Fade: Story = {
  args: { links: mockLinks, variant: 'fade' },
};

export const Scale: Story = {
  args: { links: mockLinks, variant: 'scale' },
};
