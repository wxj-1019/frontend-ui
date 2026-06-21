'use client';

import { BentoGrid, BentoCard } from '@frontend-ui/ui';
import { ComponentDocPage } from '@/components/ui/ComponentDocPage';

export default function BentoGridPage() {
  return (
    <ComponentDocPage
      category={{ label: '页面区块', href: '/blocks' }}
      name="BentoGrid"
      description="Bento 网格布局，自适应卡片布局 + 悬浮交互"
      installName="bento-grid"
      importStatement={
        'import { BentoGrid, BentoCard } from "@frontend-ui/ui";'
      }
      defaultValues={{ columns: 3 }}
      propConfig={[
        { name: 'columns', type: 'number', min: 2, max: 4, step: 1 },
      ]}
      propDocs={[
        {
          name: 'children',
          type: 'ReactNode',
          required: true,
          description: '网格内容（BentoCard）',
        },
        { name: 'columns', type: 'number', default: '3', description: '列数' },
        {
          name: 'gap',
          type: 'number',
          default: '4',
          description: '卡片间距 (rem/4)',
        },
        {
          name: 'className',
          type: 'string',
          default: '-',
          description: '自定义类名',
        },
      ]}
      codeGenerator={(v) => `<BentoGrid columns={${v.columns}}>
  <BentoCard title="标题 1" description="描述 1" variant="default" />
  <BentoCard title="标题 2" description="描述 2" variant="accent" />
  <BentoCard title="标题 3" description="描述 3" variant="subtle" />
</BentoGrid>`}
      renderPreview={(v) => (
        <BentoGrid columns={Number(v.columns) as 2 | 3 | 4}>
          <BentoCard
            title="高性能"
            description="GPU 加速动画，60fps 流畅运行"
            variant="default"
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
    />
  );
}
