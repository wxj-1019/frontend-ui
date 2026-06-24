'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

export interface ThreeSceneProps {
  className?: string;
  layers?: { depth: number; content: React.ReactNode; opacity?: number }[];
  children?: React.ReactNode;
  perspective?: number;
}

function SceneLayer({
  scrollYProgress,
  depth,
  opacity,
  content,
  isVisible,
  index,
  prefersReducedMotion,
}: {
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  depth: number;
  opacity: number;
  content: React.ReactNode;
  isVisible: boolean;
  index: number;
  prefersReducedMotion: boolean | null;
}) {
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [depth * 100 * (prefersReducedMotion ? 0 : 1), -depth * 100 * (prefersReducedMotion ? 0 : 1)]
  );
  const z = depth * -200 * (prefersReducedMotion ? 0 : 1);

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        y: prefersReducedMotion ? 0 : y,
        z,
        opacity: isVisible ? opacity : 0,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? opacity : 0 }}
      transition={{ duration: 1, delay: index * 0.15 }}
    >
      {content}
    </motion.div>
  );
}

export function ThreeScene({
  className,
  layers = [],
  children,
  perspective = 1200,
}: ThreeSceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn('relative overflow-hidden', className)}
      style={{
        perspective: `${perspective}px`,
        perspectiveOrigin: '50% 50%',
      }}
    >
      {/* 3D Layers */}
      {layers.map((layer, i) => (
        <SceneLayer
          key={i}
          scrollYProgress={scrollYProgress}
          depth={layer.depth}
          opacity={layer.opacity ?? 1}
          content={layer.content}
          isVisible={isVisible}
          index={i}
          prefersReducedMotion={prefersReducedMotion}
        />
      ))}

      {/* Main Content */}
      <div
        className="relative z-10"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </div>
    </div>
  );
}
