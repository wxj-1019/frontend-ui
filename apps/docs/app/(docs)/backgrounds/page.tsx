import Link from "next/link";

const backgrounds = [
  {
    name: "Aurora",
    description: "极光背景效果",
    href: "/backgrounds/aurora",
  },
  {
    name: "Particles",
    description: "粒子背景效果",
    href: "/backgrounds/particles",
  },
  {
    name: "Starfield",
    description: "3D 星空背景，星点向观察者飞来",
    href: "/backgrounds/starfield",
  },
  {
    name: "MeshGradient",
    description: "动态网格渐变背景",
    href: "/backgrounds/mesh-gradient",
  },
  {
    name: "NoiseBackground",
    description: "噪点纹理背景，胶片颗粒感",
    href: "/backgrounds/noise-background",
  },
  {
    name: "Hyperspeed",
    description: "超光速效果，星轨辐射",
    href: "/backgrounds/hyperspeed",
  },
];

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
