import { cn } from '@/lib/utils';

export interface GradientTextProps {
  text: string;
  className?: string;
  from?: string;
  to?: string;
}

export function GradientText({
  text,
  className,
  from = 'from-blue-500',
  to = 'to-purple-500',
}: GradientTextProps) {
  return (
    <span
      className={cn(
        'bg-gradient-to-r bg-clip-text text-transparent',
        from,
        to,
        className
      )}
    >
      {text}
    </span>
  );
}
