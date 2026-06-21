'use client';

import {
  useRef,
  useState,
  useCallback,
  forwardRef,
  type ReactNode,
} from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export interface TiltCardProps {
  /** 卡片内容 */
  children: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 最大倾斜角度（度），默认 10 */
  tiltDegree?: number;
  /** 透视距离（px），默认 1000 */
  perspective?: number;
  /** 悬停缩放比例，默认 1.02 */
  scale?: number;
  /** 是否启用炫光效果，默认 true */
  glare?: boolean;
  /** 炫光不透明度，默认 0.25 */
  glareOpacity?: number;
  /** 动画过渡速度（s），默认 0.4 */
  speed?: number;
}

export const TiltCard = forwardRef<HTMLDivElement, TiltCardProps>(
  (
    {
      children,
      className,
      tiltDegree = 10,
      perspective = 1000,
      scale = 1.02,
      glare = true,
      glareOpacity = 0.25,
      speed = 0.4,
    },
    ref
  ) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
    const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        const card = internalRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) / (rect.width / 2);
        const deltaY = (e.clientY - centerY) / (rect.height / 2);

        setTilt({
          rotateX: -deltaY * tiltDegree,
          rotateY: deltaX * tiltDegree,
        });

        // 炫光位置跟随鼠标（百分比）
        const glareX = ((e.clientX - rect.left) / rect.width) * 100;
        const glareY = ((e.clientY - rect.top) / rect.height) * 100;
        setGlarePos({ x: glareX, y: glareY });
      },
      [tiltDegree]
    );

    const handleMouseEnter = useCallback(() => {
      setIsHovered(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
      setIsHovered(false);
      setTilt({ rotateX: 0, rotateY: 0 });
    }, []);

    return (
      <div
        ref={(node) => {
          internalRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn('relative inline-block', className)}
        style={{ perspective }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="relative overflow-hidden rounded-xl"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{
            rotateX: tilt.rotateX,
            rotateY: tilt.rotateY,
            scale: isHovered ? scale : 1,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
            mass: 0.5,
            duration: speed,
          }}
        >
          {children}

          {/* Glare 炫光层 */}
          {glare && (
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-xl"
              aria-hidden="true"
              animate={{
                opacity: isHovered ? glareOpacity : 0,
              }}
              transition={{ duration: speed }}
              style={{
                background:
                  glare && isHovered
                    ? `radial-gradient(
                  circle at ${glarePos.x}% ${glarePos.y}%,
                  rgba(255, 255, 255, 0.8) 0%,
                  rgba(255, 255, 255, 0) 60%
                )`
                    : undefined,
              }}
            />
          )}
        </motion.div>
      </div>
    );
  }
);

TiltCard.displayName = 'TiltCard';
