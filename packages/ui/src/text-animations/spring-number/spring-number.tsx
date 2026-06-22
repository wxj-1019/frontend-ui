"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { animate } from "motion/react";

export interface SpringNumberProps {
  /** 目标数值 */
  value: number;
  /** 小数精度，默认 0 */
  precision?: number;
  /** 数值格式化函数 */
  format?: (value: number) => string;
  /** 起始数值 */
  from?: number;
  /** 延迟启动 (ms) */
  delay?: number;
  /** 前缀 */
  prefix?: string;
  /** 后缀 */
  suffix?: string;
  /** 自定义类名 */
  className?: string;
}

export function SpringNumber({
  value,
  precision = 0,
  format,
  from = 0,
  delay = 0,
  prefix = "",
  suffix = "",
  className,
}: SpringNumberProps) {
  const [displayValue, setDisplayValue] = useState(from);

  useEffect(() => {
    const controls = animate(from, value, {
      duration: 1,
      delay: delay / 1000,
      ease: [0.17, 0.67, 0.35, 1.04],
      onUpdate: (latest) => setDisplayValue(latest),
    });

    return () => controls.stop();
  }, [value, from, delay]);

  const formatted = format
    ? format(displayValue)
    : displayValue.toFixed(precision);

  return (
    <span className={cn("tabular-nums", className)}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
