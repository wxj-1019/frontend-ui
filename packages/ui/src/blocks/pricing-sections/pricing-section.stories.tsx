import { Meta, StoryObj } from '@storybook/react';
import { PricingSection } from './pricing-section';

const meta: Meta<typeof PricingSection> = {
  title: 'Blocks/PricingSection',
  component: PricingSection,
};

export default meta;

const plans = [
  {
    name: 'Starter',
    price: '$19',
    description: '适合个人开发者和小型项目',
    interval: 'month' as const,
    features: ['5 个组件库项目', '基础动画组件', '社区支持', 'MIT 许可证'],
    cta: '免费开始',
  },
  {
    name: 'Pro',
    price: '$49',
    description: '适合专业团队和中型项目',
    interval: 'month' as const,
    features: [
      '无限组件项目',
      '全部动画组件',
      '高级 Blocks 区块',
      '优先技术支持',
      'CLI 工具',
    ],
    cta: '订阅 Pro',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$199',
    description: '适合大型企业和定制需求',
    interval: 'month' as const,
    features: [
      '全部 Pro 功能',
      '自定义组件开发',
      '专属客户经理',
      'SLA 保障',
      '私有部署',
      '源码访问',
    ],
    cta: '联系销售',
  },
];

export const Default: StoryObj<typeof PricingSection> = {
  args: {
    title: '简单透明的定价',
    subtitle: '选择最适合您团队的方案',
    plans,
  },
};

export const TwoColumns: StoryObj<typeof PricingSection> = {
  args: {
    title: '定价方案',
    plans: plans.slice(0, 2),
    columns: 2,
  },
};

export const ComparisonTable: StoryObj<typeof PricingSection> = {
  args: {
    title: '功能对比',
    subtitle: '详细比较各方案的功能差异',
    plans,
    variant: 'comparison',
  },
};

export const FeatureGrid: StoryObj<typeof PricingSection> = {
  args: {
    title: '特性概览',
    subtitle: '按方案查看所属功能',
    plans,
    variant: 'grid',
  },
};
