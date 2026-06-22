"use client";

import { SpringNumber } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function SpringNumberPage() {
  return (
    <ComponentDocPage
      category={{ label: "文字动画", href: "/text-animations" }}
      name="SpringNumber"
      description="基于弹簧物理的数字动画，使用 motion/react 实现流畅的数字过渡效果"
      installName="spring-number"
      importStatement={'import { SpringNumber } from "@frontend-ui/ui";'}
      defaultValues={{
        value: 100,
        precision: 0,
        from: 0,
        delay: 0,
        prefix: "",
        suffix: "",
      }}
      propConfig={[
        { name: "value", type: "number", min: -10000, max: 10000 },
        { name: "precision", type: "number", min: 0, max: 6 },
        { name: "from", type: "number", min: -10000, max: 10000 },
        { name: "delay", type: "number", min: 0, max: 3000, step: 100 },
        { name: "prefix", type: "string" },
        { name: "suffix", type: "string" },
      ]}
      propDocs={[
        { name: "value", type: "number", required: true, description: "目标数值" },
        { name: "precision", type: "number", default: "0", description: "小数精度" },
        { name: "format", type: "(value: number) => string", default: "-", description: "自定义格式化函数" },
        { name: "from", type: "number", default: "0", description: "起始数值" },
        { name: "delay", type: "number", default: "0", description: "延迟启动 (ms)" },
        { name: "prefix", type: "string", default: '""', description: "前缀文字" },
        { name: "suffix", type: "string", default: '""', description: "后缀文字" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
      ]}
      codeGenerator={(v) =>
        `<SpringNumber value={${v.value}} precision={${v.precision}} prefix="${v.prefix}" suffix="${v.suffix}" />`
      }
      renderPreview={(v) => (
        <div className="flex items-center justify-center py-8">
          <span className="text-5xl font-bold text-[var(--color-accent)]">
            <SpringNumber
              value={Number(v.value)}
              precision={Number(v.precision)}
              from={Number(v.from)}
              delay={Number(v.delay)}
              prefix={String(v.prefix)}
              suffix={String(v.suffix)}
            />
          </span>
        </div>
      )}
      examples={[
        {
          title: "基本弹簧数字",
          description: "从 0 弹到目标值",
          code: `<SpringNumber value={100} />`,
          render: () => (
            <div className="flex items-center justify-center py-4">
              <span className="text-4xl font-bold text-[var(--color-accent)]">
                <SpringNumber value={100} />
              </span>
            </div>
          ),
        },
        {
          title: "带前缀后缀",
          description: "显示货币格式",
          code: `<SpringNumber value={999} prefix="$" suffix="/年" />`,
          render: () => (
            <div className="flex items-center justify-center py-4">
              <span className="text-4xl font-bold text-[var(--color-text-primary)]">
                <SpringNumber value={999} prefix="$" suffix="/年" />
              </span>
            </div>
          ),
        },
        {
          title: "带小数精度",
          description: "显示两位小数",
          code: `<SpringNumber value={3.14159} precision={2} prefix="π ≈ " />`,
          render: () => (
            <div className="flex items-center justify-center py-4">
              <span className="text-4xl font-bold text-[var(--color-accent)]">
                <SpringNumber value={3.14159} precision={2} prefix="π ≈ " />
              </span>
            </div>
          ),
        },
      ]}
      accessibility="SpringNumber 使用 motion/react 的 animate 函数实现弹簧物理数字过渡，使用 span 元素渲染数字，tabular-nums 保持等宽数字。数字内容通过 aria-label 标注目标值，屏幕阅读器可以直接读取最终数字而无需等待动画完成。对于设置了 prefers-reduced-motion 的用户，建议在全局层面尊重 prefers-reduced-motion 媒体查询来控制动画播放。"
    />
  );
}
