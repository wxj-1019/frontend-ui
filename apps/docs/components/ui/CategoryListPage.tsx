import Link from 'next/link';
import { getComponentsByCategory } from '@/lib/component-registry';

interface CategoryListPageProps {
  categoryId: string;
  badge?: { label: string; color: string };
}

export function CategoryListPage({ categoryId, badge }: CategoryListPageProps) {
  const items = getComponentsByCategory(categoryId);
  const first = items[0];

  if (!first) return null;

  return (
    <div>
      <div className="mb-12">
        {badge && (
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm"
            style={{ backgroundColor: `${badge.color}10`, color: badge.color }}
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: badge.color }} />
            {badge.label}
          </div>
        )}
        <h1 className="font-display text-4xl font-bold text-[var(--color-text-primary)]">
          {first.category.label}
        </h1>
        <p className="mt-3 text-lg text-[var(--color-text-muted)]">
          {first.category.description}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-6 transition-all hover:border-[var(--color-accent)]/50 hover:shadow-lg hover:shadow-[var(--color-accent)]/5"
          >
            <h2 className="font-display text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)]">
              {item.name}
            </h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
