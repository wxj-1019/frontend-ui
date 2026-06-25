'use client';

import { PageTransition } from '@frontend-ui/ui';
import { ComponentDocPage } from '@/components/ui/ComponentDocPage';

export default function PageTransitionPage() {
  return (
    <ComponentDocPage
      category={{ label: '复合组件', href: '/components' }}
      name="PageTransition"
      description="页面转场动画组件，支持 fade/slide/scale/blur 四种过渡模式"
      installName="page-transition"
      importStatement={'import { PageTransition } from "@frontend-ui/ui";'}
      defaultValues={{ type: 'fade', duration: 0.4 }}
      propConfig={[
        { name: 'type', type: 'string', options: ['fade', 'slide', 'scale', 'blur'] },
        { name: 'duration', type: 'number', min: 0.1, max: 1, step: 0.1 },
      ]}
      propDocs={[
        { name: 'children', type: 'ReactNode', required: true, description: '需要转场动画的内容' },
        { name: 'type', type: "'fade' | 'slide' | 'scale' | 'blur'", default: "'fade'", description: '过渡类型' },
        { name: 'duration', type: 'number', default: '0.4', description: '动画时长 (s)' },
        { name: 'disabled', type: 'boolean', default: 'false', description: '禁用动画' },
        { name: 'className', type: 'string', default: '-', description: '自定义类名' },
      ]}
      codeGenerator={(v) => `<PageTransition type="${v.type}" duration={${v.duration}}>\n  <div>Your page content</div>\n</PageTransition>`}
      renderPreview={(v) => (
        <PageTransition type={v.type as 'fade' | 'slide' | 'scale' | 'blur'} duration={Number(v.duration)}>
          <div className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-8 text-center">
            <p className="text-[var(--color-text-primary)]">转场动画效果</p>
          </div>
        </PageTransition>
      )}
      examples={[
        {
          title: '淡入淡出',
          code: `<PageTransition type="fade">\n  <div>Page content</div>\n</PageTransition>`,
        },
        {
          title: '滑动过渡',
          code: `<PageTransition type="slide" duration={0.5}>\n  <div>Page content</div>\n</PageTransition>`,
        },
      ]}
    />
  );
}
