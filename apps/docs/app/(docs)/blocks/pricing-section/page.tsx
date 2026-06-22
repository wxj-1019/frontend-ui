'use client';

import { PricingSection } from '@frontend-ui/ui';
import { ComponentDocPage } from '@/components/ui/ComponentDocPage';

export default function PricingSectionPage() {
  return (
    <ComponentDocPage
      category={{ label: '页面区块', href: '/blocks' }}
      name="PricingSection"
      description="基于 Motion 的定价展示区块，使用 useInView 实现滚动触发动画，支持多列卡片布局与高亮推荐。"
      installName="pricing-section"
      importStatement={'import { PricingSection } from "@frontend-ui/ui";'}
      defaultValues={{ columns: 3 }}
      propConfig={[
        { name: 'columns', type: 'number', min: 2, max: 4, step: 1 },
      ]}
      propDocs={[
        { name: 'title', type: 'string', required: true, description: '区块标题' },
        { name: 'subtitle', type: 'string', default: '-', description: '区块副标题' },
        { name: 'plans', type: 'PricingPlan[]', required: true, description: '定价方案列表' },
        { name: 'columns', type: '2 | 3 | 4', default: '3', description: '列数' },
        { name: 'prefersReducedMotion', type: 'boolean', default: 'false', description: '减弱动效' },
        { name: 'className', type: 'string', default: '-', description: '自定义类名' },
      ]}
      codeGenerator={(v) => `<PricingSection
  title="选择你的方案"
  subtitle="简单透明的定价"
  columns={${v.columns}}
  plans={[
    {
      name: "基础版",
      price: "¥0",
      interval: "月",
      features: ["1 个项目", "基础组件"],
      cta: "免费开始",
    },
    {
      name: "专业版",
      price: "¥99",
      interval: "月",
      features: ["无限项目", "全部组件", "优先支持"],
      cta: "开始试用",
      highlighted: true,
    },
  ]}
/>`}
      renderPreview={(v) => (
        <PricingSection
          title="选择你的方案"
          subtitle="简单透明的定价"
          columns={Number(v.columns) as 2 | 3 | 4}
          prefersReducedMotion
          plans={[
            {
              name: '基础版',
              price: '¥0',
              interval: '月',
              features: ['1 个项目', '基础组件', '社区支持'],
              cta: '免费开始',
            },
            {
              name: '专业版',
              price: '¥99',
              interval: '月',
              features: ['无限项目', '全部组件', '优先支持', '自定义主题'],
              cta: '开始试用',
              highlighted: true,
            },
            {
              name: '企业版',
              price: '¥299',
              interval: '月',
              features: ['无限项目', '全部组件', '专属支持', 'SLA 保障', '定制开发'],
              cta: '联系我们',
            },
          ]}
        />
      )}
      examples={[
        {
          title: "两列定价",
          description: "适合简单产品的两列定价布局",
          code: `<PricingSection
  title="选择方案"
  columns={2}
  plans={[
    { name: "免费版", price: "¥0", features: ["基础功能"], cta: "开始" },
    { name: "专业版", price: "¥99/月", features: ["全部功能"], cta: "升级", highlighted: true },
  ]}
/>`,
          render: () => (
            <PricingSection
              title="选择方案"
              columns={2}
              prefersReducedMotion
              plans={[
                { name: '免费版', price: '¥0', features: ['基础功能', '社区支持'], cta: '开始' },
                { name: '专业版', price: '¥99/月', features: ['全部功能', '优先支持'], cta: '升级', highlighted: true },
              ]}
            />
          ),
        },
        {
          title: "三列定价",
          description: "经典三列定价，中间列高亮推荐",
          code: `<PricingSection
  title="定价方案"
  columns={3}
  plans={[
    { name: "基础版", price: "¥29/月", features: ["5 个项目"], cta: "选择" },
    { name: "专业版", price: "¥99/月", features: ["无限项目"], cta: "选择", highlighted: true },
    { name: "企业版", price: "¥299/月", features: ["无限 + SLA"], cta: "联系" },
  ]}
/>`,
          render: () => (
            <PricingSection
              title="定价方案"
              columns={3}
              prefersReducedMotion
              plans={[
                { name: '基础版', price: '¥29/月', features: ['5 个项目', '基础组件'], cta: '选择' },
                { name: '专业版', price: '¥99/月', features: ['无限项目', '全部组件', '优先支持'], cta: '选择', highlighted: true },
                { name: '企业版', price: '¥299/月', features: ['无限项目', 'SLA 保障', '专属支持'], cta: '联系' },
              ]}
            />
          ),
        },
      ]}
      accessibility="PricingSection 使用 section 语义标签，标题使用 h2，每个方案名称使用 h3。价格使用 aria-label 标注完整语义（如 '¥99/月'），屏幕阅读器可正确理解价格含义。推荐方案通过 highlighted 属性视觉突出，同时在 DOM 中添加推荐标记。CTA 按钮使用 button 元素，保持原生键盘导航和焦点管理。对于设置了 prefersReducedMotion 的用户，建议在全局层面尊重 prefers-reduced-motion 媒体查询来控制入场动画。"
    />
  );
}
