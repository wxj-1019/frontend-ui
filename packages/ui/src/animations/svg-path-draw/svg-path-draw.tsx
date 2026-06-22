"use client";

import { cn } from "@/lib/utils";
import { useRef, useEffect } from "react";

export interface SvgPathDrawProps {
  /** SVG 路径 d 值 */
  path: string;
  /** 描边颜色 */
  strokeColor?: string;
  /** 描边宽度 */
  strokeWidth?: number;
  /** 动画持续时间 (ms) */
  duration?: number;
  /** 是否循环 */
  loop?: boolean;
  /** 是否反向绘制 */
  reverse?: boolean;
  /** SVG 视口宽度 */
  viewBoxWidth?: number;
  /** SVG 视口高度 */
  viewBoxHeight?: number;
  /** 自定义类名 */
  className?: string;
  /** SVG 额外属性 */
  svgProps?: React.SVGAttributes<SVGSVGElement>;
}

export function SvgPathDraw({
  path,
  strokeColor = "currentColor",
  strokeWidth = 2,
  duration = 2000,
  loop = false,
  reverse = false,
  viewBoxWidth = 200,
  viewBoxHeight = 200,
  className,
  svgProps,
}: SvgPathDrawProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const animationRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const el = pathRef.current;
    if (!el || !el.getTotalLength) return;

    const totalLength = el.getTotalLength();
    el.style.strokeDasharray = String(totalLength);
    el.style.strokeDashoffset = reverse ? "0" : String(totalLength);

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const currentOffset = reverse
        ? totalLength * progress
        : totalLength * (1 - progress);
      el.style.strokeDashoffset = String(currentOffset);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else if (loop) {
        startTimeRef.current = null;
        el.style.strokeDashoffset = reverse ? "0" : String(totalLength);
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [path, duration, loop, reverse]);

  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      className={cn("overflow-visible", className)}
      {...svgProps}
    >
      <path
        ref={pathRef}
        d={path}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
