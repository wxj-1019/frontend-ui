'use client';

import { ScrollBlur } from '@frontend-ui/ui';
import { ComponentDocPage } from '@/components/ui/ComponentDocPage';

export default function ScrollBlurPage() {
  return (
    <ComponentDocPage
      category={{ label: '交互动画', href: '/animations' }}
      name="ScrollBlur"
      description="滚动速度驱动模糊效果，根据滚动速度动态调整模糊、饱和度和亮度"
      installName="scroll-blur"
      importStatement={'import { ScrollBlur } from "@frontend-ui/ui";'}
      defaultValues={{ maxBlur: 8, threshold: 0.5 }}
      propConfig={[
        { name: 'maxBlur', type: 'number', min: 2, max: 20, step: 1 },
        { name: 'threshold', type: 'number', min: 0.1, max: 2, step: 0.1 },
      ]}
      propDocs={[
        { name: 'children', type: 'ReactNode', required: true, description: '需要添加滚动模糊效果的内容' },
        { name: 'maxBlur', type: 'number', default: '8', description: '最大模糊量 (px)' },
        { name: 'threshold', type: 'number', default: '0.5', description: '触发模糊的速度阈值' },
        { name: 'adjustSaturation', type: 'boolean', default: 'true', description: '是否根据速度调整饱和度' },
        { name: 'adjustBrightness', type: 'boolean', default: 'true', description: '是否根据速度调整亮度' },
        { name: 'className', type: 'string', default: '-', description: '自定义类名' },
      ]}
      codeGenerator={(v) => `<ScrollBlur maxBlur={${v.maxBlur}} threshold={${v.threshold}}>
  <div>Your content here</div>
</ScrollBlur>`}
      renderPreview={(v) => (
        <ScrollBlur maxBlur={Number(v.maxBlur)} threshold={Number(v.threshold)} className="w-full">
          <div className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-8 text-center">
            <p className="text-[var(--color-text-muted)]">快速滚动页面查看模糊效果</p>
          </div>
        </ScrollBlur>
      )}
      examples={[
        {
          title: '基础用法',
          code: `<ScrollBlur>\n  <img src="/photo.jpg" alt="Photo" />\n</ScrollBlur>`,
        },
        {
          title: '自定义参数',
          code: `<ScrollBlur maxBlur={12} threshold={0.3} adjustSaturation>\n  <div>Content</div>\n</ScrollBlur>`,
        },
      ]}
    />
  );
}
