import Link from "next/link";

const textAnimations = [
  {
    name: "BlurText",
    description: "模糊渐入的文字动画效果",
    href: "/text-animations/blur-text",
  },
  {
    name: "GradientText",
    description: "渐变色彩的文字效果",
    href: "/text-animations/gradient-text",
  },
  {
    name: "SplitText",
    description: "文字分割动画效果",
    href: "/text-animations/split-text",
  },
  {
    name: "Typewriter",
    description: "打字机效果，逐字符显示文本",
    href: "/text-animations/typewriter",
  },
  {
    name: "ScrambleText",
    description: "乱码解密文字效果",
    href: "/text-animations/scramble-text",
  },
  {
    name: "WaveText",
    description: "波浪文字，字符依次浮动",
    href: "/text-animations/wave-text",
  },
  {
    name: "GlitchText",
    description: "故障艺术文字，RGB 通道错位",
    href: "/text-animations/glitch-text",
  },
  {
    name: "CountUp",
    description: "数字递增动画",
    href: "/text-animations/count-up",
  },
];

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
