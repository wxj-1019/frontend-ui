import Link from 'next/link';
import { getComponentsByCategory } from '@/lib/component-registry';

const gsapAnimations = getComponentsByCategory('gsap-animations');

export default function GsapAnimationsPage() {
  return (
    <div>
      <div className="mb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#88ce02]/10 px-3 py-1 text-sm text-[#88ce02]">
          <span className="h-2 w-2 rounded-full bg-[#88ce02]" />
          GSAP 引擎
        </div>
        <h1 className="font-display text-4xl font-bold text-[var(--color-text-primary)]">
          GSAP 动画组件
        </h1>
        <p className="mt-3 text-lg text-[var(--color-text-muted)]">
          基于 GSAP 的高性能动画组件，支持 ScrollTrigger、Timeline 等强大功能
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {gsapAnimations.map((animation) => (
          <Link
            key={animation.href}
            href={animation.href}
            className="group rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-6 transition-all hover:border-[#88ce02]/50 hover:shadow-lg hover:shadow-[#88ce02]/5"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-[#88ce02]">
                {animation.name}
              </h2>
              <span className="rounded bg-[#88ce02]/10 px-2 py-0.5 text-xs text-[#88ce02]">
                GSAP
              </span>
            </div>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              {animation.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
