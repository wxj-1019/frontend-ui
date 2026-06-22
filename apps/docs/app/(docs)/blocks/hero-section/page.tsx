'use client';

import { HeroWithGradient, HeroWithParticles } from '@frontend-ui/ui';
import { ComponentDocPage } from '@/components/ui/ComponentDocPage';

export default function HeroSectionPage() {
  return (
    <ComponentDocPage
      category={{ label: '页面区块', href: '/blocks' }}
      name="HeroSection"
      description="英雄区区块，大标题 + 入场动画，支持渐变背景与粒子背景两种变体"
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
        { name: 'title', type: 'string', required: true, description: '主标题' },
        { name: 'subtitle', type: 'string', default: '-', description: '副标题' },
        { name: 'actions', type: 'HeroAction[]', default: '-', description: '操作按钮数组' },
        { name: 'prefersReducedMotion', type: 'boolean', default: 'false', description: '减弱动效' },
        { name: 'children', type: 'ReactNode', default: '-', description: '额外内容（CTA 下方）' },
        { name: 'className', type: 'string', default: '-', description: '自定义类名' },
        { name: 'gradientDirection', type: "'to-right' | 'to-bottom-right' | 'to-bottom'", default: "'to-bottom-right'", description: '渐变方向（HeroWithGradient）' },
        { name: 'showGrid', type: 'boolean', default: 'true', description: '是否显示网格覆盖（HeroWithGradient）' },
        { name: 'particleCount', type: 'number', default: '80', description: '粒子数量（HeroWithParticles）' },
        { name: 'particleColor', type: 'string', default: '-', description: '粒子颜色（HeroWithParticles）' },
        { name: 'connectionDistance', type: 'number', default: '150', description: '粒子连接距离（HeroWithParticles）' },
        { name: 'speed', type: 'number', default: '1', description: '粒子速度（HeroWithParticles）' },
      ]}
      codeGenerator={(
        v
      ) => `import { ${v.variant === 'particles' ? 'HeroWithParticles' : 'HeroWithGradient'} } from "@frontend-ui/ui";

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
      examples={[
        {
          title: "渐变背景变体",
          description: "默认渐变背景英雄区",
          code: `<HeroWithGradient
  title="构建令人印象深刻的界面"
  subtitle="企业级动画组件库"
  actions={[
    { label: "开始使用", variant: "primary" },
    { label: "了解更多", variant: "secondary" },
  ]}
/>`,
          render: () => (
            <HeroWithGradient
              title="构建令人印象深刻的界面"
              subtitle="企业级动画组件库"
              prefersReducedMotion
              actions={[
                { label: '开始使用', variant: 'primary' },
                { label: '了解更多', variant: 'secondary' },
              ]}
            />
          ),
        },
        {
          title: "粒子背景变体",
          description: "带粒子网络动画的英雄区",
          code: `<HeroWithParticles
  title="探索动画的无限可能"
  subtitle="GPU 加速，60fps 流畅体验"
  particleCount={50}
  connectionDistance={120}
/>`,
          render: () => (
            <HeroWithParticles
              title="探索动画的无限可能"
              subtitle="GPU 加速，60fps 流畅体验"
              prefersReducedMotion
              particleCount={50}
              connectionDistance={120}
              actions={[
                { label: '立即体验', variant: 'primary' },
              ]}
            />
          ),
        },
      ]}
      accessibility="HeroSection 使用 motion/react 实现入场动画。标题使用 h1 语义标签，按钮使用 a 标签并支持 href 和 onClick。对于设置了 prefersReducedMotion 的用户，所有入场动画被跳过，内容直接显示。"
    />
  );
}
