import { cn } from '@/lib/utils';
import { useMemo } from 'react';

export interface MeshGradientProps {
  className?: string;
  /** 渐变颜色数组 */
  colors?: string[];
  /** 是否启用动画 */
  animated?: boolean;
  /** 动画周期（秒） */
  duration?: number;
}

export function MeshGradient({
  className,
  colors = ['#ff006e', '#8338ec', '#3a86ff'],
  animated = true,
  duration = 10,
}: MeshGradientProps) {
  // 根据颜色数量生成多个径向渐变层，分布在不同位置
  const positions = [
    { x: 0, y: 0 },
    { x: 100, y: 0 },
    { x: 100, y: 100 },
    { x: 0, y: 100 },
    { x: 50, y: 50 },
  ];

  const background = useMemo(() => {
    const layers = colors.map((color, i) => {
      const pos = positions[i % positions.length];
      return `radial-gradient(at ${pos.x}% ${pos.y}%, ${color} 0px, transparent 50%)`;
    });
    // 底色取第一个颜色，避免空白
    return `${layers.join(', ')}, ${colors[0] ?? '#000000'}`;
  }, [colors]);

  return (
    <div
      className={cn('absolute inset-0 overflow-hidden', className)}
      style={{
        background,
        backgroundSize: animated ? '200% 200%' : undefined,
        animation: animated
          ? `mesh-gradient-move ${duration}s ease-in-out infinite`
          : undefined,
      }}
    >
      <style>{`
        @keyframes mesh-gradient-move {
          0% { background-position: 0% 0%; }
          25% { background-position: 100% 0%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
          100% { background-position: 0% 0%; }
        }
      `}</style>
    </div>
  );
}
