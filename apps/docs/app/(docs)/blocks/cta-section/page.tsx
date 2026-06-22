'use client';

import { CTASection } from '@frontend-ui/ui';
import { ComponentDocPage } from '@/components/ui/ComponentDocPage';

export default function CTASectionPage() {
  return (
    <ComponentDocPage
      category={{ label: '页面区块', href: '/blocks' }}
      name="CTASection"
      description="行动号召区块，支持多种视觉风格变体"
      installName="cta-section"
      importStatement={'import { CTASection } from "@frontend-ui/ui";'}
      defaultValues={{ variant: 'gradient' }}
      propConfig={[
        {
          name: 'variant',
          type: 'string',
          options: ['gradient', 'minimal', 'accent'],
        },
      ]}
      propDocs={[
        {
          name: 'title',
          type: 'string',
          required: true,
          description: '标题',
        },
        {
          name: 'description',
          type: 'string',
          default: '-',
          description: '描述文字',
        },
        {
          name: 'actions',
          type: 'CTAction[]',
          default: '-',
          description: '操作按钮列表',
        },
        {
          name: 'variant',
          type: "'gradient' | 'minimal' | 'accent'",
          default: "'gradient'",
          description: '视觉风格变体',
        },
        {
          name: 'prefersReducedMotion',
          type: 'boolean',
          default: 'false',
          description: '减弱动效',
        },
        {
          name: 'className',
          type: 'string',
          default: '-',
          description: '自定义类名',
        },
        {
          name: 'children',
          type: 'ReactNode',
          default: '-',
          description: '额外内容',
        },
      ]}
      codeGenerator={(v) => `import { CTASection } from "@frontend-ui/ui";

<CTASection
  title="准备好开始了吗？"
  description="安装 Frontend UI，开始构建令人印象深刻的动画界面"
  variant="${v.variant}"
  actions={[
    { label: "开始使用", href: "/docs/getting-started" },
    { label: "GitHub", href: "https://github.com", variant: "secondary" },
  ]}
/>`}
      renderPreview={(v) => (
        <CTASection
          title="准备好开始了吗？"
          description="安装 Frontend UI，开始构建令人印象深刻的动画界面"
          variant={v.variant as 'gradient' | 'minimal' | 'accent'}
          prefersReducedMotion
          actions={[
            { label: '开始使用', href: '/docs/getting-started' },
            { label: 'GitHub', href: 'https://github.com', variant: 'secondary' },
          ]}
        />
      )}
    />
  );
}
