import Link from 'next/link';
import { getComponentsByCategory } from '@/lib/component-registry';

const textAnimations = getComponentsByCategory('text-animations');

export default function TextAnimationsPage() {
  return (
    <div>
      <div className="mb-12">
        <h1 className="font-display text-4xl font-bold text-[var(--color-text-primary)]">
          文字动画
        </h1>
        <p className="mt-3 text-lg text-[var(--color-text-muted)]">
          为文字添加各种动态效果，提升视觉表现力
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {textAnimations.map((animation) => (
          <Link
            key={animation.href}
            href={animation.href}
            className="group rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-6 transition-all hover:border-[var(--color-accent)]/50 hover:shadow-lg hover:shadow-[var(--color-accent)]/5"
          >
            <h2 className="font-display text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)]">
              {animation.name}
            </h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              {animation.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
