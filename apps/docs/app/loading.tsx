export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg-primary)]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-border-default)] border-t-[var(--color-accent)]" />
        <p className="text-sm text-[var(--color-text-muted)]">加载中...</p>
      </div>
    </div>
  );
}
