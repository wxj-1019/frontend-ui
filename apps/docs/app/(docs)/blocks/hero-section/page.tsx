"use client";

import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function HeroSectionPage() {
  return (
    <ComponentDocPage
      category={{ label: "页面区块", href: "/blocks" }}
      name="HeroSection"
      description="赛博英雄区，大标题 + 粒子背景 + 入场动画"
      installName="hero-section"
      importStatement={'import { HeroSection } from "@frontend-ui/ui";'}
      defaultValues={{ title: "Welcome", subtitle: "构建令人印象深刻的界面" }}
      propConfig={[
        { name: "title", type: "string" },
        { name: "subtitle", type: "string" },
      ]}
      propDocs={[
        { name: "title", type: "string", default: "Welcome", description: "主标题" },
        { name: "subtitle", type: "string", default: "-", description: "副标题" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
      ]}
      codeGenerator={(v) => `<HeroSection
  title="${v.title}"
  subtitle="${v.subtitle}"
/>`}
      renderPreview={(v) => (
        <div className="relative overflow-hidden rounded-lg bg-[var(--color-bg-primary)] p-12 text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-accent)]/10 to-transparent" />
          <h2 className="relative font-display text-3xl font-bold text-[var(--color-text-primary)]">
            {String(v.title)}
          </h2>
          <p className="relative mt-4 text-[var(--color-text-muted)]">
            {String(v.subtitle)}
          </p>
        </div>
      )}
    />
  );
}
