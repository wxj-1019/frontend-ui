"use client";

import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function ScrollProgressPage() {
  return (
    <ComponentDocPage
      category={{ label: "GSAP 动画", href: "/gsap-animations" }}
      name="ScrollProgress"
      description="固定在页面顶部或底部的滚动进度条，基于 ScrollTrigger 实时同步滚动进度"
      installName="scroll-progress"
      importStatement={'import { ScrollProgress } from "@frontend-ui/ui";'}
      defaultValues={{
        height: 3,
        position: "top",
        smooth: true,
      }}
      propConfig={[
        { name: "height", type: "number", min: 1, max: 12, step: 1 },
        { name: "position", type: "string", options: ["top", "bottom"] },
        { name: "smooth", type: "boolean" },
      ]}
      propDocs={[
        { name: "className", type: "string", default: "-", description: "自定义类名" },
        { name: "color", type: "string", default: "var(--color-accent)", description: "进度条颜色" },
        { name: "height", type: "number", default: "3", description: "进度条高度（px）" },
        { name: "position", type: "'top' | 'bottom'", default: "top", description: "固定位置" },
        { name: "smooth", type: "boolean", default: "true", description: "是否平滑过渡" },
      ]}
      codeGenerator={(v) => `<ScrollProgress
  height={${v.height}}
  position="${v.position}"
  smooth={${v.smooth}}
/>`}
      renderPreview={(v) => {
        const height = Number(v.height) || 3;
        const position = v.position === 'bottom' ? 'bottom' : 'top';
        const colors = [
          'linear-gradient(90deg, #00f5ff 0%, #4facfe 100%)',
          'linear-gradient(90deg, #ee0979 0%, #ff6a00 100%)',
          'linear-gradient(90deg, #11998e 0%, #38ef7d 100%)',
        ];
        return (
          <div className="w-full max-w-md">
            <div className="relative h-40 overflow-hidden rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]">
              <div
                className="absolute left-0 right-0"
                style={{ height, [position]: 0, background: colors[0] }}
              />
              <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
                <div className="text-xs text-[var(--color-text-subtle)]">
                  position: {position}
                </div>
                <div className="text-xs text-[var(--color-text-subtle)]">
                  height: {height}px
                </div>
                <div className="text-xs text-[var(--color-text-subtle)]">
                  smooth: {String(v.smooth)}
                </div>
              </div>
              <div
                className="absolute bottom-4 left-4 right-4 h-1 rounded-full bg-[var(--color-border-subtle)]"
              >
                <div
                  className="h-full rounded-full"
                  style={{ width: '62%', background: colors[0] }}
                />
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-[var(--color-text-subtle)]">
              实际使用时固定在页面顶部/底部，滚动页面查看效果
            </p>
          </div>
        );
      }}
    />
  );
}
