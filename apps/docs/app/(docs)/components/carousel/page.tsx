"use client";

import { Carousel } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function CarouselPage() {
  return (
    <ComponentDocPage
      category={{ label: "复合组件", href: "/components" }}
      name="Carousel"
      description="基于 Motion 的轮播组件，支持自动播放、循环、箭头与圆点导航，可拖拽切换"
      installName="carousel"
      importStatement={'import { Carousel } from "@frontend-ui/ui";'}
      defaultValues={{
        autoPlay: false,
        interval: 3000,
        loop: true,
        showArrows: true,
        showDots: true,
      }}
      propConfig={[
        { name: "autoPlay", type: "boolean" },
        { name: "interval", type: "number", min: 1000, max: 8000, step: 500 },
        { name: "loop", type: "boolean" },
        { name: "showArrows", type: "boolean" },
        { name: "showDots", type: "boolean" },
      ]}
      propDocs={[
        { name: "children", type: "ReactNode[]", required: true, description: "轮播项目数组" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
        { name: "autoPlay", type: "boolean", default: "false", description: "是否自动播放" },
        { name: "interval", type: "number", default: "3000", description: "自动播放间隔（毫秒）" },
        { name: "loop", type: "boolean", default: "true", description: "是否循环切换" },
        { name: "showArrows", type: "boolean", default: "true", description: "是否显示左右箭头" },
        { name: "showDots", type: "boolean", default: "true", description: "是否显示底部圆点" },
      ]}
      codeGenerator={(v) => `<Carousel
  autoPlay={${v.autoPlay}}
  interval={${v.interval}}
  loop={${v.loop}}
  showArrows={${v.showArrows}}
  showDots={${v.showDots}}
>
  <div>第一屏</div>
  <div>第二屏</div>
  <div>第三屏</div>
</Carousel>`}
      renderPreview={(v) => {
        const slides = [
          { label: "01", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
          { label: "02", gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)" },
          { label: "03", gradient: "linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)" },
          { label: "04", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
        ];
        return (
          <Carousel
            autoPlay={Boolean(v.autoPlay)}
            interval={Number(v.interval)}
            loop={Boolean(v.loop)}
            showArrows={Boolean(v.showArrows)}
            showDots={Boolean(v.showDots)}
            className="h-64 w-full max-w-md"
          >
            {slides.map((s) => (
              <div
                key={s.label}
                className="flex h-full w-full items-center justify-center font-display text-4xl font-bold text-white"
                style={{ background: s.gradient }}
              >
                {s.label}
              </div>
            ))}
          </Carousel>
        );
      }}
    />
  );
}
