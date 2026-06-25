---
name: react-spring-animator
description: react-spring animation patterns for Frontend UI — spring physics, useSpring, useSprings, useTransition, useTrail, and gesture integration. Use when building physics-based animated components.
---

# React Spring Animator

Physics-based animation patterns using react-spring, covering spring configurations, gesture integration, transitions, and performance optimization for the Frontend UI library.

## When to Use

- Building physics-based animations (bouncy, natural motion)
- Creating draggable spring interactions
- Animating lists with enter/exit transitions
- Implementing parallax or scroll-linked spring effects
- Needing interruptible animations (spring vs tween)

---

## 1. Core Concepts

### 1.1 Spring Physics vs Tween

```tsx
// Tween (Framer Motion): time-based, cannot be interrupted smoothly
<motion.div animate={{ x: 100 }} transition={{ duration: 0.5 }} />

// Spring (react-spring): physics-based, interruptible
const { x } = useSpring({ x: 100, config: { tension: 170, friction: 26 } });
// If x changes mid-animation, spring naturally redirects
```

### 1.2 Spring Config Presets

```typescript
import { config } from '@react-spring/web';

// Preset configs
config.default    // { tension: 170, friction: 26 }
config.gentle     // { tension: 120, friction: 14 }
config.wobbly     // { tension: 180, friction: 12 }
config.stiff      // { tension: 210, friction: 20 }
config.slow       // { tension: 120, friction: 14 }
config.molasses   // { tension: 120, friction: 14, precision: 0.005 }

// Custom config
const customConfig = {
  tension: 200,    // Higher = faster/stiffer
  friction: 20,    // Higher = less bounce
  mass: 1,         // Higher = heavier/slower
  precision: 0.01, // Stop threshold
};
```

### 1.3 Tuning Springs

```
Tension (弹簧张力)     Friction (摩擦力)     Result
─────────────────────────────────────────────────────
Low  (<100)           Low  (<10)           Slow, bouncy
Low  (<100)           High (>30)           Slow, smooth
High (>200)           Low  (<10)           Fast, oscillating
High (>200)           High (>30)           Fast, damping

Common pairs:
• Bouncy:   { tension: 180, friction: 12 }
• Smooth:   { tension: 120, friction: 14 }
• Snappy:   { tension: 300, friction: 30 }
• Gentle:   { tension: 80,  friction: 20 }
```

---

## 2. useSpring Hook

### 2.1 Basic Usage

```tsx
import { useSpring, animated } from '@react-spring/web';

function FadeInBox() {
  const styles = useSpring({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    config: { tension: 120, friction: 14 },
  });

  return (
    <animated.div style={styles}>
      Content
    </animated.div>
  );
}
```

### 2.2 Imperative Control

```tsx
import { useSpring, useSpringRef, animated } from '@react-spring/web';

function ToggleBox() {
  const api = useSpringRef();
  
  const styles = useSpring({
    ref: api,
    from: { width: 100, height: 100 },
  });

  const expand = () => {
    api.start({ width: 300, height: 300 });
  };

  const collapse = () => {
    api.start({ width: 100, height: 100 });
  };

  return (
    <>
      <animated.div style={styles} />
      <button onClick={expand}>Expand</button>
      <button onClick={collapse}>Collapse</button>
    </>
  );
}
```

### 2.3 Chained Animations

```tsx
import { useSpring, useChain, animated } from '@react-spring/web';

function ChainedAnimation() {
  const springRef1 = useSpringRef();
  const springRef2 = useSpringRef();

  const spring1 = useSpring({
    ref: springRef1,
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  const spring2 = useSpring({
    ref: springRef2,
    from: { x: 0 },
    to: { x: 100 },
  });

  // spring2 starts after spring1 completes
  useChain([springRef1, springRef2]);

  return (
    <>
      <animated.div style={spring1}>First</animated.div>
      <animated.div style={spring2}>Second</animated.div>
    </>
  );
}
```

---

## 3. useSprings Hook

### 3.1 Staggered List Animation

```tsx
import { useSprings, animated } from '@react-spring/web';

function StaggeredList({ items }: { items: string[] }) {
  const springs = useSprings(
    items.length,
    items.map((_, i) => ({
      from: { opacity: 0, y: 20 },
      to: { opacity: 1, y: 0 },
      delay: i * 100,
      config: { tension: 200, friction: 20 },
    }))
  );

  return (
    <div>
      {springs.map((style, i) => (
        <animated.div key={i} style={style}>
          {items[i]}
        </animated.div>
      ))}
    </div>
  );
}
```

### 3.2 Interactive Grid

```tsx
import { useSprings, animated } from '@react-spring/web';
import { useCallback } from 'react';

function InteractiveGrid() {
  const items = Array.from({ length: 25 }, (_, i) => i);

  const [springs, api] = useSprings(items.length, i => ({
    scale: 1,
    config: { tension: 300, friction: 15 },
  }));

  const handleHover = useCallback((index: number) => {
    api.start(i => ({
      scale: i === index ? 1.2 : 0.9,
    }));
  }, [api]);

  const handleLeave = useCallback(() => {
    api.start({ scale: 1 });
  }, [api]);

  return (
    <div className="grid grid-cols-5 gap-2">
      {springs.map((style, i) => (
        <animated.div
          key={i}
          style={style}
          className="h-12 bg-primary rounded"
          onMouseEnter={() => handleHover(i)}
          onMouseLeave={handleLeave}
        />
      ))}
    </div>
  );
}
```

---

## 4. useTransition Hook

### 4.1 List Enter/Exit Animations

