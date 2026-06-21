"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg-primary)]">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">
          出错了
        </h2>
        <p className="text-[var(--color-text-muted)]">
          页面发生错误，请尝试刷新
        </p>
        <button
          onClick={reset}
          className="rounded-lg bg-[var(--color-accent)] px-6 py-2 text-sm font-medium text-[var(--color-bg-primary)] transition-colors hover:opacity-90"
        >
          重试
        </button>
      </div>
    </div>
  );
}
