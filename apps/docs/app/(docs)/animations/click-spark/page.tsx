'use client';

import { ComponentDocPage } from '@/components/ui/ComponentDocPage';
import { ClickSpark } from '@frontend-ui/ui';

export default function ClickSparkPage() {
  return (
    <ComponentDocPage
      category={{ label: '交互动画', href: '/animations' }}
      name="ClickSpark"
      description="点击粒子爆炸特效组件，包裹任意元素，点击时在鼠标位置产生向外扩散的粒子效果"
      installName="click-spark"
      importStatement={'import { ClickSpark } from "@frontend-ui/ui";'}
      defaultValues={{
        particleCount: 30,
        radius: 120,
        duration: 600,
      }}
      propConfig={[
        { name: 'particleCount', type: 'number', min: 10, max: 100, step: 5 },
        { name: 'radius', type: 'number', min: 50, max: 300, step: 10 },
        { name: 'duration', type: 'number', min: 200, max: 1500, step: 100 },
      ]}
      propDocs={[
        {
          name: 'children',
          type: 'ReactNode',
          required: true,
          description: '被包裹的元素',
        },
        {
          name: 'className',
          type: 'string',
          default: '-',
          description: '自定义类名',
        },
        {
          name: 'particleCount',
          type: 'number',
          default: '30',
          description: '粒子数量',
        },
        {
          name: 'colors',
          type: 'string[]',
          default: 'accent 色系',
          description: '粒子颜色数组',
        },
        {
          name: 'radius',
          type: 'number',
          default: '120',
          description: '粒子扩散半径（px）',
        },
        {
          name: 'duration',
          type: 'number',
          default: '600',
          description: '动画持续时间（ms）',
        },
        {
          name: 'particleSize',
          type: '[number, number]',
          default: '[2, 6]',
          description: '粒子大小范围 [min, max]',
        },
      ]}
      codeGenerator={(v) => `<ClickSpark
  particleCount={${v.particleCount}}
  radius={${v.radius}}
  duration={${v.duration}}
>
  <button>点击我</button>
</ClickSpark>`}
      renderPreview={(v) => (
        <ClickSpark
          className="inline-block"
          particleCount={Number(v.particleCount)}
          colors={['var(--color-accent)']}
          radius={Number(v.radius)}
          duration={Number(v.duration)}
        >
          <div className="flex h-40 w-64 items-center justify-center rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]">
            <span className="font-display text-sm font-medium text-[var(--color-text-primary)]">
              点击任意位置触发粒子效果
            </span>
          </div>
        </ClickSpark>
      )}
    />
  );
}
