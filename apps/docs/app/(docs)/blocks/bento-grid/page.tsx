'use client';

import { BentoGrid, BentoCard } from '@frontend-ui/ui';
import { ComponentDocPage } from '@/components/ui/ComponentDocPage';

export default function BentoGridPage() {
  return (
    <ComponentDocPage
      category={{ label: '页面区块', href: '/blocks' }}
      name="BentoGrid"
      description="基于 CSS Grid 的 Bento 网格布局，自适应卡片布局配合 Motion 悬浮交互效果。"
      installName="bento-grid"
      importStatement={
        'import { BentoGrid, BentoCard } from "@frontend-ui/ui";'
      }
      defaultValues={{ columns: 3, gap: 4 }}
      propConfig={[
        { name: 'columns', type: 'number', min: 2, max: 4, step: 1 },
        { name: 'gap', type: 'number', min: 2, max: 8, step: 1 },
      ]}
      propDocs={[
        { name: 'children', type: 'ReactNode', required: true, description: '网格内容（BentoCard）' },
        { name: 'columns', type: '2 | 3 | 4', default: '3', description: '列数' },
        { name: 'gap', type: 'number', default: '4', description: '卡片间距（1 = 4px）' },
        { name: 'className', type: 'string', default: '-', description: '自定义类名' },
      ]}
      codeGenerator={(v) => `<BentoGrid columns={${v.columns}} gap={${v.gap}}>
  <BentoCard title="标题 1" description="描述 1" />
  <BentoCard title="标题 2" description="描述 2" variant="accent" />
  <BentoCard title="标题 3" description="描述 3" variant="subtle" />
</BentoGrid>`}
      renderPreview={(v) => (
        <BentoGrid columns={Number(v.columns) as 2 | 3 | 4} gap={Number(v.gap) || 4}>
          <BentoCard
            title="高性能"
            description="GPU 加速动画，60fps 流畅运行"
          />
          <BentoCard
            title="TypeScript"
            description="完整类型安全，导出所有 Props 接口"
            variant="accent"
          />
          <BentoCard
            title="响应式"
            description="自适应布局，全屏尺寸覆盖"
            variant="subtle"
          />
        </BentoGrid>
      )}
      examples={[
        {
          title: "基本网格",
          description: "默认三列 Bento 网格布局",
          code: `<BentoGrid columns={3}>
  <BentoCard title="功能 1" description="描述 1" />
  <BentoCard title="功能 2" description="描述 2" />
  <BentoCard title="功能 3" description="描述 3" />
</BentoGrid>`,
          render: () => (
            <BentoGrid columns={3}>
              <BentoCard title="功能 1" description="描述 1" />
              <BentoCard title="功能 2" description="描述 2" />
              <BentoCard title="功能 3" description="描述 3" />
            </BentoGrid>
          ),
        },
        {
          title: "带宽卡片的网格",
          description: "使用 wide 属性创建跨列卡片",
          code: `<BentoGrid columns={3}>
  <BentoCard title="宽卡片" wide description="跨越两列" />
  <BentoCard title="普通卡片" description="单列" />
</BentoGrid>`,
          render: () => (
            <BentoGrid columns={3}>
              <BentoCard title="宽卡片" wide description="跨越两列显示" variant="accent" />
              <BentoCard title="普通卡片" description="单列显示" />
            </BentoGrid>
          ),
        },
        {
          title: "自定义间距",
          description: "使用更大间距的网格布局",
          code: `<BentoGrid columns={3} gap={6}>
  <BentoCard title="卡片 1" description="描述 1" hoverEffect="glow" />
  <BentoCard title="卡片 2" description="描述 2" variant="accent" />
  <BentoCard title="卡片 3" description="描述 3" hoverEffect="glow" />
</BentoGrid>`,
          render: () => (
            <BentoGrid columns={3} gap={6}>
              <BentoCard title="卡片 1" description="描述 1" hoverEffect="glow" />
              <BentoCard title="卡片 2" description="描述 2" variant="accent" />
              <BentoCard title="卡片 3" description="描述 3" hoverEffect="glow" />
            </BentoGrid>
          ),
        },
      ]}
      accessibility="BentoGrid 使用 CSS Grid 布局，BentoCard 使用语义化的 div 元素。卡片标题使用 h3 标签，确保屏幕阅读器可以正确识别内容层级。宽卡片（wide）和高卡片（tall）通过 col-span 和 row-span 实现，不影响屏幕阅读器的阅读顺序。对于设置了 prefers-reduced-motion 的用户，卡片悬浮动画被跳过。按钮等交互元素保持原生键盘导航支持。"
    />
  );
}
