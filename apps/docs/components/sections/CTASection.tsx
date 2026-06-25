"use client";

import { motion } from "motion/react";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { Copy, Check } from "lucide-react";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export function CTASection() {
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText("npx frontend-ui add blur-text");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <section
      className="relative border-t border-[var(--color-border-default)] py-24"
      aria-labelledby="cta-heading"
    >
      {/* 背景光效 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[var(--color-accent)]/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.h2
          id="cta-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl font-bold text-[var(--color-text-primary)]"
        >
          准备好开始了吗？
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-[var(--color-text-muted)]"
        >
          安装 Frontend UI，开始构建令人印象深刻的动画界面
        </motion.p>

        {/* 复制命令 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8"
        >
          <div className="inline-flex items-center gap-3 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]/80 backdrop-blur-sm px-6 py-4 transition-all hover:border-[var(--color-accent)]/50">
            <span className="text-sm text-[var(--color-text-subtle)]">$</span>
            <code className="font-mono text-sm text-[var(--color-text-primary)]">
              npx frontend-ui add blur-text
            </code>
            <button
              type="button"
              className="ml-2 text-[var(--color-text-subtle)] transition-colors duration-150 hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-secondary)] rounded-md p-1"
              onClick={handleCopy}
              aria-label={copied ? "已复制" : "复制命令"}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
          {/* 屏幕阅读器状态通知 */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            {copied ? "命令已复制到剪贴板" : ""}
          </div>
        </motion.div>

        {/* 按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 flex gap-4 justify-center"
        >
          <MagneticButton
            variant="primary"
            onClick={() => router.push("/docs")}
            type="button"
          >
            查看文档
          </MagneticButton>
          <MagneticButton
            href="https://github.com"
            variant="outline"
          >
            GitHub
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
