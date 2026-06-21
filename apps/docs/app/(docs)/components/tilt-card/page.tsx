'use client';

import { ComponentDocPage } from '@/components/ui/ComponentDocPage';
import { TiltCard } from '@frontend-ui/ui';

export default function TiltCardPage() {
  return (
    <ComponentDocPage
      category={{ label: '复合组件', href: '/components' }}
      name="TiltCard"
      description="3D 倾斜卡片组件，鼠标悬停时产生透视倾斜追踪效果，带可选的炫光层"
      installName="tilt-card"
      importStatement={'import { TiltCard } from "@frontend-ui/ui";'}
      defaultValues={{
        tiltDegree: 10,
        scale: 1.02,
        glare: true,
        glareOpacity: 0.25,
        speed: 0.4,
      }}
      propConfig={[
        { name: 'tiltDegree', type: 'number', min: 0, max: 45, step: 1 },
        { name: 'scale', type: 'number', min: 1, max: 1.2, step: 0.01 },
        { name: 'glare', type: 'boolean' },
        { name: 'glareOpacity', type: 'number', min: 0, max: 1, step: 0.05 },
        { name: 'speed', type: 'number', min: 0.1, max: 1, step: 0.1 },
      ]}
      propDocs={[
        {
          name: 'children',
          type: 'ReactNode',
          required: true,
          description: '卡片内容',
        },
        {
          name: 'className',
          type: 'string',
          default: '-',
          description: '自定义类名',
        },
        {
          name: 'tiltDegree',
          type: 'number',
          default: '10',
          description: '最大倾斜角度（度）',
        },
        {
          name: 'perspective',
          type: 'number',
          default: '1000',
          description: '透视距离（px）',
        },
        {
          name: 'scale',
          type: 'number',
          default: '1.02',
          description: '悬停缩放比例',
        },
        {
          name: 'glare',
          type: 'boolean',
          default: 'true',
          description: '是否启用炫光效果',
        },
        {
          name: 'glareOpacity',
          type: 'number',
          default: '0.25',
          description: '炫光不透明度',
        },
        {
          name: 'speed',
          type: 'number',
          default: '0.4',
          description: '动画过渡速度（s）',
        },
      ]}
      codeGenerator={(v) => `<TiltCard
  tiltDegree={${v.tiltDegree}}
  scale={${v.scale}}
  glare={${v.glare}}
  glareOpacity={${v.glareOpacity}}
  speed={${v.speed}}
>
  <div>
    <h3>卡片标题</h3>
    <p>卡片内容</p>
  </div>
</TiltCard>`}
      renderPreview={(v) => (
        <TiltCard
          className="w-64"
          tiltDegree={Number(v.tiltDegree)}
          scale={Number(v.scale)}
          glare={v.glare === true || v.glare === 'true'}
          glareOpacity={Number(v.glareOpacity)}
          speed={Number(v.speed)}
        >
          <div className="p-6">
            <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">
              3D 倾斜卡片
            </h3>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              鼠标悬停查看 3D 透视倾斜效果
            </p>
          </div>
        </TiltCard>
      )}
    />
  );
}
