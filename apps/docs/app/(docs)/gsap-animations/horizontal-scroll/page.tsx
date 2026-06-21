"use client";

import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function HorizontalScrollPage() {
  return (
    <ComponentDocPage
      category={{ label: "GSAP 动画", href: "/gsap-animations" }}
      name="HorizontalScroll"
      description="将垂直滚动转换为横向位移，配合 pin 实现横向全景浏览效果"
      installName="horizontal-scroll"
      importStatement={'import { HorizontalScroll } from "@frontend-ui/ui";'}
      defaultValues={{ sectionWidth: 480, speed: 1 }}
      propConfig={[
        { name: "sectionWidth", type: "number", min: 280, max: 1200, step: 20 },
        { name: "speed", type: "number", min: 0.25, max: 3, step: 0.25 },
      ]}
      propDocs={[
        { name: "children", type: "ReactNode[]", required: true, description: "横向滚动的内容段落数组" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
        {
          name: "sectionWidth",
          type: "number",
          default: "window.innerWidth",
          description: "每段宽度（px），默认为视口宽度",
        },
        { name: "speed", type: "number", default: "1", description: "滚动速度倍率，值越大滚动越快" },
      ]}
      codeGenerator={(v) => `<HorizontalScroll sectionWidth={${v.sectionWidth}} speed={${v.speed}}>
  <div>段落 1</div>
  <div>段落 2</div>
  <div>段落 3</div>
</HorizontalScroll>`}
      renderPreview={(v) => {
        const sectionWidth = Number(v.sectionWidth) || 480;
        const speed = Number(v.speed) || 1;
        const panels = [
          { label: "01", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
          { label: "02", gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)" },
          { label: "03", gradient: "linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)" },
          { label: "04", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
        ];
        return (
          <div className="w-full">
            <div className="overflow-hidden rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]">
              <div className="flex" style={{ transform: 'translateX(-25%)' }}>
                {panels.map((p) => (
                  <div
                    key={p.label}
                    className="flex items-center justify-center font-display text-2xl font-bold text-white"
                    style={{
                      width: sectionWidth / 2,
                      height: 140,
                      background: p.gradient,
                      flex: '0 0 auto',
                    }}
                  >
                    {p.label}
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-[var(--color-text-subtle)]">
              sectionWidth: {sectionWidth}px · speed: {speed}x
            </p>
          </div>
        );
      }}
    />
  );
}