```tsx
import { useTransition, animated } from '@react-spring/web';
import { useState } from 'react';

function AnimatedList() {
  const [items, setItems] = useState(['A', 'B', 'C']);

  const transitions = useTransition(items, {
    from: { opacity: 0, height: 0, transform: 'translateY(-20px)' },
    enter: { opacity: 1, height: 40, transform: 'translateY(0)' },
    leave: { opacity: 0, height: 0, transform: 'translateY(20px)' },
    keys: item => item,
  });

  return (
    <div>
      {transitions((style, item) => (
        <animated.div style={style} className="overflow-hidden">
          {item}
        </animated.div>
      ))}
      <button onClick={() => setItems([...items, String(Date.now())])}>
        Add
      </button>
    </div>
  );
}
```

### 4.2 Modal/Dialog Transition

```tsx
import { useTransition, animated } from '@react-spring/web';

function Modal({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) {
  const transition = useTransition(isOpen, {
    from: { opacity: 0, scale: 0.95 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0.95 },
    config: { tension: 300, friction: 25 },
  });

  return transition((style, item) =>
    item ? (
      <animated.div
        style={style}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      >
        {children}
      </animated.div>
    ) : null
  );
}
```

---

## 5. useTrail Hook

### 5.1 Cascading Animation

```tsx
import { useTrail, animated } from '@react-spring/web';

function TrailText({ text }: { text: string }) {
  const letters = text.split('');

  const trail = useTrail(letters.length, {
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 },
  });

  return (
    <div className="flex">
      {trail.map((style, i) => (
        <animated.span key={i} style={style}>
          {letters[i] === ' ' ? '\u00A0' : letters[i]}
        </animated.span>
      ))}
    </div>
  );
}
```

---

## 6. Gesture Integration

### 6.1 with React UseGesture

```tsx
import { useSpring, animated } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';

function DraggableCard() {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  const bind = useGesture({
    onDrag: ({ down, offset: [ox, oy] }) => {
      api.start({ x: ox, y: oy, immediate: down });
    },
  });

  return (
    <animated.div
      {...bind()}
      style={{ x, y, touchAction: 'none' }}
      className="w-32 h-32 bg-primary rounded-lg cursor-grab"
    />
  );
}
```

### 6.2 Spring Drag with Boundaries

```tsx
import { useSpring, animated } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import { clamp } from '@/lib/utils';

function BoundedDrag({
  width = 300,
  height = 300,
}: {
  width?: number;
  height?: number;
}) {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
  const cardSize = 100;

  const bind = useGesture({
    onDrag: ({ down, movement: [mx, my] }) => {
      const boundedX = clamp(mx, 0, width - cardSize);
      const boundedY = clamp(my, 0, height - cardSize);
      api.start({
        x: boundedX,
        y: boundedY,
        immediate: down,
      });
    },
  });

  return (
    <div className="relative" style={{ width, height }}>
      <animated.div
        {...bind()}
        style={{ x, y, position: 'absolute' }}
        className="w-[100px] h-[100px] bg-primary rounded-lg cursor-grab"
      />
    </div>
  );
}
```

---

## 7. Scroll-Linked Animation

### 7.1 Parallax with useScroll

```tsx
import { useSpring, useScroll, animated } from '@react-spring/web';

function ParallaxSection() {
  const { scrollYProgress } = useScroll();

  const springProps = useSpring({
    y: scrollYProgress.to(progress => progress * 100),
    config: { tension: 120, friction: 14 },
  });

  return (
    <animated.div
      style={springProps}
      className="fixed top-0 left-0 w-full h-20 bg-primary"
    />
  );
}
```

### 7.2 Scroll Progress Bar

```tsx
import { useSpring, useScroll, animated } from '@react-spring/web';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <animated.div
      className="fixed top-0 left-0 h-1 bg-primary origin-left"
      style={{ scaleX }}
    />
  );
}
```

---

## 8. Integration with Frontend UI

### 8.1 Component Pattern

```tsx
// packages/ui/src/animations/spring-card/spring-card.tsx
'use client';

import { useSpring, animated } from '@react-spring/web';
import { cn } from '@/lib/utils';

interface SpringCardProps {
  children: React.ReactNode;
  className?: string;
  stiffness?: number;
  damping?: number;
}

export function SpringCard({
  children,
  className,
  stiffness = 300,
  damping = 20,
}: SpringCardProps) {
  const [styles, api] = useSpring(() => ({
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    config: { tension: stiffness, friction: damping },
  }));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    api.start({
      rotateX: -y * 20,
      rotateY: x * 20,
      scale: 1.05,
    });
  };

  const handleMouseLeave = () => {
    api.start({ rotateX: 0, rotateY: 0, scale: 1 });
  };

  return (
    <animated.div
      style={{
        ...styles,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn('rounded-lg bg-card p-6', className)}
    >
      {children}
    </animated.div>
  );
}
```

### 8.2 prefers-reduced-motion

```tsx
import { useReducedMotion } from '@react-spring/web';

function AccessibleSpring() {
  const prefersReducedMotion = useReducedMotion();

  const styles = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    // Instant animation for reduced motion
    immediate: prefersReducedMotion,
  });

  return <animated.div style={styles}>Content</animated.div>;
}
```

---

## 9. Performance Optimization

```tsx
// ✅ Only animate transform and opacity
const good = useSpring({ transform: 'translateX(100px)' });

// ❌ Avoid animating layout properties
const bad = useSpring({ width: 100, height: 100 }); // Triggers layout

// ✅ Use will-change sparingly
const style = { willChange: 'transform, opacity' };

// ✅ Cancel animations when not visible
const isVisible = useInView(ref);
const spring = useSpring({
  opacity: isVisible ? 1 : 0,
  pause: !isVisible, // react-spring v9+ supports pause
});
```

---

*Version: 1.0.0 | For Frontend UI Spring Animation Components*
