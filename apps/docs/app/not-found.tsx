import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg-primary)]">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="font-display text-6xl font-bold text-[var(--color-accent)]">
          404
        </h1>
        <h2 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">
          页面不存在
        </h2>
        <p className="text-[var(--color-text-muted)]">
          找不到您请求的页面
        </p>
        <Link
          href="/"
          className="rounded-lg bg-[var(--color-accent)] px-6 py-2 text-sm font-medium text-[var(--color-bg-primary)] transition-colors hover:opacity-90"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}
