"use client";

import { CountUp } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function CountUpPage() {
  return (
    <ComponentDocPage
      category={{ label: "文字动画", href: "/text-animations" }}
      name="CountUp"
      description="基于 requestAnimationFrame 的数字递增动画，从起始值平滑增长到目标值，支持千分位和小数格式。"
      installName="count-up"
      importStatement={'import { CountUp } from "@frontend-ui/ui";'}
      defaultValues={{ end: 99999, duration: 2, decimals: 0, separator: true, prefix: "", suffix: "" }}
      propConfig={[
        { name: "end", type: "number", min: 0, max: 999999, step: 1 },
        { name: "duration", type: "number", min: 0.5, max: 5, step: 0.5 },
        { name: "decimals", type: "number", min: 0, max: 3, step: 1 },
        { name: "separator", type: "boolean" },
        { name: "prefix", type: "string" },
        { name: "suffix", type: "string" },
      ]}
      propDocs={[
        { name: "end", type: "number", required: true, description: "目标数值" },
        { name: "start", type: "number", default: "0", description: "起始数值" },
        { name: "duration", type: "number", default: "2", description: "动画时长（秒）" },
        { name: "delay", type: "number", default: "0", description: "开始延迟（秒）" },
        { name: "prefix", type: "string", default: "''", description: "数字前缀（如 ¥）" },
        { name: "suffix", type: "string", default: "''", description: "数字后缀（如 %）" },
        { name: "decimals", type: "number", default: "0", description: "小数位数" },
        { name: "separator", type: "boolean", default: "true", description: "是否启用千分位分隔符" },
        { name: "onComplete", type: "() => void", default: "-", description: "动画完成回调" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
      ]}
      codeGenerator={(v) =>
        `<CountUp end={${v.end}} duration={${v.duration}} decimals={${v.decimals}} separator={${v.separator}} prefix="${v.prefix}" suffix="${v.suffix}" />`
      }
      renderPreview={(v) => (
        <CountUp
          end={Number(v.end)}
          duration={Number(v.duration)}
          decimals={Number(v.decimals)}
          separator={Boolean(v.separator)}
          prefix={String(v.prefix)}
          suffix={String(v.suffix)}
          className="font-display text-5xl font-bold text-[var(--color-accent)]"
        />
      )}
      examples={[
        {
          title: "基本数字",
          description: "从 0 到 1000 的递增动画",
          code: `<CountUp end={1000} duration={2} />`,
          render: () => (
            <CountUp
              end={1000}
              duration={2}
              className="font-display text-4xl font-bold text-[var(--color-accent)]"
            />
          ),
        },
        {
          title: "带前缀后缀",
          description: "显示货币符号和单位",
          code: `<CountUp end={99} prefix="$" suffix="/月" duration={1.5} />`,
          render: () => (
            <CountUp
              end={99}
              prefix="$"
              suffix="/月"
              duration={1.5}
              className="font-display text-4xl font-bold text-[var(--color-text-primary)]"
            />
          ),
        },
        {
          title: "带小数",
          description: "显示小数位",
          code: `<CountUp end={3.14} decimals={2} duration={2} />`,
          render: () => (
            <CountUp
              end={3.14}
              decimals={2}
              duration={2}
              separator={false}
              className="font-display text-4xl font-bold text-[var(--color-accent)]"
            />
          ),
        },
        {
          title: "数据仪表盘",
          description: "多个统计卡片组合，展示不同指标的递增动画",
          code: `<div className="grid grid-cols-3 gap-4">
  <div className="text-center">
    <CountUp end={12847} duration={2} className="text-3xl font-bold" />
    <p className="text-sm text-gray-500 mt-1">总用户</p>
  </div>
  <div className="text-center">
    <CountUp end={98.6} decimals={1} duration={1.5} suffix="%" className="text-3xl font-bold" />
    <p className="text-sm text-gray-500 mt-1">在线率</p>
  </div>
  <div className="text-center">
    <CountUp end={3500} prefix="¥" duration={2} className="text-3xl font-bold" />
    <p className="text-sm text-gray-500 mt-1">日收入</p>
  </div>
</div>`,
          render: () => (
            <div className="grid w-full max-w-lg grid-cols-3 gap-4">
              <div className="rounded-lg border border-[var(--color-border-default)] p-4 text-center">
                <CountUp
                  end={12847}
                  duration={2}
                  className="font-display text-2xl font-bold text-[var(--color-accent)]"
                />
                <p className="mt-1 text-xs text-[var(--color-text-muted)]">总用户</p>
              </div>
              <div className="rounded-lg border border-[var(--color-border-default)] p-4 text-center">
                <CountUp
                  end={98.6}
                  decimals={1}
                  duration={1.5}
                  suffix="%"
                  separator={false}
                  className="font-display text-2xl font-bold text-green-500"
                />
                <p className="mt-1 text-xs text-[var(--color-text-muted)]">在线率</p>
              </div>
              <div className="rounded-lg border border-[var(--color-border-default)] p-4 text-center">
                <CountUp
                  end={3500}
                  prefix="¥"
                  duration={2}
                  separator={false}
                  className="font-display text-2xl font-bold text-amber-500"
                />
                <p className="mt-1 text-xs text-[var(--color-text-muted)]">日收入</p>
              </div>
            </div>
          ),
        },
      ]}
      accessibility="CountUp 使用 span 元素渲染数字，使用 tabular-nums 保持等宽数字。数字内容通过 aria-label 标注目标值，屏幕阅读器可以直接读取最终数字而无需等待动画完成。对于设置了 prefers-reduced-motion 的用户，建议在全局层面尊重 prefers-reduced-motion 媒体查询来控制动画播放。"
    />
  );
}
