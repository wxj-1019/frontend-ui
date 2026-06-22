"use client";

import { Carousel } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";
import { Camera, Mountain, Waves, Trees } from "lucide-react";

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
        { name: "children", type: "ReactNode[]", required: true, description: "轮播子项数组" },
        { name: "className", type: "string", description: "自定义类名" },
        { name: "autoPlay", type: "boolean", default: "false", description: "是否自动播放" },
        { name: "interval", type: "number", default: "3000", description: "自动播放间隔（毫秒）" },
        { name: "loop", type: "boolean", default: "true", description: "是否循环切换，关闭后到达首尾时停止" },
        { name: "showArrows", type: "boolean", default: "true", description: "是否显示左右箭头导航" },
        { name: "showDots", type: "boolean", default: "true", description: "是否显示底部圆点指示器" },
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
      examples={[
        {
          title: "自动播放轮播",
          description: "启用自动播放，每 4 秒切换一张",
          code: `<Carousel autoPlay interval={4000} loop>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</Carousel>`,
          render: () => {
            const slides = [
              { label: "01", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
              { label: "02", gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)" },
              { label: "03", gradient: "linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)" },
            ];
            return (
              <Carousel autoPlay interval={4000} loop className="h-48 w-full max-w-sm">
                {slides.map((s) => (
                  <div
                    key={s.label}
                    className="flex h-full w-full items-center justify-center text-3xl font-bold text-white"
                    style={{ background: s.gradient }}
                  >
                    {s.label}
                  </div>
                ))}
              </Carousel>
            );
          },
        },
        {
          title: "无导航轮播",
          description: "隐藏箭头和圆点，仅支持拖拽切换",
          code: `<Carousel showArrows={false} showDots={false} loop={false}>
  <div>手动拖拽切换</div>
  <div>第二屏内容</div>
</Carousel>`,
          render: () => {
            const slides = [
              { label: "拖拽", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
              { label: "切换", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
            ];
            return (
              <Carousel showArrows={false} showDots={false} loop={false} className="h-48 w-full max-w-sm">
                {slides.map((s) => (
                  <div
                    key={s.label}
                    className="flex h-full w-full items-center justify-center text-3xl font-bold text-white"
                    style={{ background: s.gradient }}
                  >
                    {s.label}
                  </div>
                ))}
              </Carousel>
            );
          },
        },
        {
          title: "自动播放图片画廊",
          description: "使用自定义间隔自动播放，隐藏圆点导航，保留箭头控制",
          code: `<Carousel autoPlay interval={5000} loop showArrows showDots={false}>
  <div className="relative">
    <img src="photo1.jpg" alt="风景" className="h-64 w-full object-cover" />
    <div className="absolute bottom-2 left-2 text-white text-sm bg-black/50 px-2 py-1 rounded">日出</div>
  </div>
  <div className="relative">
    <img src="photo2.jpg" alt="风景" className="h-64 w-full object-cover" />
    <div className="absolute bottom-2 left-2 text-white text-sm bg-black/50 px-2 py-1 rounded">山峰</div>
  </div>
</Carousel>`,
          render: () => {
            const photos = [
              { Icon: Camera, label: "日出", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
              { Icon: Mountain, label: "山峰", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
              { Icon: Waves, label: "海岸", gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)" },
              { Icon: Trees, label: "森林", gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)" },
            ];
            return (
              <Carousel autoPlay interval={5000} loop showArrows showDots={false} className="h-56 w-full max-w-sm">
                {photos.map((p) => {
                  const Icon = p.Icon;
                  return (
                    <div key={p.label} className="relative h-full w-full">
                      <div className="flex h-full w-full items-center justify-center" style={{ background: p.gradient }}>
                        <Icon className="h-16 w-16 text-white/80" />
                      </div>
                      <div className="absolute bottom-2 left-2 rounded bg-black/50 px-2 py-1 text-xs text-white">
                        {p.label}
                      </div>
                    </div>
                  );
                })}
              </Carousel>
            );
          },
        },
      ]}
      accessibility="Carousel 使用 AnimatePresence 和语义化 button 元素实现导航。左右箭头按钮带有 aria-label 分别标注为 'Previous slide' 和 'Next slide'。底部圆点指示器每个按钮带有 aria-label（如 'Go to slide 1'），当前活跃的圆点通过颜色区分。支持键盘导航和拖拽操作。当 autoPlay 启用时，建议用户可通过交互暂停自动播放。"
    />
  );
}
