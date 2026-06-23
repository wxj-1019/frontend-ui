"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Sparkles, Command } from "lucide-react";
import { motion } from "motion/react";
import { SearchDialog } from "@/components/ui/SearchDialog";
import { ThemeTransition } from "@/components/ui/ThemeTransition";

const navItems = [
  { label: "文档", href: "/docs" },
  { label: "组件", href: "/text-animations" },
  { label: "区块", href: "/blocks" },
  { label: "展示", href: "/showcase" },
];

/**
 * 增强版导航栏
 * 玻璃态 + 发光边框 + 动态背景
 */
export function EnhancedNavbar() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Skip Link */}
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-20 rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-[var(--color-bg-primary)] transition-transform focus:translate-y-0"
      >
        跳到主内容
      </a>

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[var(--color-bg-primary)]/70 backdrop-blur-2xl border-b border-[var(--color-accent)]/10 shadow-[0_0_40px_rgba(0,245,255,0.05)]"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="relative inline-flex items-center text-[var(--color-accent)]">
              <Sparkles className="h-5 w-5 transition-transform group-hover:rotate-12" />
            </span>
            <span className="text-lg font-bold tracking-tight text-[var(--color-text-primary)]">
              Frontend <span className="text-[var(--color-accent)]">UI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-hover)]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden items-center gap-3 sm:flex">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-surface)]/60 backdrop-blur-sm px-3 py-2 text-sm text-[var(--color-text-subtle)] transition-all hover:border-[var(--color-accent)]/30 hover:text-[var(--color-text-muted)] hover:bg-[var(--color-bg-surface)]"
            >
              <Command className="h-4 w-4" />
              <span className="hidden lg:inline">搜索</span>
              <kbd className="hidden lg:inline-flex items-center rounded border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] px-1.5 text-xs text-[var(--color-text-subtle)]">
                ⌘K
              </kbd>
            </button>

            {/* GitHub */}
            <a
              href="https://github.com/frontend-ui/frontend-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--color-text-muted)] transition-all hover:bg-[var(--color-hover)] hover:text-[var(--color-text-primary)]"
              aria-label="GitHub"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            </a>

            {/* Theme Toggle */}
            {mounted && <ThemeTransition />}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="rounded-xl p-2 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-hover)] hover:text-[var(--color-text-primary)] md:hidden"
            aria-label="打开菜单"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>

        {/* 底部发光条（滚动时显示） */}
        {scrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/30 to-transparent" />
        )}
      </motion.header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-0 flex h-full w-80 max-w-[85vw] flex-col border-l border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]/95 backdrop-blur-2xl shadow-2xl"
          >
            <div className="flex h-16 items-center justify-between border-b border-[var(--color-border-subtle)] px-6">
              <span className="font-display text-base font-bold text-[var(--color-text-primary)]">
                <span className="inline-flex items-center text-[var(--color-accent)]">
                  <Sparkles className="h-5 w-5" />
                </span>{" "}
                Frontend UI
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg p-2 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-hover)]"
                aria-label="关闭菜单"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-4 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-hover)] hover:text-[var(--color-text-primary)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        </div>
      )}

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
