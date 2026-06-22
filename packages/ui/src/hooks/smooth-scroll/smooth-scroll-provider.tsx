"use client";

import { cn } from "@/lib/utils";
import { type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";

export interface SmoothScrollProviderProps {
  /** 子元素 */
  children: ReactNode;
  /** Lenis 根元素选择器，默认 'main' */
  root?: string;
  /** Lenis 选项 */
  options?: {
    /** 滚动惯性 (0~1)，默认 0.1 */
    lerp?: number;
    /** 滚动方向，默认 'vertical' */
    orientation?: "vertical" | "horizontal";
    /** 是否平滑滚轮 */
    smoothWheel?: boolean;
    /** 动画持续时间 (秒) */
    duration?: number;
    /** 是否无限滚动 */
    infinite?: boolean;
  };
  /** 自定义类名 */
  className?: string;
}

export function SmoothScrollProvider({
  children,
  root,
  options = {},
  className,
}: SmoothScrollProviderProps) {
  const lenisOptions = {
    lerp: options.lerp ?? 0.1,
    orientation: options.orientation ?? "vertical",
    smoothWheel: options.smoothWheel ?? true,
    duration: options.duration ?? 1.2,
    infinite: options.infinite ?? false,
  };

  return (
    <ReactLenis root={root} options={lenisOptions} className={cn(className)}>
      {children}
    </ReactLenis>
  );
}

export { useLenis };
export type { LenisRef } from "lenis/react";
