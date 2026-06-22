'use client';

import { CTASection } from '@frontend-ui/ui';
import { ComponentDocPage } from '@/components/ui/ComponentDocPage';

export default function CTASectionPage() {
  return (
    <ComponentDocPage
      category={{ label: '页面区块', href: '/blocks' }}
      name="CTASection"
      description="基于 Motion 的行动号召区块，使用 useInView 实现滚动触发动画，支持多种视觉风格变体。"
      installName="cta-section"
      importStatement={'import { CTASection } from "@frontend-ui/ui";'}
      defaultValues={{ variant: 'gradient' }}
      propConfig={[
        { name: 'variant', type: 'string', options: ['gradient', 'minimal', 'accent'] },
      ]}
      propDocs={[
        { name: 'title', type: 'string', required: true, description: '标题' },
        { name: 'description', type: 'string', default: '-', description: '描述文字' },
        { name: 'actions', type: 'CTAction[]', default: '-', description: '操作按钮列表（label、href、variant）' },
        { name: 'variant', type: "'gradient' | 'minimal' | 'accent'", default: "'gradient'", description: '视觉风格变体' },
        { name: 'prefersReducedMotion', type: 'boolean', default: 'false', description: '减弱动效' },
        { name: 'children', type: 'ReactNode', default: '-', description: '额外内容' },
        { name: 'className', type: 'string', default: '-', description: '自定义类名' },
      ]}
      codeGenerator={(v) => `<CTASection
  title="准备好开始了吗？"
  description="安装 Frontend UI，开始构建动画界面"
  variant="${v.variant}"
  actions={[
    { label: "开始使用", href: "/docs" },
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
      examples={[
        {
          title: "渐变风格",
          description: "默认渐变背景 CTA 区块",
          code: `<CTASection
  title="准备好开始了吗？"
  description="立即安装 Frontend UI"
  variant="gradient"
  actions={[
    { label: "开始使用", href: "/docs" },
    { label: "GitHub", href: "https://github.com", variant: "secondary" },
  ]}
/>`,
          render: () => (
            <CTASection
              title="准备好开始了吗？"
              description="立即安装 Frontend UI"
              variant="gradient"
              prefersReducedMotion
              actions={[
                { label: '开始使用', href: '/docs' },
                { label: 'GitHub', href: 'https://github.com', variant: 'secondary' },
              ]}
            />
          ),
        },
        {
          title: "简约风格",
          description: "简约边框风格的 CTA 区块",
          code: `<CTASection
  title="联系我们"
  description="有任何问题？"
  variant="minimal"
  actions={[{ label: "发送邮件", href: "mailto:hi@example.com" }]}
/>`,
          render: () => (
            <CTASection
              title="联系我们"
              description="有任何问题？随时联系我们"
              variant="minimal"
              prefersReducedMotion
              actions={[{ label: '发送邮件', href: 'mailto:hi@example.com' }]}
            />
          ),
        },
        {
          title: "强调风格",
          description: "强调色背景的 CTA 区块",
          code: `<CTASection
  title="加入社区"
  description="与全球开发者一起构建"
  variant="accent"
  actions={[{ label: "加入", href: "#" }]}
/>`,
          render: () => (
            <CTASection
              title="加入社区"
              description="与全球开发者一起构建"
              variant="accent"
              prefersReducedMotion
              actions={[{ label: '加入', href: '#' }]}
            />
          ),
        },
      ]}
      accessibility="CTASection 使用 section 语义标签，标题使用 h2，描述使用 p 标签。按钮使用 a 标签并支持 href 和 onClick，保持原生键盘导航和焦点管理。装饰性网格和光效使用 aria-hidden='true'。对于设置了 prefersReducedMotion 的用户，入场动画被跳过，内容直接显示。"
    />
  );
}
