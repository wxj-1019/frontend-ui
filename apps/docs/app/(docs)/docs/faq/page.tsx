"use client";

import Link from "next/link";
import { ScrollReveal } from "@frontend-ui/ui";

const faqs = [
  {
    question: "如何报告 Bug？",
    answer:
      "请在 GitHub Issues 中提交 Bug 报告，包含复现步骤、预期行为和实际行为。附上浏览器版本、操作系统和使用的组件版本信息，可以帮助我们更快定位问题。",
    link: { text: "提交 Issue", href: "https://github.com/frontend-ui/frontend-ui/issues" },
  },
  {
    question: "可以在商业项目中使用吗？",
    answer:
      "可以。Frontend UI 使用 MIT 许可证，你可以免费用于个人项目和商业项目，无需支付授权费用。只需在项目中保留原始的 LICENSE 文件即可。",
    link: { text: "查看许可证", href: "https://github.com/frontend-ui/frontend-ui/blob/main/LICENSE" },
  },
  {
    question: "如何参与贡献？",
    answer:
      "欢迎通过提交 Pull Request 参与贡献。请先阅读贡献指南了解开发环境搭建、代码规范和提交流程。即使是修复一个错别字的 PR 也非常欢迎。",
    link: { text: "阅读贡献指南", href: "/docs/contributing" },
  },
  {
    question: "支持哪些浏览器？",
    answer:
      "支持所有现代浏览器：Chrome 90+、Firefox 88+、Safari 14+、Edge 90+。对于旧版浏览器，基础功能仍然可用，但部分动画效果可能无法正常展示。建议使用最新版本的浏览器以获得最佳体验。",
  },
  {
    question: "是否支持 React Server Components？",
    answer:
      "支持。所有组件都兼容 React Server Components（RSC），可以在 Next.js App Router 等支持 RSC 的框架中使用。需要浏览器 API 的组件会自动进行 hydration，不会影响服务端渲染。",
  },
  {
    question: "如何自定义动画？",
    answer:
      "每个组件都支持通过 CSS 自定义属性（CSS Variables）控制动画参数，如持续时间、延迟和缓动函数。部分组件还提供 props 级别的动画配置，详见各组件文档的「API」部分。",
    link: { text: "查看设计令牌文档", href: "/docs/design-tokens" },
  },
  {
    question: "支持哪些动画引擎？",
    answer:
      "Frontend UI 支持 6 种动画引擎：Motion (framer-motion)、GSAP、CSS 原生动画、react-spring、Anime.js 和 Lenis。每个组件会标注其使用的引擎，你可以根据项目需求选择合适的引擎。",
  },
  {
    question: "我可以只使用一个动画引擎吗？",
    answer:
      "可以。每个组件只依赖一个特定的动画引擎。如果你只需要 CSS 动画，可以只使用基于 CSS 的组件；如果需要更强大的动画能力，可以选择 Motion 或 GSAP 的组件。按需引入即可。",
  },
  {
    question: "是否支持 Tree Shaking？",
    answer:
      "完全支持。所有组件都是独立导出的，只打包你实际使用的组件。通过 named import 导入组件，打包工具会自动移除未使用的代码。",
  },
  {
    question: "是否支持 SSR？",
    answer:
      "支持。所有组件都兼容服务端渲染（SSR），可以在 Next.js、Nuxt 等框架中无缝使用。对于需要浏览器 API 的组件，会自动进行 hydration。",
  },
  {
    question: "如何自定义主题？",
    answer:
      "Frontend UI 使用 CSS 自定义属性（Design Tokens）实现主题定制。你可以覆盖默认的 CSS 变量来调整颜色、间距、字体等。详见「主题定制」和「设计令牌」文档。",
    link: { text: "主题定制文档", href: "/docs/theme" },
  },
];

export default function FAQPage() {
  return (
    <div className="space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--color-text-subtle)]">
        <Link href="/docs" className="hover:text-[var(--color-text-primary)]">
          文档
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text-primary)]">常见问题</span>
      </nav>

      {/* Header */}
      <ScrollReveal>
        <div>
          <h1 className="font-display text-4xl font-bold text-[var(--color-text-primary)]">
            常见问题
          </h1>
          <p className="mt-4 text-lg text-[var(--color-text-muted)]">
            关于 Frontend UI 的常见问题解答
          </p>
        </div>
      </ScrollReveal>

      {/* FAQ Items */}
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <ScrollReveal key={faq.question} delay={index * 0.05}>
            <div className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-6">
              <h2 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">
                {faq.question}
              </h2>
              <p className="mt-3 text-[var(--color-text-muted)]">
                {faq.answer}
              </p>
              {faq.link && (
                <Link
                  href={faq.link.href}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-accent)] hover:underline"
                >
                  {faq.link.text} &rarr;
                </Link>
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* More questions */}
      <ScrollReveal>
        <div className="rounded-xl border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 p-6">
          <h2 className="font-display text-xl font-semibold text-[var(--color-text-primary)]">
            还有其他问题？
          </h2>
          <p className="mt-2 text-[var(--color-text-muted)]">
            欢迎在 GitHub Issues 中提问，我们会尽快回复。
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
}
