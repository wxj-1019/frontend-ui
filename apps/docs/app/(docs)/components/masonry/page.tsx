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
        { name: "children", type: "ReactNode", required: true, description: "瀑布流内容" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
        { name: "columns", type: "number", default: "3", description: "列数" },
        { name: "gap", type: "number", default: "16", description: "列间距（px）" },
        {
          name: "breakpointCols",
          type: "{ [minWidth: number]: number }",
          default: "-",
          description: "响应式断点列数配置，键为最小视口宽度",
        },
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
    />
  );
}
