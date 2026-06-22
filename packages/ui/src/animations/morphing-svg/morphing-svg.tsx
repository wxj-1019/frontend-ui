"use client";

import { cn } from "@/lib/utils";
import { useRef, useEffect, useState } from "react";

export interface MorphingSVGProps {
  /** SVG 路径 d 值数组，自动轮播变形 */
  paths: string[];
  /** 当前激活的路径索引（受控模式） */
  activeIndex?: number;
  /** 填充颜色 */
  fillColor?: string;
  /** 描边颜色 */
  strokeColor?: string;
  /** 描边宽度 */
  strokeWidth?: number;
  /** 变形持续时间 (ms) */
  duration?: number;
  /** 自动轮播间隔 (ms)，默认 3000 */
  autoPlayInterval?: number;
  /** 是否循环 */
  loop?: boolean;
  /** 切换时的回调 */
  onCycle?: (index: number) => void;
  /** SVG 视口宽度 */
  viewBoxWidth?: number;
  /** SVG 视口高度 */
  viewBoxHeight?: number;
  /** 自定义类名 */
  className?: string;
}

export function MorphingSVG({
  paths,
  activeIndex: controlledIndex,
  fillColor = "none",
  strokeColor = "currentColor",
  strokeWidth = 2,
  duration = 800,
  autoPlayInterval = 3000,
  loop = true,
  onCycle,
  viewBoxWidth = 200,
  viewBoxHeight = 200,
  className,
}: MorphingSVGProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const [internalIndex, setInternalIndex] = useState(0);

  const currentIndex = controlledIndex ?? internalIndex;
  const isControlled = controlledIndex !== undefined;

  // Set initial path
  useEffect(() => {
    const el = pathRef.current;
    if (el && paths[0]) {
      el.setAttribute("d", paths[0]);
    }
  }, [paths]);

  // Apply path changes with CSS transition for smooth morphing
  useEffect(() => {
    const el = pathRef.current;
    if (!el || paths.length === 0) return;

    const targetPath = paths[currentIndex % paths.length];
    if (!targetPath) return;

    el.style.transition = `d ${duration}ms ease`;
    el.setAttribute("d", targetPath);
    const timer = setTimeout(() => {
      if (el) el.style.transition = "";
    }, duration);

    if (onCycle) onCycle(currentIndex);

    return () => clearTimeout(timer);
  }, [currentIndex, paths, duration, onCycle]);

  // Auto-play
  useEffect(() => {
    if (isControlled) return;
    if (paths.length <= 1) return;

    const interval = setInterval(() => {
      setInternalIndex((prev) => {
        const next = (prev + 1) % paths.length;
        if (!loop && next === 0) return prev; // stop at last
        return next;
      });
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [paths.length, autoPlayInterval, loop, isControlled]);

  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      className={cn("overflow-visible", className)}
    >
      <path
        ref={pathRef}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
