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
        { name: 'title', type: 'string', required: true, description: '区块标题' },
        { name: 'subtitle', type: 'string', default: '-', description: '区块副标题' },
        { name: 'features', type: 'FeatureItem[]', required: true, description: '功能列表（title、description、icon）' },
        { name: 'layout', type: "'center' | 'alternating'", default: "'center'", description: '布局模式：center 为网格，alternating 为左右交替' },
        { name: 'columns', type: '2 | 3 | 4', default: '3', description: '网格列数（center 布局）' },
        { name: 'prefersReducedMotion', type: 'boolean', default: 'false', description: '减弱动效' },
        { name: 'className', type: 'string', default: '-', description: '自定义类名' },
      ]}
      codeGenerator={(v) => `<FeatureSection
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
            { title: 'TypeScript', description: '完整类型安全，导出所有 Props 接口' },
            { title: '响应式', description: '自适应布局，全屏尺寸覆盖' },
          ]}
        />
      )}
      examples={[
        {
          title: "网格布局",
          description: "居中网格排列的功能展示",
          code: `<FeatureSection
  title="核心功能"
  layout="center"
  columns={3}
  features={[
    { title: "高性能", description: "GPU 加速" },
    { title: "TypeScript", description: "类型安全" },
    { title: "响应式", description: "全尺寸覆盖" },
  ]}
/>`,
          render: () => (
            <FeatureSection
              title="核心功能"
              layout="center"
              columns={3}
              prefersReducedMotion
              features={[
                { title: '高性能', description: 'GPU 加速动画' },
                { title: 'TypeScript', description: '完整类型安全' },
                { title: '响应式', description: '全屏尺寸覆盖' },
              ]}
            />
          ),
        },
        {
          title: "交替布局",
          description: "左右交替排列的功能展示",
          code: `<FeatureSection
  title="为什么选择我们"
  layout="alternating"
  features={[
    { title: "极致性能", description: "GPU 加速，60fps 流畅" },
    { title: "类型安全", description: "完整 TypeScript 支持" },
  ]}
/>`,
          render: () => (
            <FeatureSection
              title="为什么选择我们"
              layout="alternating"
              prefersReducedMotion
              features={[
                { title: '极致性能', description: 'GPU 加速动画，60fps 流畅运行' },
                { title: '类型安全', description: '完整 TypeScript 支持，导出所有接口' },
              ]}
            />
          ),
        },
      ]}
      accessibility="FeatureSection 使用 section 语义标签，标题使用 h2。center 布局使用 CSS Grid，alternating 布局使用 flexbox。功能卡片使用语义化标签，图标使用 aria-hidden。动画使用 motion/react 的 useInView，对于设置了 prefersReducedMotion 的用户，动画被跳过。"
    />
  );
}
