"use client";

import { SpringNumber } from "@frontend-ui/ui";
import { ComponentDocPage } from "@/components/ui/ComponentDocPage";

export default function SpringNumberPage() {
  return (
    <ComponentDocPage
      category={{ label: "文字动画", href: "/text-animations" }}
      name="SpringNumber"
      description="基于弹簧物理的数字动画，使用 react-spring 实现流畅的数字过渡效果"
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
        { name: "from", type: "number", default: "0", description: "起始数值" },
        { name: "delay", type: "number", default: "0", description: "延迟启动 (ms)" },
        { name: "config", type: "SpringConfig", default: "{ tension: 170, friction: 26 }", description: "弹簧物理配置" },
        { name: "format", type: "(value) => string", default: "-", description: "自定义格式化函数" },
        { name: "prefix", type: "string", default: '""', description: "前缀文字" },
        { name: "suffix", type: "string", default: '""', description: "后缀文字" },
        { name: "className", type: "string", default: "-", description: "自定义类名" },
      ]}
      codeGenerator={(v) => `<SpringNumber
  value={${v.value}}
  precision={${v.precision}}
  prefix="${v.prefix}"
  suffix="${v.suffix}"
/>`}
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
    />
  );
}
