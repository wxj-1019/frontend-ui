"use client";

import { CountUp } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function CountUpPage() {
  return (
    <ComponentDocPage
      category={{ label: "文字动画", href: "/text-animations" }}
      name="CountUp"
      description="数字递增动画，从起始值平滑增长到目标值，支持千分位和小数"
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
        `<CountUp\n  end={${v.end}}\n  duration={${v.duration}}\n  decimals={${v.decimals}}\n  separator={${v.separator}}\n  prefix="${v.prefix}"\n  suffix="${v.suffix}"\n/>`
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
    />
  );
}
