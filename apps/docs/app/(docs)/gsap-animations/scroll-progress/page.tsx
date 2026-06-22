"use client";

import { ScrollProgress } from "@frontend-ui/ui";
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
              <div className="absolute bottom-4 left-4 right-4 h-1 rounded-full bg-[var(--color-border-subtle)]">
                <div className="h-full rounded-full" style={{ width: '62%', background: colors[0] }} />
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-[var(--color-text-subtle)]">
              实际使用时固定在页面顶部/底部，滚动页面查看效果
            </p>
          </div>
        );
      }}
      examples={[
        {
          title: "顶部进度条",
          description: "默认固定在页面顶部的进度条",
          code: `<ScrollProgress position="top" height={3} />`,
          render: () => (
            <div className="w-full max-w-md">
              <div className="relative h-32 overflow-hidden rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500" />
                <div className="flex h-full items-center justify-center">
                  <p className="text-xs text-[var(--color-text-subtle)]">顶部进度条</p>
                </div>
              </div>
            </div>
          ),
        },
        {
          title: "底部进度条",
          description: "固定在页面底部的进度条",
          code: `<ScrollProgress position="bottom" height={4} color="#f43f5e" />`,
          render: () => (
            <div className="w-full max-w-md">
              <div className="relative h-32 overflow-hidden rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]">
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-rose-500 to-pink-500" />
                <div className="flex h-full items-center justify-center">
                  <p className="text-xs text-[var(--color-text-subtle)]">底部进度条</p>
                </div>
              </div>
            </div>
          ),
        },
        {
          title: "粗进度条",
          description: "增加高度的进度条",
          code: `<ScrollProgress height={8} color="#22c55e" />`,
          render: () => (
            <div className="w-full max-w-md">
              <div className="relative h-32 overflow-hidden rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]">
                <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-green-400 to-emerald-500" />
                <div className="flex h-full items-center justify-center">
                  <p className="text-xs text-[var(--color-text-subtle)]">粗进度条 height=8px</p>
                </div>
              </div>
            </div>
          ),
        },
      ]}
      accessibility="ScrollProgress 使用 role='progressbar' 和 aria-label='页面滚动进度' 标记为进度条。对于设置了 prefers-reduced-motion 的用户，进度条被隐藏。进度条使用 fixed 定位且 pointer-events: none，不会拦截用户交互。"
    />
  );
}
