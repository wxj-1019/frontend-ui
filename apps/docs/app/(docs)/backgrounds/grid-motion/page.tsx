"use client";

import { GridMotion } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function GridMotionPage() {
  return (
    <ComponentDocPage
      category={{ label: "背景特效", href: "/backgrounds" }}
      name="GridMotion"
      description="网格运动背景，方块按行列交错呼吸闪烁，适合作为装饰性背景或加载状态。"
      installName="grid-motion"
      importStatement={'import { GridMotion } from "@frontend-ui/ui";'}
      defaultValues={{ columns: 5, rows: 4, size: 40, speed: 2, radius: 4 }}
      propConfig={[
        { name: "columns", type: "number", min: 2, max: 10, step: 1 },
        { name: "rows", type: "number", min: 2, max: 10, step: 1 },
        { name: "size", type: "number", min: 10, max: 80, step: 5 },
        { name: "speed", type: "number", min: 0.5, max: 5, step: 0.5 },
        { name: "radius", type: "number", min: 0, max: 20, step: 1 },
      ]}
      propDocs={[
        { name: "columns", type: "number", default: "5", description: "网格列数" },
        { name: "rows", type: "number", default: "4", description: "网格行数" },
        { name: "size", type: "number", default: "40", description: "方块尺寸（px）" },
        { name: "speed", type: "number", default: "2", description: "动画速度" },
        { name: "color", type: "string", default: "var(--color-accent)", description: "方块颜色" },
        { name: "radius", type: "number", default: "4", description: "方块圆角" },
        { name: "opacityRange", type: "[number, number]", default: "[0.1, 0.6]", description: "透明度范围" },
        { name: "className", type: "string", default: "-", description: "自定义 CSS 类名" },
      ]}
      codeGenerator={(v) => `<GridMotion
  columns={${v.columns}}
  rows={${v.rows}}
  size={${v.size}}
  speed={${v.speed}}
  radius={${v.radius}}
/>`}
      renderPreview={(v) => (
        <GridMotion
          columns={Number(v.columns)}
          rows={Number(v.rows)}
          size={Number(v.size)}
          speed={Number(v.speed)}
          radius={Number(v.radius)}
        />
      )}
      examples={[
        {
          title: "基本用法",
          description: "5x4 网格呼吸效果",
          code: `<GridMotion columns={5} rows={4} size={40} />`,
          render: () => <GridMotion columns={5} rows={4} size={40} />,
        },
        {
          title: "小网格",
          description: "高密度小方块",
          code: `<GridMotion columns={8} rows={6} size={24} speed={1.5} />`,
          render: () => <GridMotion columns={8} rows={6} size={24} speed={1.5} />,
        },
        {
          title: "品红网格",
          description: "自定义颜色",
          code: `<GridMotion columns={6} rows={5} size={36} color="#FF006E" />`,
          render: () => <GridMotion columns={6} rows={5} size={36} color="#FF006E" />,
        },
      ]}
      accessibility="GridMotion 是纯粹装饰性背景，设置 aria-hidden='true'，不会被屏幕阅读器读取。组件自动检测 prefers-reduced-motion，启用时会暂停所有动画。"
    />
  );
}
