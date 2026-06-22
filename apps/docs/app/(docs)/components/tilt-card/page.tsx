'use client';

import { ComponentDocPage } from '@/components/ui/ComponentDocPage';
import { TiltCard } from '@frontend-ui/ui';

export default function TiltCardPage() {
  return (
    <ComponentDocPage
      category={{ label: '复合组件', href: '/components' }}
      name="TiltCard"
      description="基于 Motion 的 3D 倾斜卡片组件，鼠标悬停时通过弹簧动画产生透视倾斜追踪效果，带可选的炫光层。"
      installName="tilt-card"
      importStatement={'import { TiltCard } from "@frontend-ui/ui";'}
      defaultValues={{
        tiltDegree: 10,
        perspective: 1000,
        scale: 1.02,
        glare: true,
        glareOpacity: 0.25,
        speed: 0.4,
      }}
      propConfig={[
        { name: 'tiltDegree', type: 'number', min: 0, max: 45, step: 1 },
        { name: 'perspective', type: 'number', min: 200, max: 2000, step: 100 },
        { name: 'scale', type: 'number', min: 1, max: 1.2, step: 0.01 },
        { name: 'glare', type: 'boolean' },
        { name: 'glareOpacity', type: 'number', min: 0, max: 1, step: 0.05 },
        { name: 'speed', type: 'number', min: 0.1, max: 1, step: 0.1 },
      ]}
      propDocs={[
        { name: 'children', type: 'ReactNode', required: true, description: '卡片内容' },
        { name: 'className', type: 'string', description: '自定义类名' },
        { name: 'tiltDegree', type: 'number', default: '10', description: '最大倾斜角度（度）' },
        { name: 'perspective', type: 'number', default: '1000', description: '透视距离（px），值越小 3D 效果越明显' },
        { name: 'scale', type: 'number', default: '1.02', description: '悬停时的缩放比例' },
        { name: 'glare', type: 'boolean', default: 'true', description: '是否启用炫光（高光）效果' },
        { name: 'glareOpacity', type: 'number', default: '0.25', description: '炫光不透明度（0~1）' },
        { name: 'speed', type: 'number', default: '0.4', description: '动画过渡持续时间（秒）' },
        { name: 'ref', type: 'Ref<HTMLDivElement>', description: '转发的 DOM ref 引用' },
      ]}
      codeGenerator={(v) => `<TiltCard
  tiltDegree={${v.tiltDegree}}
  perspective={${v.perspective}}
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
          perspective={Number(v.perspective)}
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
      examples={[
        {
          title: "基础用法",
          description: "默认配置的 3D 倾斜效果",
          code: `<TiltCard>
  <div className="p-6">
    <h3>卡片标题</h3>
    <p>鼠标悬停查看 3D 倾斜效果</p>
  </div>
</TiltCard>`,
          render: () => (
            <TiltCard className="w-56">
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">
                  基础倾斜
                </h3>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                  悬停查看效果
                </p>
              </div>
            </TiltCard>
          ),
        },
        {
          title: "强烈倾斜 + 无炫光",
          description: "增大倾斜角度并关闭炫光效果",
          code: `<TiltCard
  tiltDegree={25}
  perspective={600}
  scale={1.05}
  glare={false}
>
  <div className="p-6">
    <h3>强烈倾斜</h3>
    <p>更大的倾斜角度，无炫光</p>
  </div>
</TiltCard>`,
          render: () => (
            <TiltCard
              className="w-56"
              tiltDegree={25}
              perspective={600}
              scale={1.05}
              glare={false}
            >
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">
                  强烈倾斜
                </h3>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                  更大角度，无炫光
                </p>
              </div>
            </TiltCard>
          ),
        },
      ]}
      accessibility="TiltCard 是一个视觉增强组件，3D 倾斜和炫光效果仅作为装饰性反馈。组件使用 perspective CSS 属性和 preserve-3d transform 实现 3D 效果，不影响内容的可读性。炫光层通过 aria-hidden='true' 标记为装饰性元素。子内容保持正常的 DOM 结构，确保屏幕阅读器可正确解析。"
    />
  );
}
