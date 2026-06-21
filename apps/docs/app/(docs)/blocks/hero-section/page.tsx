'use client';

import { HeroWithGradient, HeroWithParticles } from '@frontend-ui/ui';
import { ComponentDocPage } from '@/components/ui/ComponentDocPage';

export default function HeroSectionPage() {
  return (
    <ComponentDocPage
      category={{ label: '页面区块', href: '/blocks' }}
      name="HeroSection"
      description="赛博英雄区，大标题 + 入场动画，支持渐变背景与粒子背景两种变体"
      installName="hero-section"
      importStatement={
        'import { HeroWithGradient, HeroWithParticles } from "@frontend-ui/ui";'
      }
      defaultValues={{
        title: '构建令人印象深刻的界面',
        subtitle: '企业级动画组件库，让您的应用动起来',
        variant: 'gradient',
      }}
      propConfig={[
        { name: 'title', type: 'string' },
        { name: 'subtitle', type: 'string' },
        { name: 'variant', type: 'string', options: ['gradient', 'particles'] },
      ]}
      propDocs={[
        {
          name: 'title',
          type: 'string',
          required: true,
          description: '主标题',
        },
        {
          name: 'subtitle',
          type: 'string',
          default: '-',
          description: '副标题',
        },
        {
          name: 'actions',
          type: 'HeroAction[]',
          default: '-',
          description: '操作按钮',
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
      ]}
      codeGenerator={(
        v
      ) => `import { HeroWithGradient${v.variant === 'particles' ? ', HeroWithParticles' : ''} } from "@frontend-ui/ui";

<${v.variant === 'particles' ? 'HeroWithParticles' : 'HeroWithGradient'}
  title="${v.title}"
  subtitle="${v.subtitle}"
  actions={[
    { label: "开始使用", variant: "primary" },
    { label: "了解更多", variant: "secondary" },
  ]}
/>`}
      renderPreview={(v) =>
        v.variant === 'particles' ? (
          <HeroWithParticles
            title={String(v.title)}
            subtitle={String(v.subtitle)}
            prefersReducedMotion
            className="max-w-2xl"
          />
        ) : (
          <HeroWithGradient
            title={String(v.title)}
            subtitle={String(v.subtitle)}
            prefersReducedMotion
            className="max-w-2xl"
          />
        )
      }
    />
  );
}
