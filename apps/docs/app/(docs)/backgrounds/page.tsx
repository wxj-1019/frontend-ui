import Link from 'next/link';
import { getComponentsByCategory } from '@/lib/component-registry';

const backgrounds = getComponentsByCategory('backgrounds');

export default function BackgroundsPage() {
  return (
    <div>
      <div className="mb-12">
        <h1 className="font-display text-4xl font-bold text-[var(--color-text-primary)]">
          背景特效
        </h1>
        <p className="mt-3 text-lg text-[var(--color-text-muted)]">
          为页面添加动态背景效果
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {backgrounds.map((bg) => (
          <Link
            key={bg.href}
            href={bg.href}
            className="group rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-6 transition-all hover:border-[var(--color-accent)]/50 hover:shadow-lg hover:shadow-[var(--color-accent)]/5"
          >
            <h2 className="font-display text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)]">
              {bg.name}
            </h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              {bg.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
