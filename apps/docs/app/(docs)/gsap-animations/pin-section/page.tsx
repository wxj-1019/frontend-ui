"use client";

import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function PinSectionPage() {
  return (
    <ComponentDocPage
      category={{ label: "GSAP 动画", href: "/gsap-animations" }}
      name="PinSection"
      description="将内容包裹在固定的 ScrollTrigger 区域内，滚动时内容保持固定显示"
      installName="pin-section"
      importStatement={'import { PinSection } from "@frontend-ui/ui";'}
      defaultValues={{
        pinSpacing: true,
        scrub: true,
      }}
      propConfig={[
        { name: "pinSpacing", type: "boolean" },
        { name: "scrub", type: "boolean" },
      ]}
      propDocs={[
        { name: "children", type: "ReactNode", required: true, description: "需要固定的内容" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
        { name: "duration", type: "string", default: "100%", description: "固定持续时间（如 '100%'、'500px'）" },
        { name: "start", type: "string", default: "top top", description: "ScrollTrigger 开始位置" },
        { name: "end", type: "string", default: "bottom top", description: "ScrollTrigger 结束位置" },
        { name: "pinSpacing", type: "boolean", default: "true", description: "是否保留 pin 占位空间" },
        { name: "scrub", type: "boolean | number", default: "true", description: "是否跟随滚动" },
      ]}
      codeGenerator={(v) => `<PinSection pinSpacing={${v.pinSpacing}} scrub={${v.scrub}}>
  <div>固定内容</div>
</PinSection>`}
      renderPreview={(v) => (
        <div className="w-full max-w-md">
          <div className="relative h-48 overflow-hidden rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]">
            <div className="absolute left-0 right-0 top-0 bg-[var(--color-bg-elevated)] px-3 py-1.5 text-xs text-[var(--color-text-subtle)]">
              上方内容
            </div>
            <div className="flex h-full items-center justify-center">
              <div
                className="flex h-32 w-3/4 items-center justify-center rounded-lg font-display text-xl font-bold text-white shadow-xl"
                style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
              >
                Pinned
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-[var(--color-bg-elevated)] px-3 py-1.5 text-xs text-[var(--color-text-subtle)]">
              下方内容
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-[var(--color-text-subtle)]">
            pinSpacing: {String(v.pinSpacing)} · scrub: {String(v.scrub)}
          </p>
        </div>
      )}
    />
  );
}
