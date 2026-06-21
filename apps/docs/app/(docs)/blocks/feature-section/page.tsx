'use client';

import { FeatureSection } from '@frontend-ui/ui';
import { ComponentDocPage } from '@/components/ui/ComponentDocPage';

export default function FeatureSectionPage() {
  return (
    <ComponentDocPage
      category={{ label: '页面区块', href: '/blocks' }}
      name="FeatureSection"
      description="功能展示区块，支持左右交替布局与网格排列，带滚动揭示动画"
      installName="feature-section"
      importStatement={'import { FeatureSection } from "@frontend-ui/ui";'}
      defaultValues={{ layout: 'center', columns: 3 }}
      propConfig={[
        { name: 'layout', type: 'string', options: ['center', 'alternating'] },
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
          name: 'features',
          type: 'FeatureItem[]',
          required: true,
          description: '功能列表',
        },
        {
          name: 'layout',
          type: "'center' | 'alternating'",
          default: "'alternating'",
          description: '布局模式',
        },
        {
          name: 'columns',
          type: 'number',
          default: '3',
          description: '网格列数（center 布局）',
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
      codeGenerator={(v) => `import { FeatureSection } from "@frontend-ui/ui";

<FeatureSection
  title="核心功能"
  subtitle="了解我们的优势"
  layout="${v.layout}"
  columns={${v.columns}}
  features={[
    { title: "高性能", description: "GPU 加速动画" },
    { title: "TypeScript", description: "完整类型安全" },
    { title: "响应式", description: "全屏尺寸覆盖" },
  ]}
/>`}
      renderPreview={(v) => (
        <FeatureSection
          title="核心功能"
          subtitle="了解我们的优势"
          layout={v.layout as 'center' | 'alternating'}
          columns={Number(v.columns) as 2 | 3 | 4}
          prefersReducedMotion
          features={[
            { title: '高性能', description: 'GPU 加速动画，60fps 流畅运行' },
            {
              title: 'TypeScript',
              description: '完整类型安全，导出所有 Props 接口',
            },
            { title: '响应式', description: '自适应布局，全屏尺寸覆盖' },
          ]}
        />
      )}
    />
  );
}
