'use client';

import { MagneticGrid, MagneticItem } from '@frontend-ui/ui';
import { ComponentDocPage } from '@/components/ui/ComponentDocPage';

export default function MagneticGridPage() {
  return (
    <ComponentDocPage
      category={{ label: '复合组件', href: '/components' }}
      name="MagneticGrid"
      description="磁性网格布局，子元素根据鼠标位置产生磁性吸引力效果"
      installName="magnetic-grid"
      importStatement={'import { MagneticGrid, MagneticItem } from "@frontend-ui/ui";'}
      defaultValues={{ columns: 3, gap: 4, strength: 0.3 }}
      propConfig={[
        { name: 'columns', type: 'number', min: 2, max: 4, step: 1 },
        { name: 'gap', type: 'number', min: 2, max: 8, step: 1 },
        { name: 'strength', type: 'number', min: 0.1, max: 1, step: 0.1 },
      ]}
      propDocs={[
        { name: 'children', type: 'ReactNode', required: true, description: '网格内容（MagneticItem）' },
        { name: 'columns', type: '2 | 3 | 4', default: '3', description: '列数' },
        { name: 'gap', type: 'number', default: '4', description: '间距（1 = 4px）' },
        { name: 'strength', type: 'number', default: '0.3', description: '磁性拉力强度 (0-1)' },
        { name: 'className', type: 'string', default: '-', description: '自定义类名' },
      ]}
      codeGenerator={(v) => `<MagneticGrid columns={${v.columns}} gap={${v.gap}} strength={${v.strength}}>
  <MagneticItem>Item 1</MagneticItem>
  <MagneticItem>Item 2</MagneticItem>
  <MagneticItem>Item 3</MagneticItem>
</MagneticGrid>`}
      renderPreview={(v) => (
        <MagneticGrid columns={Number(v.columns) as 2 | 3 | 4} gap={Number(v.gap)} strength={Number(v.strength)}>
          <MagneticItem className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-6 text-center">
            <p className="text-[var(--color-text-primary)]">磁性元素 1</p>
          </MagneticItem>
          <MagneticItem className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-6 text-center">
            <p className="text-[var(--color-text-primary)]">磁性元素 2</p>
          </MagneticItem>
          <MagneticItem className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-6 text-center">
            <p className="text-[var(--color-text-primary)]">磁性元素 3</p>
          </MagneticItem>
        </MagneticGrid>
      )}
      examples={[
        {
          title: '基础磁性网格',
          code: `<MagneticGrid columns={3}>\n  <MagneticItem>Item 1</MagneticItem>\n  <MagneticItem>Item 2</MagneticItem>\n  <MagneticItem>Item 3</MagneticItem>\n</MagneticGrid>`,
        },
      ]}
    />
  );
}
