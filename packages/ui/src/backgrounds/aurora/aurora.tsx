import { cn } from '@/lib/utils';

export interface AuroraProps {
  className?: string;
  colors?: string[];
}

export function Aurora({
  className,
  colors = ['#3b82f6', '#8b5cf6', '#ec4899'],
}: AuroraProps) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      <div
        className="absolute -inset-[100%] animate-aurora opacity-50"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${colors.join(', ')})`,
          filter: 'blur(100px)',
        }}
      />
    </div>
  );
}
