"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface DraggableBounds {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}

export interface DraggableProps {
  children: React.ReactNode;
  className?: string;
  bounds?: DraggableBounds;
  edgeResistance?: number;
}

export function Draggable({
  children,
  className,
  bounds,
  edgeResistance = 0.65,
}: DraggableProps) {
  const shouldReduce = useReducedMotion();
  const dragElastic = 1 - edgeResistance;

  return (
    <motion.div
      drag={!shouldReduce}
      dragConstraints={bounds}
      dragElastic={dragElastic}
      dragMomentum={false}
      whileDrag={{ scale: 1.05, cursor: "grabbing" }}
      className={cn("inline-block cursor-grab select-none", className)}
      role="button"
      tabIndex={0}
      aria-label="可拖拽元素"
    >
      {children}
    </motion.div>
  );
}
