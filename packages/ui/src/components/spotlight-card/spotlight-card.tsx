import { cn } from '@/lib/utils';
import { useRef, useState, useCallback, forwardRef } from 'react';

export interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export const SpotlightCard = forwardRef<HTMLDivElement, SpotlightCardProps>(
  ({ children, className, spotlightColor }, ref) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        const card = internalRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        setPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
        setOpacity(1);
      },
      []
    );

    const handleMouseLeave = useCallback(() => {
      setOpacity(0);
    }, []);

    const defaultSpotlightColor =
      spotlightColor ?? 'rgba(0, 245, 255, 0.1)';

    return (
      <div
        ref={(node) => {
          internalRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(
          'relative overflow-hidden rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-6',
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${defaultSpotlightColor}, transparent 40%)`,
          }}
        />
        {children}
      </div>
    );
  }
);

SpotlightCard.displayName = 'SpotlightCard';
