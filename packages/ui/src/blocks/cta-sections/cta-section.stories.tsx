import { Meta, StoryObj } from '@storybook/react';
import { CTASection } from './cta-section';

const meta: Meta<typeof CTASection> = {
  title: 'Blocks/CTASection',
  component: CTASection,
};

export default meta;

export const Gradient: StoryObj<typeof CTASection> = {
  args: {
    title: '准备好开始了吗？',
    description: '立即开始使用 Frontend UI，构建令人印象深刻的界面。',
    variant: 'gradient',
    actions: [
      { label: '免费开始', variant: 'primary' },
      { label: '联系销售', variant: 'secondary' },
    ],
  },
};

export const Minimal: StoryObj<typeof CTASection> = {
  args: {
    title: '简单直接的 CTA',
    description: '极简风格，适合干净的设计。',
    variant: 'minimal',
    actions: [{ label: '了解更多', variant: 'primary' }],
  },
};

export const Accent: StoryObj<typeof CTASection> = {
  args: {
    title: '加入 10,000+ 开发者',
    description: '成为社区的一员，获取最新更新。',
    variant: 'accent',
    actions: [
      { label: '加入社区', variant: 'primary' },
      { label: '浏览文档', variant: 'secondary' },
    ],
  },
};
