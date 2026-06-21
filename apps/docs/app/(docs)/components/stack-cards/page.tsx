"use client";

import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function StackCardsPage() {
  return (
    <ComponentDocPage
      category={{ label: "复合组件", href: "/components" }}
      name="StackCards"
      description="基于 GSAP ScrollTrigger 的卡片堆叠效果，向下滚动时卡片依次覆盖前一张"
      installName="stack-cards"
      importStatement={'import { StackCards } from "@frontend-ui/ui";'}
      defaultValues={{ cardHeight: 300, gap: 20 }}
      propConfig={[
        { name: "cardHeight", type: "number", min: 200, max: 500, step: 10 },
        { name: "gap", type: "number", min: 0, max: 80, step: 4 },
      ]}
      propDocs={[
        { name: "children", type: "ReactNode[]", required: true, description: "卡片内容数组（每项为一张卡片）" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
        { name: "cardHeight", type: "number", default: "300", description: "每张卡片高度（px）" },
        { name: "gap", type: "number", default: "20", description: "卡片之间垂直间距（px）" },
      ]}
      codeGenerator={(v) => `<StackCards cardHeight={${v.cardHeight}} gap={${v.gap}}>
  <div>卡片 1</div>
  <div>卡片 2</div>
  <div>卡片 3</div>
</StackCards>`}
      renderPreview={(v) => {
        const cardHeight = Number(v.cardHeight) || 300;
        const gap = Number(v.gap) || 0;
        const cards = [
          { label: "01", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
          { label: "02", gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)" },
          { label: "03", gradient: "linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)" },
          { label: "04", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
        ];
        return (
          <div className="w-full max-w-md">
            <div
              className="relative overflow-hidden rounded-xl border border-[var(--color-border-default)]"
              style={{ height: cardHeight + gap * (cards.length - 1) }}
            >
              {cards.map((c, i) => (
                <div
                  key={c.label}
                  className="absolute left-1/2 flex items-center justify-center font-display text-5xl font-bold text-white shadow-2xl"
                  style={{
                    top: i * gap,
                    transform: 'translateX(-50%)',
                    width: '90%',
                    height: cardHeight,
                    background: c.gradient,
                    borderRadius: 16,
                  }}
                >
                  {c.label}
                </div>
              ))}
            </div>
            <p className="mt-3 text-center text-xs text-[var(--color-text-subtle)]">
              滚动页面以查看卡片堆叠动画
            </p>
          </div>
        );
      }}
    />
  );
}
