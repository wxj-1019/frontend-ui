'use client';

import { ComponentDocPage } from '@/components/ui/ComponentDocPage';
import { ClickSpark } from '@frontend-ui/ui';

export default function ClickSparkPage() {
  return (
    <ComponentDocPage
      category={{ label: '交互动画', href: '/animations' }}
      name="ClickSpark"
      description="基于 Canvas 和 requestAnimationFrame 的点击粒子爆炸特效，包裹任意元素，点击时在鼠标位置产生向外扩散的粒子效果。"
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
        { name: 'children', type: 'ReactNode', required: true, description: '被包裹的元素' },
        { name: 'className', type: 'string', default: '-', description: '自定义类名' },
        { name: 'particleCount', type: 'number', default: '30', description: '粒子数量' },
        { name: 'colors', type: 'string[]', default: 'accent 色系', description: '粒子颜色数组，支持 CSS 变量' },
        { name: 'radius', type: 'number', default: '120', description: '粒子扩散半径（px）' },
        { name: 'duration', type: 'number', default: '600', description: '动画持续时间（ms）' },
        { name: 'particleSize', type: '[number, number]', default: '[2, 6]', description: '粒子大小范围 [min, max]（px）' },
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
      examples={[
        {
          title: "基础点击粒子",
          description: "默认配色的粒子爆炸效果",
          code: `<ClickSpark particleCount={30} radius={120} duration={600}>
  <div className="flex h-40 w-64 items-center justify-center rounded-xl border bg-gray-100">
    <span>点击触发粒子</span>
  </div>
</ClickSpark>`,
          render: () => (
            <ClickSpark particleCount={30} radius={120} duration={600}>
              <div className="flex h-40 w-64 items-center justify-center rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]">
                <span className="text-sm font-medium text-[var(--color-text-primary)]">点击触发粒子</span>
              </div>
            </ClickSpark>
          ),
        },
        {
          title: "自定义颜色粒子",
          description: "指定粒子颜色为红色系",
          code: `<ClickSpark
  particleCount={50}
  colors={['#ef4444', '#f97316', '#eab308']}
  radius={150}
  duration={800}
  particleSize={[3, 8]}
>
  <button className="rounded-full bg-red-500 px-8 py-3 text-white">
    点击爆炸
  </button>
</ClickSpark>`,
          render: () => (
            <ClickSpark
              particleCount={50}
              colors={['#ef4444', '#f97316', '#eab308']}
              radius={150}
              duration={800}
              particleSize={[3, 8]}
            >
              <div className="flex h-40 w-64 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-orange-500 shadow-lg">
                <span className="text-sm font-bold text-white">点击爆炸</span>
              </div>
            </ClickSpark>
          ),
        },
      ]}
      accessibility="ClickSpark 组件设置了 role='button'、tabIndex={0} 和 aria-label 描述交互行为。支持键盘操作：按 Enter 或空格键在元素中心触发粒子效果。Canvas 覆盖层设置了 aria-hidden='true' 和 pointer-events: none，不干扰底层内容的交互和屏幕阅读器。粒子动画完全在 Canvas 上绘制，不影响 DOM 可访问性。对于设置了 prefers-reduced-motion 的用户，建议在全局层面禁用该装饰性特效。"
    />
  );
}
