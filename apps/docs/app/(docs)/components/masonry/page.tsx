"use client";

import { Masonry } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function MasonryPage() {
  return (
    <ComponentDocPage
      category={{ label: "复合组件", href: "/components" }}
      name="Masonry"
      description="基于 CSS columns 的瀑布流布局，简洁高性能，支持响应式列数"
      installName="masonry"
      importStatement={'import { Masonry } from "@frontend-ui/ui";'}
      defaultValues={{ columns: 3, gap: 16 }}
      propConfig={[
        { name: "columns", type: "number", min: 1, max: 6, step: 1 },
        { name: "gap", type: "number", min: 0, max: 48, step: 2 },
      ]}
      propDocs={[
        { name: "children", type: "ReactNode", required: true, description: "瀑布流内容子元素" },
        { name: "className", type: "string", description: "自定义类名" },
        { name: "columns", type: "number", default: "3", description: "列数" },
        { name: "gap", type: "number", default: "16", description: "列间距（px）" },
        { name: "breakpointCols", type: "{ [minWidth: number]: number }", description: "响应式断点列数配置，键为最小视口宽度（px），值为对应列数" },
      ]}
      codeGenerator={(v) => `<Masonry columns={${v.columns}} gap={${v.gap}}>
  <div>卡片 1</div>
  <div>卡片 2</div>
  <div>卡片 3</div>
</Masonry>`}
      renderPreview={(v) => {
        const columns = typeof v.columns === 'number' ? v.columns : 3;
        const gap = typeof v.gap === 'number' ? v.gap : 16;
        const heights = [120, 180, 90, 150, 110, 200, 130, 160];
        const colors = [
          'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
          'linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)',
          'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        ];
        return (
          <Masonry columns={columns} gap={gap} className="w-full">
            {heights.map((h, i) => (
              <div
                key={i}
                style={{
                  height: h,
                  background: colors[i % colors.length],
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                {i + 1}
              </div>
            ))}
          </Masonry>
        );
      }}
      examples={[
        {
          title: "基础瀑布流",
          description: "使用默认 3 列布局",
          code: `<Masonry columns={3} gap={16}>
  <div style={{ height: 120, background: "#667eea", borderRadius: 10 }}>1</div>
  <div style={{ height: 180, background: "#11998e", borderRadius: 10 }}>2</div>
  <div style={{ height: 90, background: "#ee0979", borderRadius: 10 }}>3</div>
  <div style={{ height: 150, background: "#4facfe", borderRadius: 10 }}>4</div>
  <div style={{ height: 110, background: "#f093fb", borderRadius: 10 }}>5</div>
  <div style={{ height: 200, background: "#fa709a", borderRadius: 10 }}>6</div>
</Masonry>`,
          render: () => {
            const colors = [
              'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
              'linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)',
              'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            ];
            return (
              <Masonry columns={3} gap={12} className="w-full max-w-md">
                {[120, 180, 90, 150, 110, 200].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      height: h,
                      background: colors[i],
                      borderRadius: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 600,
                    }}
                  >
                    {i + 1}
                  </div>
                ))}
              </Masonry>
            );
          },
        },
        {
          title: "响应式列数",
          description: "通过 breakpointCols 根据屏幕宽度自动切换列数",
          code: `<Masonry
  columns={3}
  gap={16}
  breakpointCols={{ 640: 1, 768: 2, 1024: 3 }}
>
  <div>...</div>
</Masonry>`,
          render: () => {
            const colors = [
              'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
              'linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)',
              'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            ];
            return (
              <Masonry columns={2} gap={12} className="w-full max-w-md">
                {[140, 100, 160, 120].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      height: h,
                      background: colors[i],
                      borderRadius: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 600,
                    }}
                  >
                    {i + 1}
                  </div>
                ))}
              </Masonry>
            );
          },
        },
        {
          title: "带悬停效果的图片画廊",
          description: "图片卡片悬停时缩放并显示标题遮罩层",
          code: `<Masonry columns={3} gap={12}>
  <div className="group relative overflow-hidden rounded-xl cursor-pointer">
    <img src="photo1.jpg" className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
      <span className="absolute bottom-3 left-3 text-white text-sm font-medium">山间小屋</span>
    </div>
  </div>
</Masonry>`,
          render: () => {
            const images = [
              { label: "山间小屋", h: 160, gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
              { label: "海边日落", h: 120, gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
              { label: "城市夜景", h: 180, gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
              { label: "森林小径", h: 140, gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)" },
              { label: "雪山倒影", h: 170, gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)" },
              { label: "星空银河", h: 130, gradient: "linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)" },
            ];
            return (
              <Masonry columns={2} gap={12} className="w-full max-w-md">
                {images.map((img) => (
                  <div
                    key={img.label}
                    className="group relative cursor-pointer overflow-hidden rounded-xl"
                    style={{ height: img.h }}
                  >
                    <div
                      className="h-full w-full transition-transform duration-300 group-hover:scale-110"
                      style={{ background: img.gradient }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="absolute bottom-3 left-3 text-sm font-medium text-white">
                        {img.label}
                      </span>
                    </div>
                  </div>
                ))}
              </Masonry>
            );
          },
        },
      ]}
      accessibility="Masonry 组件使用标准 div 元素渲染瀑布流，内容保持自然的 DOM 顺序，确保屏幕阅读器按正确顺序读取。由于使用 CSS columns 实现，视觉顺序可能与 DOM 顺序不完全一致（从上到下、从左到右），这对辅助技术用户是有利的。子元素建议使用语义化 HTML 标签以保持良好的可访问性。"
    />
  );
}
