'use client';

import { PricingSection } from '@frontend-ui/ui';
import { ComponentDocPage } from '@/components/ui/ComponentDocPage';

export default function PricingSectionPage() {
  return (
    <ComponentDocPage
      category={{ label: '页面区块', href: '/blocks' }}
      name="PricingSection"
      description="定价展示区块，支持多列卡片布局与高亮推荐"
      installName="pricing-section"
      importStatement={'import { PricingSection } from "@frontend-ui/ui";'}
      defaultValues={{ columns: 3 }}
      propConfig={[
        { name: 'columns', type: 'number', min: 2, max: 4, step: 1 },
      ]}
      propDocs={[
        {
          name: 'title',
          type: 'string',
          required: true,
          description: '区块标题',
        },
        {
          name: 'subtitle',
          type: 'string',
          default: '-',
          description: '区块副标题',
        },
        {
          name: 'plans',
          type: 'PricingPlan[]',
          required: true,
          description: '定价方案列表',
        },
        {
          name: 'columns',
          type: '2 | 3 | 4',
          default: '3',
          description: '列数',
        },
        {
          name: 'prefersReducedMotion',
          type: 'boolean',
          default: 'false',
          description: '减弱动效',
        },
        {
          name: 'className',
          type: 'string',
          default: '-',
          description: '自定义类名',
        },
      ]}
      codeGenerator={(v) => `import { PricingSection } from "@frontend-ui/ui";

<PricingSection
  title="选择你的方案"
  subtitle="简单透明的定价"
  columns={${v.columns}}
  plans={[
    {
      name: "基础版",
      price: "¥0",
      interval: "月",
      features: ["1 个项目", "基础组件", "社区支持"],
      cta: "免费开始",
    },
    {
      name: "专业版",
      price: "¥99",
      interval: "月",
      features: ["无限项目", "全部组件", "优先支持", "自定义主题"],
      cta: "开始试用",
      highlighted: true,
    },
    {
      name: "企业版",
      price: "¥299",
      interval: "月",
      features: ["无限项目", "全部组件", "专属支持", "SLA 保障", "定制开发"],
      cta: "联系我们",
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
              features: [
                '无限项目',
                '全部组件',
                '优先支持',
                '自定义主题',
              ],
              cta: '开始试用',
              highlighted: true,
            },
            {
              name: '企业版',
              price: '¥299',
              interval: '月',
              features: [
                '无限项目',
                '全部组件',
                '专属支持',
                'SLA 保障',
                '定制开发',
              ],
              cta: '联系我们',
            },
          ]}
        />
      )}
    />
  );
}
