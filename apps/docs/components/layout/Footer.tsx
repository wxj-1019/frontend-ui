import Link from "next/link";
import { Sparkles } from "lucide-react";

const footerLinks = {
  产品: [
    { label: "组件", href: "/components" },
    { label: "区块", href: "/blocks" },
    { label: "展示", href: "/showcase" },
    { label: "更新日志", href: "/changelog" },
  ],
  资源: [
    { label: "文档", href: "/docs" },
    { label: "文字动画", href: "/text-animations" },
    { label: "背景特效", href: "/backgrounds" },
  ],
  社区: [
    { label: "GitHub", href: "https://github.com/frontend-ui/frontend-ui" },
    { label: "Discord", href: "https://discord.gg/frontend-ui" },
    { label: "Twitter", href: "https://twitter.com/frontend_ui" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-display text-lg font-bold text-[var(--color-text-primary)]">
              <span className="inline-flex items-center text-[var(--color-accent)]">
                <Sparkles className="h-5 w-5" />
              </span>{" "}
              Frontend UI
            </Link>
            <p className="mt-3 text-sm text-[var(--color-text-subtle)]">
              企业级前端动画组件库
              <br />
              多引擎架构 · 73 动画组件
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-display text-sm font-semibold text-[var(--color-text-primary)]">
                {category}
              </h3>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--color-text-subtle)] transition-colors hover:text-[var(--color-text-primary)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[var(--color-border-subtle)] pt-8 sm:flex-row">
          <div className="flex items-center gap-4">
            <p className="text-xs text-[var(--color-text-subtle)]">
              © {new Date().getFullYear()} Frontend UI. MIT License.
            </p>
            <span className="text-xs text-[var(--color-text-subtle)]">v0.0.1</span>
          </div>
          <p className="text-xs text-[var(--color-text-subtle)]">
            Built with Next.js · Tailwind CSS · GSAP
          </p>
        </div>
      </div>
    </footer>
  );
}
